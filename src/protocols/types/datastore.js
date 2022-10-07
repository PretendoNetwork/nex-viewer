const Stream = require('../../stream');
const NEXTypes = require('../../types');

// **************************
// * Common DataStore types *
// **************************

class DataStoreKeyValue extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.key = stream.readNEXString();
		this.value = stream.readNEXString();
	}
}

class DataStorePermission extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.permission = stream.readUInt8();
		this.recipientIds = stream.readNEXList(stream.readUInt32LE);
	}
}

class DataStorePrepareGetParamV1 extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt32LE();
		this.lockId = stream.readUInt32LE();
	}
}

class DataStoreRatingInitParamWithSlot extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.slot = stream.readInt8();
		this.param = stream.readNEXStructure(DataStoreRatingInitParam);
	}
}

class DataStoreRatingInitParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.flag = stream.readUInt8();
		this.internalFlag = stream.readUInt8();
		this.lockType = stream.readUInt8();
		this.initialValue = stream.readInt64LE();
		this.rangeMin = stream.readInt32LE();
		this.rangeMax = stream.readInt32LE();
		this.periodHour = stream.readUInt8();
		this.periodDuration = stream.readUInt16LE();
	}
}

class DataStorePersistenceTarget extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.ownerId = stream.readUInt32LE();
		this.persistenceSlotId = stream.readUInt16LE();
	}
}

// *****************************
// * Types specific to methods *
// *****************************

class DataStoreReqGetInfoV1 extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.url = stream.readNEXString();
		this.url = stream.readNEXList(DataStoreKeyValue);
		this.size = stream.readUInt32LE();
		this.rootCaCert = stream.readNEXBuffer();
	}
}

class DataStoreReqGetInfo extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.url = stream.readNEXString();
		this.url = stream.readNEXList(DataStoreKeyValue);
		this.size = stream.readUInt32LE();
		this.rootCaCert = stream.readNEXBuffer();
		this.dataId = stream.readUInt64LE();
	}
}

class DataStorePreparePostParamV1 extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.size = stream.readUInt32LE();
		this.name = stream.readNEXString();
		this.dataType = stream.readUInt16LE();
		this.metaBinary = stream.readNEXQBuffer();
		this.permission = stream.readNEXStructure(DataStorePermission);
		this.delPermission = stream.readNEXStructure(DataStorePermission);
		this.flag = stream.readUInt32LE();
		this.period = stream.readUInt16LE();
		this.referDataId = stream.readUInt32LE();
		this.tags = stream.readNEXList(stream.readNEXString);
		this.ratingInitParams = stream.readNEXList(DataStoreRatingInitParamWithSlot);
	}
}


class DataStoreReqPostInfoV1 extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt32LE();
		this.url = stream.readNEXString();
		this.requestHeaders = stream.readNEXList(DataStoreKeyValue);
		this.formFields = stream.readNEXList(DataStoreKeyValue);
		this.rootCaCert = stream.readNEXBuffer();
	}
}

class DataStoreCompletePostParamV1 extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt32LE();
		this.isSuccess = stream.readBoolean();
	}
}

class DataStoreDeleteParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt64LE();
		this.updatePassword = stream.readUInt64LE();
	}
}

class DataStoreChangeMetaParamV1 extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt64LE();
		this.modifiesFlag = stream.readUInt32LE();
		this.name = stream.readNEXString();
		this.permission = stream.readNEXStructure(DataStorePermission);
		this.delPermission = stream.readNEXStructure(DataStorePermission);
		this.period = stream.readUInt16LE();
		this.metaBinary = stream.readNEXQBuffer();
		this.tags = stream.readNEXList(stream.readNEXString);
		this.updatePassword = stream.readUInt64LE();
	}
}

class DataStoreGetMetaParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt64LE();
		this.persistenceTarget = stream.readNEXStructure(DataStorePersistenceTarget);
		this.resultOption = stream.readUInt8();
		this.accessPassword = stream.readUInt64LE();
	}
}

class DataStoreMetaInfo extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt64LE();
		this.ownerId = stream.readUInt32LE();
		this.size = stream.readUInt32LE();
		this.name = stream.readNEXString();
		this.dataType = stream.readUInt16LE();
		this.metaBinary = stream.readNEXQBuffer();
		this.permission = stream.readNEXStructure(DataStorePermission);
		this.delPermission = stream.readNEXStructure(DataStorePermission);
		this.createdTime = stream.readNEXDateTime();
		this.updatedTime = stream.readNEXDateTime();
		this.period = stream.readUInt16LE();
		this.status = stream.readUInt8();
		this.referredCnt = stream.readUInt32LE();
		this.referDataId = stream.readUInt32LE();
		this.flag = stream.readUInt32LE();
		this.referredTime = stream.readNEXDateTime();
		this.expireTime = stream.readNEXDateTime();
		this.tags = stream.readNEXList(stream.readNEXString);
		this.ratings = stream.readNEXList(DataStoreRatingInfoWithSlot);
	}
}

class DataStoreRatingInfoWithSlot extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.slot = stream.readInt8();
		this.rating = stream.readNEXStructure(DataStoreRatingInfo);
	}
}

class DataStoreRatingInfo extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.totalValue = stream.readInt64LE();
		this.count = stream.readUInt32LE();
		this.initialValue = stream.readInt64LE();
	}
}

class DataStorePrepareUpdateParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.dataId = stream.readInt64LE();
		this.size = stream.readUInt32LE();
		this.updatePassword = stream.readInt64LE();
		this.extraData = stream.readNEXList(stream.readNEXString);
	}
}

class DataStoreReqUpdateInfo extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.version = stream.readUInt32LE();
		this.url = stream.readNEXString();
		this.requestHeaders = stream.readNEXList(DataStoreKeyValue);
		this.formFields = stream.readNEXList(DataStoreKeyValue);
		this.rootCaCert = stream.readNEXBuffer();
	}
}

class DataStoreCompleteUpdateParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt64LE();
		this.version = stream.readUInt32LE();
		this.isSuccess = stream.readBoolean();
	}
}

class DataStoreSearchParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.searchTarget = stream.readUInt8();
		this.ownerIds = stream.readNEXList(stream.readInt32LE);
		this.ownerType = stream.readUInt8();
		this.destinationIds = stream.readNEXList(stream.readInt64LE);
		this.dataType = stream.readUInt16LE();
		this.createdAfter = stream.readNEXDateTime();
		this.createdBefore = stream.readNEXDateTime();
		this.updatedAfter = stream.readNEXDateTime();
		this.updatedBefore = stream.readNEXDateTime();
		this.referDataId = stream.readUInt32LE();
		this.tags = stream.readNEXList(stream.readNEXString);
		this.resultOrderColumn = stream.readUInt8();
		this.resultOrder = stream.readUInt8();
		this.resultRange = stream.readNEXStructure(NEXTypes.ResultRange);
		this.resultOption = stream.readUInt8();
		this.minimalRatingFrequency = stream.readUInt32LE();
		this.useCache = stream.readBoolean();
	}
}

class DataStoreSearchResult extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.totalCount = stream.readUInt32LE();
		this.result = stream.readNEXList(DataStoreMetaInfo);
		this.totalCountType = stream.readUInt8();
	}
}

class DataStoreGetNotificationUrlParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.previousUrl = stream.readNEXString();
	}
}

class DataStoreReqGetNotificationUrlInfo extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.url = stream.readNEXString();
		this.key = stream.readNEXString();
		this.query = stream.readNEXString();
		this.rootCaCert = stream.readNEXBuffer();
	}
}

class DataStoreGetNewArrivedNotificationsParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.lastNotificationId = stream.readUInt64LE();
		this.limit = stream.readUInt16LE();
	}
}

class DataStoreNotificationV1 extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.notificationId = stream.readUInt64LE();
		this.dataId = stream.readUInt32LE();
	}
}

class DataStoreRatingTarget extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt64LE();
		this.slot = stream.readInt8();
	}
}

class DataStoreRateObjectParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.ratingValue = stream.readInt32LE();
		this.accessPassword = stream.readUInt64LE();
	}
}


class DataStoreGetSpecificMetaParamV1 extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.dataIds = stream.readNEXList(stream.readUInt32LE);
	}
}

class DataStoreSpecificMetaInfoV1 extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt32LE();
		this.ownerId = stream.readUInt32LE();
		this.size = stream.readUInt32LE();
		this.dataType = stream.readUInt16LE();
		this.version = stream.readUInt16LE();
	}
}

class DataStoreTouchObjectParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt64LE();
		this.lockId = stream.readUInt32LE();
		this.accessPassword = stream.readUInt64LE();
	}
}

class DataStoreRatingLog extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.isRated = stream.readBoolean();
		this.pid = stream.readUInt32LE();
		this.ratingValue = stream.readInt64LE();
		this.lockExpirationTime = stream.readNEXDateTime();
	}
}

class DataStorePersistenceInfo extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.ownerId = stream.readUInt32LE();
		this.persistenceSlotId = stream.readUInt16LE();
		this.dataId = stream.readUInt64LE();
	}
}

class DataStoreReqGetAdditionalMeta extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.ownerId = stream.readUInt32LE();
		this.dataType = stream.readUInt16LE();
		this.version = stream.readUInt16LE();
		this.metaBinary = stream.readNEXQBuffer();
	}
}

class DataStorePasswordInfo extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt64LE();
		this.accessPassword = stream.readUInt64LE();
		this.updatePassword = stream.readUInt64LE();
	}
}

class DataStorePrepareGetParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt64LE();
		this.lockId = stream.readUInt32LE();
		this.persistenceTarget = stream.readNEXStructure(DataStorePersistenceTarget);
		this.accessPassword = stream.readUInt64LE();
		this.extraData = stream.readNEXList(stream.readNEXString);
	}
}

module.exports = {
	DataStoreKeyValue,
	DataStorePermission,
	DataStorePrepareGetParamV1,
	DataStoreRatingInitParamWithSlot,
	DataStoreRatingInitParam,
	DataStorePersistenceTarget,
	DataStoreReqGetInfoV1,
	DataStoreReqGetInfo,
	DataStorePreparePostParamV1,
	DataStoreReqPostInfoV1,
	DataStoreCompletePostParamV1,
	DataStoreDeleteParam,
	DataStoreChangeMetaParamV1,
	DataStoreGetMetaParam,
	DataStoreMetaInfo,
	DataStoreRatingInfoWithSlot,
	DataStoreRatingInfo,
	DataStorePrepareUpdateParam,
	DataStoreReqUpdateInfo,
	DataStoreCompleteUpdateParam,
	DataStoreSearchParam,
	DataStoreSearchResult,
	DataStoreGetNotificationUrlParam,
	DataStoreReqGetNotificationUrlInfo,
	DataStoreGetNewArrivedNotificationsParam,
	DataStoreNotificationV1,
	DataStoreRatingTarget,
	DataStoreRateObjectParam,
	DataStoreGetSpecificMetaParamV1,
	DataStoreSpecificMetaInfoV1,
	DataStoreTouchObjectParam,
	DataStoreRatingLog,
	DataStorePersistenceInfo,
	DataStoreReqGetAdditionalMeta,
	DataStorePasswordInfo,
	DataStorePrepareGetParam
};