const Stream = require('../../stream'); // eslint-disable-line no-unused-vars

const RankingLegacyTypes = require('../types/ranking_legacy');

class UploadCommonDataResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.unknown = stream.readUInt16LE();
	}

	toJSON() {
		return {
			unknown: {
				__typeName: 'uint16',
				__typeValue: this.unknown
			}
		};
	}
}

class UnknownMethod0xEResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.unknown = stream.readUInt16LE();
		this.rankDataList = stream.readNEXList(RankingLegacyTypes.RankingData);
	}

	toJSON() {
		return {
			unknown: {
				__typeName: 'uint16',
				__typeValue: this.unknown
			},
			rankDataList: {
				__typeName: 'List<RankingData>',
				__typeValue: this.rankDataList
			}
		};
	}
}

class UnknownMethod0xFResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.unknown = stream.readUInt16LE();
		this.rankDataList = stream.readNEXList(RankingLegacyTypes.RankingData);
	}

	toJSON() {
		return {
			unknown: {
				__typeName: 'uint16',
				__typeValue: this.unknown
			},
			rankDataList: {
				__typeName: 'List<RankingData>',
				__typeValue: this.rankDataList
			}
		};
	}
}

class UploadScoreWithLimitResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.unknown = stream.readUInt16LE();
	}

	toJSON() {
		return {
			unknown: {
				__typeName: 'uint16',
				__typeValue: this.unknown
			}
		};
	}
}

class UploadSpecificPeriodScoreResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.unknown = stream.readUInt16LE();
	}

	toJSON() {
		return {
			unknown: {
				__typeName: 'uint16',
				__typeValue: this.unknown
			}
		};
	}
}

class GetSpecificPeriodDataListResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.unknown = stream.readUInt16LE();
		this.myScore = stream.readUInt32LE();
		this.rankDataList = stream.readNEXList(RankingLegacyTypes.RankingData);
	}

	toJSON() {
		return {
			unknown: {
				__typeName: 'uint16',
				__typeValue: this.unknown
			},
			myScore: {
				__typeName: 'uint32',
				__typeValue: this.myScore
			},
			rankDataList: {
				__typeName: 'List<RankingData>',
				__typeValue: this.rankDataList
			}
		};
	}
}

class GetSpecificPeriodTotalResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.unknown = stream.readUInt16LE();
		this.totalCount = stream.readUInt32LE();
	}

	toJSON() {
		return {
			unknown: {
				__typeName: 'uint16',
				__typeValue: this.unknown
			},
			totalCount: {
				__typeName: 'uint32',
				__typeValue: this.totalCount
			}
		};
	}
}

module.exports = {
	UploadCommonDataResponse,
	UnknownMethod0xEResponse,
	UnknownMethod0xFResponse,
	UploadScoreWithLimitResponse,
	UploadSpecificPeriodScoreResponse,
	GetSpecificPeriodDataListResponse,
	GetSpecificPeriodTotalResponse
};
