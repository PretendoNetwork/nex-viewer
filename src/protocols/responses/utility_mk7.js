const Stream = require('../../stream'); // eslint-disable-line no-unused-vars

class AcquireNexUniqueIdResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pNexUniqueId = stream.readUInt64LE();
	}

	toJSON() {
		return {
			pNexUniqueId: {
				__typeName: 'uint64',
				__typeValue: this.pNexUniqueId
			}
		};
	}
}

class UnknownMethod0x5Response {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.unknownId = stream.readUInt32LE();
		this.unknown = stream.readUInt8();
	}

	toJSON() {
		return {
			unknownId: {
				__typeName: 'uint32',
				__typeValue: this.unknownId
			},
			unknown: {
				__typeName: 'uint8',
				__typeValue: this.unknown
			}
		};
	}
}

module.exports = {
	AcquireNexUniqueIdResponse,
	UnknownMethod0x5Response
};
