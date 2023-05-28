const Stream = require('../../stream'); // eslint-disable-line no-unused-vars

class UploadCommunityRankingDataRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.unknownId = stream.readUInt32LE();
		this.rankingData = stream.readNEXBuffer();
	}

	toJSON() {
		return {
			unknownId: {
				__typeName: 'uint32',
				__typeValue: this.unknownId
			},
			rankingData: {
				__typeName: 'Buffer',
				__typeValue: this.rankingData
			}
		};
	}
}

class UploadCommunityScoreRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.unknownId = stream.readUInt32LE();
		this.gatheringId = stream.readUInt32LE();
		this.score = stream.readUInt32LE();
		this.unknown1 = stream.readUInt8();
		this.unknown2 = stream.readUInt32LE();
		this.unknown3 = stream.readUInt16LE();
	}

	toJSON() {
		return {
			unknownId: {
				__typeName: 'uint32',
				__typeValue: this.unknownId
			},
			gatheringId: {
				__typeName: 'uint32',
				__typeValue: this.gatheringId
			},
			score: {
				__typeName: 'uint32',
				__typeValue: this.score
			},
			unknown1: {
				__typeName: 'uint8',
				__typeValue: this.unknown1
			},
			unknown2: {
				__typeName: 'uint32',
				__typeValue: this.unknown2
			},
			unknown3: {
				__typeName: 'uint16',
				__typeValue: this.unknown3
			}
		};
	}
}

class GetCommunityRankingRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.unknownId = stream.readUInt32LE();
		this.gatheringId = stream.readUInt32LE();
		this.unknown1 = stream.readUInt8();
		this.unknown2 = stream.readUInt8();
		this.unknown3 = stream.readUInt8();
		this.unknown4 = stream.readUInt32LE();
		this.length = stream.readUInt8();
	}

	toJSON() {
		return {
			unknownId: {
				__typeName: 'uint32',
				__typeValue: this.unknownId
			},
			gatheringId: {
				__typeName: 'uint32',
				__typeValue: this.gatheringId
			},
			unknown1: {
				__typeName: 'uint8',
				__typeValue: this.unknown1
			},
			unknown2: {
				__typeName: 'uint8',
				__typeValue: this.unknown2
			},
			unknown3: {
				__typeName: 'uint8',
				__typeValue: this.unknown3
			},
			unknown4: {
				__typeName: 'uint32',
				__typeValue: this.unknown4
			},
			length: {
				__typeName: 'uint8',
				__typeValue: this.length
			}
		};
	}
}

class GetCommunityInfoRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.gatheringId = stream.readUInt32LE();
	}

	toJSON() {
		return {
			gatheringId: {
				__typeName: 'uint32',
				__typeValue: this.gatheringId
			}
		};
	}
}

module.exports = {
	UploadCommunityRankingDataRequest,
	UploadCommunityScoreRequest,
	GetCommunityRankingRequest,
	GetCommunityInfoRequest
};
