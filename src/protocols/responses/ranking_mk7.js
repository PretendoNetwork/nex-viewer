const Stream = require('../../stream'); // eslint-disable-line no-unused-vars

const RankingMK7Types = require('../types/ranking_mk7');

class UploadCommunityRankingDataResponse {
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

class UploadCommunityScoreResponse {
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

class GetCommunityRankingResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.unknown = stream.readUInt16LE();
		this.myScore = stream.readUInt32LE();
		this.rankDataList = stream.readNEXList(RankingMK7Types.CommunityRankData);
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
				__typeName: 'List<CommunityRankData>',
				__typeValue: this.rankDataList
			}
		};
	}
}

class GetCommunityInfoResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.unknown = stream.readUInt16LE();
		this.playerCount = stream.readUInt32LE();
	}

	toJSON() {
		return {
			unknown: {
				__typeName: 'uint16',
				__typeValue: this.unknown
			},
			playerCount: {
				__typeName: 'uint32',
				__typeValue: this.playerCount
			}
		};
	}
}

module.exports = {
	UploadCommunityRankingDataResponse,
	UploadCommunityScoreResponse,
	GetCommunityRankingResponse,
	GetCommunityInfoResponse
};
