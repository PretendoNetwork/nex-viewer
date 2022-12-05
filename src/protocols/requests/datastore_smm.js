const Stream = require('../../stream');

const DataStoreTypes = require('../types/datastore');
const DataStoreSMMTypes = require('../types/datastore_smm');

class GetObjectInfosRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.dataIds = stream.readNEXList(stream.readUInt64LE);
	}

	toJSON() {
		return {
			dataIds: {
				__typeName: 'List<uint64>',
				__typeValue: this.dataIds
			}
		};
	}
}

class GetMetaByOwnerIdRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreSMMTypes.DataStoreGetMetaByOwnerIdParam);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStoreGetMetaByOwnerIdParam',
				__typeValue: this.param
			}
		};
	}
}

class CustomSearchObjectRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.condition = stream.readUInt32LE();
		this.param = stream.readNEXStructure(DataStoreTypes.DataStoreSearchParam);
	}

	toJSON() {
		return {
			condition: {
				__typeName: 'uint32',
				__typeValue: this.condition
			},
			param: {
				__typeName: 'DataStoreSearchParam',
				__typeValue: this.param
			}
		};
	}
}

class RateCustomRankingRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.params = stream.readNEXList(DataStoreSMMTypes.DataStoreRateCustomRankingParam);
	}

	toJSON() {
		return {
			params: {
				__typeName: 'List<DataStoreRateCustomRankingParam>',
				__typeValue: this.params
			}
		};
	}
}

class GetCustomRankingRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreSMMTypes.DataStoreGetCustomRankingParam);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStoreGetCustomRankingParam',
				__typeValue: this.param
			}
		};
	}
}

class GetCustomRankingByDataIdRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreSMMTypes.DataStoreGetCustomRankingByDataIdParam);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStoreGetCustomRankingByDataIdParam',
				__typeValue: this.param
			}
		};
	}
}

class DeleteCustomRankingRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.dataIdList = stream.readNEXList(stream.readUInt64LE);
	}

	toJSON() {
		return {
			dataIdList: {
				__typeName: 'List<uint64>',
				__typeValue: this.dataIdList
			}
		};
	}
}

class AddToBufferQueueRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreSMMTypes.BufferQueueParam);
		this.buffer = stream.readNEXQBuffer();
	}

	toJSON() {
		return {
			param: {
				__typeName: 'BufferQueueParam',
				__typeValue: this.param
			},
			buffer: {
				__typeName: 'qBuffer',
				__typeValue: this.buffer
			}
		};
	}
}

class AddToBufferQueuesRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.params = stream.readNEXList(DataStoreSMMTypes.BufferQueueParam);
		this.buffers = stream.readNEXList(stream.readNEXQBuffer);
	}

	toJSON() {
		return {
			params: {
				__typeName: 'List<BufferQueueParam>',
				__typeValue: this.params
			},
			buffers: {
				__typeName: 'List<qBuffer>',
				__typeValue: this.buffers
			}
		};
	}
}

class GetBufferQueueRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreSMMTypes.BufferQueueParam);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'BufferQueueParam',
				__typeValue: this.param
			}
		};
	}
}

class GetBufferQueuesRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.params = stream.readNEXList(DataStoreSMMTypes.BufferQueueParam);
	}

	toJSON() {
		return {
			params: {
				__typeName: 'List<BufferQueueParam>',
				__typeValue: this.params
			}
		};
	}
}

class ClearBufferQueuesRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.params = stream.readNEXList(DataStoreSMMTypes.BufferQueueParam);
	}

	toJSON() {
		return {
			params: {
				__typeName: 'List<BufferQueueParam>',
				__typeValue: this.params
			}
		};
	}
}

class CompleteAttachFileRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreTypes.DataStoreCompletePostParam);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStoreCompletePostParam',
				__typeValue: this.param
			}
		};
	}
}

class CompleteAttachFileV1Request {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreTypes.DataStoreCompletePostParamV1);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStoreCompletePostParamV1',
				__typeValue: this.param
			}
		};
	}
}

class PrepareAttachFileRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreSMMTypes.DataStoreAttachFileParam);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStoreAttachFileParam',
				__typeValue: this.param
			}
		};
	}
}

class ConditionalSearchObjectRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.condition = stream.readUInt32LE();
		this.param = stream.readNEXStructure(DataStoreTypes.DataStoreSearchParam);
		this.extraData = stream.readNEXList(stream.readNEXString);
	}

	toJSON() {
		return {
			condition: {
				__typeName: 'uint32',
				__typeValue: this.condition
			},
			param: {
				__typeName: 'DataStoreSearchParam',
				__typeValue: this.param
			},
			extraData: {
				__typeName: 'List<String>',
				__typeValue: this.extraData
			}
		};
	}
}

class GetApplicationConfigRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.applicationId = stream.readUInt32LE();
	}

	toJSON() {
		return {
			applicationId: {
				__typeName: 'uint32',
				__typeValue: this.applicationId
			}
		};
	}
}

class SetApplicationConfigRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.applicationId = stream.readUInt32LE();
		this.key = stream.readUInt32LE();
		this.value = stream.readInt32LE();
	}

	toJSON() {
		return {
			applicationId: {
				__typeName: 'uint32',
				__typeValue: this.applicationId
			},
			key: {
				__typeName: 'uint32',
				__typeValue: this.key
			},
			value: {
				__typeName: 'sint32',
				__typeValue: this.value
			}
		};
	}
}

class DeleteApplicationConfigRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.applicationId = stream.readUInt32LE();
		this.key = stream.readUInt32LE();
	}

	toJSON() {
		return {
			applicationId: {
				__typeName: 'uint32',
				__typeValue: this.applicationId
			},
			key: {
				__typeName: 'uint32',
				__typeValue: this.key
			}
		};
	}
}

class LatestCourseSearchObjectRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreTypes.DataStoreSearchParam);
		this.extraData = stream.readNEXList(stream.readNEXString);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStoreSearchParam',
				__typeValue: this.param
			},
			extraData: {
				__typeName: 'List<String>',
				__typeValue: this.extraData
			}
		};
	}
}

class FollowingsLatestCourseSearchObjectRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreTypes.DataStoreSearchParam);
		this.extraData = stream.readNEXList(stream.readNEXString);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStoreSearchParam',
				__typeValue: this.param
			},
			extraData: {
				__typeName: 'List<String>',
				__typeValue: this.extraData
			}
		};
	}
}

class RecommendedCourseSearchObjectRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreTypes.DataStoreSearchParam);
		this.extraData = stream.readNEXList(stream.readNEXString);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStoreSearchParam',
				__typeValue: this.param
			},
			extraData: {
				__typeName: 'List<String>',
				__typeValue: this.extraData
			}
		};
	}
}

class ScoreRangeCascadedSearchObjectRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreTypes.DataStoreSearchParam);
		this.extraData = stream.readNEXList(stream.readNEXString);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStoreSearchParam',
				__typeValue: this.param
			},
			extraData: {
				__typeName: 'List<String>',
				__typeValue: this.extraData
			}
		};
	}
}

class SuggestedCourseSearchObjectRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreTypes.DataStoreSearchParam);
		this.extraData = stream.readNEXList(stream.readNEXString);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStoreSearchParam',
				__typeValue: this.param
			},
			extraData: {
				__typeName: 'List<String>',
				__typeValue: this.extraData
			}
		};
	}
}

class PreparePostObjectWithOwnerIdAndDataIdRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.ownerId = stream.readUInt32LE();
		this.dataId = stream.readUInt64LE();
		this.param = stream.readNEXStructure(DataStoreTypes.DataStorePreparePostParam);
	}

	toJSON() {
		return {
			ownerId: {
				__typeName: 'uint32',
				__typeValue: this.ownerId
			},
			dataId: {
				__typeName: 'uint64',
				__typeValue: this.dataId
			},
			param: {
				__typeName: 'DataStorePreparePostParam',
				__typeValue: this.param
			}
		};
	}
}

class CompletePostObjectWithOwnerIdRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.ownerId = stream.readUInt32LE();
		this.param = stream.readNEXStructure(DataStoreTypes.DataStoreCompletePostParam);
	}

	toJSON() {
		return {
			ownerId: {
				__typeName: 'uint32',
				__typeValue: this.ownerId
			},
			param: {
				__typeName: 'DataStoreCompletePostParam',
				__typeValue: this.param
			}
		};
	}
}

class UploadCourseRecordRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreSMMTypes.DataStoreUploadCourseRecordParam);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStoreUploadCourseRecordParam',
				__typeValue: this.param
			}
		};
	}
}

class GetCourseRecordRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreSMMTypes.DataStoreGetCourseRecordParam);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStoreGetCourseRecordParam',
				__typeValue: this.param
			}
		};
	}
}

class DeleteCourseRecordRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreSMMTypes.DataStoreGetCourseRecordParam);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStoreGetCourseRecordParam',
				__typeValue: this.param
			}
		};
	}
}

class GetApplicationConfigStringRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.applicationId = stream.readUInt32LE();
	}

	toJSON() {
		return {
			applicationId: {
				__typeName: 'uint32',
				__typeValue: this.applicationId
			}
		};
	}
}

class SetApplicationConfigStringRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.applicationId = stream.readUInt32LE();
		this.key = stream.readUInt32LE();
		this.value = stream.readNEXString();
	}

	toJSON() {
		return {
			applicationId: {
				__typeName: 'uint32',
				__typeValue: this.applicationId
			},
			key: {
				__typeName: 'uint32',
				__typeValue: this.key
			},
			value: {
				__typeName: 'String',
				__typeValue: this.value
			}
		};
	}
}

class GetDeletionReasonRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.dataIdLst = stream.readNEXList(stream.readUInt64LE);
	}

	toJSON() {
		return {
			dataIdLst: {
				__typeName: 'List<uint64>',
				__typeValue: this.dataIdLst
			}
		};
	}
}

class SetDeletionReasonRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.dataIdLst = stream.readNEXList(stream.readUInt64LE);
		this.deletionReason = stream.readUInt32LE();
	}

	toJSON() {
		return {
			dataIdLst: {
				__typeName: 'List<uint64>',
				__typeValue: this.dataIdLst
			},
			deletionReason: {
				__typeName: 'uint32',
				__typeValue: this.deletionReason
			}
		};
	}
}

class GetMetasWithCourseRecordRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.params = stream.readNEXList(DataStoreSMMTypes.DataStoreGetCourseRecordParam);
		this.metaParam = stream.readNEXStructure(DataStoreTypes.DataStoreGetMetaParam);
	}

	toJSON() {
		return {
			params: {
				__typeName: 'List<DataStoreGetCourseRecordParam>',
				__typeValue: this.params
			},
			metaParam: {
				__typeName: 'DataStoreGetMetaParam',
				__typeValue: this.metaParam
			}
		};
	}
}

class CheckRateCustomRankingCounterRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.applicationId = stream.readUInt32LE();
	}

	toJSON() {
		return {
			applicationId: {
				__typeName: 'uint32',
				__typeValue: this.applicationId
			}
		};
	}
}

class ResetRateCustomRankingCounterRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.applicationId = stream.readUInt32LE();
	}

	toJSON() {
		return {
			applicationId: {
				__typeName: 'uint32',
				__typeValue: this.applicationId
			}
		};
	}
}

class BestScoreRateCourseSearchObjectRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreTypes.DataStoreSearchParam);
		this.extraData = stream.readNEXList(stream.readNEXString);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStoreSearchParam',
				__typeValue: this.param
			},
			extraData: {
				__typeName: 'List<String>',
				__typeValue: this.extraData
			}
		};
	}
}

class CTRPickUpCourseSearchObjectRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreTypes.DataStoreSearchParam);
		this.extraData = stream.readNEXList(stream.readNEXString);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStoreSearchParam',
				__typeValue: this.param
			},
			extraData: {
				__typeName: 'List<String>',
				__typeValue: this.extraData
			}
		};
	}
}

class SetCachedRankingRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.rankingType = stream.readNEXString();
		this.rankingArgs = stream.readNEXList(stream.readNEXString);
		this.dataIdLst = stream.readNEXList(stream.readUInt64LE);
	}

	toJSON() {
		return {
			rankingType: {
				__typeName: 'String',
				__typeValue: this.rankingType
			},
			rankingArgs: {
				__typeName: 'List<String>',
				__typeValue: this.rankingArgs
			},
			dataIdLst: {
				__typeName: 'List<uint64>',
				__typeValue: this.dataIdLst
			}
		};
	}
}

class DeleteCachedRankingRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.rankingType = stream.readNEXString();
		this.rankingArgs = stream.readNEXList(stream.readNEXString);
	}

	toJSON() {
		return {
			rankingType: {
				__typeName: 'String',
				__typeValue: this.rankingType
			},
			rankingArgs: {
				__typeName: 'List<String>',
				__typeValue: this.rankingArgs
			}
		};
	}
}

class ChangePlayablePlatformRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.params = stream.readNEXList(DataStoreSMMTypes.DataStoreChangePlayablePlatformParam);
	}

	toJSON() {
		return {
			params: {
				__typeName: 'List<DataStoreChangePlayablePlatformParam>',
				__typeValue: this.params
			}
		};
	}
}

class SearchUnknownPlatformObjectsRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		// ! This function has an unknown request format
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

class ReportCourseRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreSMMTypes.DataStoreReportCourseParam);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStoreReportCourseParam',
				__typeValue: this.param
			}
		};
	}
}

module.exports = {
	GetObjectInfosRequest,
	GetMetaByOwnerIdRequest,
	CustomSearchObjectRequest,
	RateCustomRankingRequest,
	GetCustomRankingRequest,
	GetCustomRankingByDataIdRequest,
	DeleteCustomRankingRequest,
	AddToBufferQueueRequest,
	AddToBufferQueuesRequest,
	GetBufferQueueRequest,
	GetBufferQueuesRequest,
	ClearBufferQueuesRequest,
	CompleteAttachFileRequest,
	CompleteAttachFileV1Request,
	PrepareAttachFileRequest,
	ConditionalSearchObjectRequest,
	GetApplicationConfigRequest,
	SetApplicationConfigRequest,
	DeleteApplicationConfigRequest,
	LatestCourseSearchObjectRequest,
	FollowingsLatestCourseSearchObjectRequest,
	RecommendedCourseSearchObjectRequest,
	ScoreRangeCascadedSearchObjectRequest,
	SuggestedCourseSearchObjectRequest,
	PreparePostObjectWithOwnerIdAndDataIdRequest,
	CompletePostObjectWithOwnerIdRequest,
	UploadCourseRecordRequest,
	GetCourseRecordRequest,
	DeleteCourseRecordRequest,
	GetApplicationConfigStringRequest,
	SetApplicationConfigStringRequest,
	GetDeletionReasonRequest,
	SetDeletionReasonRequest,
	GetMetasWithCourseRecordRequest,
	CheckRateCustomRankingCounterRequest,
	ResetRateCustomRankingCounterRequest,
	BestScoreRateCourseSearchObjectRequest,
	CTRPickUpCourseSearchObjectRequest,
	SetCachedRankingRequest,
	DeleteCachedRankingRequest,
	ChangePlayablePlatformRequest,
	SearchUnknownPlatformObjectsRequest,
	ReportCourseRequest
};