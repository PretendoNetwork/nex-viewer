const Stream = require('../../stream'); // eslint-disable-line no-unused-vars
const DataStoreTypes = require('../types/datastore');

class PrepareGetObjectV1Response {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pReqGetInfo = stream.readNEXStructure(DataStoreTypes.DataStoreReqGetInfoV1);
	}

	toJSON() {
		return {
			pReqGetInfo: {
				__typeName: 'DataStoreReqGetInfoV1',
				__typeValue: this.pReqGetInfo
			}
		};
	}
}

class PreparePostObjectV1Response {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pReqPostInfo = stream.readNEXStructure(DataStoreTypes.DataStoreReqPostInfoV1);
	}

	toJSON() {
		return {
			pReqPostInfo: {
				__typeName: 'DataStoreReqPostInfoV1',
				__typeValue: this.pReqPostInfo
			}
		};
	}
}

class CompletePostObjectV1Response {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class DeleteObjectResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class DeleteObjectsResponse {
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

class ChangeMetaV1Response {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class ChangeMetasV1Response {
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

class GetMetaResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pMetaInfo = stream.readNEXStructure(DataStoreTypes.DataStoreMetaInfo);
	}

	toJSON() {
		return {
			pMetaInfo: {
				__typeName: 'DataStoreMetaInfo',
				__typeValue: this.pMetaInfo
			}
		};
	}
}

class GetMetasResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pMetaInfo = stream.readNEXList(DataStoreTypes.DataStoreMetaInfo);
		this.pResults = stream.readNEXList(stream.readNEXResult);
	}

	toJSON() {
		return {
			pMetaInfo: {
				__typeName: 'List<DataStoreMetaInfo>',
				__typeValue: this.pMetaInfo
			},
			pResults: {
				__typeName: 'List<Result>',
				__typeValue: this.pResults
			}
		};
	}
}

class PrepareUpdateObjectResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pReqUpdateInfo = stream.readNEXStructure(DataStoreTypes.DataStoreReqUpdateInfo);
	}

	toJSON() {
		return {
			pReqUpdateInfo: {
				__typeName: 'DataStoreReqUpdateInfo',
				__typeValue: this.pReqUpdateInfo
			}
		};
	}
}

class CompleteUpdateObjectResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class SearchObjectResponse {
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

class GetNotificationUrlResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.info = stream.readNEXStructure(DataStoreTypes.DataStoreReqGetNotificationUrlInfo);
	}

	toJSON() {
		return {
			info: {
				__typeName: 'DataStoreReqGetNotificationUrlInfo',
				__typeValue: this.info
			}
		};
	}
}

class GetNewArrivedNotificationsV1Response {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pResult = stream.readNEXStructure(DataStoreTypes.DataStoreNotificationV1);
		this.pHasNext = stream.readBoolean();
	}

	toJSON() {
		return {
			pResult: {
				__typeName: 'List<DataStoreNotificationV1>',
				__typeValue: this.pResult
			},
			pHasNext: {
				__typeName: 'boolean',
				__typeValue: this.pHasNext
			}
		};
	}
}

class RateObjectResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pRating = stream.readNEXStructure(DataStoreTypes.DataStoreRatingInfo);
	}

	toJSON() {
		return {
			pRating: {
				__typeName: 'DataStoreRatingInfo',
				__typeValue: this.pRating
			}
		};
	}
}

class GetRatingResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pRating = stream.readNEXStructure(DataStoreTypes.DataStoreRatingInfo);
	}

	toJSON() {
		return {
			pRating: {
				__typeName: 'DataStoreRatingInfo',
				__typeValue: this.pRating
			}
		};
	}
}

class GetRatingsResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pRatings = stream.readNEXList(() => stream.readNEXList(DataStoreTypes.DataStoreRatingInfoWithSlot)); // * 2D List
		this.pResults = stream.readNEXList(stream.readNEXResult);
	}

	toJSON() {
		return {
			pRatings: {
				__typeName: 'List<List<DataStoreRatingInfoWithSlot>>',
				__typeValue: this.pRatings
			},
			pResults: {
				__typeName: 'List<Result>',
				__typeValue: this.pResults
			}
		};
	}
}

class ResetRatingResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class ResetRatingsResponse {
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

class GetSpecificMetaV1Response {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pMetaInfos = stream.readNEXList(DataStoreTypes.DataStoreSpecificMetaInfoV1);
	}

	toJSON() {
		return {
			pMetaInfos: {
				__typeName: 'List<DataStoreSpecificMetaInfoV1>',
				__typeValue: this.pMetaInfos
			}
		};
	}
}

class PostMetaBinaryResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.dataId = stream.readUInt64LE();
	}

	toJSON() {
		return {
			dataId: {
				__typeName: 'uint64',
				__typeValue: this.dataId
			}
		};
	}
}

class TouchObjectResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class GetRatingWithLogResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pRating = stream.readNEXStructure(DataStoreTypes.DataStoreRatingInfo);
		this.pRatingLog = stream.readNEXStructure(DataStoreTypes.DataStoreRatingInfo);
	}

	toJSON() {
		return {
			pRating: {
				__typeName: 'DataStoreRatingInfo',
				__typeValue: this.pRating
			},
			pRatingLog: {
				__typeName: 'DataStoreRatingInfo',
				__typeValue: this.pRatingLog
			}
		};
	}
}

class PreparePostObjectResponse {
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

class PrepareGetObjectResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pReqGetInfo = stream.readNEXStructure(DataStoreTypes.DataStoreReqGetInfo);
	}

	toJSON() {
		return {
			pReqGetInfo: {
				__typeName: 'DataStoreReqGetInfo',
				__typeValue: this.pReqGetInfo
			}
		};
	}
}

class CompletePostObjectResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class GetNewArrivedNotificationsResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pResult = stream.readNEXStructure(DataStoreTypes.DataStoreNotification);
		this.pHasNext = stream.readBoolean();
	}

	toJSON() {
		return {
			pResult: {
				__typeName: 'List<DataStoreNotification>',
				__typeValue: this.pResult
			},
			pHasNext: {
				__typeName: 'boolean',
				__typeValue: this.pHasNext
			}
		};
	}
}

class GetSpecificMetaResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pMetaInfos = stream.readNEXList(DataStoreTypes.DataStoreSpecificMetaInfo);
	}

	toJSON() {
		return {
			pMetaInfos: {
				__typeName: 'List<DataStoreSpecificMetaInfo>',
				__typeValue: this.pMetaInfos
			}
		};
	}
}

class GetPersistenceInfoResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pPersistenceInfo = stream.readNEXStructure(DataStoreTypes.DataStorePersistenceInfo);
	}

	toJSON() {
		return {
			pPersistenceInfo: {
				__typeName: 'DataStorePersistenceInfo',
				__typeValue: this.pPersistenceInfo
			}
		};
	}
}

class GetPersistenceInfosResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pPersistenceInfo = stream.readNEXList(DataStoreTypes.DataStorePersistenceInfo);
		this.pResults = stream.readNEXList(stream.readNEXResult);
	}

	toJSON() {
		return {
			pPersistenceInfo: {
				__typeName: 'List<DataStorePersistenceInfo>',
				__typeValue: this.pPersistenceInfo
			},
			pResults: {
				__typeName: 'List<Result>',
				__typeValue: this.pResults
			}
		};
	}
}

class PerpetuateObjectResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class UnperpetuateObjectResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class PrepareGetObjectOrMetaBinaryResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pReqGetInfo = stream.readNEXStructure(DataStoreTypes.DataStoreReqGetInfo);
		this.pReqGetAdditionalMeta = stream.readNEXStructure(DataStoreTypes.DataStoreReqGetAdditionalMeta);
	}

	toJSON() {
		return {
			pReqGetInfo: {
				__typeName: 'DataStoreReqGetInfo',
				__typeValue: this.pReqGetInfo
			},
			pReqGetAdditionalMeta: {
				__typeName: 'DataStoreReqGetAdditionalMeta',
				__typeValue: this.pReqGetAdditionalMeta
			}
		};
	}
}

class GetPasswordInfoResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pPasswordInfo = stream.readNEXStructure(DataStoreTypes.DataStorePasswordInfo);
	}

	toJSON() {
		return {
			pPasswordInfo: {
				__typeName: 'DataStorePasswordInfo',
				__typeValue: this.pPasswordInfo
			}
		};
	}
}

class GetPasswordInfosResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pPasswordInfos = stream.readNEXList(DataStoreTypes.DataStorePasswordInfo);
		this.pResults = stream.readNEXList(stream.readNEXResult);
	}

	toJSON() {
		return {
			pPasswordInfos: {
				__typeName: 'List<DataStorePasswordInfo>',
				__typeValue: this.pPasswordInfos
			},
			pResults: {
				__typeName: 'List<Result>',
				__typeValue: this.pResults
			}
		};
	}
}

class GetMetasMultipleParamResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pMetaInfo = stream.readNEXList(DataStoreTypes.DataStoreMetaInfo);
		this.pResults = stream.readNEXList(stream.readNEXResult);
	}

	toJSON() {
		return {
			pMetaInfo: {
				__typeName: 'List<DataStoreMetaInfo>',
				__typeValue: this.pMetaInfo
			},
			pResults: {
				__typeName: 'List<Result>',
				__typeValue: this.pResults
			}
		};
	}
}

class CompletePostObjectsResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class ChangeMetaResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class ChangeMetasResponse {
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

class RateObjectsResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pRatings = stream.readNEXList(DataStoreTypes.DataStoreRatingInfo);
		this.pResults = stream.readNEXList(stream.readNEXResult);
	}

	toJSON() {
		return {
			pRatings: {
				__typeName: 'List<DataStoreRatingInfo>',
				__typeValue: this.pRatings
			},
			pResults: {
				__typeName: 'List<Result>',
				__typeValue: this.pResults
			}
		};
	}
}

class PostMetaBinaryWithDataIdResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class PostMetaBinariesWithDataIdResponse {
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

class RateObjectWithPostingResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pRating = stream.readNEXStructure(DataStoreTypes.DataStoreRatingInfo);
	}

	toJSON() {
		return {
			pRating: {
				__typeName: 'DataStoreRatingInfo',
				__typeValue: this.pRating
			}
		};
	}
}

class RateObjectsWithPostingResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pRatings = stream.readNEXList(DataStoreTypes.DataStoreRatingInfo);
		this.pResults = stream.readNEXList(stream.readNEXResult);
	}

	toJSON() {
		return {
			pRatings: {
				__typeName: 'List<DataStoreRatingInfo>',
				__typeValue: this.pRatings
			},
			pResults: {
				__typeName: 'List<Result>',
				__typeValue: this.pResults
			}
		};
	}
}

class GetObjectInfosResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pInfos = stream.readNEXList(DataStoreTypes.DataStoreReqGetInfo);
		this.pResults = stream.readNEXList(stream.readNEXResult);
	}

	toJSON() {
		return {
			pInfos: {
				__typeName: 'List<DataStoreReqGetInfo>',
				__typeValue: this.pInfos
			},
			pResults: {
				__typeName: 'List<Result>',
				__typeValue: this.pResults
			}
		};
	}
}

class SearchObjectLightResponse {
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

module.exports = {
	PrepareGetObjectV1Response,
	PreparePostObjectV1Response,
	CompletePostObjectV1Response,
	DeleteObjectResponse,
	DeleteObjectsResponse,
	ChangeMetaV1Response,
	ChangeMetasV1Response,
	GetMetaResponse,
	GetMetasResponse,
	PrepareUpdateObjectResponse,
	CompleteUpdateObjectResponse,
	SearchObjectResponse,
	GetNotificationUrlResponse,
	GetNewArrivedNotificationsV1Response,
	RateObjectResponse,
	GetRatingResponse,
	GetRatingsResponse,
	ResetRatingResponse,
	ResetRatingsResponse,
	GetSpecificMetaV1Response,
	PostMetaBinaryResponse,
	TouchObjectResponse,
	GetRatingWithLogResponse,
	PreparePostObjectResponse,
	PrepareGetObjectResponse,
	CompletePostObjectResponse,
	GetNewArrivedNotificationsResponse,
	GetSpecificMetaResponse,
	GetPersistenceInfoResponse,
	GetPersistenceInfosResponse,
	PerpetuateObjectResponse,
	UnperpetuateObjectResponse,
	PrepareGetObjectOrMetaBinaryResponse,
	GetPasswordInfoResponse,
	GetPasswordInfosResponse,
	GetMetasMultipleParamResponse,
	CompletePostObjectsResponse,
	ChangeMetaResponse,
	ChangeMetasResponse,
	RateObjectsResponse,
	PostMetaBinaryWithDataIdResponse,
	PostMetaBinariesWithDataIdResponse,
	RateObjectWithPostingResponse,
	RateObjectsWithPostingResponse,
	GetObjectInfosResponse,
	SearchObjectLightResponse
};