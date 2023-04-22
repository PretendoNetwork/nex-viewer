const Stream = require('../../stream'); // eslint-disable-line no-unused-vars

class AcquireNexUniqueIdRequest {
	// * Requests nothing
	toJSON() {
		return {};
	}
}

class UnknownMethod0x5Request {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.unknown = stream.readUInt8();
		this.pNexUniqueId = stream.readUInt64LE();
	}

	toJSON() {
		return {
			unknown: {
				__typeName: 'uint8',
				__typeValue: this.unknown
			},
			pNexUniqueId: {
				__typeName: 'uint64',
				__typeValue: this.pNexUniqueId
			}
		};
	}
}

module.exports = {
	AcquireNexUniqueIdRequest,
	UnknownMethod0x5Request
};
