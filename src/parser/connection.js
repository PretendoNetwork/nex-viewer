const fs = require('fs');
const RC4 = require('simple-rc4');
const { RMCMessage, MODE_RESPONSE } = require('./rmc');
const { KerberosTicket } = require('./kerberos');
const Types = require('./types');
const Flags = require('./flags');
const ProtocolIDs = require('./protocols/ids');
const Protocols = require('./protocols/protocols');
const NEXSmartBuffer = require('./nex_smart_buffer');
const accessKeys = require('./access_keys');
const errorCodes = require('./error_codes');

let NEX_KEYS_FILE_PATH;
if (fs.existsSync(__dirname + '/../nex-keys.txt')) { // check if nex-keys is in the "src" folder
	NEX_KEYS_FILE_PATH = __dirname + '/../nex-keys.txt';
} else if (fs.existsSync(__dirname + '/../../nex-keys.txt')) { // check if nex-keys is in the root folder
	NEX_KEYS_FILE_PATH = __dirname + '/../../nex-keys.txt';
} else if (process.platform === 'win32') { // if neither exist then grab the keys from WireShark on Windows
	NEX_KEYS_FILE_PATH = process.env.APPDATA + '/Wireshark/nex-keys.txt';
} else { // default to assuming OSX/Linux
	NEX_KEYS_FILE_PATH = '~/.config/wireshark/nex-keys.txt';
}

const NEX_KEYS_FILE = fs.readFileSync(NEX_KEYS_FILE_PATH, { encoding: 'utf-8' });
const NEX_KEYS = Object.fromEntries(NEX_KEYS_FILE.split('\n').map(combo => combo.split(':')));

const ERROR_MASK = 1 << 31;

class Connection {
	constructor(discriminator) {
		this._minorVersion;
		this.prudpVersion;
		this.nexPassword;
		this._discriminator = discriminator;
		this._packets = [];

		// Nintendo only uses one substream so this is fine
		this.fragmentedPayload = Buffer.alloc(0);
	
		this.setRC4Key('CD&ML');
	}

	setMinorNEXVersion(minorVersion) {
		this._minorVersion = minorVersion;
	}

	getMinorNEXVersion() {
		return this._minorVersion;
	}

	isFriendsServer() {
		return this.accessKey === 'ridfebb9';
	}

	setRC4Key(key) {
		this._rc4Serverbound = new RC4(key);
		this._rc4Clientbound = new RC4(key);
	}

	getDiscriminator() {
		return this._discriminator;
	}

	getCipherServerbound() {
		return this._rc4Serverbound;
	}

	getCipherClientbound() {
		return this._rc4Clientbound;
	}

	handlePacket(packet) {
		packet.connection = this;

		// Unreliable packets have their own RC4 streams and thus are ignored atm
		if (!packet.hasFlag(Flags.Reliable) && packet.getType() === Types.Data) {
			this._packets.push(packet);
			return;
		}

		// Don't need to parse these
		if (packet.hasFlag(Flags.MultiAck) || packet.hasFlag(Flags.Ack)) {
			this._packets.push(packet);
			return;
		}

		// Ignore PINGs
		if (packet.getType() === Types.Ping) {
			this._packets.push(packet);
			return;
		}

		if (!this.prudpVersion) {
			this.prudpVersion = packet.getVersion();
		}

		if (packet.getVersion() === 1 && packet.getType() === Types.Connect) {
			this.setMinorNEXVersion(packet.getSupportedFunctions() & 0xFF);
		}

		// Find which server we are connecting to
		if (packet.getType() === Types.Syn && !this.accessKey) {
			for (const key of accessKeys) {
				if (packet.getVersion() === 0) {
					if (packet.getChecksum() === packet.calculateChecksum(key)) {
						this.accessKey = key;
						break;
					}
				} else {
					if (packet.getSignature().equals(packet.calculateSignature(key))) {
						this.accessKey = key;
						break;
					}
				}
			}
		}

		const payload = packet.getPayload();

		let cipher;

		if (packet.getSource() === 0xAF) {
			// Packet is being sent to the server
			cipher = this.getCipherServerbound();
		} else if (packet.getSource() === 0xA1) {
			// Packet is being sent to the client
			cipher = this.getCipherClientbound();
		} else {
			throw Error('Invalid packet source ' + packet.getSource());
		}

		if (packet.getType() === Types.Data && payload.length > 0) {
			this.fragmentedPayload = Buffer.concat([this.fragmentedPayload, cipher.update(payload)]);

			if (packet.getFragmentID() !== 0) {
				return;
			}

			const decryptedPayload = this.fragmentedPayload;
			const message = new RMCMessage(decryptedPayload);

			packet.setRMCMessage(message);

			this.fragmentedPayload = Buffer.alloc(0);

			if (message.getErrorCode()) {
				packet.error = errorCodes[message.getErrorCode() & ~ERROR_MASK] || 'Invalid error code';
				return;
			}

			const protocol = Protocols[message.getProtocolID()];

			if (!protocol) {
				packet.error = `Unknown protocol ID 0x${message.getProtocolID().toString(16)}`;
				return;
			}

			///////////////////////////
			// Super dirty debugging //
			//  Needs to be removed  //
			///////////////////////////
			try {
				protocol.handlePacket(packet);
			} catch (error) {
				packet.error = error;
				this._packets.push(packet);
				/* // debug stuff
				if (packet.error.message === 'Attempted to read beyond the bounds of the managed data.') {
					console.log(error);
					process.kill(0);
				}
				*/
				
				//console.error(packet.error.message);
				return;
			}

			// Set the PID of the user who is in this connection
			// 0x1 = Login
			// 0x2 = LoginEx
			if (message.getMode() === MODE_RESPONSE && message.getProtocolID() === ProtocolIDs.Authentication && [0x1, 0x2].includes(message.getMethodID())) {
				this.pid = packet.rmcData.pid;
				this.nexPassword = NEX_KEYS[this.pid];
				this.secureServerStation = packet.rmcData.connectionData.stationUrl;

				const ticketBuffer = NEXSmartBuffer.fromBuffer(packet.rmcData.kerberosTicket);
				ticketBuffer.connection = this;

				const clientTicket = new KerberosTicket(ticketBuffer);

				if (clientTicket.target === this.pid) {
					this.secureKey = clientTicket.sessionKey;
				}
			}

			// Check for Kerberos Ticket and set the new RC4 key
			// 0x3 = RequestTicket
			if (message.getMode() === MODE_RESPONSE && message.getProtocolID() === ProtocolIDs.Authentication && message.getMethodID() === 0x3) {
				const ticketBuffer = NEXSmartBuffer.fromBuffer(packet.rmcData.kerberosTicket);
				ticketBuffer.connection = this;

				const clientTicket = new KerberosTicket(ticketBuffer);
				this.secureKey = clientTicket.sessionKey;
			}
		}

		this._packets.push(packet);
	}
}

module.exports = Connection;