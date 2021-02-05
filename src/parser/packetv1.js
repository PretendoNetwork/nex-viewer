const crypto = require('crypto');
const NEXSmartBuffer = require('./nex_smart_buffer');
const Packet = require('./packet');
const { md5 } = require('../util');

class PacketV1 extends Packet {
	constructor(buffer) {
		super();

		this.setVersion(1);

		this._substreamID;          // Only in v1
		this._supportedFunctions;   // Only in v1
		this._unreliableSequenceID; // Only in v1
		this._maxSubstreamID;       // Only in v1

		this._buffer = buffer;
		this._sbuffer = NEXSmartBuffer.fromBuffer(this._buffer);

		this.parse();
	}

	setSubstreamID(substreamID) {
		this._substreamID = substreamID;
	}

	setSupportedFunctions(supportedFunctions) {
		this._supportedFunctions = supportedFunctions;
	}

	setUnreliableSequenceID(unreliableSequenceID) {
		this._unreliableSequenceID = unreliableSequenceID;
	}

	setMaxSubstreamID(maxSubstreamID) {
		this._maxSubstreamID = maxSubstreamID;
	}

	getSubstreamID() {
		return this._substreamID;
	}

	getSupportedFunctions() {
		return this._supportedFunctions;
	}

	// This is only intended for use with SYN packets atm
	calculateSignature(key) {
		const data = this._buffer;

		// Unpack parts of the packet header
		const header = data.subarray(2, 14);
		const optionsSize = header.readUInt8(1);

		// Extract required data from the packet
		const headerSection = header.subarray(4);
		const options = data.subarray(30, 30 + optionsSize);

		const keyBuffer = Buffer.from(key);
		const signatureKey = md5(key);
		const signatureBase = keyBuffer.reduce((sum, byte) => sum + byte, 0);
		const signatureBaseBuffer = Buffer.alloc(4);
		signatureBaseBuffer.writeUInt32LE(signatureBase);

		const hmac = crypto.createHmac('md5', signatureKey);

		hmac.update(headerSection);
		hmac.update(Buffer.alloc(0)); // session key not present in SYN packet
		hmac.update(signatureBaseBuffer);
		hmac.update(Buffer.alloc(0)); // connection signature not present in SYN packet
		hmac.update(options);
		hmac.update(Buffer.alloc(0)); // payload not present in SYN packet

		return hmac.digest();
	}

	parse() {
		this._sbuffer.readOffset += 2; // Magic 0xEAD0

		// Start of header
		
		this._sbuffer.readOffset += 1; // PRUDP version (always 1)

		const optionsLength = this._sbuffer.readUInt8();
		const payloadLength = this._sbuffer.readUInt16LE();

		this.setSource(this._sbuffer.readUInt8());
		this.setDestination(this._sbuffer.readUInt8());

		const typeFlags = this._sbuffer.readUInt16LE();

		this.setType(typeFlags & 0xF);
		this.setFlags(typeFlags >> 4);

		this.setSessionID(this._sbuffer.readUInt8());
		this.setSubstreamID(this._sbuffer.readUInt8());
		this.setSequenceID(this._sbuffer.readUInt16LE());

		// End of header

		this.setSignature(this._sbuffer.readBuffer(0x10));

		const optionsData = this._sbuffer.readBuffer(optionsLength);
		const optionsBuffer = NEXSmartBuffer.fromBuffer(optionsData);

		while (optionsBuffer.remaining() > 0) {
			const optionID = optionsBuffer.readUInt8();
			const optionLength = optionsBuffer.readUInt8();
			
			
			switch (optionID) {
				case 0: // Supported functions
					this.setSupportedFunctions(optionsBuffer.readUInt32LE());
					break;
				case 1: // Connection signature
					this.setConnectionSignature(optionsBuffer.readBuffer(optionLength));
					break;
				case 2: // Fragment ID
					this.setFragmentID(optionsBuffer.readUInt8());
					break;
				case 3: // Unreliable data packets initial sequence ID
					this.setUnreliableSequenceID(optionsBuffer.readUInt16LE());
					break;
				case 4: // Max substream ID
					this.setMaxSubstreamID(optionsBuffer.readUInt8());
					break;
			
				default:
					throw new Error(`Unknown v1 option ID 0x${optionID.toString(16)}`);
			}
		}

		this.setPayload(this._sbuffer.readBuffer(payloadLength));
	}
}

module.exports = PacketV1;