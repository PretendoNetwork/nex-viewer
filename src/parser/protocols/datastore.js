const NEXSmartBuffer = require('../nex_smart_buffer');
const { MODE_REQUEST, MODE_RESPONSE } = require('../rmc');
const NEXTypes = require('./nex_types');

//const { handlePacket: handlePaketSMM } = require('./datastore_smm');

//const DataStoreMethodPrepareGetObjectV1 = 0x1;
//const DataStoreMethodPreparePostObjectV1 = 0x2;
//const DataStoreMethodCompletePostObjectV1 = 0x3;
//const DataStoreMethodDeleteObject = 0x4;
//const DataStoreMethodDeleteObjects = 0x5;
//const DataStoreMethodChangeMetaV1 = 0x6;
//const DataStoreMethodChangeMetasV1 = 0x7;
const DataStoreMethodGetMeta = 0x8;
//const DataStoreMethodGetMetas = 0x9;
//const DataStoreMethodPrepareUpdateObject = 0xa;
//const DataStoreMethodCompleteUpdateObject = 0xb;
//const DataStoreMethodSearchObject = 0xc;
//const DataStoreMethodGetNotificationUrl = 0xd;
//const DataStoreMethodGetNewArrivedNotificationsV1 = 0xe;
//const DataStoreMethodRateObject = 0xf;
//const DataStoreMethodGetRating = 0x10;
//const DataStoreMethodGetRatings = 0x11;
//const DataStoreMethodResetRating = 0x12;
//const DataStoreMethodResetRatings = 0x13;
//const DataStoreMethodGetSpecificMetaV1 = 0x14;
//const DataStoreMethodPostMetaBinary = 0x15;
//const DataStoreMethodTouchObject = 0x16;
//const DataStoreMethodGetRatingWithLog = 0x17;
const DataStoreMethodPreparePostObject = 0x18;
const DataStoreMethodPrepareGetObject = 0x19;
const DataStoreMethodCompletePostObject = 0x1a;
//const DataStoreMethodGetNewArrivedNotifications = 0x1b;
//const DataStoreMethodGetSpecificMeta = 0x1c;
//const DataStoreMethodGetPersistenceInfo = 0x1d;
//const DataStoreMethodGetPersistenceInfos = 0x1e;
//const DataStoreMethodPerpetuateObject = 0x1f;
//const DataStoreMethodUnperpetuateObject = 0x20;
//const DataStoreMethodPrepareGetObjectOrMetaBinary = 0x21;
//const DataStoreMethodGetPasswordInfo = 0x22;
//const DataStoreMethodGetPasswordInfos = 0x23;
const DataStoreMethodGetMetasMultipleParam = 0x24;
//const DataStoreMethodCompletePostObjects = 0x25;
const DataStoreMethodChangeMeta = 0x26;
//const DataStoreMethodChangeMetas = 0x27;
const DataStoreMethodRateObjects = 0x28;
//const DataStoreMethodPostMetaBinaryWithDataId = 0x29;
//const DataStoreMethodPostMetaBinariesWithDataId = 0x2a;
//const DataStoreMethodRateObjectWithPosting = 0x2b;
//const DataStoreMethodRateObjectsWithPosting = 0x2c;
const DataStoreMethodGetObjectInfos = 0x2d;
//const DataStoreMethodSearchObjectLight = 0x2e;

class DataStoreGetMetaParam extends NEXTypes.Structure {
	parse(buffer) {
		this.dataId = buffer.readBigUInt64LE();
		this.persistenceTarget = buffer.readNEXStructure(DataStorePersistenceTarget);
		this.resultOption = buffer.readUInt8();
		this.accessPassword = buffer.readBigUInt64LE();
	}
}

class DataStorePersistenceTarget extends NEXTypes.Structure {
	parse(buffer) {
		this.ownerId = buffer.readUInt32LE();
		this.persistenceSlotId = buffer.readUInt16LE();
	}
}

class DataStoreMetaInfo extends NEXTypes.Structure {
	parse(buffer) {
		this.dataId = buffer.readBigUInt64LE();
		this.ownerId = buffer.readUInt32LE();
		this.size = buffer.readUInt32LE();
		this.name = buffer.readNEXString();
		this.dataType = buffer.readUInt16LE();
		this.metaBinary = buffer.readNEXQBuffer();
		this.permission = buffer.readNEXStructure(DataStorePermission);
		this.delPermission = buffer.readNEXStructure(DataStorePermission);
		this.createdTime = buffer.readNEXDateTime();
		this.updatedTime = buffer.readNEXDateTime();
		this.period = buffer.readUInt16LE();
		this.status = buffer.readUInt8();
		this.referredCnt = buffer.readUInt32LE();
		this.referDataId = buffer.readUInt32LE();
		this.flag = buffer.readUInt32LE();
		this.referredTime = buffer.readNEXDateTime();
		this.expireTime = buffer.readNEXDateTime();
		this.tags = buffer.readNEXList(buffer.readNEXString);
		this.ratings = buffer.readNEXList(DataStoreRatingInfoWithSlot);
	}
}

class DataStorePermission extends NEXTypes.Structure {
	parse(buffer) {
		this.permission = buffer.readUInt8();
		this.recipientIds = buffer.readNEXList(buffer.readUInt32LE);
	}
}

class DataStoreRatingInfoWithSlot extends NEXTypes.Structure {
	parse(buffer) {
		this.slot = buffer.readInt8();
		this.rating = buffer.readNEXStructure(DataStoreRatingInfo);
	}
}

class DataStoreRatingInfo extends NEXTypes.Structure {
	parse(buffer) {
		this.totalValue = buffer.readBigInt64LE();
		this.count = buffer.readUInt32LE();
		this.initialValue = buffer.readBigInt64LE();
	}
}

class DataStorePreparePostParam extends NEXTypes.Structure {
	parse(buffer) {
		this.size = buffer.readUInt32LE();
		this.name = buffer.readNEXString();
		this.dataType = buffer.readUInt16LE();
		this.metaBinary = buffer.readNEXQBuffer();
		this.permission = buffer.readNEXStructure(DataStorePermission);
		this.delPermission = buffer.readNEXStructure(DataStorePermission);
		this.flag = buffer.readUInt32LE();
		this.period = buffer.readUInt16LE();
		this.referDataId = buffer.readUInt32LE();
		this.tags = buffer.readNEXList(buffer.readNEXString);
		this.ratingInitParams = buffer.readNEXList(DataStoreRatingInitParamWithSlot);
		this.persistenceInitParam = buffer.readNEXStructure(DataStorePersistenceInitParam);
		this.extraData = buffer.readNEXList(buffer.readNEXString);
	}
}

class DataStoreRatingInitParamWithSlot extends NEXTypes.Structure {
	parse(buffer) {
		this.slot = buffer.readInt8();
		this.param = buffer.readNEXStructure(DataStoreRatingInitParam);
	}
}

class DataStoreRatingInitParam extends NEXTypes.Structure {
	parse(buffer) {
		this.flag = buffer.readUInt8();
		this.internalFlag = buffer.readUInt8();
		this.lockType = buffer.readUInt8();
		this.initialValue = buffer.readBigInt64LE();
		this.rangeMin = buffer.readInt32LE();
		this.rangeMax = buffer.readInt32LE();
		this.periodHour = buffer.readInt8();
		this.periodDuration = buffer.readInt16LE();
	}
}

class DataStorePersistenceInitParam extends NEXTypes.Structure {
	parse(buffer) {
		this.persistenceSlotId = buffer.readUInt16LE();
		this.deleteLastObject = !!buffer.readUInt8();
	}
}

class DataStoreReqPostInfo extends NEXTypes.Structure {
	parse(buffer) {
		this.dataId = buffer.readBigUInt64LE();
		this.url = buffer.readNEXString();
		this.requestHeaders = buffer.readNEXList(DataStoreKeyValue);
		this.formFields = buffer.readNEXList(DataStoreKeyValue);
		this.rootCaCert = buffer.readNEXBuffer();
	}
}

class DataStoreKeyValue extends NEXTypes.Structure {
	parse(buffer) {
		this.key = buffer.readNEXString();
		this.value = buffer.readNEXString();
	}
}

class DataStoreCompletePostParam extends NEXTypes.Structure {
	parse(buffer) {
		this.dataId = buffer.readBigUInt64LE();
		this.isSuccess = !!buffer.readUInt8();
	}
}

class DataStorePrepareGetParam extends NEXTypes.Structure {
	parse(buffer) {
		this.dataId = buffer.readBigUInt64LE();
		this.lockId = buffer.readUInt32LE();
		this.persistenceTarget = buffer.readNEXStructure(DataStorePersistenceTarget);
		this.accessPassword = buffer.readBigUInt64LE();
		this.extraData = buffer.readNEXList(buffer.readNEXString);
	}
}

class DataStoreReqGetInfo extends NEXTypes.Structure {
	parse(buffer) {
		this.url = buffer.readNEXString();
		this.requestHeaders = buffer.readNEXList(DataStoreKeyValue);
		this.size = buffer.readUInt32LE();
		this.rootCaCert = buffer.readNEXBuffer();
		this.dataId = buffer.readBigUInt64LE();
	}
}

class DataStoreSearchParam extends NEXTypes.Structure {
	parse(buffer) {
		this.searchTarget = buffer.readUInt8();
		this.ownerIds = buffer.readNEXList(buffer.readUInt32LE);
		this.ownerType = buffer.readUInt8();
		this.destinationIds = buffer.readNEXList(buffer.readBigUInt64LE);
		this.dataType = buffer.readUInt16LE();
		this.createdAfter = buffer.readNEXDateTime();
		this.createdBefore = buffer.readNEXDateTime();
		this.updatedAfter = buffer.readNEXDateTime();
		this.updatedBefore = buffer.readNEXDateTime();
		this.referDataId = buffer.readUInt32LE();
		this.tags = buffer.readNEXList(buffer.readNEXString);
		this.resultOrderColumn = buffer.readUInt8();
		this.resultOrder = buffer.readUInt8();
		this.resultRange = buffer.readNEXStructure(NEXTypes.ResultRange);
		this.resultOption = buffer.readUInt8();
		this.minimalRatingFrequency = buffer.readUInt32LE();
		this.useCache = !!buffer.readUInt8();

		// These values only exist on the Switch
		//this.totalCountEnabled = !!buffer.readUInt8();
		//this.dataTypes = buffer.readNEXList(buffer.readUInt16LE);
	}
}

class DataStoreRatingTarget extends NEXTypes.Structure {
	parse(buffer) {
		this.dataId = buffer.readBigUInt64LE();
		this.slot = buffer.readInt8();
	}
}

class DataStoreRateObjectParam extends NEXTypes.Structure {
	parse(buffer) {
		this.ratingValue = buffer.readInt32LE();
		this.accessPassword = buffer.readBigUInt64LE();
	}
}

class DataStoreChangeMetaParam extends NEXTypes.Structure {
	parse(buffer) {
		this.dataId = buffer.readBigUInt64LE();
		this.modifiesFlag = buffer.readUInt32LE();
		this.name = buffer.readNEXString();
		this.permission = buffer.readNEXStructure(DataStorePermission);
		this.delPermission = buffer.readNEXStructure(DataStorePermission);
		this.period = buffer.readUInt16LE();
		this.metaBinary = buffer.readNEXQBuffer();
		this.tags = buffer.readNEXList(buffer.readNEXString);
		this.updatePassword = buffer.readBigUInt64LE();
		this.referredCnt = buffer.readUInt32LE();
		this.dataType = buffer.readUInt16LE();
		this.status = buffer.readUInt8();
		this.compareParam = buffer.readNEXStructure(DataStoreChangeMetaCompareParam);
		this.persistenceTarget = buffer.readNEXStructure(DataStorePersistenceTarget);
	}
}

class DataStoreChangeMetaCompareParam extends NEXTypes.Structure {
	parse(buffer) {
		this.comparisonFlag = buffer.readUInt32LE();
		this.name = buffer.readNEXString();
		this.permission = buffer.readNEXStructure(DataStorePermission);
		this.delPermission = buffer.readNEXStructure(DataStorePermission);
		this.period = buffer.readUInt16LE();
		this.metaBinary = buffer.readNEXQBuffer();
		this.tags = buffer.readNEXList(buffer.readNEXString);
		this.referredCnt = buffer.readUInt32LE();
		this.dataType = buffer.readUInt16LE();
		this.status = buffer.readUInt8();
	}
}

function handlePacket(packet) {
	const methodID = packet.getRMCMessage().getMethodID();

	// Check if method is a SMM patched method
	if (packet.connection.accessKey === '9f2b4678' && methodID >= 0x2D) {
		dataStoreProtocolSMM.handlePacket(packet);
		return;
	}
	
	// Check if method is a Smash4 patched method
	if (packet.connection.accessKey === '2869ba38' && methodID >= 0x2E) {
		return;
	}

	switch (methodID) {
		case DataStoreMethodGetMeta:
			GetMeta(packet);
			break;
		case DataStoreMethodPreparePostObject:
			PreparePostObject(packet);
			break;
		case DataStoreMethodPrepareGetObject:
			PrepareGetObject(packet);
			break;
		case DataStoreMethodCompletePostObject:
			CompletePostObject(packet);
			break;
		case DataStoreMethodGetMetasMultipleParam:
			GetMetasMultipleParam(packet);
			break;
		case DataStoreMethodChangeMeta:
			ChangeMeta(packet);
			break;
		case DataStoreMethodRateObjects:
			RateObjects(packet);
			break;
		case DataStoreMethodGetObjectInfos:
			GetObjectInfos(packet);
			break;
		default:
			throw new Error(`Unknown DataStore method ID 0x${packet.getRMCMessage().getMethodID().toString(16)}`);
	}
}

function GetMeta(packet) {
	const message = packet.getRMCMessage();
	const mode = message.getMode();

	if (mode === MODE_REQUEST) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getParameters());
		buffer.connection = packet.connection;

		packet.rmcData = buffer.readNEXStructure(DataStoreGetMetaParam);
	} else if (mode === MODE_RESPONSE) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getResponseData());
		buffer.connection = packet.connection;

		packet.rmcData = buffer.readNEXStructure(DataStoreMetaInfo);
	}
}

function PreparePostObject(packet) {
	const message = packet.getRMCMessage();
	const mode = message.getMode();

	if (mode === MODE_REQUEST) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getParameters());
		buffer.connection = packet.connection;

		packet.rmcData = buffer.readNEXStructure(DataStorePreparePostParam);
	} else if (mode === MODE_RESPONSE) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getResponseData());
		buffer.connection = packet.connection;

		packet.rmcData = buffer.readNEXStructure(DataStoreReqPostInfo);
	}
}

function PrepareGetObject(packet) {
	const message = packet.getRMCMessage();
	const mode = message.getMode();

	if (mode === MODE_REQUEST) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getParameters());
		buffer.connection = packet.connection;

		packet.rmcData = buffer.readNEXStructure(DataStorePrepareGetParam);
	} else if (mode === MODE_RESPONSE) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getResponseData());
		buffer.connection = packet.connection;

		packet.rmcData = buffer.readNEXStructure(DataStoreReqGetInfo);
	}
}

function CompletePostObject(packet) {
	const message = packet.getRMCMessage();
	const mode = message.getMode();

	if (mode === MODE_REQUEST) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getParameters());
		buffer.connection = packet.connection;

		packet.rmcData = buffer.readNEXStructure(DataStoreCompletePostParam);
	} else if (mode === MODE_RESPONSE) {
		// Returns nothing
		packet.rmcData = null;
	}
}

function GetMetasMultipleParam(packet) {
	const message = packet.getRMCMessage();
	const mode = message.getMode();

	if (mode === MODE_REQUEST) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getParameters());
		buffer.connection = packet.connection;

		packet.rmcData = {
			params: buffer.readNEXList(DataStoreGetMetaParam)
		};
	} else if (mode === MODE_RESPONSE) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getResponseData());
		buffer.connection = packet.connection;

		packet.rmcData = {
			metaInfo: buffer.readNEXList(DataStoreMetaInfo),
			results: buffer.readNEXList(buffer.readNEXResult)
		};
	}
}

// This seems to be broken in SMM1...? Needs to be fixed
function ChangeMeta(packet) {
	const message = packet.getRMCMessage();
	const mode = message.getMode();

	if (mode === MODE_REQUEST) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getParameters());
		buffer.connection = packet.connection;

		console.log(message.getParameters().toString('hex'));
		packet.rmcData = buffer.readNEXStructure(DataStoreChangeMetaParam);
	} else if (mode === MODE_RESPONSE) {
		// no response
		
		packet.rmcData = null;
	}
}

function RateObjects(packet) {
	const message = packet.getRMCMessage();
	const mode = message.getMode();

	if (mode === MODE_REQUEST) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getParameters());
		buffer.connection = packet.connection;

		packet.rmcData = {
			targets: buffer.readNEXList(DataStoreRatingTarget),
			params: buffer.readNEXList(DataStoreRateObjectParam),
			transactional: !!buffer.readUInt8(),
			fetchRatings: !!buffer.readUInt8()
		};
	} else if (mode === MODE_RESPONSE) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getResponseData());
		buffer.connection = packet.connection;

		packet.rmcData = {
			infos: buffer.readNEXList(DataStoreReqGetInfo),
			results: buffer.readNEXList(buffer.readNEXResult)
		};
	}
}

function GetObjectInfos(packet) {
	const message = packet.getRMCMessage();
	const mode = message.getMode();

	if (mode === MODE_REQUEST) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getParameters());
		buffer.connection = packet.connection;

		packet.rmcData = {
			dataIds: buffer.readNEXList(buffer.readBigUInt64LE)
		};
	} else if (mode === MODE_RESPONSE) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getResponseData());
		buffer.connection = packet.connection;

		packet.rmcData = {
			infos: buffer.readNEXList(DataStoreReqGetInfo),
			results: buffer.readNEXList(buffer.readNEXResult)
		};
	}
}

module.exports = {
	handlePacket,
	// These are for use in the extended protocols for Smash and SMM
	DataStoreMetaInfo, DataStoreSearchParam, DataStoreGetMetaParam, DataStoreReqGetInfo
};

// require these *last* so that this module export list is complete (cheap way to handle circular dependencies)
const dataStoreProtocolSMM = require('./datastore_smm');