const Stream = require('../../stream'); // eslint-disable-line no-unused-vars
const NEXTypes = require('../../types');

// **************************
// * Common DataStore types *
// **************************

class DataStoreKeyValue extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.key = stream.readNEXString();
		this.value = stream.readNEXString();
	}

	toJSON() {
		return {
			key: {
				__typeName: 'String',
				__typeValue: this.key
			},
			value: {
				__typeName: 'String',
				__typeValue: this.value
			}
		};
	}
}

class DataStorePermission extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.permission = stream.readUInt8();
		this.recipientIds = stream.readNEXList(stream.readPID);
	}

	toJSON() {
		return {
			permission: {
				__typeName: 'uint8',
				__typeValue: this.permission
			},
			recipientIds: {
				__typeName: 'List<PID>',
				__typeValue: this.recipientIds
			}
		};
	}
}

class DataStorePrepareGetParamV1 extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt32LE();
		this.lockId = stream.readUInt32LE();
	}

	toJSON() {
		return {
			dataId: {
				__typeName: 'uint32',
				__typeValue: this.dataId
			},
			lockId: {
				__typeName: 'uint32',
				__typeValue: this.lockId
			}
		};
	}
}

class DataStoreRatingInitParamWithSlot extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.slot = stream.readInt8();
		this.param = stream.readNEXStructure(DataStoreRatingInitParam);
	}

	toJSON() {
		return {
			slot: {
				__typeName: 'sint8',
				__typeValue: this.slot
			},
			param: {
				__typeName: 'DataStoreRatingInitParam',
				__typeValue: this.param
			}
		};
	}
}

class DataStoreRatingInitParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
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

	toJSON() {
		return {
			flag: {
				__typeName: 'uint8',
				__typeValue: this.flag
			},
			internalFlag: {
				__typeName: 'uint8',
				__typeValue: this.internalFlag
			},
			lockType: {
				__typeName: 'uint8',
				__typeValue: this.lockType
			},
			initialValue: {
				__typeName: 'sint64',
				__typeValue: this.initialValue
			},
			rangeMin: {
				__typeName: 'sint32',
				__typeValue: this.rangeMin
			},
			rangeMax: {
				__typeName: 'sint32',
				__typeValue: this.rangeMax
			},
			periodHour: {
				__typeName: 'sint8',
				__typeValue: this.periodHour
			},
			periodDuration: {
				__typeName: 'sint16',
				__typeValue: this.periodDuration
			}
		};
	}
}

class DataStorePersistenceTarget extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.ownerId = stream.readPID();
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

// *****************************
// * Types specific to methods *
// *****************************

class DataStoreReqGetInfoV1 extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.url = stream.readNEXString();
		this.requestHeaders = stream.readNEXList(DataStoreKeyValue);
		this.size = stream.readUInt32LE();
		this.rootCaCert = stream.readNEXBuffer();
	}

	toJSON() {
		return {
			url: {
				__typeName: 'String',
				__typeValue: this.url
			},
			requestHeaders: {
				__typeName: 'List<DataStoreKeyValue>',
				__typeValue: this.requestHeaders
			},
			size: {
				__typeName: 'uint32',
				__typeValue: this.size
			},
			rootCaCert: {
				__typeName: 'Buffer',
				__typeValue: this.rootCaCert
			}
		};
	}
}

class DataStoreReqGetInfo extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.url = stream.readNEXString();
		this.requestHeaders = stream.readNEXList(DataStoreKeyValue);
		this.size = stream.readUInt32LE();
		this.rootCaCert = stream.readNEXBuffer();
		this.dataId = stream.readUInt64LE();
	}

	toJSON() {
		return {
			url: {
				__typeName: 'String',
				__typeValue: this.url
			},
			requestHeaders: {
				__typeName: 'List<DataStoreKeyValue>',
				__typeValue: this.requestHeaders
			},
			size: {
				__typeName: 'uint32',
				__typeValue: this.size
			},
			rootCaCert: {
				__typeName: 'Buffer',
				__typeValue: this.rootCaCert
			},
			dataId: {
				__typeName: 'uint64',
				__typeValue: this.dataId
			}
		};
	}
}

class DataStorePreparePostParamV1 extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
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

	toJSON() {
		return {
			size: {
				__typeName: 'uint32',
				__typeValue: this.size
			},
			name: {
				__typeName: 'String',
				__typeValue: this.name
			},
			dataType: {
				__typeName: 'uint16',
				__typeValue: this.dataType
			},
			metaBinary: {
				__typeName: 'qBuffer',
				__typeValue: this.metaBinary
			},
			permission: {
				__typeName: 'DataStorePermission',
				__typeValue: this.permission
			},
			delPermission: {
				__typeName: 'DataStorePermission',
				__typeValue: this.delPermission
			},
			flag: {
				__typeName: 'uint32',
				__typeValue: this.flag
			},
			period: {
				__typeName: 'uint16',
				__typeValue: this.period
			},
			referDataId: {
				__typeName: 'uint32',
				__typeValue: this.referDataId
			},
			tags: {
				__typeName: 'List<String>',
				__typeValue: this.tags
			},
			ratingInitParams: {
				__typeName: 'List<DataStoreRatingInitParamWithSlot>',
				__typeValue: this.ratingInitParams
			}
		};
	}
}


class DataStoreReqPostInfoV1 extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt32LE();
		this.url = stream.readNEXString();
		this.requestHeaders = stream.readNEXList(DataStoreKeyValue);
		this.formFields = stream.readNEXList(DataStoreKeyValue);
		this.rootCaCert = stream.readNEXBuffer();
	}

	toJSON() {
		return {
			dataId: {
				__typeName: 'uint32',
				__typeValue: this.dataId
			},
			url: {
				__typeName: 'String',
				__typeValue: this.url
			},
			requestHeaders: {
				__typeName: 'List<DataStoreKeyValue>',
				__typeValue: this.requestHeaders
			},
			formFields: {
				__typeName: 'List<DataStoreKeyValue>',
				__typeValue: this.formFields
			},
			rootCaCert: {
				__typeName: 'Buffer',
				__typeValue: this.rootCaCert
			}
		};
	}
}

class DataStoreCompletePostParamV1 extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt32LE();
		this.isSuccess = stream.readBoolean();
	}

	toJSON() {
		return {
			dataId: {
				__typeName: 'uint32',
				__typeValue: this.dataId
			},
			isSuccess: {
				__typeName: 'boolean',
				__typeValue: this.isSuccess
			}
		};
	}
}

class DataStoreDeleteParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt64LE();
		this.updatePassword = stream.readUInt64LE();
	}

	toJSON() {
		return {
			dataId: {
				__typeName: 'uint32',
				__typeValue: this.dataId
			},
			updatePassword: {
				__typeName: 'uint64',
				__typeValue: this.updatePassword
			}
		};
	}
}

class DataStoreChangeMetaParamV1 extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
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

	toJSON() {
		return {
			dataId: {
				__typeName: 'uint64',
				__typeValue: this.dataId
			},
			modifiesFlag: {
				__typeName: 'uint32',
				__typeValue: this.modifiesFlag
			},
			name: {
				__typeName: 'String',
				__typeValue: this.name
			},
			permission: {
				__typeName: 'DataStorePermission',
				__typeValue: this.permission
			},
			delPermission: {
				__typeName: 'DataStorePermission',
				__typeValue: this.delPermission
			},
			period: {
				__typeName: 'uint16',
				__typeValue: this.period
			},
			metaBinary: {
				__typeName: 'qBuffer',
				__typeValue: this.metaBinary
			},
			tags: {
				__typeName: 'List<String>',
				__typeValue: this.tags
			},
			updatePassword: {
				__typeName: 'uint64',
				__typeValue: this.updatePassword
			}
		};
	}
}

class DataStoreChangeMetaParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		let nexVersion;
		if (stream.connection.title.nex_datastore_version) {
			nexVersion = stream.connection.title.nex_datastore_version;
		} else {
			nexVersion = stream.connection.title.nex_version;
		}

		this.dataId = stream.readUInt64LE();
		this.modifiesFlag = stream.readUInt32LE();
		this.name = stream.readNEXString();
		this.permission = stream.readNEXStructure(DataStorePermission);
		this.delPermission = stream.readNEXStructure(DataStorePermission);
		this.period = stream.readUInt16LE();
		this.metaBinary = stream.readNEXQBuffer();
		this.tags = stream.readNEXList(stream.readNEXString);
		this.updatePassword = stream.readUInt64LE();
		this.referredCnt = stream.readUInt32LE();
		this.dataType = stream.readUInt16LE();
		this.status = stream.readUInt8();
		this.compareParam = stream.readNEXStructure(DataStoreChangeMetaCompareParam);

		if (nexVersion.major >= 4) {
			// TODO - Verify this, seems to be true?
			this.persistenceTarget = stream.readNEXStructure(DataStorePersistenceTarget);
		}
	}

	toJSON() {
		const data = {
			dataId: {
				__typeName: 'uint64',
				__typeValue: this.dataId
			},
			modifiesFlag: {
				__typeName: 'uint32',
				__typeValue: this.modifiesFlag
			},
			name: {
				__typeName: 'String',
				__typeValue: this.name
			},
			permission: {
				__typeName: 'DataStorePermission',
				__typeValue: this.permission
			},
			delPermission: {
				__typeName: 'DataStorePermission',
				__typeValue: this.delPermission
			},
			period: {
				__typeName: 'uint16',
				__typeValue: this.period
			},
			metaBinary: {
				__typeName: 'qBuffer',
				__typeValue: this.metaBinary
			},
			tags: {
				__typeName: 'List<String>',
				__typeValue: this.tags
			},
			updatePassword: {
				__typeName: 'uint64',
				__typeValue: this.updatePassword
			},
			referredCnt: {
				__typeName: 'uint32',
				__typeValue: this.referredCnt
			},
			dataType: {
				__typeName: 'uint16',
				__typeValue: this.dataType
			},
			status: {
				__typeName: 'uint8',
				__typeValue: this.status
			},
			compareParam: {
				__typeName: 'DataStoreChangeMetaCompareParam',
				__typeValue: this.compareParam
			}
		};

		if (this.persistenceTarget !== undefined) {
			// * If NEX 4.x.x (?)
			data.persistenceTarget = {
				__typeName: 'DataStorePersistenceTarget',
				__typeValue: this.persistenceTarget
			};
		}

		return data;
	}
}

class DataStoreGetMetaParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt64LE();
		this.persistenceTarget = stream.readNEXStructure(DataStorePersistenceTarget);
		this.resultOption = stream.readUInt8();
		this.accessPassword = stream.readUInt64LE();
	}

	toJSON() {
		return {
			dataId: {
				__typeName: 'uint64',
				__typeValue: this.dataId
			},
			persistenceTarget: {
				__typeName: 'DataStorePersistenceTarget',
				__typeValue: this.persistenceTarget
			},
			resultOption: {
				__typeName: 'uint8',
				__typeValue: this.resultOption
			},
			accessPassword: {
				__typeName: 'uint64',
				__typeValue: this.accessPassword
			}
		};
	}
}

class DataStoreMetaInfo extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt64LE();
		this.ownerId = stream.readPID();
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

	toJSON() {
		return {
			dataId: {
				__typeName: 'uint64',
				__typeValue: this.dataId
			},
			ownerId: {
				__typeName: 'PID',
				__typeValue: this.ownerId
			},
			size: {
				__typeName: 'uint32',
				__typeValue: this.size
			},
			name: {
				__typeName: 'String',
				__typeValue: this.name
			},
			dataType: {
				__typeName: 'uint16',
				__typeValue: this.dataType
			},
			metaBinary: {
				__typeName: 'qBuffer',
				__typeValue: this.metaBinary
			},
			permission: {
				__typeName: 'DataStorePermission',
				__typeValue: this.permission
			},
			delPermission: {
				__typeName: 'DataStorePermission',
				__typeValue: this.delPermission
			},
			createdTime: {
				__typeName: 'DateTime',
				__typeValue: this.createdTime
			},
			updatedTime: {
				__typeName: 'DateTime',
				__typeValue: this.updatedTime
			},
			period: {
				__typeName: 'uint16',
				__typeValue: this.period
			},
			status: {
				__typeName: 'uint8',
				__typeValue: this.status
			},
			referredCnt: {
				__typeName: 'uint32',
				__typeValue: this.referredCnt
			},
			referDataId: {
				__typeName: 'uint32',
				__typeValue: this.referDataId
			},
			flag: {
				__typeName: 'uint32',
				__typeValue: this.flag
			},
			referredTime: {
				__typeName: 'DateTime',
				__typeValue: this.referredTime
			},
			expireTime: {
				__typeName: 'DateTime',
				__typeValue: this.expireTime
			},
			tags: {
				__typeName: 'List<String>',
				__typeValue: this.tags
			},
			ratings: {
				__typeName: 'List<DataStoreRatingInfoWithSlot>',
				__typeValue: this.ratings
			}
		};
	}
}

class DataStoreRatingInfoWithSlot extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.slot = stream.readInt8();
		this.rating = stream.readNEXStructure(DataStoreRatingInfo);
	}

	toJSON() {
		return {
			slot: {
				__typeName: 'sint8',
				__typeValue: this.slot
			},
			rating: {
				__typeName: 'DataStoreRatingInfo',
				__typeValue: this.rating
			}
		};
	}
}

class DataStoreRatingInfo extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.totalValue = stream.readInt64LE();
		this.count = stream.readUInt32LE();
		this.initialValue = stream.readInt64LE();
	}

	toJSON() {
		return {
			totalValue: {
				__typeName: 'sint64',
				__typeValue: this.totalValue
			},
			count: {
				__typeName: 'uint32',
				__typeValue: this.count
			},
			initialValue: {
				__typeName: 'sint64',
				__typeValue: this.initialValue
			}
		};
	}
}

class DataStorePrepareUpdateParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.dataId = stream.readInt64LE();
		this.size = stream.readUInt32LE();
		this.updatePassword = stream.readInt64LE();
		this.extraData = stream.readNEXList(stream.readNEXString);
	}

	toJSON() {
		return {
			dataId: {
				__typeName: 'uint64',
				__typeValue: this.dataId
			},
			size: {
				__typeName: 'uint32',
				__typeValue: this.size
			},
			updatePassword: {
				__typeName: 'uint64',
				__typeValue: this.updatePassword
			},
			extraData: {
				__typeName: 'List<String>',
				__typeValue: this.extraData
			}
		};
	}
}

class DataStoreReqUpdateInfo extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.version = stream.readUInt32LE();
		this.url = stream.readNEXString();
		this.requestHeaders = stream.readNEXList(DataStoreKeyValue);
		this.formFields = stream.readNEXList(DataStoreKeyValue);
		this.rootCaCert = stream.readNEXBuffer();
	}

	toJSON() {
		return {
			version: {
				__typeName: 'uint32',
				__typeValue: this.version
			},
			url: {
				__typeName: 'String',
				__typeValue: this.url
			},
			requestHeaders: {
				__typeName: 'List<DataStoreKeyValue>',
				__typeValue: this.requestHeaders
			},
			formFields: {
				__typeName: 'List<DataStoreKeyValue>',
				__typeValue: this.formFields
			},
			rootCaCert: {
				__typeName: 'Buffer',
				__typeValue: this.rootCaCert
			}
		};
	}
}

class DataStoreCompleteUpdateParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt64LE();
		this.version = stream.readUInt32LE();
		this.isSuccess = stream.readBoolean();
	}

	toJSON() {
		return {
			dataId: {
				__typeName: 'uint64',
				__typeValue: this.dataId
			},
			version: {
				__typeName: 'uint32',
				__typeValue: this.version
			},
			isSuccess: {
				__typeName: 'boolean',
				__typeValue: this.isSuccess
			}
		};
	}
}

class DataStoreSearchParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.searchTarget = stream.readUInt8();
		this.ownerIds = stream.readNEXList(stream.readPID);
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

	toJSON() {
		return {
			searchTarget: {
				__typeName: 'uint8',
				__typeValue: this.searchTarget
			},
			ownerIds: {
				__typeName: 'List<PID>',
				__typeValue: this.ownerIds
			},
			ownerType: {
				__typeName: 'uint8',
				__typeValue: this.ownerType
			},
			destinationIds: {
				__typeName: 'List<uint64>',
				__typeValue: this.destinationIds
			},
			dataType: {
				__typeName: 'uint16',
				__typeValue: this.dataType
			},
			createdAfter: {
				__typeName: 'DateTime',
				__typeValue: this.createdAfter
			},
			createdBefore: {
				__typeName: 'DateTime',
				__typeValue: this.createdBefore
			},
			updatedAfter: {
				__typeName: 'DateTime',
				__typeValue: this.updatedAfter
			},
			updatedBefore: {
				__typeName: 'DateTime',
				__typeValue: this.updatedBefore
			},
			referDataId: {
				__typeName: 'uint32',
				__typeValue: this.referDataId
			},
			tags: {
				__typeName: 'List<String>',
				__typeValue: this.tags
			},
			resultOrderColumn: {
				__typeName: 'uint8',
				__typeValue: this.resultOrderColumn
			},
			resultOrder: {
				__typeName: 'uint8',
				__typeValue: this.resultOrder
			},
			resultRange: {
				__typeName: 'ResultRange',
				__typeValue: this.resultRange
			},
			resultOption: {
				__typeName: 'uint8',
				__typeValue: this.resultOption
			},
			minimalRatingFrequency: {
				__typeName: 'uint32',
				__typeValue: this.minimalRatingFrequency
			},
			useCache: {
				__typeName: 'boolean',
				__typeValue: this.useCache
			}
		};
	}
}

class DataStoreSearchResult extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.totalCount = stream.readUInt32LE();
		this.result = stream.readNEXList(DataStoreMetaInfo);
		this.totalCountType = stream.readUInt8();
	}

	toJSON() {
		return {
			totalCount: {
				__typeName: 'uint32',
				__typeValue: this.totalCount
			},
			result: {
				__typeName: 'List<DataStoreMetaInfo>',
				__typeValue: this.result
			},
			totalCountType: {
				__typeName: 'uint8',
				__typeValue: this.totalCountType
			}
		};
	}
}

class DataStoreGetNotificationUrlParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.previousUrl = stream.readNEXString();
	}

	toJSON() {
		return {
			previousUrl: {
				__typeName: 'String',
				__typeValue: this.previousUrl
			}
		};
	}
}

class DataStoreReqGetNotificationUrlInfo extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.url = stream.readNEXString();
		this.key = stream.readNEXString();
		this.query = stream.readNEXString();
		this.rootCaCert = stream.readNEXBuffer();
	}

	toJSON() {
		return {
			url: {
				__typeName: 'String',
				__typeValue: this.url
			},
			key: {
				__typeName: 'String',
				__typeValue: this.key
			},
			query: {
				__typeName: 'String',
				__typeValue: this.query
			},
			rootCaCert: {
				__typeName: 'Buffer',
				__typeValue: this.rootCaCert
			}
		};
	}
}

class DataStoreGetNewArrivedNotificationsParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.lastNotificationId = stream.readUInt64LE();
		this.limit = stream.readUInt16LE();
	}

	toJSON() {
		return {
			lastNotificationId: {
				__typeName: 'uint64',
				__typeValue: this.lastNotificationId
			},
			limit: {
				__typeName: 'uint16',
				__typeValue: this.limit
			}
		};
	}
}

class DataStoreNotificationV1 extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.notificationId = stream.readUInt64LE();
		this.dataId = stream.readUInt32LE();
	}

	toJSON() {
		return {
			notificationId: {
				__typeName: 'uint64',
				__typeValue: this.notificationId
			},
			dataId: {
				__typeName: 'uint32',
				__typeValue: this.dataId
			}
		};
	}
}

class DataStoreRatingTarget extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt64LE();
		this.slot = stream.readInt8();
	}

	toJSON() {
		return {
			dataId: {
				__typeName: 'uint64',
				__typeValue: this.dataId
			},
			slot: {
				__typeName: 'sint8',
				__typeValue: this.slot
			}
		};
	}
}

class DataStoreRateObjectParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.ratingValue = stream.readInt32LE();
		this.accessPassword = stream.readUInt64LE();
	}

	toJSON() {
		return {
			ratingValue: {
				__typeName: 'sint32',
				__typeValue: this.ratingValue
			},
			accessPassword: {
				__typeName: 'uint64',
				__typeValue: this.accessPassword
			}
		};
	}
}


class DataStoreGetSpecificMetaParamV1 extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.dataIds = stream.readNEXList(stream.readUInt32LE);
	}

	toJSON() {
		return {
			dataIds: {
				__typeName: 'List<uint32>',
				__typeValue: this.dataIds
			}
		};
	}
}

class DataStoreSpecificMetaInfoV1 extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt32LE();
		this.ownerId = stream.readPID();
		this.size = stream.readUInt32LE();
		this.dataType = stream.readUInt16LE();
		this.version = stream.readUInt16LE();
	}

	toJSON() {
		return {
			dataId: {
				__typeName: 'uint32',
				__typeValue: this.dataId
			},
			ownerId: {
				__typeName: 'PID',
				__typeValue: this.ownerId
			},
			size: {
				__typeName: 'uint32',
				__typeValue: this.size
			},
			dataType: {
				__typeName: 'uint16',
				__typeValue: this.dataType
			},
			version: {
				__typeName: 'uint16',
				__typeValue: this.version
			}
		};
	}
}

class DataStoreTouchObjectParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt64LE();
		this.lockId = stream.readUInt32LE();
		this.accessPassword = stream.readUInt64LE();
	}

	toJSON() {
		return {
			dataId: {
				__typeName: 'uint64',
				__typeValue: this.dataId
			},
			lockId: {
				__typeName: 'uint32',
				__typeValue: this.lockId
			},
			accessPassword: {
				__typeName: 'uint64',
				__typeValue: this.accessPassword
			}
		};
	}
}

class DataStoreRatingLog extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.isRated = stream.readBoolean();
		this.pid = stream.readPID();
		this.ratingValue = stream.readInt64LE();
		this.lockExpirationTime = stream.readNEXDateTime();
	}

	toJSON() {
		return {
			isRated: {
				__typeName: 'boolean',
				__typeValue: this.isRated
			},
			pid: {
				__typeName: 'PID',
				__typeValue: this.pid
			},
			ratingValue: {
				__typeName: 'sint32',
				__typeValue: this.ratingValue
			},
			lockExpirationTime: {
				__typeName: 'DateTime',
				__typeValue: this.lockExpirationTime
			}
		};
	}
}

class DataStorePersistenceInfo extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.ownerId = stream.readPID();
		this.persistenceSlotId = stream.readUInt16LE();
		this.dataId = stream.readUInt64LE();
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
			},
			dataId: {
				__typeName: 'uint64',
				__typeValue: this.dataId
			}
		};
	}
}

class DataStoreReqGetAdditionalMeta extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.ownerId = stream.readPID();
		this.dataType = stream.readUInt16LE();
		this.version = stream.readUInt16LE();
		this.metaBinary = stream.readNEXQBuffer();
	}

	toJSON() {
		return {
			ownerId: {
				__typeName: 'PID',
				__typeValue: this.ownerId
			},
			dataType: {
				__typeName: 'uint16',
				__typeValue: this.dataType
			},
			version: {
				__typeName: 'uint16',
				__typeValue: this.version
			},
			metaBinary: {
				__typeName: 'qBuffer',
				__typeValue: this.metaBinary
			}
		};
	}
}

class DataStorePasswordInfo extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt64LE();
		this.accessPassword = stream.readUInt64LE();
		this.updatePassword = stream.readUInt64LE();
	}

	toJSON() {
		return {
			dataId: {
				__typeName: 'uint64',
				__typeValue: this.dataId
			},
			accessPassword: {
				__typeName: 'uint64',
				__typeValue: this.accessPassword
			},
			updatePassword: {
				__typeName: 'uint64',
				__typeValue: this.updatePassword
			}
		};
	}
}

class DataStorePrepareGetParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt64LE();
		this.lockId = stream.readUInt32LE();
		this.persistenceTarget = stream.readNEXStructure(DataStorePersistenceTarget);
		this.accessPassword = stream.readUInt64LE();
		this.extraData = stream.readNEXList(stream.readNEXString);
	}

	toJSON() {
		return {
			dataId: {
				__typeName: 'uint64',
				__typeValue: this.dataId
			},
			lockId: {
				__typeName: 'uint32',
				__typeValue: this.lockId
			},
			persistenceTarget: {
				__typeName: 'DataStorePersistenceTarget',
				__typeValue: this.persistenceTarget
			},
			accessPassword: {
				__typeName: 'uint64',
				__typeValue: this.accessPassword
			},
			extraData: {
				__typeName: 'List<String>',
				__typeValue: this.extraData
			}
		};
	}
}

class DataStorePreparePostParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
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
		this.persistenceInitParam = stream.readNEXStructure(DataStorePersistenceInitParam);
		this.extraData = stream.readNEXList(stream.readNEXString);
	}

	toJSON() {
		return {
			size: {
				__typeName: 'uint32',
				__typeValue: this.size
			},
			name: {
				__typeName: 'String',
				__typeValue: this.name
			},
			dataType: {
				__typeName: 'uint16',
				__typeValue: this.dataType
			},
			metaBinary: {
				__typeName: 'qBuffer',
				__typeValue: this.metaBinary
			},
			permission: {
				__typeName: 'DataStorePermission',
				__typeValue: this.permission
			},
			delPermission: {
				__typeName: 'DataStorePermission',
				__typeValue: this.delPermission
			},
			flag: {
				__typeName: 'uint32',
				__typeValue: this.flag
			},
			period: {
				__typeName: 'uint16',
				__typeValue: this.period
			},
			referDataId: {
				__typeName: 'uint32',
				__typeValue: this.referDataId
			},
			tags: {
				__typeName: 'List<String>',
				__typeValue: this.tags
			},
			ratingInitParams: {
				__typeName: 'List<DataStoreRatingInitParamWithSlot>',
				__typeValue: this.ratingInitParams
			},
			persistenceInitParam: {
				__typeName: 'DataStorePersistenceInitParam',
				__typeValue: this.persistenceInitParam
			},
			extraData: {
				__typeName: 'List<String>',
				__typeValue: this.extraData
			}
		};
	}
}

class DataStorePersistenceInitParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
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

class DataStoreReqPostInfo extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt64LE();
		this.url = stream.readNEXString();
		this.requestHeaders = stream.readNEXList(DataStoreKeyValue);
		this.formFields = stream.readNEXList(DataStoreKeyValue);
		this.rootCaCert = stream.readNEXBuffer();
	}

	toJSON() {
		return {
			dataId: {
				__typeName: 'uint64',
				__typeValue: this.dataId
			},
			url: {
				__typeName: 'String',
				__typeValue: this.url
			},
			requestHeaders: {
				__typeName: 'List<DataStoreKeyValue>',
				__typeValue: this.requestHeaders
			},
			formFields: {
				__typeName: 'List<DataStoreKeyValue>',
				__typeValue: this.formFields
			},
			rootCaCert: {
				__typeName: 'Buffer',
				__typeValue: this.rootCaCert
			}
		};
	}
}

class DataStoreCompletePostParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt64LE();
		this.isSuccess = stream.readBoolean();
	}

	toJSON() {
		return {
			dataId: {
				__typeName: 'uint64',
				__typeValue: this.dataId
			},
			isSuccess: {
				__typeName: 'boolean',
				__typeValue: this.isSuccess
			}
		};
	}
}

class DataStoreChangeMetaCompareParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.comparisonFlag = stream.readUInt32LE();
		this.name = stream.readNEXString();
		this.permission = stream.readNEXStructure(DataStorePermission);
		this.delPermission = stream.readNEXStructure(DataStorePermission);
		this.period = stream.readUInt16LE();
		this.metaBinary = stream.readNEXQBuffer();
		this.tags = stream.readNEXList(stream.readNEXString);
		this.referredCnt = stream.readUInt32LE();
		this.dataType = stream.readUInt16LE();
		this.status = stream.readUInt8();
	}

	toJSON() {
		return {
			comparisonFlag: {
				__typeName: 'uint32',
				__typeValue: this.comparisonFlag
			},
			name: {
				__typeName: 'String',
				__typeValue: this.name
			},
			permission: {
				__typeName: 'DataStorePermission',
				__typeValue: this.permission
			},
			delPermission: {
				__typeName: 'DataStorePermission',
				__typeValue: this.delPermission
			},
			period: {
				__typeName: 'uint16',
				__typeValue: this.period
			},
			metaBinary: {
				__typeName: 'qBuffer',
				__typeValue: this.metaBinary
			},
			tags: {
				__typeName: 'List<String>',
				__typeValue: this.tags
			},
			referredCnt: {
				__typeName: 'uint32',
				__typeValue: this.referredCnt
			},
			dataType: {
				__typeName: 'uint16',
				__typeValue: this.dataType
			},
			status: {
				__typeName: 'uint8',
				__typeValue: this.status
			}
		};
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
	DataStoreChangeMetaParam,
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
	DataStorePrepareGetParam,
	DataStorePreparePostParam,
	DataStorePersistenceInitParam,
	DataStoreReqPostInfo,
	DataStoreCompletePostParam,
	DataStoreChangeMetaCompareParam
};
