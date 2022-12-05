const Stream = require('../../stream');

const DataStoreTypes = require('../types/datastore');
const DataStoreSMMTypes = require('../types/datastore_smm');

class GetObjectInfosResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pInfos = stream.readNEXList(DataStoreSMMTypes.DataStoreFileServerObjectInfo);
	}

	toJSON() {
		return {
			pInfos: {
				__typeName: 'List<DataStoreFileServerObjectInfo>',
				__typeValue: this.pInfos
			}
		};
	}
}

class GetMetaByOwnerIdResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pMetaInfo = stream.readNEXList(DataStoreTypes.DataStoreMetaInfo);
		this.pHasNext = stream.readBoolean();
	}

	toJSON() {
		return {
			pMetaInfo: {
				__typeName: 'List<DataStoreMetaInfo>',
				__typeValue: this.pMetaInfo
			},
			pHasNext: {
				__typeName: 'boolean',
				__typeValue: this.pHasNext
			}
		};
	}
}

class CustomSearchObjectResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pSearchResult = stream.readNEXStructure(DataStoreTypes.DataStoreSearchResult);
	}

	toJSON() {
		return {
			pSearchResult: {
				__typeName: 'DataStoreSearchResult',
				__typeValue: this.pSearchResult
			}
		};
	}
}

class RateCustomRankingResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class GetCustomRankingResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pRankingResult = stream.readNEXList(DataStoreSMMTypes.DataStoreCustomRankingResult);
		this.pResults = stream.readNEXList(stream.readNEXResult);
	}

	toJSON() {
		return {
			pRankingResult: {
				__typeName: 'List<DataStoreCustomRankingResult>',
				__typeValue: this.pRankingResult
			},
			pResults: {
				__typeName: 'List<Result>',
				__typeValue: this.pResults
			}
		};
	}
}

class GetCustomRankingByDataIdResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pRankingResult = stream.readNEXList(DataStoreSMMTypes.DataStoreCustomRankingResult);
		this.pResults = stream.readNEXList(stream.readNEXResult);
	}

	toJSON() {
		return {
			pRankingResult: {
				__typeName: 'List<DataStoreCustomRankingResult>',
				__typeValue: this.pRankingResult
			},
			pResults: {
				__typeName: 'List<Result>',
				__typeValue: this.pResults
			}
		};
	}
}

class DeleteCustomRankingResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class AddToBufferQueueResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class AddToBufferQueuesResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pResults = stream.readNEXList(stream.readNEXResult);
	}

	toJSON() {
		return {
			pResults: {
				__typeName: 'List<Result>',
				__typeValue: this.pResults
			}
		};
	}
}

class GetBufferQueueResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pBufferQueue = stream.readNEXList(stream.readNEXQBuffer);
	}

	toJSON() {
		return {
			pBufferQueue: {
				__typeName: 'List<qBuffer>',
				__typeValue: this.pBufferQueue
			}
		};
	}
}

class GetBufferQueuesResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pBufferQueueLst = stream.readNEXList(() => stream.readNEXList(stream.readNEXQBuffer)), // * 2D List;
		this.pResults = stream.readNEXList(stream.readNEXResult);
	}

	toJSON() {
		return {
			pBufferQueueLst: {
				__typeName: 'List<List<qBuffer>>',
				__typeValue: this.pBufferQueue
			},
			pResults: {
				__typeName: 'List<Result>',
				__typeValue: this.pResults
			}
		};
	}
}

class ClearBufferQueuesResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pResults = stream.readNEXList(stream.readNEXResult);
	}

	toJSON() {
		return {
			pResults: {
				__typeName: 'List<Result>',
				__typeValue: this.pResults
			}
		};
	}
}

class CompleteAttachFileResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pUrl = stream.readNEXString();
	}

	toJSON() {
		return {
			pUrl: {
				__typeName: 'String',
				__typeValue: this.pUrl
			}
		};
	}
}

class CompleteAttachFileV1Response {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pUrl = stream.readNEXString();
	}

	toJSON() {
		return {
			pUrl: {
				__typeName: 'String',
				__typeValue: this.pUrl
			}
		};
	}
}

class PrepareAttachFileResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pReqPostInfo = stream.readNEXStructure(DataStoreTypes.DataStoreReqPostInfo);
	}

	toJSON() {
		return {
			pReqPostInfo: {
				__typeName: 'DataStoreReqPostInfo',
				__typeValue: this.pReqPostInfo
			}
		};
	}
}

class ConditionalSearchObjectResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pRankingResults = stream.readNEXList(DataStoreSMMTypes.DataStoreCustomRankingResult);
	}

	toJSON() {
		return {
			pRankingResults: {
				__typeName: 'List<DataStoreCustomRankingResult>',
				__typeValue: this.pRankingResults
			}
		};
	}
}

class GetApplicationConfigResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.config = stream.readNEXList(stream.readInt32LE);
	}

	toJSON() {
		return {
			config: {
				__typeName: 'List<sint32>',
				__typeValue: this.config
			}
		};
	}
}

class SetApplicationConfigResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class DeleteApplicationConfigResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class LatestCourseSearchObjectResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pRankingResults = stream.readNEXList(DataStoreSMMTypes.DataStoreCustomRankingResult);
	}

	toJSON() {
		return {
			pRankingResults: {
				__typeName: 'List<DataStoreCustomRankingResult>',
				__typeValue: this.pRankingResults
			}
		};
	}
}

class FollowingsLatestCourseSearchObjectResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pRankingResults = stream.readNEXList(DataStoreSMMTypes.DataStoreCustomRankingResult);
	}

	toJSON() {
		return {
			pRankingResults: {
				__typeName: 'List<DataStoreCustomRankingResult>',
				__typeValue: this.pRankingResults
			}
		};
	}
}

class RecommendedCourseSearchObjectResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pRankingResults = stream.readNEXList(DataStoreSMMTypes.DataStoreCustomRankingResult);
	}

	toJSON() {
		return {
			pRankingResults: {
				__typeName: 'List<DataStoreCustomRankingResult>',
				__typeValue: this.pRankingResults
			}
		};
	}
}

class ScoreRangeCascadedSearchObjectResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pRankingResults = stream.readNEXList(DataStoreSMMTypes.DataStoreCustomRankingResult);
	}

	toJSON() {
		return {
			pRankingResults: {
				__typeName: 'List<DataStoreCustomRankingResult>',
				__typeValue: this.pRankingResults
			}
		};
	}
}

class SuggestedCourseSearchObjectResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pRankingResults = stream.readNEXList(DataStoreSMMTypes.DataStoreCustomRankingResult);
	}

	toJSON() {
		return {
			pRankingResults: {
				__typeName: 'List<DataStoreCustomRankingResult>',
				__typeValue: this.pRankingResults
			}
		};
	}
}

class PreparePostObjectWithOwnerIdAndDataIdResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pReqPostInfo = stream.readNEXStructure(DataStoreTypes.DataStoreReqPostInfo);
	}

	toJSON() {
		return {
			pReqPostInfo: {
				__typeName: 'DataStoreReqPostInfo',
				__typeValue: this.pReqPostInfo
			}
		};
	}
}

class CompletePostObjectWithOwnerIdResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class UploadCourseRecordResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class GetCourseRecordResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.result = stream.readNEXStructure(DataStoreSMMTypes.DataStoreGetCourseRecordResult);
	}

	toJSON() {
		return {
			result: {
				__typeName: 'DataStoreGetCourseRecordResult',
				__typeValue: this.result
			}
		};
	}
}

class DeleteCourseRecordResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class GetApplicationConfigStringResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.config = stream.readNEXList(stream.readNEXString);
	}

	toJSON() {
		return {
			config: {
				__typeName: 'List<String>',
				__typeValue: this.config
			}
		};
	}
}

class SetApplicationConfigStringResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class GetDeletionReasonResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pDeletionReasons = stream.readNEXList(stream.readUInt32LE);
	}

	toJSON() {
		return {
			pDeletionReasons: {
				__typeName: 'List<uint32>',
				__typeValue: this.pDeletionReasons
			}
		};
	}
}

class SetDeletionReasonResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class GetMetasWithCourseRecordResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pMetaInfo = stream.readNEXList(DataStoreTypes.DataStoreMetaInfo);
		this.pCourseResults = stream.readNEXList(DataStoreSMMTypes.DataStoreGetCourseRecordResult);
		this.pResults = stream.readNEXList(stream.readNEXResult);
	}

	toJSON() {
		return {
			pMetaInfo: {
				__typeName: 'List<DataStoreMetaInfo>',
				__typeValue: this.pMetaInfo
			},
			pCourseResults: {
				__typeName: 'List<DataStoreGetCourseRecordResult>',
				__typeValue: this.pCourseResults
			},
			pResults: {
				__typeName: 'List<Result>',
				__typeValue: this.pResults
			}
		};
	}
}

class CheckRateCustomRankingCounterResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.isBelowThreshold = stream.readBoolean();
	}

	toJSON() {
		return {
			isBelowThreshold: {
				__typeName: 'boolean',
				__typeValue: this.isBelowThreshold
			}
		};
	}
}

class ResetRateCustomRankingCounterResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class BestScoreRateCourseSearchObjectResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pRankingResults = stream.readNEXList(DataStoreSMMTypes.DataStoreCustomRankingResult);
	}

	toJSON() {
		return {
			pRankingResults: {
				__typeName: 'List<DataStoreCustomRankingResult>',
				__typeValue: this.pRankingResults
			}
		};
	}
}

class CTRPickUpCourseSearchObjectResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pRankingResults = stream.readNEXList(DataStoreSMMTypes.DataStoreCustomRankingResult);
	}

	toJSON() {
		return {
			pRankingResults: {
				__typeName: 'List<DataStoreCustomRankingResult>',
				__typeValue: this.pRankingResults
			}
		};
	}
}

class SetCachedRankingResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class DeleteCachedRankingResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class ChangePlayablePlatformResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class SearchUnknownPlatformObjectsResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		// ! This function has an response request format
		this.unknown = stream.readRest();
	}

	toJSON() {
		return {
			unknown: {
				__typeName: 'unknown',
				__typeValue: this.unknown
			}
		};
	}
}

class ReportCourseResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

module.exports = {
	GetObjectInfosResponse,
	GetMetaByOwnerIdResponse,
	CustomSearchObjectResponse,
	RateCustomRankingResponse,
	GetCustomRankingResponse,
	GetCustomRankingByDataIdResponse,
	DeleteCustomRankingResponse,
	AddToBufferQueueResponse,
	AddToBufferQueuesResponse,
	GetBufferQueueResponse,
	GetBufferQueuesResponse,
	ClearBufferQueuesResponse,
	CompleteAttachFileResponse,
	CompleteAttachFileV1Response,
	PrepareAttachFileResponse,
	ConditionalSearchObjectResponse,
	GetApplicationConfigResponse,
	SetApplicationConfigResponse,
	DeleteApplicationConfigResponse,
	LatestCourseSearchObjectResponse,
	FollowingsLatestCourseSearchObjectResponse,
	RecommendedCourseSearchObjectResponse,
	ScoreRangeCascadedSearchObjectResponse,
	SuggestedCourseSearchObjectResponse,
	PreparePostObjectWithOwnerIdAndDataIdResponse,
	CompletePostObjectWithOwnerIdResponse,
	UploadCourseRecordResponse,
	GetCourseRecordResponse,
	DeleteCourseRecordResponse,
	GetApplicationConfigStringResponse,
	SetApplicationConfigStringResponse,
	GetDeletionReasonResponse,
	SetDeletionReasonResponse,
	GetMetasWithCourseRecordResponse,
	CheckRateCustomRankingCounterResponse,
	ResetRateCustomRankingCounterResponse,
	BestScoreRateCourseSearchObjectResponse,
	CTRPickUpCourseSearchObjectResponse,
	SetCachedRankingResponse,
	DeleteCachedRankingResponse,
	ChangePlayablePlatformResponse,
	SearchUnknownPlatformObjectsResponse,
	ReportCourseResponse
};