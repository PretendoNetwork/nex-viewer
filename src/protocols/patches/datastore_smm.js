const Packet = require('../../packet'); // eslint-disable-line no-unused-vars
const PacketV0 = require('../../packetv0'); // eslint-disable-line no-unused-vars
const PacketV1 = require('../../packetv1'); // eslint-disable-line no-unused-vars
const RMCMessage = require('../../rmc'); // eslint-disable-line no-unused-vars
const Stream = require('../../stream');

const DataStoreTypes = require('../types/datastore');
const DataStoreSMMTypes = require('../types/datastore_smm');

class DataStoreSMM {
	static ProtocolID = 0x73;

	static Methods = {
		GetObjectInfos: 0x2d,
		GetMetaByOwnerId: 0x2e,
		CustomSearchObject: 0x2f,
		RateCustomRanking: 0x30,
		GetCustomRanking: 0x31,
		GetCustomRankingByDataId: 0x32,
		DeleteCustomRanking: 0x33,
		AddToBufferQueue: 0x34,
		AddToBufferQueues: 0x35,
		GetBufferQueue: 0x36,
		GetBufferQueues: 0x37,
		ClearBufferQueues: 0x38,
		CompleteAttachFile: 0x39,
		CompleteAttachFileV1: 0x3a,
		PrepareAttachFile: 0x3b,
		ConditionalSearchObject: 0x3c,
		GetApplicationConfig: 0x3d,
		SetApplicationConfig: 0x3e,
		DeleteApplicationConfig: 0x3f,
		LatestCourseSearchObject: 0x40,
		FollowingsLatestCourseSearchObject: 0x41,
		RecommendedCourseSearchObject: 0x42,
		ScoreRangeCascadedSearchObject: 0x43,
		SuggestedCourseSearchObject: 0x44,
		PreparePostObjectWithOwnerIdAndDataId: 0x45,
		CompletePostObjectWithOwnerId: 0x46,
		UploadCourseRecord: 0x47,
		GetCourseRecord: 0x48,
		DeleteCourseRecord: 0x49,
		GetApplicationConfigString: 0x4a,
		SetApplicationConfigString: 0x4b,
		GetDeletionReason: 0x4c,
		SetDeletionReason: 0x4d,
		GetMetasWithCourseRecord: 0x4e,
		CheckRateCustomRankingCounter: 0x4f,
		ResetRateCustomRankingCounter: 0x50,
		BestScoreRateCourseSearchObject: 0x51,
		CTRPickUpCourseSearchObject: 0x52,
		SetCachedRanking: 0x53,
		DeleteCachedRanking: 0x54,
		ChangePlayablePlatform: 0x55,
		SearchUnknownPlatformObjects: 0x56,
		ReportCourse: 0x57
	};

	static MethodNames = Object.entries(DataStoreSMM.Methods).reduce((namesObject, entry) => {
		const [key, value] = entry;
		namesObject[value] = key;
		return namesObject;
	}, {});

	static Handlers = {
		0x2d: DataStoreSMM.GetObjectInfos,
		0x2e: DataStoreSMM.GetMetaByOwnerId,
		0x2f: DataStoreSMM.CustomSearchObject,
		0x30: DataStoreSMM.RateCustomRanking,
		0x31: DataStoreSMM.GetCustomRanking,
		0x32: DataStoreSMM.GetCustomRankingByDataId,
		0x33: DataStoreSMM.DeleteCustomRanking,
		0x34: DataStoreSMM.AddToBufferQueue,
		0x35: DataStoreSMM.AddToBufferQueues,
		0x36: DataStoreSMM.GetBufferQueue,
		0x37: DataStoreSMM.GetBufferQueues,
		0x38: DataStoreSMM.ClearBufferQueues,
		0x39: DataStoreSMM.CompleteAttachFile,
		0x3a: DataStoreSMM.CompleteAttachFileV1,
		0x3b: DataStoreSMM.PrepareAttachFile,
		0x3c: DataStoreSMM.ConditionalSearchObject,
		0x3d: DataStoreSMM.GetApplicationConfig,
		0x3e: DataStoreSMM.SetApplicationConfig,
		0x3f: DataStoreSMM.DeleteApplicationConfig,
		0x40: DataStoreSMM.LatestCourseSearchObject,
		0x41: DataStoreSMM.FollowingsLatestCourseSearchObject,
		0x42: DataStoreSMM.RecommendedCourseSearchObject,
		0x43: DataStoreSMM.ScoreRangeCascadedSearchObject,
		0x44: DataStoreSMM.SuggestedCourseSearchObject,
		0x45: DataStoreSMM.PreparePostObjectWithOwnerIdAndDataId,
		0x46: DataStoreSMM.CompletePostObjectWithOwnerId,
		0x47: DataStoreSMM.UploadCourseRecord,
		0x48: DataStoreSMM.GetCourseRecord,
		0x49: DataStoreSMM.DeleteCourseRecord,
		0x4a: DataStoreSMM.GetApplicationConfigString,
		0x4b: DataStoreSMM.SetApplicationConfigString,
		0x4c: DataStoreSMM.GetDeletionReason,
		0x4d: DataStoreSMM.SetDeletionReason,
		0x4e: DataStoreSMM.GetMetasWithCourseRecord,
		0x4f: DataStoreSMM.CheckRateCustomRankingCounter,
		0x50: DataStoreSMM.ResetRateCustomRankingCounter,
		0x51: DataStoreSMM.BestScoreRateCourseSearchObject,
		0x52: DataStoreSMM.CTRPickUpCourseSearchObject,
		0x53: DataStoreSMM.SetCachedRanking,
		0x54: DataStoreSMM.DeleteCachedRanking,
		0x55: DataStoreSMM.ChangePlayablePlatform,
		0x56: DataStoreSMM.SearchUnknownPlatformObjects,
		0x57: DataStoreSMM.ReportCourse
	};

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet PRUDP packet
	 */
	static handlePacket(packet) {
		const methodId = packet.rmcMessage.methodId;

		const handler = DataStoreSMM.Handlers[methodId];

		if (!handler) {
			console.log(`Unknown DataStore (SMM) method ID ${methodId} (0x${methodId.toString(16)}) (${DataStoreSMM.MethodNames[methodId]})`);
			return;
		}

		const { rmcMessage } = packet;
		const stream = new Stream(rmcMessage.body, packet.connection);

		packet.rmcData = handler(rmcMessage, stream);
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetObjectInfos(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				dataIds: stream.readNEXList(stream.readUInt64LE)
			};
		} else {
			return {
				pInfos: stream.readNEXList(DataStoreSMMTypes.DataStoreFileServerObjectInfo)
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetMetaByOwnerId(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				param: stream.readNEXStructure(DataStoreSMMTypes.DataStoreGetMetaByOwnerIdParam)
			};
		} else {
			return {
				pMetaInfo: stream.readNEXList(DataStoreTypes.DataStoreMetaInfo),
				pHasNext: stream.readBoolean()
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static CustomSearchObject(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				condition: stream.readUInt32LE(),
				param: stream.readNEXStructure(DataStoreTypes.DataStoreSearchParam)
			};
		} else {
			return {
				pSearchResult: stream.readNEXStructure(DataStoreTypes.DataStoreSearchResult)
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static RateCustomRanking(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				params: stream.readNEXList(DataStoreSMMTypes.DataStoreRateCustomRankingParam)
			};
		} else {
			return {}; // * No response
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetCustomRanking(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				param: stream.readNEXStructure(DataStoreSMMTypes.DataStoreGetCustomRankingParam)
			};
		} else {
			return {
				pRankingResult: stream.readNEXList(DataStoreSMMTypes.DataStoreCustomRankingResult),
				pResults: stream.readNEXList(stream.readNEXResult)
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetCustomRankingByDataId(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				param: stream.readNEXStructure(DataStoreSMMTypes.DataStoreGetCustomRankingByDataIdParam)
			};
		} else {
			return {
				pRankingResult: stream.readNEXList(DataStoreSMMTypes.DataStoreCustomRankingResult, stream),
				pResults: stream.readNEXList(stream.readNEXResult)
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static DeleteCustomRanking(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				dataIdList: stream.readNEXList(stream.readUInt64LE)
			};
		} else {
			return {}; // * No response
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static AddToBufferQueue(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				param: stream.readNEXStructure(DataStoreSMMTypes.BufferQueueParam),
				buffer: stream.readNEXQBuffer()
			};
		} else {
			return {}; // * No response
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static AddToBufferQueues(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				params: stream.readNEXList(DataStoreSMMTypes.BufferQueueParam),
				buffers: stream.readNEXList(stream.readNEXQBuffer)
			};
		} else {
			return {
				pResults: stream.readNEXList(stream.readNEXResult)
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetBufferQueue(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				param: stream.readNEXStructure(DataStoreSMMTypes.BufferQueueParam)
			};
		} else {
			return {
				pBufferQueue: stream.readNEXList(stream.readNEXQBuffer)
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetBufferQueues(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				param: stream.readNEXList(DataStoreSMMTypes.BufferQueueParam)
			};
		} else {
			return {
				pBufferQueueLst: stream.readNEXList(() => stream.readNEXList(stream.readNEXQBuffer)), // * 2D List
				pResults: stream.readNEXList(stream.readNEXResult)
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static ClearBufferQueues(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				params: stream.readNEXList(DataStoreSMMTypes.BufferQueueParam)
			};
		} else {
			return {
				pResults: stream.readNEXList(stream.readNEXResult)
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static CompleteAttachFile(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				param: stream.readNEXStructure(DataStoreTypes.DataStoreCompletePostParam)
			};
		} else {
			return {
				pUrl: stream.readNEXString()
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static CompleteAttachFileV1(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				param: stream.readNEXStructure(DataStoreTypes.DataStoreCompletePostParamV1)
			};
		} else {
			return {
				pUrl: stream.readNEXString()
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static PrepareAttachFile(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				param: stream.readNEXStructure(DataStoreSMMTypes.DataStoreAttachFileParam)
			};
		} else {
			return {
				pReqPostInfo: stream.readNEXStructure(DataStoreTypes.DataStoreReqPostInfo)
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static ConditionalSearchObject(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				condition: stream.readUInt32LE(),
				param: stream.readNEXStructure(DataStoreTypes.DataStoreSearchParam),
				extraData: stream.readNEXList(stream.readNEXString),
			};
		} else {
			return {
				pRankingResults: stream.readNEXList(DataStoreSMMTypes.DataStoreCustomRankingResult)
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetApplicationConfig(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				applicationId: stream.readUInt32LE()
			};
		} else {
			return {
				config: stream.readNEXList(stream.readInt32LE)
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static SetApplicationConfig(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				applicationId: stream.readUInt32LE(),
				key: stream.readUInt32LE(),
				value: stream.readInt32LE()
			};
		} else {
			return {}; // * No response
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static DeleteApplicationConfig(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				applicationId: stream.readUInt32LE(),
				key: stream.readUInt32LE()
			};
		} else {
			return {}; // * No response
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static LatestCourseSearchObject(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				param: stream.readNEXStructure(DataStoreTypes.DataStoreSearchParam),
				extraData: stream.readNEXList(stream.readNEXString)
			};
		} else {
			return {
				pRankingResults: stream.readNEXList(DataStoreSMMTypes.DataStoreCustomRankingResult)
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static FollowingsLatestCourseSearchObject(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				param: stream.readNEXStructure(DataStoreTypes.DataStoreSearchParam),
				extraData: stream.readNEXList(stream.readNEXString)
			};
		} else {
			return {
				pRankingResults: stream.readNEXList(DataStoreSMMTypes.DataStoreCustomRankingResult)
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static RecommendedCourseSearchObject(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				param: stream.readNEXStructure(DataStoreTypes.DataStoreSearchParam),
				extraData: stream.readNEXList(stream.readNEXString)
			};
		} else {
			return {
				pRankingResults: stream.readNEXList(DataStoreSMMTypes.DataStoreCustomRankingResult)
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static ScoreRangeCascadedSearchObject(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				param: stream.readNEXStructure(DataStoreTypes.DataStoreSearchParam),
				extraData: stream.readNEXList(stream.readNEXString)
			};
		} else {
			return {
				pRankingResults: stream.readNEXList(DataStoreSMMTypes.DataStoreCustomRankingResult)
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static SuggestedCourseSearchObject(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				param: stream.readNEXStructure(DataStoreTypes.DataStoreSearchParam),
				extraData: stream.readNEXList(stream.readNEXString)
			};
		} else {
			return {
				pRankingResults: stream.readNEXList(DataStoreSMMTypes.DataStoreCustomRankingResult)
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static PreparePostObjectWithOwnerIdAndDataId(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				ownerId: stream.readUInt32LE(),
				dataId: stream.readUInt64LE(),
				param: stream.readNEXStructure(DataStoreTypes.DataStorePreparePostParam)
			};
		} else {
			return {
				pReqPostInfo: stream.readNEXStructure(DataStoreTypes.DataStoreReqPostInfo)
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static CompletePostObjectWithOwnerId(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				ownerId: stream.readUInt32LE(),
				param: stream.readNEXStructure(DataStoreTypes.DataStoreCompletePostParam)
			};
		} else {
			return {}; // * No response
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static UploadCourseRecord(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				param: stream.readNEXStructure(DataStoreSMMTypes.DataStoreUploadCourseRecordParam)
			};
		} else {
			return {}; // * No response
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetCourseRecord(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				param: stream.readNEXStructure(DataStoreSMMTypes.DataStoreGetCourseRecordParam)
			};
		} else {
			return {
				result: stream.readNEXStructure(DataStoreSMMTypes.DataStoreGetCourseRecordResult)
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static DeleteCourseRecord(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				param: stream.readNEXStructure(DataStoreSMMTypes.DataStoreGetCourseRecordParam)
			};
		} else {
			return {}; // * No response
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetApplicationConfigString(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				applicationId: stream.readUInt32LE()
			};
		} else {
			return {
				config: stream.readNEXList(stream.readNEXString)
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static SetApplicationConfigString(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				applicationId: stream.readUInt32LE(),
				key: stream.readUInt32LE(),
				value: stream.readNEXString()
			};
		} else {
			return {}; // * No response
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetDeletionReason(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				dataIdLst: stream.readNEXList(stream.readUInt64LE)
			};
		} else {
			return {
				pDeletionReasons: stream.readNEXList(stream.readUInt32LE)
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static SetDeletionReason(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				dataIdLst: stream.readNEXList(stream.readUInt64LE),
				deletionReason: stream.readUInt32LE()
			};
		} else {
			return {}; // * No response
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetMetasWithCourseRecord(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				params: stream.readNEXList(DataStoreSMMTypes.DataStoreGetCourseRecordParam),
				metaParam: stream.readNEXStructure(DataStoreTypes.DataStoreGetMetaParam)
			};
		} else {
			return {
				pMetaInfo: stream.readNEXList(DataStoreTypes.DataStoreMetaInfo),
				pCourseResults: stream.readNEXList(DataStoreSMMTypes.DataStoreGetCourseRecordResult),
				pResults: stream.readNEXList(stream.readNEXResult)
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static CheckRateCustomRankingCounter(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				applicationId: stream.readUInt32LE()
			};
		} else {
			return {
				isBelowThreshold: stream.readBoolean()
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static ResetRateCustomRankingCounter(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				applicationId: stream.readUInt32LE()
			};
		} else {
			return {}; // * No response
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static BestScoreRateCourseSearchObject(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				param: stream.readNEXStructure(DataStoreTypes.DataStoreSearchParam),
				extraData: stream.readNEXList(stream.readNEXString)
			};
		} else {
			return {
				pRankingResults: stream.readNEXList(DataStoreSMMTypes.DataStoreCustomRankingResult)
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static CTRPickUpCourseSearchObject(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				param: stream.readNEXStructure(DataStoreTypes.DataStoreSearchParam),
				extraData: stream.readNEXList(stream.readNEXString)
			};
		} else {
			return {
				pRankingResults: stream.readNEXList(DataStoreSMMTypes.DataStoreCustomRankingResult)
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static SetCachedRanking(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				rankingType: stream.readNEXString(),
				rankingArgs: stream.readNEXList(stream.readNEXString),
				dataIdLst: stream.readNEXList(stream.readUInt64LE)
			};
		} else {
			return {}; // * No response
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static DeleteCachedRanking(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				rankingType: stream.readNEXString(),
				rankingArgs: stream.readNEXList(stream.readNEXString)
			};
		} else {
			return {}; // * No response
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static ChangePlayablePlatform(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				params: stream.readNEXList(DataStoreSMMTypes.DataStoreChangePlayablePlatformParam)
			};
		} else {
			return {}; // * No response
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @returns {object} Parsed RMC body
	 */
	static SearchUnknownPlatformObjects(rmcMessage) {
		// ! This function has an unknown request/response format
		if (rmcMessage.isRequest()) {
			return {
				unknown: rmcMessage.body
			};
		} else {
			return {
				unknown: rmcMessage.body
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static ReportCourse(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				param: stream.readNEXStructure(DataStoreSMMTypes.DataStoreReportCourseParam)
			};
		} else {
			return {}; // * No response
		}
	}
}

module.exports = DataStoreSMM;