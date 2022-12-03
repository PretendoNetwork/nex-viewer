const Stream = require('../../stream'); // eslint-disable-line no-unused-vars

class LoginRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.strUserName = stream.readNEXString();
	}

	toJSON() {
		return {
			strUserName: {
				__typeName: 'String',
				__typeValue: this.strUserName
			}
		};
	}
}

class LoginExRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.strUserName = stream.readNEXString();
		this.oExtraData = stream.readNEXAnyDataHolder();
	}

	toJSON() {
		return {
			strUserName: {
				__typeName: 'String',
				__typeValue: this.strUserName
			},
			oExtraData: {
				__typeName: 'AnyDataHolder',
				__typeValue: this.oExtraData
			}
		};
	}
}

class RequestTicketRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.idSource = stream.readUInt32LE();
		this.idTarget = stream.readUInt32LE();
	}

	toJSON() {
		return {
			idSource: {
				__typeName: 'PID',
				__typeValue: this.idSource
			},
			idTarget: {
				__typeName: 'PID',
				__typeValue: this.idTarget
			}
		};
	}
}

class GetPIDRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.strUserName = stream.readNEXString();
	}

	toJSON() {
		return {
			strUserName: {
				__typeName: 'String',
				__typeValue: this.strUserName
			}
		};
	}
}

class GetNameRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.id = stream.readUInt32LE();
	}

	toJSON() {
		return {
			id: {
				__typeName: 'PID',
				__typeValue: this.id
			}
		};
	}
}

class LoginWithContextRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.loginData = stream.readNEXAnyDataHolder();
	}

	toJSON() {
		return {
			loginData: {
				__typeName: 'AnyDataHolder',
				__typeValue: this.loginData
			}
		};
	}
}

module.exports = {
	LoginRequest,
	LoginExRequest,
	RequestTicketRequest,
	GetPIDRequest,
	GetNameRequest,
	LoginWithContextRequest
};