const NEXSmartBuffer = require('./nex_smart_buffer');

const MODE_REQUEST = 0x0;
const MODE_RESPONSE = 0x1;

class RMCMessage {
	constructor(buffer) {
		this._buffer = buffer;
		this._sbuffer = NEXSmartBuffer.fromBuffer(this._buffer);

		this._mode;
		this._length;
		this._protocolID; // ORed with 0x80 on requests
		this._callID;
		this._methodID; // ORed with 0x8000 on responses
		this._parameters; // Only on requests
		this._responseStatus; // Only on responses
		this._responseData; // Only on responses
		this._errorCode; // Only on responses

		this.parse();
	}

	parse() {
		this.setLength(this._sbuffer.readUInt32LE());
		this.setProtocolID(this._sbuffer.readUInt8());

		if (this.getProtocolID() & 0x80) {
			this.setMode(MODE_REQUEST);

			this.setProtocolID(this.getProtocolID() & ~0x80); // Get back the original protocol ID

			this.setCallID(this._sbuffer.readUInt32LE());
			this.setMethodID(this._sbuffer.readUInt32LE());
			this.setParameters(this._sbuffer.readBuffer());
		} else {
			this.setMode(MODE_RESPONSE);
			this.setResponseStatus(this._sbuffer.readUInt8());

			if (this.getResponseStatus()) {
				// success
				this.setCallID(this._sbuffer.readUInt32LE());
				this.setMethodID(this._sbuffer.readUInt32LE() & ~0x8000); // Get back the original method ID
				this.setResponseData(this._sbuffer.readBuffer());
			} else {
				// error
				this.setErrorCode(this._sbuffer.readUInt32LE());
				this.setCallID(this._sbuffer.readUInt32LE());
			}
		}
	}

	// Setters

	setMode(mode) {
		this._mode = mode;
	}

	setLength(length) {
		this._length = length;
	}

	setProtocolID(protocolID) {
		this._protocolID = protocolID;
	}

	setCallID(callID) {
		this._callID = callID;
	}

	setMethodID(methodID) {
		this._methodID = methodID;
	}

	setParameters(parameters) {
		this._parameters = parameters;
	}

	setResponseStatus(responseStatus) {
		this._responseStatus = responseStatus;
	}

	setResponseData(responseData) {
		this._responseData = responseData;
	}

	setErrorCode(errorCode) {
		this._errorCode = errorCode;
	}

	// Getters

	getMode() {
		return this._mode;
	}

	getProtocolID() {
		return this._protocolID;
	}

	getMethodID() {
		return this._methodID;
	}

	getParameters() {
		return this._parameters;
	}

	getResponseStatus() {
		return this._responseStatus;
	}

	getResponseData() {
		return this._responseData;
	}

	getErrorCode() {
		return this._errorCode;
	}
}

module.exports = { MODE_REQUEST, MODE_RESPONSE, RMCMessage };