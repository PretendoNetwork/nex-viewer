/**
 * @typedef {import('../../stream')} Stream
 */
const NEXTypes = require('../../types');
const AuthenticationTypes = require('../types/authentication');

class LoginResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.retval = stream.readNEXResult();
		this.pidPrincipal = stream.readPID();
		this.pbufResponse = stream.readNEXBuffer();
		this.pConnectionData = stream.readNEXStructure(NEXTypes.RVConnectionData);
		this.strReturnMsg = stream.readNEXString();
	}

	toJSON() {
		return {
			'%retval%': {
				__typeName: 'Result',
				__typeValue: this.retval
			},
			pidPrincipal: {
				__typeName: 'PID',
				__typeValue: this.pidPrincipal
			},
			pbufResponse: {
				__typeName: 'Buffer',
				__typeValue: this.pbufResponse
			},
			pConnectionData: {
				__typeName: 'RVConnectionData',
				__typeValue: this.pConnectionData
			},
			strReturnMsg: {
				__typeName: 'String',
				__typeValue: this.strReturnMsg
			}
		};
	}
}

class LoginExResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.retval = stream.readNEXResult();
		this.pidPrincipal = stream.readPID();
		this.pbufResponse = stream.readNEXBuffer();
		this.pConnectionData = stream.readNEXStructure(NEXTypes.RVConnectionData);
		this.strReturnMsg = stream.readNEXString();
	}

	toJSON() {
		return {
			'%retval%': {
				__typeName: 'Result',
				__typeValue: this.retval
			},
			pidPrincipal: {
				__typeName: 'PID',
				__typeValue: this.pidPrincipal
			},
			pbufResponse: {
				__typeName: 'Buffer',
				__typeValue: this.pbufResponse
			},
			pConnectionData: {
				__typeName: 'RVConnectionData',
				__typeValue: this.pConnectionData
			},
			strReturnMsg: {
				__typeName: 'String',
				__typeValue: this.strReturnMsg
			}
		};
	}
}

class RequestTicketResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.retval = stream.readNEXResult();
		this.bufResponse = stream.readNEXBuffer();
	}

	toJSON() {
		return {
			'%retval%': {
				__typeName: 'Result',
				__typeValue: this.retval
			},
			bufResponse: {
				__typeName: 'Buffer',
				__typeValue: this.bufResponse
			}
		};
	}
}

class GetPIDResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.retval = stream.readPID();
	}

	toJSON() {
		return {
			'%retval%': {
				__typeName: 'PID',
				__typeValue: this.retval
			}
		};
	}
}

class GetNameResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.retval = stream.readNEXString();
	}

	toJSON() {
		return {
			'%retval%': {
				__typeName: 'String',
				__typeValue: this.retval
			}
		};
	}
}

class LoginWithContextResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.retval = stream.readNEXResult();
		this.pidPrincipal = stream.readPID();
		this.pbufResponse = stream.readNEXBuffer();
		this.pConnectionData = stream.readNEXStructure(NEXTypes.RVConnectionData);
	}

	toJSON() {
		return {
			'%retval%': {
				__typeName: 'Result',
				__typeValue: this.retval
			},
			pidPrincipal: {
				__typeName: 'PID',
				__typeValue: this.pidPrincipal
			},
			pbufResponse: {
				__typeName: 'Buffer',
				__typeValue: this.pbufResponse
			},
			pConnectionData: {
				__typeName: 'RVConnectionData',
				__typeValue: this.pConnectionData
			},

		};
	}
}

class ValidateAndRequestTicketWithParamResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.result = stream.readNEXStructure(AuthenticationTypes.ValidateAndRequestTicketResult);
	}

	toJSON() {
		return {
			result: {
				__typeName: 'ValidateAndRequestTicketResult',
				__typeValue: this.result
			}
		};
	}
}

module.exports = {
	LoginResponse,
	LoginExResponse,
	RequestTicketResponse,
	GetPIDResponse,
	GetNameResponse,
	LoginWithContextResponse,
	ValidateAndRequestTicketWithParamResponse
};
