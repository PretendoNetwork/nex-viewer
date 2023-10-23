/**
 * @typedef {import('../../stream')} Stream
 */

const RankingTypes = require('../types/ranking');

class UploadScoreRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.scoreData = stream.readNEXStructure(RankingTypes.RankingScoreData);
		this.uniqueId = stream.readUInt64LE();
	}

	toJSON() {
		return {
			scoreData: {
				__typeName: 'RankingScoreData',
				__typeValue: this.scoreData
			},
			uniqueId: {
				__typeName: 'uint64',
				__typeValue: this.uniqueId
			}
		};
	}
}

class DeleteScoreRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.category = stream.readUInt32LE();
		this.uniqueId = stream.readUInt64LE();
	}

	toJSON() {
		return {
			category: {
				__typeName: 'uint32',
				__typeValue: this.category
			},
			uniqueId: {
				__typeName: 'uint64',
				__typeValue: this.uniqueId
			}
		};
	}
}

class DeleteAllScoresRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.uniqueId = stream.readUInt64LE();
	}

	toJSON() {
		return {
			uniqueId: {
				__typeName: 'uint64',
				__typeValue: this.uniqueId
			}
		};
	}
}

class UploadCommonDataRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.commonData = stream.readNEXBuffer();
		this.uniqueId = stream.readUInt64LE();
	}

	toJSON() {
		return {
			commonData: {
				__typeName: 'Buffer',
				__typeValue: this.commonData
			},
			uniqueId: {
				__typeName: 'uint64',
				__typeValue: this.uniqueId
			}
		};
	}
}

class DeleteCommonDataRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.uniqueId = stream.readUInt64LE();
	}

	toJSON() {
		return {
			uniqueId: {
				__typeName: 'uint64',
				__typeValue: this.uniqueId
			}
		};
	}
}

class GetCommonDataRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.uniqueId = stream.readUInt64LE();
	}

	toJSON() {
		return {
			uniqueId: {
				__typeName: 'uint64',
				__typeValue: this.uniqueId
			}
		};
	}
}

class ChangeAttributesRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.category = stream.readUInt32LE();
		this.changeParam = stream.readNEXStructure(RankingTypes.RankingChangeAttributesParam);
		this.uniqueId = stream.readUInt64LE();
	}

	toJSON() {
		return {
			category: {
				__typeName: 'uint32',
				__typeValue: this.category
			},
			changeParam: {
				__typeName: 'RankingChangeAttributesParam',
				__typeValue: this.changeParam
			},
			uniqueId: {
				__typeName: 'uint64',
				__typeValue: this.uniqueId
			}
		};
	}
}

class ChangeAllAttributesRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.changeParam = stream.readNEXStructure(RankingTypes.RankingChangeAttributesParam);
		this.uniqueId = stream.readUInt64LE();
	}

	toJSON() {
		return {
			changeParam: {
				__typeName: 'RankingChangeAttributesParam',
				__typeValue: this.changeParam
			},
			uniqueId: {
				__typeName: 'uint64',
				__typeValue: this.uniqueId
			}
		};
	}
}

class GetRankingRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.rankingMode = stream.readUInt8();
		this.category = stream.readUInt32LE();
		this.orderParam = stream.readNEXStructure(RankingTypes.RankingOrderParam);
		this.uniqueId = stream.readUInt64LE();
		this.principalId = stream.readPID();
	}

	toJSON() {
		return {
			rankingMode: {
				__typeName: 'uint8',
				__typeValue: this.rankingMode
			},
			category: {
				__typeName: 'uint32',
				__typeValue: this.category
			},
			orderParam: {
				__typeName: 'RankingOrderParam',
				__typeValue: this.orderParam
			},
			uniqueId: {
				__typeName: 'uint64',
				__typeValue: this.uniqueId
			},
			principalId: {
				__typeName: 'PID',
				__typeValue: this.principalId
			}
		};
	}
}

class GetApproxOrderRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.category = stream.readUInt32LE();
		this.orderParam = stream.readNEXStructure(RankingTypes.RankingOrderParam);
		this.score = stream.readUInt32LE();
		this.uniqueId = stream.readUInt64LE();
		this.principalId = stream.readPID();
	}

	toJSON() {
		return {
			category: {
				__typeName: 'uint32',
				__typeValue: this.category
			},
			orderParam: {
				__typeName: 'RankingOrderParam',
				__typeValue: this.orderParam
			},
			score: {
				__typeName: 'uint32',
				__typeValue: this.score
			},
			uniqueId: {
				__typeName: 'uint64',
				__typeValue: this.uniqueId
			},
			principalId: {
				__typeName: 'PID',
				__typeValue: this.principalId
			}
		};
	}
}

class GetStatsRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.category = stream.readUInt32LE();
		this.orderParam = stream.readNEXStructure(RankingTypes.RankingOrderParam);
		this.flags = stream.readUInt32LE();
	}

	toJSON() {
		return {
			category: {
				__typeName: 'uint32',
				__typeValue: this.category
			},
			orderParam: {
				__typeName: 'RankingOrderParam',
				__typeValue: this.orderParam
			},
			flags: {
				__typeName: 'uint32',
				__typeValue: this.flags
			}
		};
	}
}

class GetRankingByPIDListRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.principalIdList = stream.readNEXList(stream.readPID);
		this.rankingMode = stream.readUInt8();
		this.category = stream.readUInt32LE();
		this.orderParam = stream.readNEXStructure(RankingTypes.RankingOrderParam);
		this.uniqueId = stream.readUInt64LE();
	}

	toJSON() {
		return {
			principalIdList: {
				__typeName: 'List<PID>',
				__typeValue: this.principalIdList
			},
			rankingMode: {
				__typeName: 'uint8',
				__typeValue: this.rankingMode
			},
			category: {
				__typeName: 'uint32',
				__typeValue: this.category
			},
			orderParam: {
				__typeName: 'RankingOrderParam',
				__typeValue: this.orderParam
			},
			uniqueId: {
				__typeName: 'uint64',
				__typeValue: this.uniqueId
			}
		};
	}
}

class GetRankingByUniqueIdListRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.nexUniqueIdList = stream.readNEXList(stream.readUInt64LE);
		this.rankingMode = stream.readUInt8();
		this.category = stream.readUInt32LE();
		this.orderParam = stream.readNEXStructure(RankingTypes.RankingOrderParam);
		this.uniqueId = stream.readUInt64LE();
	}

	toJSON() {
		return {
			nexUniqueIdList: {
				__typeName: 'List<uint64>',
				__typeValue: this.nexUniqueIdList
			},
			rankingMode: {
				__typeName: 'uint8',
				__typeValue: this.rankingMode
			},
			category: {
				__typeName: 'uint32',
				__typeValue: this.category
			},
			orderParam: {
				__typeName: 'RankingOrderParam',
				__typeValue: this.orderParam
			},
			uniqueId: {
				__typeName: 'uint64',
				__typeValue: this.uniqueId
			}
		};
	}
}

class GetCachedTopXRankingRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.category = stream.readUInt32LE();
		this.orderParam = stream.readNEXStructure(RankingTypes.RankingOrderParam);
	}

	toJSON() {
		return {
			category: {
				__typeName: 'uint32',
				__typeValue: this.category
			},
			orderParam: {
				__typeName: 'RankingOrderParam',
				__typeValue: this.orderParam
			}
		};
	}
}

class GetCachedTopXRankingsRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.categories = stream.readNEXList(stream.readUInt32LE);
		this.orderParams = stream.readNEXList(RankingTypes.RankingOrderParam);
	}

	toJSON() {
		return {
			categories: {
				__typeName: 'List<uint32>',
				__typeValue: this.categories
			},
			orderParams: {
				__typeName: 'List<RankingOrderParam>',
				__typeValue: this.orderParams
			}
		};
	}
}

module.exports = {
	UploadScoreRequest,
	DeleteScoreRequest,
	DeleteAllScoresRequest,
	UploadCommonDataRequest,
	DeleteCommonDataRequest,
	GetCommonDataRequest,
	ChangeAttributesRequest,
	ChangeAllAttributesRequest,
	GetRankingRequest,
	GetApproxOrderRequest,
	GetStatsRequest,
	GetRankingByPIDListRequest,
	GetRankingByUniqueIdListRequest,
	GetCachedTopXRankingRequest,
	GetCachedTopXRankingsRequest
};