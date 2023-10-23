/**
 * @typedef {import('../../stream')} Stream
 */

const RankingTypes = require('../types/ranking');

class UploadScoreResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class DeleteScoreResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class DeleteAllScoresResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class UploadCommonDataResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class DeleteCommonDataResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class GetCommonDataResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.commonData = stream.readNEXBuffer();
	}

	toJSON() {
		return {
			commonData: {
				__typeName: 'Buffer',
				__typeValue: this.commonData
			}
		};
	}
}

class ChangeAttributesResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class ChangeAllAttributesResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class GetRankingResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pResult = stream.readNEXStructure(RankingTypes.RankingResult);
	}

	toJSON() {
		return {
			pResult: {
				__typeName: 'RankingResult',
				__typeValue: this.pResult
			}
		};
	}
}

class GetApproxOrderResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pOrder = stream.readUInt32LE();
	}

	toJSON() {
		return {
			pOrder: {
				__typeName: 'uint32',
				__typeValue: this.pOrder
			}
		};
	}
}

class GetStatsResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pStats = stream.readNEXStructure(RankingTypes.RankingStats);
	}

	toJSON() {
		return {
			pStats: {
				__typeName: 'RankingStats',
				__typeValue: this.pStats
			}
		};
	}
}

class GetRankingByPIDListResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pResult = stream.readNEXStructure(RankingTypes.RankingResult);
	}

	toJSON() {
		return {
			pResult: {
				__typeName: 'RankingResult',
				__typeValue: this.pResult
			}
		};
	}
}

class GetRankingByUniqueIdListResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pResult = stream.readNEXStructure(RankingTypes.RankingResult);
	}

	toJSON() {
		return {
			pResult: {
				__typeName: 'RankingResult',
				__typeValue: this.pResult
			}
		};
	}
}

class GetCachedTopXRankingResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pResult = stream.readNEXStructure(RankingTypes.RankingCachedResult);
	}

	toJSON() {
		return {
			pResult: {
				__typeName: 'RankingCachedResult',
				__typeValue: this.pResult
			}
		};
	}
}

class GetCachedTopXRankingsResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pResults = stream.readNEXList(RankingTypes.RankingCachedResult);
	}

	toJSON() {
		return {
			pResults: {
				__typeName: 'List<RankingCachedResult>',
				__typeValue: this.pResults
			}
		};
	}
}

module.exports = {
	UploadScoreResponse,
	DeleteScoreResponse,
	DeleteAllScoresResponse,
	UploadCommonDataResponse,
	DeleteCommonDataResponse,
	GetCommonDataResponse,
	ChangeAttributesResponse,
	ChangeAllAttributesResponse,
	GetRankingResponse,
	GetApproxOrderResponse,
	GetStatsResponse,
	GetRankingByPIDListResponse,
	GetRankingByUniqueIdListResponse,
	GetCachedTopXRankingResponse,
	GetCachedTopXRankingsResponse
};