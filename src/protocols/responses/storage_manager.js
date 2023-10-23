/**
 * @typedef {import('../../stream')} Stream
 */

class AcquireCardIdResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.cardId = stream.readUInt64LE();
	}

	toJSON() {
		return {
			cardId: {
				__typeName: 'uint64',
				__typeValue: this.cardId
			}
		};
	}
}

class ActivateWithCardIdResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.uniqueId = stream.readUInt32LE();
		this.firstTime = stream.readBoolean();
	}

	toJSON() {
		return {
			uniqueId: {
				__typeName: 'uint32',
				__typeValue: this.uniqueId
			},
			firstTime: {
				__typeName: 'boolean',
				__typeValue: this.firstTime
			}
		};
	}
}

module.exports = {
	AcquireCardIdResponse,
	ActivateWithCardIdResponse
};
