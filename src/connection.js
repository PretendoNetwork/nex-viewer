const fs = require('fs');
const os = require('os');
const crypto = require('crypto');
const titles = require('./titles.json');
const Packet = require('./packet'); // eslint-disable-line no-unused-vars
const PacketV0 = require('./packetv0'); // eslint-disable-line no-unused-vars
const PacketV1 = require('./packetv1'); // eslint-disable-line no-unused-vars
const RMCMessage = require('./rmc');
const Protocols = require('./protocols');
const kerberos = require('./kerberos');
const Authentication = require('./protocols/authentication');
const Stream = require('./stream');
const FragmentationManager = require('./fragmentation_manager');
const { md5 } = require('./util');

// * Find the NEX keys file path
let NEX_KEYS_FILE_PATH;
if (fs.existsSync(__dirname + '/../nex-keys.txt')) { // check if nex-keys is in the "src" folder
	NEX_KEYS_FILE_PATH = __dirname + '/../nex-keys.txt';
} else if (fs.existsSync(__dirname + '/../../nex-keys.txt')) { // check if nex-keys is in the root folder
	NEX_KEYS_FILE_PATH = __dirname + '/../../nex-keys.txt';
} else if (process.platform === 'win32') { // if neither exist then grab the keys from WireShark on Windows
	NEX_KEYS_FILE_PATH = process.env.APPDATA + '/Wireshark/nex-keys.txt';
} else { // default to assuming OSX/Linux
	const home = os.homedir();
	NEX_KEYS_FILE_PATH = `${home}/.config/wireshark/nex-keys.txt`;
}

if (!fs.existsSync(NEX_KEYS_FILE_PATH)) {
	throw new Error('Could not locate nex-keys.txt file');
}

// * Parse out the NEX keys
// * Format is one PID:KEY per line
const NEX_KEYS_FILE = fs.readFileSync(NEX_KEYS_FILE_PATH, { encoding: 'utf-8' });
const NEX_KEYS = Object.fromEntries(NEX_KEYS_FILE.split('\n').filter(line => line).map(combo => combo.split(':')));

// * Derive Kerberos keys from passwords
for (let pid in NEX_KEYS) {
	const key = NEX_KEYS[pid];

	if (key.length !== 32) {
		NEX_KEYS[pid] = kerberos.deriveKerberosKey(Number(pid), key).toString('hex');
	}
}

// * Write file back to disk
let NEW_NEX_KEYS = '';
for (let pid in NEX_KEYS) {
	NEW_NEX_KEYS += `${pid}:${NEX_KEYS[pid]}\n`;
}
fs.writeFileSync(NEX_KEYS_FILE_PATH, NEW_NEX_KEYS);

class Connection {
	/**
	 *
	 * @param {string} discriminator Unique connection identifer
	 */
	constructor(discriminator) {
		this.discriminator = discriminator;
		this.packets = [];

		this.reset();
	}

	reset() {
		this.prudpVersion = null;
		this.accessKey = null;
		this.accessKeySum = Buffer.alloc(4);
		this.signatureKey = null;
		this.sessionKey = Buffer.alloc(0);
		this.currentFragmentedPayload = Buffer.alloc(0);
		this.clientConnectionSignature = Buffer.alloc(0);
		this.serverConnectionSignature = Buffer.alloc(0);
		this.rc4CipherToClient = crypto.createDecipheriv('rc4', 'CD&ML', '');
		this.rc4CipherToServer = crypto.createDecipheriv('rc4', 'CD&ML', '');

		this.clientPID = null;
		this.clientNEXPassword = null;
		this.secureServerStationURL = null;
		this.checkForSecureServer = false;
		this.isSecureServer = false;

		this.title = {
			name: '',
			nex_version: {
				major: 0,
				minor: 0,
				patch: 0
			}
		};

		this.fragmentationManager = new FragmentationManager(this.discriminator);
		this.decryptedPayloads = {};

		this.clientAddress;
		this.serverAddress;
	}

	/**
	 *
	 * @param {(string|Buffer)} key Crypto key
	 */
	setRC4Key(key) {
		this.rc4CipherToClient = crypto.createDecipheriv('rc4', key, '');
		this.rc4CipherToServer = crypto.createDecipheriv('rc4', key, '');
	}

	/**
	 *
	 * @returns {boolean} True if server is friends
	 */
	isFriendsServer() {
		return this.accessKey === 'ridfebb9';
	}

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet PRUDP packet
	 */
	handlePacket(packet) {
		if (this.prudpVersion === undefined) {
			this.prudpVersion = packet.version;
		}

		if (packet.isData() && !packet.hasFlagReliable()) {
			// * Packet is an unreliable data packet
			// * These packets use their own RC4 stream
			// * and are not supported

			this.packets.push(packet);
			return;
		}

		if (packet.hasFlagAck() || packet.hasFlagMultiAck()) {
			if (packet.isSyn() && packet.isToClient()) {
				// * SYN packet from server
				this.serverConnectionSignature = packet.connectionSignature;
			}

			// TODO - Parse these for their sequence IDs

			this.packets.push(packet);
			return;
		}

		if (packet.isPing()) {
			// * Ping packets contain no useful information

			this.packets.push(packet);
			return;
		}

		if (packet.isToServer() && packet.isSyn() && this.isSecureServer === false) {
			this.reset();
		}

		if (packet.isToServer() && !this.accessKey) {
			// * Find access key
			for (const title of titles) {
				const accessKey = title.access_key;
				let found = false;

				if (!accessKey || accessKey.trim() === '') {
					continue;
				}

				if (packet.version === 0) {
					const expectedChecksum = packet.checksum;
					const calculatedChecksum = packet.calculateChecksum(accessKey);

					if (expectedChecksum === calculatedChecksum) {
						found = true;
					}
				} else {
					const expectedSignature = packet.signature;
					const calculatedSignature = packet.calculateSignature(accessKey);

					if (expectedSignature.equals(calculatedSignature)) {
						found = true;
					}
				}

				if (found) {
					const keyBuffer = Buffer.from(accessKey);
					const signatureBase = keyBuffer.reduce((sum, byte) => sum + byte, 0);

					this.accessKey = accessKey;
					this.signatureKey = md5(accessKey);
					this.accessKeySum.writeUInt32LE(signatureBase);

					this.title = title;
					break;
				}
			}
		}

		if (packet.isConnect() && packet.isToServer()) {
			// * CONNECT packet from client
			this.clientConnectionSignature = packet.connectionSignature;
		}

		if (packet.isData()) {
			const { fragments, seen } = this.fragmentationManager.update(packet);

			if (fragments.length > 0) {
				let decryptedPayload = Buffer.alloc(0);

				if (!seen) {
					for (const fragment of fragments) {
						let cipher;

						if (packet.isToServer()) {
							// * Use the client->server cipher
							cipher = this.rc4CipherToServer;
						} else {
							// * Use the server->client cipher
							cipher = this.rc4CipherToClient;
						}

						decryptedPayload = Buffer.concat([decryptedPayload, cipher.update(fragment)]);
					}

					this.decryptedPayloads[packet.sequenceId] = decryptedPayload;
				} else {
					decryptedPayload = this.decryptedPayloads[packet.sequenceId];
				}

				packet.rmcMessage = new RMCMessage(decryptedPayload);

				// * If the packet has a custom ID, check the protocol list with it
				let protocolId;
				if (packet.rmcMessage.protocolId === 0x7F) {
					protocolId = packet.rmcMessage.customId;
				} else {
					protocolId = packet.rmcMessage.protocolId;
				}

				const protocol = Protocols[protocolId];

				if (!protocol) {
					console.log(`Unknown protocol ID ${protocolId} (0x${protocolId.toString(16)})`);
					this.packets.push(packet);
					return;
				}

				protocol.handlePacket(packet);

				if (!packet.rmcData.protocolName) {
					packet.rmcData.protocolName = protocol.ProtocolName;
				}

				if (!packet.rmcData.methodName) {
					packet.rmcData.methodName = protocol.MethodNames[packet.rmcMessage.methodId];
				}

				if (packet.rmcMessage.isResponse()) {
					if (packet.rmcMessage.protocolId === Authentication.ProtocolID) {
						if (packet.rmcMessage.methodId === Authentication.Methods.Login || packet.rmcMessage.methodId === Authentication.Methods.LoginEx) {
							this.clientPID = packet.rmcData.body.pidPrincipal;
							this.clientNEXPassword = NEX_KEYS[this.clientPID];
							this.secureServerStationURL = packet.rmcData.body.pConnectionData.stationUrl;

							if (!this.clientNEXPassword) {
								throw new Error(`No NEX password set for PID ${this.clientPID}!`);
							}

							const ticketStream = new Stream(packet.rmcData.body.pbufResponse, this);
							const ticket = new kerberos.KerberosTicket(ticketStream);

							if (ticket.targetPID === this.clientPID) {
								this.sessionKey = ticket.sessionKey;
								this.checkForSecureServer = true;
							}
						}

						if (packet.rmcMessage.methodId === Authentication.Methods.RequestTicket) {
							const ticketStream = new Stream(packet.rmcData.body.bufResponse, this);
							const ticket = new kerberos.KerberosTicket(ticketStream);

							this.sessionKey = ticket.sessionKey;
							this.checkForSecureServer = true;
						}
					}
				}
			}
		}

		this.packets.push(packet);
	}
}


module.exports = Connection;
