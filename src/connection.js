/**
 * @typedef {import('./packetv0')} PacketV0
 * @typedef {import('./packetv1')} PacketV1
 */

const fs = require('fs');
const os = require('os');
const crypto = require('crypto');
const titles = require('./titles.json');
const Packet = require('./packet');
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
const NEX_KEYS = Object.fromEntries(NEX_KEYS_FILE.split('\n').filter(line => line).map(combo => {
	const parts = combo.split(':');
	const pid = parts.shift();
	const password = parts.join(':');

	return [pid, password];
}));

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

		// * These are used as part of the heuristics during packet parsing
		// * to know if a packet is legitimate or not.
		// * For example if a CONNECT packet comes in before the SYN packets,
		// * of if a DATA packet comes in before the CONNECT packets. These
		// * packets will be marked as illegitimate
		this.doneClientSyn = false;
		this.doneServerSyn = false;
		this.doneClientConnect = false;
		this.doneServerConnect = false;

		this.reset();
	}

	toJSON() {
		return {
			discriminator: this.discriminator,
			title: this.title,
			secure: this.isSecureServer
		};
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
			title_ids: [],
			access_key: '',
			nex_version: '0.0.0',
			nex_ranking_version: '0.0.0',
			nex_datastore_version: '0.0.0',
			nex_match_making_version: '0.0.0',
			nex_messaging_version: '0.0.0',
			nex_utility_version: '0.0.0'
		};

		this.clientFragmentationManager = new FragmentationManager();
		this.serverFragmentationManager = new FragmentationManager();
		this.decryptedClientPayloads = {};
		this.decryptedServerPayloads = {};

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
			let fragments;

			if (packet.isToServer()) {
				fragments = this.clientFragmentationManager.update(packet);
			} else {
				fragments = this.serverFragmentationManager.update(packet);
			}

			if (packet.fragmentId === 0) {
				const payloads = [];

				for (const fragment of fragments) {
					if (packet.isToServer() && this.decryptedClientPayloads[fragment.sequenceId]) {
						payloads.push(this.decryptedClientPayloads[fragment.sequenceId]);
					} else if (packet.isToClient() && this.decryptedServerPayloads[fragment.sequenceId]) {
						payloads.push(this.decryptedServerPayloads[fragment.sequenceId]);
					} else {
						let cipher;

						if (packet.isToServer()) {
							// * Use the client->server cipher
							cipher = this.rc4CipherToServer;
						} else {
							// * Use the server->client cipher
							cipher = this.rc4CipherToClient;
						}

						const decrypted = cipher.update(fragment.payload);

						if (packet.isToServer()) {
							this.decryptedClientPayloads[fragment.sequenceId] = decrypted;
						} else {
							this.decryptedServerPayloads[fragment.sequenceId] = decrypted;
						}

						payloads.push(decrypted);
					}
				}

				const decryptedPayload = Buffer.concat(payloads);

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

				if (!packet.rmcMessage.isRequest() && !packet.rmcMessage.isSuccess()) {
					const requestPacket = this.packets.find(p => {
						if (
							p.rmcMessage.isRequest() &&
							p.rmcMessage.protocolId === packet.rmcMessage.protocolId &&
							p.rmcMessage.callId === packet.rmcMessage.callId
						) {
							return true;
						}
					});

					if (requestPacket) {
						packet.rmcMessage.methodId = requestPacket.rmcMessage.methodId;
					}
				} else {
					try {
						protocol.handlePacket(packet);
					} catch (error) {
						packet.stackTrace = error.stack;
					}
				}

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

	/**
	 *
	 * @param {Buffer} data Raw RMC payload data from HokakuCTR
	 */
	handleRawRMC(data) {
		// TODO - Refactor handlePacket to also use this function? To reduce duplicate code?
		const stream = new Stream(data, this);
		const revision = stream.readUInt8();

		if (revision !== 1) {
			throw new Error(`Found packet with unsupported HokakuCTR version. Expected 1, got ${revision}`);
		}

		const titleID = stream.readUInt64LE().toString(16).padStart(16, '0').toUpperCase();
		const isResponseRMCMessage = stream.readBoolean();
		const message = new RMCMessage(stream.readRest());

		if (!this.title.name) {
			for (const title of titles) {
				if (title.title_ids?.includes(titleID)) {
					this.title = title;
					break;
				}
			}
		}

		// * Couldn't find a title
		if (!this.title.name) {
			throw new Error(`Failed to find title data for ${titleID} in titles.json`);
		}

		// * Construct a fake packet for the RMC data
		const packet = new Packet(this);

		packet.isRawRMC = true;
		packet.rmcMessage = message;

		if (isResponseRMCMessage) {
			packet.source = 0xAF;
			packet.destination = 0xA1;
		} else {
			packet.source = 0xA1;
			packet.destination = 0xAF;
		}

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

		if (isResponseRMCMessage && !packet.rmcMessage.isSuccess()) {
			const requestPacket = this.packets.find(p => {
				if (
					p.rmcMessage.isRequest() &&
					p.rmcMessage.protocolId === packet.rmcMessage.protocolId &&
					p.rmcMessage.callId === packet.rmcMessage.callId
				) {
					return true;
				}
			});

			if (requestPacket) {
				packet.rmcMessage.methodId = requestPacket.rmcMessage.methodId;
			}
		} else {
			try {
				protocol.handlePacket(packet);
			} catch (error) {
				packet.stackTrace = error.stack;
			}
		}

		if (!packet.rmcData.protocolName) {
			packet.rmcData.protocolName = protocol.ProtocolName;
		}

		if (!packet.rmcData.methodName) {
			packet.rmcData.methodName = protocol.MethodNames[packet.rmcMessage.methodId];
		}

		this.packets.push(packet);
	}
}


module.exports = Connection;
