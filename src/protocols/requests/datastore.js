const Stream = require('../../stream'); // eslint-disable-line no-unused-vars
const DataStoreTypes = require('../types/datastore');

class PrepareGetObjectV1Request {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreTypes.DataStorePrepareGetParamV1);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStorePrepareGetParamV1',
				__typeValue: this.param
			}
		};
	}
}

class PreparePostObjectV1Request {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreTypes.DataStorePreparePostParamV1);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStorePreparePostParamV1',
				__typeValue: this.param
			}
		};
	}
}

class CompletePostObjectV1Request {
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

class DeleteObjectRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreTypes.DataStoreDeleteParam);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStoreDeleteParam',
				__typeValue: this.param
			}
		};
	}
}

class DeleteObjectsRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.params = stream.readNEXList(DataStoreTypes.DataStoreDeleteParam);
		this.transactional = stream.readBoolean();
	}

	toJSON() {
		return {
			params: {
				__typeName: 'List<DataStoreDeleteParam>',
				__typeValue: this.params
			},
			transactional: {
				__typeName: 'boolean',
				__typeValue: this.transactional
			}
		};
	}
}

class ChangeMetaV1Request {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreTypes.DataStoreChangeMetaParamV1);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStoreChangeMetaParamV1',
				__typeValue: this.param
			}
		};
	}
}

class ChangeMetasV1Request {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.dataIds = stream.readNEXList(stream.readUInt64LE);
		this.params = stream.readNEXList(DataStoreTypes.DataStoreChangeMetaParamV1);
		this.transactional = stream.readBoolean();
	}

	toJSON() {
		return {
			dataIds: {
				__typeName: 'List<uint64>',
				__typeValue: this.dataIds
			},
			param: {
				__typeName: 'List<DataStoreChangeMetaParamV1>',
				__typeValue: this.param
			},
			transactional: {
				__typeName: 'boolean',
				__typeValue: this.transactional
			}
		};
	}
}

class GetMetaRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreTypes.DataStoreGetMetaParam);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStoreGetMetaParam',
				__typeValue: this.param
			}
		};
	}
}

class GetMetasRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.dataIds = stream.readNEXList(stream.readUInt64LE);
		this.param = stream.readNEXStructure(DataStoreTypes.DataStoreGetMetaParam);
	}

	toJSON() {
		return {
			dataIds: {
				__typeName: 'List<uint64>',
				__typeValue: this.dataIds
			},
			param: {
				__typeName: 'DataStoreGetMetaParam',
				__typeValue: this.param
			}
		};
	}
}

class PrepareUpdateObjectRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreTypes.DataStorePrepareUpdateParam);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStorePrepareUpdateParam',
				__typeValue: this.param
			}
		};
	}
}

class CompleteUpdateObjectRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreTypes.DataStoreCompleteUpdateParam);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStoreCompleteUpdateParam',
				__typeValue: this.param
			}
		};
	}
}

class SearchObjectRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreTypes.DataStoreSearchParam);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStoreSearchParam',
				__typeValue: this.param
			}
		};
	}
}

class GetNotificationUrlRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreTypes.DataStoreGetNotificationUrlParam);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStoreGetNotificationUrlParam',
				__typeValue: this.param
			}
		};
	}
}

class GetNewArrivedNotificationsV1Request {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreTypes.DataStoreGetNewArrivedNotificationsParam);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStoreGetNewArrivedNotificationsParam',
				__typeValue: this.param
			}
		};
	}
}

class RateObjectRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.target = stream.readNEXStructure(DataStoreTypes.DataStoreRatingTarget);
		this.param = stream.readNEXStructure(DataStoreTypes.DataStoreRateObjectParam);
		this.fetchRatings = stream.readBoolean();
	}

	toJSON() {
		return {
			target: {
				__typeName: 'DataStoreRatingTarget',
				__typeValue: this.target
			},
			param: {
				__typeName: 'DataStoreRateObjectParam',
				__typeValue: this.param
			},
			fetchRatings: {
				__typeName: 'boolean',
				__typeValue: this.fetchRatings
			}
		};
	}
}

class GetRatingRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.target = stream.readNEXStructure(DataStoreTypes.DataStoreRatingTarget);
		this.accessPassword = stream.readUInt64LE();
	}

	toJSON() {
		return {
			target: {
				__typeName: 'DataStoreRatingTarget',
				__typeValue: this.target
			},
			accessPassword: {
				__typeName: 'uint64',
				__typeValue: this.accessPassword
			}
		};
	}
}

class GetRatingsRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.dataIds = stream.readNEXList(stream.readUInt64LE);
		this.accessPassword = stream.readUInt64LE();
	}

	toJSON() {
		return {
			dataIds: {
				__typeName: 'List<uint64>',
				__typeValue: this.dataIds
			},
			accessPassword: {
				__typeName: 'uint64',
				__typeValue: this.accessPassword
			}
		};
	}
}

class ResetRatingRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.target = stream.readNEXStructure(DataStoreTypes.DataStoreRatingTarget);
		this.accessPassword = stream.readUInt64LE();
	}

	toJSON() {
		return {
			target: {
				__typeName: 'DataStoreRatingTarget',
				__typeValue: this.target
			},
			accessPassword: {
				__typeName: 'uint64',
				__typeValue: this.accessPassword
			}
		};
	}
}

class ResetRatingsRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.dataIds = stream.readNEXList(stream.readUInt64LE);
		this.transactional = stream.readBoolean();
	}

	toJSON() {
		return {
			dataIds: {
				__typeName: 'List<uint64>',
				__typeValue: this.dataIds
			},
			transactional: {
				__typeName: 'boolean',
				__typeValue: this.transactional
			}
		};
	}
}

class GetSpecificMetaV1Request {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreTypes.DataStoreGetSpecificMetaParamV1);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStoreGetSpecificMetaParamV1',
				__typeValue: this.param
			}
		};
	}
}

class PostMetaBinaryRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreTypes.DataStorePreparePostParam);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStorePreparePostParam',
				__typeValue: this.param
			}
		};
	}
}

class TouchObjectRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreTypes.DataStoreTouchObjectParam);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStoreTouchObjectParam',
				__typeValue: this.param
			}
		};
	}
}

class GetRatingWithLogRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.target = stream.readNEXStructure(DataStoreTypes.DataStoreRatingTarget);
		this.accessPassword = stream.readUInt64LE();
	}

	toJSON() {
		return {
			target: {
				__typeName: 'DataStoreRatingTarget',
				__typeValue: this.target
			},
			accessPassword: {
				__typeName: 'uint64',
				__typeValue: this.accessPassword
			}
		};
	}
}

class PreparePostObjectRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreTypes.DataStorePreparePostParam);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStorePreparePostParam',
				__typeValue: this.param
			}
		};
	}
}

class PrepareGetObjectRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreTypes.DataStorePrepareGetParam);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStorePrepareGetParam',
				__typeValue: this.param
			}
		};
	}
}

class CompletePostObjectRequest {
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

class GetNewArrivedNotificationsRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreTypes.DataStoreGetNewArrivedNotificationsParam);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStoreGetNewArrivedNotificationsParam',
				__typeValue: this.param
			}
		};
	}
}

class GetSpecificMetaRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreTypes.DataStoreGetSpecificMetaParam);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'GetSpecificMetaRequest',
				__typeValue: this.param
			}
		};
	}
}

class GetPersistenceInfoRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.ownerId = stream.readUInt32LE();
		this.persistenceSlotId = stream.readUInt16LE();
	}

	toJSON() {
		return {
			ownerId: {
				__typeName: 'PID',
				__typeValue: this.ownerId
			},
			persistenceSlotId: {
				__typeName: 'uint16',
				__typeValue: this.persistenceSlotId
			}
		};
	}
}

class GetPersistenceInfosRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.ownerId = stream.readUInt32LE();
		this.persistenceSlotIds = stream.readNEXList(stream.readUInt16LE);
	}

	toJSON() {
		return {
			ownerId: {
				__typeName: 'PID',
				__typeValue: this.ownerId
			},
			persistenceSlotIds: {
				__typeName: 'List<uint16>',
				__typeValue: this.persistenceSlotIds
			}
		};
	}
}

class PerpetuateObjectRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.persistenceSlotId = stream.readUInt16LE();
		this.dataId = stream.readUInt64LE();
		this.deleteLastObject = stream.readBoolean();
	}

	toJSON() {
		return {
			persistenceSlotId: {
				__typeName: 'uint16',
				__typeValue: this.persistenceSlotId
			},
			dataId: {
				__typeName: 'uint64',
				__typeValue: this.dataId
			},
			deleteLastObject: {
				__typeName: 'boolean',
				__typeValue: this.deleteLastObject
			}
		};
	}
}

class UnperpetuateObjectRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.persistenceSlotId = stream.readUInt16LE();
		this.deleteLastObject = stream.readBoolean();
	}

	toJSON() {
		return {
			persistenceSlotId: {
				__typeName: 'uint16',
				__typeValue: this.persistenceSlotId
			},
			deleteLastObject: {
				__typeName: 'boolean',
				__typeValue: this.deleteLastObject
			}
		};
	}
}

class PrepareGetObjectOrMetaBinaryRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreTypes.DataStorePrepareGetParam);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStorePrepareGetParam',
				__typeValue: this.param
			}
		};
	}
}

class GetPasswordInfoRequest {
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

class GetPasswordInfosRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.dataIds = stream.readNEXList(stream.readUInt64LE);
	}

	toJSON() {
		return {
			dataId: {
				__typeName: 'List<uint64>',
				__typeValue: this.dataId
			}
		};
	}
}

class GetMetasMultipleParamRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.params = stream.readNEXList(DataStoreTypes.DataStoreGetMetaParam);
	}

	toJSON() {
		return {
			params: {
				__typeName: 'List<DataStoreGetMetaParam>',
				__typeValue: this.params
			}
		};
	}
}

class CompletePostObjectsRequest {
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

class ChangeMetaRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreTypes.DataStoreChangeMetaParam);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStoreChangeMetaParam',
				__typeValue: this.param
			}
		};
	}
}

class ChangeMetasRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.dataIds = stream.readNEXList(stream.readUInt64LE);
		this.params = stream.readNEXList(DataStoreTypes.DataStoreChangeMetaParam);
		this.transactional = stream.readBoolean();
	}

	toJSON() {
		return {
			dataIds: {
				__typeName: 'List<uint64>',
				__typeValue: this.dataIds
			},
			params: {
				__typeName: 'List<DataStoreChangeMetaParam>',
				__typeValue: this.params
			},
			transactional: {
				__typeName: 'boolean',
				__typeValue: this.transactional
			}
		};
	}
}

class RateObjectsRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.targets = stream.readNEXList(DataStoreTypes.DataStoreRatingTarget);
		this.params = stream.readNEXList(DataStoreTypes.DataStoreRateObjectParam);
		this.transactional = stream.readBoolean();
		this.fetchRatings = stream.readBoolean();
	}

	toJSON() {
		return {
			targets: {
				__typeName: 'List<DataStoreRatingTarget>',
				__typeValue: this.targets
			},
			params: {
				__typeName: 'List<DataStoreRateObjectParam>',
				__typeValue: this.params
			},
			transactional: {
				__typeName: 'boolean',
				__typeValue: this.transactional
			},
			fetchRatings: {
				__typeName: 'boolean',
				__typeValue: this.fetchRatings
			}
		};
	}
}

class PostMetaBinaryWithDataIdRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.dataId = stream.readUInt64LE();
		this.param = stream.readNEXStructure(DataStoreTypes.DataStorePreparePostParam);
	}

	toJSON() {
		return {
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

class PostMetaBinariesWithDataIdRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.dataIds = stream.readNEXList(stream.readUInt64LE);
		this.params = stream.readNEXList(DataStoreTypes.DataStorePreparePostParam);
		this.transactional = stream.readBoolean();
	}

	toJSON() {
		return {
			dataIds: {
				__typeName: 'List<uint64>',
				__typeValue: this.dataIds
			},
			params: {
				__typeName: 'List<DataStorePreparePostParam>',
				__typeValue: this.params
			},
			transactional: {
				__typeName: 'boolean',
				__typeValue: this.transactional
			}
		};
	}
}

class RateObjectWithPostingRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.target = stream.readNEXStructure(DataStoreTypes.DataStoreRatingTarget);
		this.rateParam = stream.readNEXStructure(DataStoreTypes.DataStoreRateObjectParam);
		this.postParam = stream.readNEXStructure(DataStoreTypes.DataStorePreparePostParam);
		this.fetchRatings = stream.readBoolean();
	}

	toJSON() {
		return {
			target: {
				__typeName: 'DataStoreRatingTarget',
				__typeValue: this.target
			},
			rateParam: {
				__typeName: 'DataStoreRateObjectParam',
				__typeValue: this.rateParam
			},
			postParam: {
				__typeName: 'DataStorePreparePostParam',
				__typeValue: this.postParam
			},
			fetchRatings: {
				__typeName: 'boolean',
				__typeValue: this.fetchRatings
			}
		};
	}
}

class RateObjectsWithPostingRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.targets = stream.readNEXList(DataStoreTypes.DataStoreRatingTarget);
		this.rateParams = stream.readNEXList(DataStoreTypes.DataStoreRateObjectParam);
		this.postParams = stream.readNEXList(DataStoreTypes.DataStorePreparePostParam);
		this.transactional = stream.readBoolean();
		this.fetchRatings = stream.readBoolean();
	}

	toJSON() {
		return {
			targets: {
				__typeName: 'List<DataStoreRatingTarget>',
				__typeValue: this.targets
			},
			rateParams: {
				__typeName: 'List<DataStoreRateObjectParam>',
				__typeValue: this.rateParams
			},
			postParams: {
				__typeName: 'List<DataStorePreparePostParam>',
				__typeValue: this.postParams
			},
			transactional: {
				__typeName: 'boolean',
				__typeValue: this.transactional
			},
			fetchRatings: {
				__typeName: 'boolean',
				__typeValue: this.fetchRatings
			}
		};
	}
}

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

class SearchObjectLightRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreTypes.DataStoreSearchParam);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStoreSearchParam',
				__typeValue: this.param
			}
		};
	}
}

module.exports = {
	PrepareGetObjectV1Request,
	PreparePostObjectV1Request,
	CompletePostObjectV1Request,
	DeleteObjectRequest,
	DeleteObjectsRequest,
	ChangeMetaV1Request,
	ChangeMetasV1Request,
	GetMetaRequest,
	GetMetasRequest,
	PrepareUpdateObjectRequest,
	CompleteUpdateObjectRequest,
	SearchObjectRequest,
	GetNotificationUrlRequest,
	GetNewArrivedNotificationsV1Request,
	RateObjectRequest,
	GetRatingRequest,
	GetRatingsRequest,
	ResetRatingRequest,
	ResetRatingsRequest,
	GetSpecificMetaV1Request,
	PostMetaBinaryRequest,
	TouchObjectRequest,
	GetRatingWithLogRequest,
	PreparePostObjectRequest,
	PrepareGetObjectRequest,
	CompletePostObjectRequest,
	GetNewArrivedNotificationsRequest,
	GetSpecificMetaRequest,
	GetPersistenceInfoRequest,
	GetPersistenceInfosRequest,
	PerpetuateObjectRequest,
	UnperpetuateObjectRequest,
	PrepareGetObjectOrMetaBinaryRequest,
	GetPasswordInfoRequest,
	GetPasswordInfosRequest,
	GetMetasMultipleParamRequest,
	CompletePostObjectsRequest,
	ChangeMetaRequest,
	ChangeMetasRequest,
	RateObjectsRequest,
	PostMetaBinaryWithDataIdRequest,
	PostMetaBinariesWithDataIdRequest,
	RateObjectWithPostingRequest,
	RateObjectsWithPostingRequest,
	GetObjectInfosRequest,
	SearchObjectLightRequest,
};