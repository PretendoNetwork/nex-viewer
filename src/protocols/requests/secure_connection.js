const Stream = require('../../stream'); // eslint-disable-line no-unused-vars

class RegisterRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.vecMyURLs = stream.readNEXList(stream.readNEXStationURL);
	}

	toJSON() {
		return {
			vecMyURLs: {
				__typeName: 'List<StationURL>',
				__typeValue: this.vecMyURLs
			}
		};
	}
}

class RequestConnectionDataRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.cidTarget = stream.readUInt32LE();
		this.pidTarget = stream.readUInt32LE();
	}

	toJSON() {
		return {
			cidTarget: {
				__typeName: 'uint32',
				__typeValue: this.cidTarget
			},
			pidTarget: {
				__typeName: 'uint32',
				__typeValue: this.pidTarget
			}
		};
	}
}

class RequestUrlsRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.cidTarget = stream.readUInt32LE();
		this.pidTarget = stream.readUInt32LE();
	}

	toJSON() {
		return {
			cidTarget: {
				__typeName: 'uint32',
				__typeValue: this.cidTarget
			},
			pidTarget: {
				__typeName: 'uint32',
				__typeValue: this.pidTarget
			}
		};
	}
}

class RegisterExRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.vecMyURLs = stream.readNEXList(stream.readNEXStationURL);
		this.hCustomData = stream.readNEXAnyDataHolder();
	}

	toJSON() {
		return {
			vecMyURLs: {
				__typeName: 'List<StationURL>',
				__typeValue: this.vecMyURLs
			},
			hCustomData: {
				__typeName: 'AnyDataHolder',
				__typeValue: this.hCustomData
			}
		};
	}
}

class TestConnectivityRequest {
	// * Requests nothing
	toJSON() {
		return {};
	}
}

class UpdateURLsRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.vecMyURLs = stream.readNEXList(stream.readNEXStationURL);
	}

	toJSON() {
		return {
			vecMyURLs: {
				__typeName: 'List<StationURL>',
				__typeValue: this.vecMyURLs
			}
		};
	}
}

class ReplaceURLRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.target = stream.readNEXStationURL();
		this.url = stream.readNEXStationURL();
	}

	toJSON() {
		return {
			target: {
				__typeName: 'StationURL',
				__typeValue: this.target
			},
			url: {
				__typeName: 'StationURL',
				__typeValue: this.url
			}
		};
	}
}

class SendReportRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.reportId = stream.readUInt32LE();
		this.reportData = stream.readNEXQBuffer();
	}

	toJSON() {
		return {
			reportId: {
				__typeName: 'uint32',
				__typeValue: this.reportId
			},
			reportData: {
				__typeName: 'qBuffer',
				__typeValue: this.reportData
			}
		};
	}
}

module.exports = {
	RegisterRequest,
	RequestConnectionDataRequest,
	RequestUrlsRequest,
	RegisterExRequest,
	TestConnectivityRequest,
	UpdateURLsRequest,
	ReplaceURLRequest,
	SendReportRequest
};