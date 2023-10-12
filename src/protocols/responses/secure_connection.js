/**
 * @typedef {import('../../stream')} Stream
 */
const NEXTypes = require('../../types');
const SecureConnectionTypes = require('../types/secure_connection');

class RegisterResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.retval = stream.readUInt32LE();
		this.pidConnectionID = stream.readUInt32LE();
		this.urlPublic = stream.readNEXStationURL();
	}

	toJSON() {
		return {
			'%retval%': {
				__typeName: 'Result',
				__typeValue: this.retval
			},
			pidConnectionID: {
				__typeName: 'uint32',
				__typeValue: this.pidConnectionID
			},
			urlPublic: {
				__typeName: 'StationURL',
				__typeValue: this.urlPublic
			}
		};
	}
}

class RequestConnectionDataResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.retval = stream.readBoolean();
		this.pvecConnectionsData = stream.readNEXList(SecureConnectionTypes.ConnectionData);
	}

	toJSON() {
		return {
			'%retval%': {
				__typeName: 'Result',
				__typeValue: this.retval
			},
			pvecConnectionsData: {
				__typeName: 'List<ConnectionData>',
				__typeValue: this.pvecConnectionsData
			}
		};
	}
}

class RequestUrlsResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.retval = stream.readBoolean();
		this.plstURLs = stream.readNEXList(NEXTypes.StationURL);
	}

	toJSON() {
		return {
			'%retval%': {
				__typeName: 'boolean',
				__typeValue: this.retval
			},
			plstURLs: {
				__typeName: 'List<StationURL>',
				__typeValue: this.plstURLs
			}
		};
	}
}

class RegisterExResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.retval = stream.readUInt32LE();
		this.pidConnectionID = stream.readUInt32LE();
		this.urlPublic = stream.readNEXStationURL();
	}

	toJSON() {
		return {
			'%retval%': {
				__typeName: 'Result',
				__typeValue: this.retval
			},
			pidConnectionID: {
				__typeName: 'uint32',
				__typeValue: this.pidConnectionID
			},
			urlPublic: {
				__typeName: 'StationURL',
				__typeValue: this.urlPublic
			}
		};
	}
}

class TestConnectivityResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class UpdateURLsResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class ReplaceURLResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class SendReportResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

module.exports = {
	RegisterResponse,
	RequestConnectionDataResponse,
	RequestUrlsResponse,
	RegisterExResponse,
	TestConnectivityResponse,
	UpdateURLsResponse,
	ReplaceURLResponse,
	SendReportResponse
};