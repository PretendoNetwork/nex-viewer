const fs = require('fs');
const os = require('os');
const crypto = require('crypto');
const accessKeys = require('./access_keys');
const Packet = require('./packet'); // eslint-disable-line no-unused-vars
const PacketV0 = require('./packetv0'); // eslint-disable-line no-unused-vars
const PacketV1 = require('./packetv1'); // eslint-disable-line no-unused-vars
const RMCMessage = require('./rmc');
const Protocols = require('./protocols');
const kerberos = require('./kerberos');
const Authentication = require('./protocols/authentication');
const Stream = require('./stream');
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
		this.prudpVersion;
		this.accessKey = null;
		this.accessKeySum = Buffer.alloc(4);
		this.signatureKey = null;
		this.sessionKey = Buffer.alloc(0);
		this.currentFragmentedPayload = Buffer.alloc(0);
		this.prudpProtocolMinorVersion = 0;
		this.clientConnectionSignature = Buffer.alloc(0);
		this.serverConnectionSignature = Buffer.alloc(0);
		this.rc4CipherToClient = crypto.createDecipheriv('rc4', 'CD&ML', '');
		this.rc4CipherToServer = crypto.createDecipheriv('rc4', 'CD&ML', '');

		this.clientPID;
		this.clientNEXPassword;
		this.secureServerStationURL;
		this.checkForSecureServer = false;
		this.isSecureServer = false;
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
				if (packet.version === 1) {
					this.prudpProtocolMinorVersion = packet.prudpProtocolMinorVersion;
				}
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

		if (packet.isSyn()) {
			if (packet.isToServer() && !this.accessKey) {
				// * Find access key
				for (const key of accessKeys) {
					let found = false;

					if (packet.version === 0) {
						// TODO
					} else {
						const expectedSignature = packet.signature;
						const calculatedSignature = packet.calculateSignature(key);

						if (expectedSignature.equals(calculatedSignature)) {
							found = true;
						}
					}

					if (found) {
						const keyBuffer = Buffer.from(key);
						const signatureBase = keyBuffer.reduce((sum, byte) => sum + byte, 0);

						this.accessKey = key;
						this.signatureKey = md5(key);
						this.accessKeySum.writeUInt32LE(signatureBase);
						break;
					}
				}
			}
		}

		if (packet.isConnect() && packet.isToServer()) {
			// * CONNECT packet from client
			this.clientConnectionSignature = packet.connectionSignature;
		}

		if (packet.isData()) {
			const payload = packet.payload;

			if (payload.length > 0) {
				// * Packet has data

				let cipher;

				if (packet.isToServer()) {
					// * Use the client->server cipher
					cipher = this.rc4CipherToServer;
				} else {
					// * Use the server->client cipher
					cipher = this.rc4CipherToClient;
				}

				this.currentFragmentedPayload = Buffer.concat([this.currentFragmentedPayload, cipher.update(payload)]);

				if (packet.fragmentId === 0) {
					const decryptedPayload = this.currentFragmentedPayload;

					packet.rmcMessage = new RMCMessage(decryptedPayload);

					this.currentFragmentedPayload = Buffer.alloc(0);

					const protocol = Protocols[packet.rmcMessage.protocolId];

					if (!protocol) {
						console.log(`Unknown protocol ID ${packet.rmcMessage.protocolId} (0x${packet.rmcMessage.protocolId.toString(16)})`);

						this.packets.push(packet);
						return;
					}

					protocol.handlePacket(packet);

					if (packet.rmcMessage.isResponse()) {
						if (packet.rmcMessage.protocolId === Authentication.ProtocolID) {
							if (packet.rmcMessage.methodId === Authentication.Methods.Login || packet.rmcMessage.methodId === Authentication.Methods.LoginEx) {
								this.clientPID = packet.rmcData.pidPrincipal;
								this.clientNEXPassword = NEX_KEYS[this.clientPID];
								this.secureServerStationURL = packet.rmcData.pConnectionData.stationUrl;

								if (!this.clientNEXPassword) {
									throw new Error(`No NEX password set for PID ${this.clientPID}!`);
								}

								const ticketStream = new Stream(packet.rmcData.pbufResponse, this);
								const ticket = new kerberos.KerberosTicket(ticketStream);

								if (ticket.targetPID === this.clientPID) {
									this.sessionKey = ticket.sessionKey;
									this.checkForSecureServer = true;
								}
							}

							if (packet.rmcMessage.methodId === Authentication.Methods.RequestTicket) {
								const ticketStream = new Stream(packet.rmcData.bufResponse, this);
								const ticket = new kerberos.KerberosTicket(ticketStream);

								this.sessionKey = ticket.sessionKey;
								this.checkForSecureServer = true;
							}
						}
					}
				}
			}
		}

		this.packets.push(packet);
	}
}


module.exports = Connection;