const Stream = require('./stream');

class RMCMessage {
	static REQUEST  = 0;
	static RESPONSE = 1;

	/**
	 *
	 * @param {Buffer} payload
	 */
	constructor(payload) {
		this.payload = payload;
		this.mode;

		this.size;
		this.protocolId; // * ORed with 0x80 on requests
		this.extendedProtocolId; // * Only exists if protocl ID is 0x7F
		this.callId;
		this.methodId; // * ORed with 0x8000 on responses
		this.body;

		this.responseStatus; // * Only on responses
		this.errorCode; // * Only on responses

		this.parse();
	}

	parse() {
		const stream = new Stream(this.payload);

		this.size = stream.readUInt32LE(); // * Size of RMC message after this field
		this.protocolId = stream.readUInt8();

		if (this.protocolId & 0x80) {
			// * Message is a request
			this.mode = RMCMessage.REQUEST;

			this.protocolId = this.protocolId & ~0x80; // * Get original protocol ID
		} else {
			// * Message is a response
			this.mode = RMCMessage.RESPONSE;
		}

		if (this.protocolId === 0x7F) {
			this.extendedProtocolId = stream.readUInt16LE();
		}

		if (this.isRequest()) {
			this.callId = stream.readUInt32LE();
			this.methodId = stream.readUInt32LE();
			this.body = stream.readRest();
		}

		if (this.isResponse()) {
			this.responseStatus = stream.readUInt8(); // * 0 is error, 1 is success

			if (this.isSuccess()) {
				this.callId = stream.readUInt32LE();
				this.methodId = stream.readUInt32LE() & ~0x8000; // * Get original method ID
				this.body = stream.readRest();
			}

			if (this.isError()) {
				this.errorCode = stream.readUInt32LE();
				this.callId = stream.readUInt32LE();
			}
		}
	}

	/**
	 *
	 * @returns Boolean
	 */
	isRequest() {
		return this.mode === RMCMessage.REQUEST;
	}

	/**
	 *
	 * @returns Boolean
	 */
	isResponse() {
		return this.mode === RMCMessage.RESPONSE;
	}

	/**
	 *
	 * @returns Boolean
	 */
	isExtended() {
		return this.protocolId === 0x7F;
	}

	/**
	 *
	 * @returns Boolean
	 */
	isSuccess() {
		return this.responseStatus === 1;
	}

	/**
	 *
	 * @returns Boolean
	 */
	isError() {
		return this.responseStatus === 0;
	}
}

module.exports = RMCMessage;