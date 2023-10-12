/**
 * @typedef {import('../../packet')} Packet
 * @typedef {import('../../packetv0')} PacketV0
 * @typedef {import('../../packetv1')} PacketV1
 * @typedef {import('../../rmc')} RMCMessage
 */

const Stream = require('../../stream');

const Requests = require('../requests/datastore_smm');
const Responses = require('../responses/datastore_smm');

class DataStoreSMM {
	static ProtocolID = 0x73;

	static ProtocolName = 'DataStore (SMM)';

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

		packet.rmcData = {
			protocolName: this.ProtocolName,
			methodName: this.MethodNames[methodId],
			body: handler(rmcMessage, stream)
		};
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetObjectInfos(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetObjectInfosRequest(stream);
		} else {
			return new Responses.GetObjectInfosResponse(stream);
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
			return new Requests.GetMetaByOwnerIdRequest(stream);
		} else {
			return new Responses.GetMetaByOwnerIdResponse(stream);
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
			return new Requests.CustomSearchObjectRequest(stream);
		} else {
			return new Responses.CustomSearchObjectResponse(stream);
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
			return new Requests.RateCustomRankingRequest(stream);
		} else {
			return new Responses.RateCustomRankingResponse(stream);
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
			return new Requests.GetCustomRankingRequest(stream);
		} else {
			return new Responses.GetCustomRankingResponse(stream);
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
			return new Requests.GetCustomRankingByDataIdRequest(stream);
		} else {
			return new Responses.GetCustomRankingByDataIdResponse(stream);
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
			return new Requests.DeleteCustomRankingRequest(stream);
		} else {
			return new Responses.DeleteCustomRankingResponse(stream);
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
			return new Requests.AddToBufferQueueRequest(stream);
		} else {
			return new Responses.AddToBufferQueueResponse(stream);
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
			return new Requests.AddToBufferQueuesRequest(stream);
		} else {
			return new Responses.AddToBufferQueuesResponse(stream);
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
			return new Requests.GetBufferQueueRequest(stream);
		} else {
			return new Responses.GetBufferQueueResponse(stream);
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
			return new Requests.GetBufferQueuesRequest(stream);
		} else {
			return new Responses.GetBufferQueuesResponse(stream);
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
			return new Requests.ClearBufferQueuesRequest(stream);
		} else {
			return new Responses.ClearBufferQueuesResponse(stream);
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
			return new Requests.CompleteAttachFileRequest(stream);
		} else {
			return new Responses.CompleteAttachFileResponse(stream);
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
			return new Requests.CompleteAttachFileV1Request(stream);
		} else {
			return new Responses.CompleteAttachFileV1Response(stream);
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
			return new Requests.PrepareAttachFileRequest(stream);
		} else {
			return new Responses.PrepareAttachFileResponse(stream);
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
			return new Requests.ConditionalSearchObjectRequest(stream);
		} else {
			return new Responses.ConditionalSearchObjectResponse(stream);
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
			return new Requests.GetApplicationConfigRequest(stream);
		} else {
			return new Responses.GetApplicationConfigResponse(stream);
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
			return new Requests.SetApplicationConfigRequest(stream);
		} else {
			return new Responses.SetApplicationConfigResponse(stream);
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
			return new Requests.DeleteApplicationConfigRequest(stream);
		} else {
			return new Responses.DeleteApplicationConfigResponse(stream);
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
			return new Requests.LatestCourseSearchObjectRequest(stream);
		} else {
			return new Responses.LatestCourseSearchObjectResponse(stream);
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
			return new Requests.FollowingsLatestCourseSearchObjectRequest(stream);
		} else {
			return new Responses.FollowingsLatestCourseSearchObjectResponse(stream);
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
			return new Requests.RecommendedCourseSearchObjectRequest(stream);
		} else {
			return new Responses.RecommendedCourseSearchObjectResponse(stream);
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
			return new Requests.ScoreRangeCascadedSearchObjectRequest(stream);
		} else {
			return new Responses.ScoreRangeCascadedSearchObjectResponse(stream);
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
			return new Requests.SuggestedCourseSearchObjectRequest(stream);
		} else {
			return new Responses.SuggestedCourseSearchObjectResponse(stream);
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
			return new Requests.PreparePostObjectWithOwnerIdAndDataIdRequest(stream);
		} else {
			return new Responses.PreparePostObjectWithOwnerIdAndDataIdResponse(stream);
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
			return new Requests.CompletePostObjectWithOwnerIdRequest(stream);
		} else {
			return new Responses.CompletePostObjectWithOwnerIdResponse(stream);
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
			return new Requests.UploadCourseRecordRequest(stream);
		} else {
			return new Responses.UploadCourseRecordResponse(stream);
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
			return new Requests.GetCourseRecordRequest(stream);
		} else {
			return new Responses.GetCourseRecordResponse(stream);
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
			return new Requests.DeleteCourseRecordRequest(stream);
		} else {
			return new Responses.DeleteCourseRecordResponse(stream);
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
			return new Requests.GetApplicationConfigStringRequest(stream);
		} else {
			return new Responses.GetApplicationConfigStringResponse(stream);
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
			return new Requests.SetApplicationConfigStringRequest(stream);
		} else {
			return new Responses.SetApplicationConfigStringResponse(stream);
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
			return new Requests.GetDeletionReasonRequest(stream);
		} else {
			return new Responses.GetDeletionReasonResponse(stream);
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
			return new Requests.SetDeletionReasonRequest(stream);
		} else {
			return new Responses.SetDeletionReasonResponse(stream);
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
			return new Requests.GetMetasWithCourseRecordRequest(stream);
		} else {
			return new Responses.GetMetasWithCourseRecordResponse(stream);
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
			return new Requests.CheckRateCustomRankingCounterRequest(stream);
		} else {
			return new Responses.CheckRateCustomRankingCounterResponse(stream);
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
			return new Requests.ResetRateCustomRankingCounterRequest(stream);
		} else {
			return new Responses.ResetRateCustomRankingCounterResponse(stream);
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
			return new Requests.BestScoreRateCourseSearchObjectRequest(stream);
		} else {
			return new Responses.BestScoreRateCourseSearchObjectResponse(stream);
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
			return new Requests.CTRPickUpCourseSearchObjectRequest(stream);
		} else {
			return new Responses.CTRPickUpCourseSearchObjectResponse(stream);
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
			return new Requests.SetCachedRankingRequest(stream);
		} else {
			return new Responses.SetCachedRankingResponse(stream);
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
			return new Requests.DeleteCachedRankingRequest(stream);
		} else {
			return new Responses.DeleteCachedRankingResponse(stream);
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
			return new Requests.ChangePlayablePlatformRequest(stream);
		} else {
			return new Responses.ChangePlayablePlatformResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static SearchUnknownPlatformObjects(rmcMessage, stream) {
		// ! This function has an unknown request/response format
		if (rmcMessage.isRequest()) {
			return new Requests.SearchUnknownPlatformObjectsRequest(stream);
		} else {
			return new Responses.SearchUnknownPlatformObjectsResponse(stream);
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
			return new Requests.ReportCourseRequest(stream);
		} else {
			return new Responses.ReportCourseResponse(stream);
		}
	}
}

module.exports = DataStoreSMM;