const Stream = require('../../stream'); // eslint-disable-line no-unused-vars

class AcquireCardIdRequest {
	// * Requests nothing
	toJSON() {
		return {};
	}
}

class ActivateWithCardIdRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.unknown = stream.readUInt8();
		this.cardId = stream.readUInt64LE();
	}

	toJSON() {
		return {
			unknown: {
				__typeName: 'uint8',
				__typeValue: this.unknown
			},
			cardId: {
				__typeName: 'uint64',
				__typeValue: this.cardId
			}
		};
	}
}

module.exports = {
	AcquireCardIdRequest,
	ActivateWithCardIdRequest
};
