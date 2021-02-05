const NEXSmartBuffer = require('../nex_smart_buffer');
const { MODE_REQUEST, MODE_RESPONSE } = require('../rmc');
const NEXTypes = require('./nex_types');
const  {
	DataStoreMetaInfo,
	DataStoreSearchParam,
	DataStoreGetMetaParam,
	DataStoreReqGetInfo
} = require('./datastore');

const SMMDataStoreMethodGetFileServerObjectInfos = 45;
//const SMMDataStoreMethodGetMetaByOwnerId = 46;
//const SMMDataStoreMethodCustomSearchObject = 47;
const SMMDataStoreMethodRateCustomRanking = 48;
//const SMMDataStoreMethodGetCustomRanking = 49;
const SMMDataStoreMethodGetCustomRankingByDataId = 50;
//const SMMDataStoreMethodDeleteCustomRanking = 51;
//const SMMDataStoreMethodAddToBufferQueue = 52;
//const SMMDataStoreMethodAddToBufferQueues = 53;
const SMMDataStoreMethodGetBufferQueue = 54;
//const SMMDataStoreMethodGetBufferQueues = 55;
//const SMMDataStoreMethodClearBufferQueues = 56;
//const SMMDataStoreMethodCompleteAttachFile = 57;
//const SMMDataStoreMethodCompleteAttachFileV1 = 58;
//const SMMDataStoreMethodPrepareAttachFile = 59;
//const SMMDataStoreMethodConditionalSearchObject = 60;
const SMMDataStoreMethodGetApplicationConfig = 61;
//const SMMDataStoreMethodSetApplicationConfig = 62;
//const SMMDataStoreMethodDeleteApplicationConfig = 63;
//const SMMDataStoreMethodLatestCourseSearchObject = 64;
const SMMDataStoreMethodFollowingsLatestCourseSearchObject = 65;
//const SMMDataStoreMethodRecommendedCourseSearchObject = 66;
//const SMMDataStoreMethodScoreRangeCascadedSearchObject = 67;
//const SMMDataStoreMethodSuggestedCourseSearchObject = 68;
//const SMMDataStoreMethodPreparePostObjectWithOwnerIdAndDataId = 69;
//const SMMDataStoreMethodCompletePostObjectWithOwnerId = 70;
//const SMMDataStoreMethodUploadCourseRecord = 71;
//const SMMDataStoreMethodGetCourseRecord = 72;
//const SMMDataStoreMethodDeleteCourseRecord = 73;
const SMMDataStoreMethodGetApplicationConfigString = 74;
//const SMMDataStoreMethodSetApplicationConfigString = 75;
//const SMMDataStoreMethodGetDeletionReason = 76;
//const SMMDataStoreMethodSetDeletionReason = 77;
const SMMDataStoreMethodGetMetasWithCourseRecord = 78;
//const SMMDataStoreMethodCheckRateCustomRankingCounter = 79;
//const SMMDataStoreMethodResetRateCustomRankingCounter = 80;
//const SMMDataStoreMethodBestScoreRateCourseSearchObject = 81;
//const SMMDataStoreMethodCTRPickUpCourseSearchObject = 82;
//const SMMDataStoreMethodSetCachedRanking = 83;
//const SMMDataStoreMethodDeleteCachedRanking = 84;
//const SMMDataStoreMethodChangePlayablePlatform = 85;
//const SMMDataStoreMethodSearchUnknownPlatformObjects = 86;
//const SMMDataStoreMethodReportCourse = 87;

/*
class DataStoreGetCustomRankingParam extends NEXTypes.Structure {
	parse(buffer) {
		this.applicationId = buffer.readUInt32LE();
		this.condition = buffer.readNEXStructure(DataStoreCustomRankingRatingCondition);
		this.resultOption = buffer.readUInt8();
		this.resultRange = buffer.readNEXStructure(NEXTypes.ResultRange);

		Uint32	applicationId
		DataStoreCustomRankingRatingCondition	condition
		Uint8	resultOption
		ResultRange	resultRange
	}
}
*/

/*

class DataStoreCustomRankingRatingCondition extends NEXTypes.Structure {
	parse(buffer) {
		this.slot = buffer.readInt8();
		this.minValue = buffer.readInt32LE();
		this.maxValue = buffer.readInt32LE();
		this.__dummy_revision1 = buffer.readUInt32LE(); // don't actually know what this is, the wiki says this is type "__dummy_revision"
		this.minCount = buffer.readUInt32LE();
		this.maxCount = buffer.readUInt32LE();
	}
}

*/

class DataStoreRateCustomRankingParam extends NEXTypes.Structure {
	parse(buffer) {
		this.dataId = buffer.readBigUInt64LE();
		this.applicationId = buffer.readUInt32LE();
		this.score = buffer.readUInt32LE();
		this.period = buffer.readUInt16LE();
	}
}

class BufferQueueParam extends NEXTypes.Structure {
	parse(buffer) {
		this.dataId = buffer.readBigUInt64LE();
		this.slot = buffer.readUInt32LE();
	}
}

class DataStoreGetCustomRankingByDataIdParam extends NEXTypes.Structure {
	parse(buffer) {
		this.applicationId = buffer.readUInt32LE();
		this.dataIdList = buffer.readNEXList(buffer.readBigUInt64LE);
		this.resultOption = buffer.readUInt8();
	}
}

class DataStoreCustomRankingResult extends NEXTypes.Structure {
	parse(buffer) {
		this.order = buffer.readUInt32LE();
		this.score = buffer.readUInt32LE();
		this.metaInfo = buffer.readNEXStructure(DataStoreMetaInfo);
	}
}

class DataStoreGetCourseRecordParam extends NEXTypes.Structure {
	parse(buffer) {
		this.dataId = buffer.readBigUInt64LE();
		this.slot = buffer.readUInt8();
	}
}

class DataStoreGetCourseRecordResult extends NEXTypes.Structure {
	parse(buffer) {
		this.dataId = buffer.readBigUInt64LE();
		this.slot = buffer.readUInt8();
		this.firstPid = buffer.readUInt32LE();
		this.bestPid = buffer.readUInt32LE();
		this.bestScore = buffer.readInt32LE();
		this.createdTime = buffer.readNEXDateTime();
		this.updatedTime = buffer.readNEXDateTime();
	}
}

class DataStoreFileServerObjectInfo extends NEXTypes.Structure {
	parse(buffer) {
		this.dataId = buffer.readBigUInt64LE();
		this.getInfo = buffer.readNEXStructure(DataStoreReqGetInfo);
	}
}

function handlePacket(packet) {
	switch (packet.getRMCMessage().getMethodID()) {
		case SMMDataStoreMethodGetFileServerObjectInfos:
			GetFileServerObjectInfos(packet);
			break;
		case SMMDataStoreMethodRateCustomRanking:
			RateCustomRanking(packet);
			break;
		case SMMDataStoreMethodGetCustomRankingByDataId:
			GetCustomRankingByDataId(packet);
			break;
		case SMMDataStoreMethodGetBufferQueue:
			GetBufferQueue(packet);
			break;
		case SMMDataStoreMethodGetApplicationConfig:
			GetApplicationConfig(packet);
			break;
		case SMMDataStoreMethodFollowingsLatestCourseSearchObject:
			FollowingsLatestCourseSearchObject(packet);
			break;
		case SMMDataStoreMethodGetApplicationConfigString:
			GetApplicationConfigString(packet);
			break;
		case SMMDataStoreMethodGetMetasWithCourseRecord:
			GetMetasWithCourseRecord(packet);
			break;
		default:
			throw new Error(`Unknown DataStore (SMM) method ID 0x${packet.getRMCMessage().getMethodID().toString(16)}`);
	}
}

function GetFileServerObjectInfos(packet) {
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
			infos: buffer.readNEXList(DataStoreFileServerObjectInfo)
		};
	}
}

function RateCustomRanking(packet) {
	const message = packet.getRMCMessage();
	const mode = message.getMode();

	if (mode === MODE_REQUEST) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getParameters());
		buffer.connection = packet.connection;

		packet.rmcData = buffer.readNEXList(DataStoreRateCustomRankingParam);
	} else if (mode === MODE_RESPONSE) {
		// Returns nothing
		packet.rmcData = null;
	}
}

function GetCustomRankingByDataId(packet) {
	const message = packet.getRMCMessage();
	const mode = message.getMode();

	if (mode === MODE_REQUEST) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getParameters());
		buffer.connection = packet.connection;

		packet.rmcData = buffer.readNEXStructure(DataStoreGetCustomRankingByDataIdParam);
	} else if (mode === MODE_RESPONSE) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getResponseData());
		buffer.connection = packet.connection;

		packet.rmcData = {
			rankingResult: buffer.readNEXList(DataStoreCustomRankingResult),
			results: buffer.readNEXList(buffer.readNEXResult)
		};
	}
}

function GetBufferQueue(packet) {
	const message = packet.getRMCMessage();
	const mode = message.getMode();

	if (mode === MODE_REQUEST) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getParameters());
		buffer.connection = packet.connection;

		packet.rmcData = buffer.readNEXStructure(BufferQueueParam);
	} else if (mode === MODE_RESPONSE) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getResponseData());

		packet.rmcData = buffer.readNEXList(buffer.readNEXQBuffer);
	}
}

function GetApplicationConfig(packet) {
	const message = packet.getRMCMessage();
	const mode = message.getMode();

	if (mode === MODE_REQUEST) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getParameters());

		packet.rmcData = {
			applicationId: buffer.readUInt32LE()
		};
	} else if (mode === MODE_RESPONSE) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getResponseData());

		packet.rmcData = {
			config: buffer.readNEXList(buffer.readInt32LE)
		};
	}
}

function FollowingsLatestCourseSearchObject(packet) {
	const message = packet.getRMCMessage();
	const mode = message.getMode();

	if (mode === MODE_REQUEST) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getParameters());
		buffer.connection = packet.connection;

		packet.rmcData = {
			param: buffer.readNEXStructure(DataStoreSearchParam),
			extraData: buffer.readNEXList(buffer.readNEXString)
		};
	} else if (mode === MODE_RESPONSE) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getResponseData());
		buffer.connection = packet.connection;

		packet.rmcData = {
			rankingResults: buffer.readNEXList(DataStoreCustomRankingResult)
		};
	}
}

function GetApplicationConfigString(packet) {
	const message = packet.getRMCMessage();
	const mode = message.getMode();

	if (mode === MODE_REQUEST) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getParameters());

		packet.rmcData = {
			applicationId: buffer.readUInt32LE()
		};
	} else if (mode === MODE_RESPONSE) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getResponseData());

		packet.rmcData = {
			config: buffer.readNEXList(buffer.readNEXString)
		};
	}
}

function GetMetasWithCourseRecord(packet) {
	const message = packet.getRMCMessage();
	const mode = message.getMode();

	if (mode === MODE_REQUEST) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getParameters());
		buffer.connection = packet.connection;

		packet.rmcData = {
			param: buffer.readNEXList(DataStoreGetCourseRecordParam),
			metaParam: buffer.readNEXStructure(DataStoreGetMetaParam)
		};
	} else if (mode === MODE_RESPONSE) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getResponseData());
		buffer.connection = packet.connection;

		packet.rmcData = {
			metaInfo: buffer.readNEXList(DataStoreMetaInfo),
			courseResults: buffer.readNEXList(DataStoreGetCourseRecordResult),
			results: buffer.readNEXList(NEXTypes.Result),
		};
	}
}

module.exports = { handlePacket };