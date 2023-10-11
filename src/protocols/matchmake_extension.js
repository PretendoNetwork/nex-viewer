/**
 * @typedef {import('../packet')} Packet
 * @typedef {import('../packetv0')} PacketV0
 * @typedef {import('../packetv1')} PacketV1
 * @typedef {import('../rmc')} RMCMessage
 */

const Stream = require('../stream');

const MatchmakeExtensionMK8 = require('./patches/matchmake_extension_mk8');

const Requests = require('./requests/matchmake_extension');
const Responses = require('./responses/matchmake_extension');

class MatchmakeExtension {
	static ProtocolID = 0x6d;

	static ProtocolName = 'Matchmake extension';

	static Methods = {
		CloseParticipation: 0x01,
		OpenParticipation: 0x02,
		AutoMatchmake_Postpone: 0x03,
		BrowseMatchmakeSession: 0x04,
		BrowseMatchmakeSessionWithHostUrls: 0x05,
		CreateMatchmakeSession: 0x06,
		JoinMatchmakeSession: 0x07,
		ModifyCurrentGameAttribute: 0x08,
		UpdateNotificationData: 0x09,
		GetFriendNotificationData: 0x0a,
		UpdateApplicationBuffer: 0x0b,
		UpdateMatchmakeSessionAttribute: 0x0c,
		GetlstFriendNotificationData: 0x0d,
		UpdateMatchmakeSession: 0x0e,
		AutoMatchmakeWithSearchCriteria_Postpone: 0x0f,
		GetPlayingSession: 0x10,
		CreateCommunity: 0x11,
		UpdateCommunity: 0x12,
		JoinCommunity: 0x13,
		FindCommunityByGatheringId: 0x14,
		FindOfficialCommunity: 0x15,
		FindCommunityByParticipant: 0x16,
		UpdatePrivacySetting: 0x17,
		GetMyBlockList: 0x18,
		AddToBlockList: 0x19,
		RemoveFromBlockList: 0x1a,
		ClearMyBlockList: 0x1b,
		ReportViolation: 0x1c,
		IsViolationUser: 0x1d,
		JoinMatchmakeSessionEx: 0x1e,
		GetSimplePlayingSession: 0x1f,
		GetSimpleCommunity: 0x20,
		AutoMatchmakeWithGatheringId_Postpone: 0x21,
		UpdateProgressScore: 0x22,
		DebugNotifyEvent: 0x23,
		GenerateMatchmakeSessionSystemPassword: 0x24,
		ClearMatchmakeSessionSystemPassword: 0x25,
		CreateMatchmakeSessionWithParam: 0x26,
		JoinMatchmakeSessionWithParam: 0x27,
		AutoMatchmakeWithParam_Postpone: 0x28,
		FindMatchmakeSessionByGatheringIdDetail: 0x29,
		BrowseMatchmakeSessionNoHolder: 0x2a,
		BrowseMatchmakeSessionWithHostUrlsNoHolder: 0x2b,
		UpdateMatchmakeSessionPart: 0x2c,
		RequestMatchmaking: 0x2d,
		WithdrawMatchmaking: 0x2e,
		WithdrawMatchmakingAll: 0x2f,
		FindMatchmakeSessionByGatheringId: 0x30,
		FindMatchmakeSessionBySingleGatheringId: 0x31,
		FindMatchmakeSessionByOwner: 0x32,
		FindMatchmakeSessionByParticipant: 0x33,
		BrowseMatchmakeSessionNoHolderNoResultRange: 0x34,
		BrowseMatchmakeSessionWithHostUrlsNoHolderNoResultRange: 0x35,
		FindCommunityByOwner: 0x36
	};

	static MethodNames = Object.entries(MatchmakeExtension.Methods).reduce((namesObject, entry) => {
		const [key, value] = entry;
		namesObject[value] = key;
		return namesObject;
	}, {});

	static Handlers = {
		0x01: MatchmakeExtension.CloseParticipation,
		0x02: MatchmakeExtension.OpenParticipation,
		0x03: MatchmakeExtension.AutoMatchmake_Postpone,
		0x04: MatchmakeExtension.BrowseMatchmakeSession,
		0x05: MatchmakeExtension.BrowseMatchmakeSessionWithHostUrls,
		0x06: MatchmakeExtension.CreateMatchmakeSession,
		0x07: MatchmakeExtension.JoinMatchmakeSession,
		0x08: MatchmakeExtension.ModifyCurrentGameAttribute,
		0x09: MatchmakeExtension.UpdateNotificationData,
		0x0a: MatchmakeExtension.GetFriendNotificationData,
		0x0b: MatchmakeExtension.UpdateApplicationBuffer,
		0x0c: MatchmakeExtension.UpdateMatchmakeSessionAttribute,
		0x0d: MatchmakeExtension.GetlstFriendNotificationData,
		0x0e: MatchmakeExtension.UpdateMatchmakeSession,
		0x0f: MatchmakeExtension.AutoMatchmakeWithSearchCriteria_Postpone,
		0x10: MatchmakeExtension.GetPlayingSession,
		0x11: MatchmakeExtension.CreateCommunity,
		0x12: MatchmakeExtension.UpdateCommunity,
		0x13: MatchmakeExtension.JoinCommunity,
		0x14: MatchmakeExtension.FindCommunityByGatheringId,
		0x15: MatchmakeExtension.FindOfficialCommunity,
		0x16: MatchmakeExtension.FindCommunityByParticipant,
		0x17: MatchmakeExtension.UpdatePrivacySetting,
		0x18: MatchmakeExtension.GetMyBlockList,
		0x19: MatchmakeExtension.AddToBlockList,
		0x1a: MatchmakeExtension.RemoveFromBlockList,
		0x1b: MatchmakeExtension.ClearMyBlockList,
		0x1c: MatchmakeExtension.ReportViolation,
		0x1d: MatchmakeExtension.IsViolationUser,
		0x1e: MatchmakeExtension.JoinMatchmakeSessionEx,
		0x1f: MatchmakeExtension.GetSimplePlayingSession,
		0x20: MatchmakeExtension.GetSimpleCommunity,
		0x21: MatchmakeExtension.AutoMatchmakeWithGatheringId_Postpone,
		0x22: MatchmakeExtension.UpdateProgressScore,
		0x23: MatchmakeExtension.DebugNotifyEvent,
		0x24: MatchmakeExtension.GenerateMatchmakeSessionSystemPassword,
		0x25: MatchmakeExtension.ClearMatchmakeSessionSystemPassword,
		0x26: MatchmakeExtension.CreateMatchmakeSessionWithParam,
		0x27: MatchmakeExtension.JoinMatchmakeSessionWithParam,
		0x28: MatchmakeExtension.AutoMatchmakeWithParam_Postpone,
		0x29: MatchmakeExtension.FindMatchmakeSessionByGatheringIdDetail,
		0x2a: MatchmakeExtension.BrowseMatchmakeSessionNoHolder,
		0x2b: MatchmakeExtension.BrowseMatchmakeSessionWithHostUrlsNoHolder,
		0x2c: MatchmakeExtension.UpdateMatchmakeSessionPart,
		0x2d: MatchmakeExtension.RequestMatchmaking,
		0x2e: MatchmakeExtension.WithdrawMatchmaking,
		0x2f: MatchmakeExtension.WithdrawMatchmakingAll,
		0x30: MatchmakeExtension.FindMatchmakeSessionByGatheringId,
		0x31: MatchmakeExtension.FindMatchmakeSessionBySingleGatheringId,
		0x32: MatchmakeExtension.FindMatchmakeSessionByOwner,
		0x33: MatchmakeExtension.FindMatchmakeSessionByParticipant,
		0x34: MatchmakeExtension.BrowseMatchmakeSessionNoHolderNoResultRange,
		0x35: MatchmakeExtension.BrowseMatchmakeSessionWithHostUrlsNoHolderNoResultRange
	};

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet PRUDP packet
	 */
	static handlePacket(packet) {
		const methodId = packet.rmcMessage.methodId;

		// Check if method is a Mario Kart 8 patched method
		if (packet.connection.accessKey === '25dbf96a' && methodId >= 36 && methodId <= 41) {
			MatchmakeExtensionMK8.handlePacket(packet);
			return;
		}

		const handler = MatchmakeExtension.Handlers[methodId];

		if (!handler) {
			console.log(`Unknown MatchmakeExtension method ID ${methodId} (0x${methodId?.toString(16)}) (${MatchmakeExtension.MethodNames[methodId]})`);
			return;
		}

		const { rmcMessage } = packet;
		const stream = new Stream(rmcMessage.body, packet.connection);

		packet.rmcData = {
			body: handler(rmcMessage, stream)
		};
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static CloseParticipation(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.CloseParticipationRequest(stream);
		} else {
			return new Responses.CloseParticipationResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static OpenParticipation(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.OpenParticipationRequest(stream);
		} else {
			return new Responses.OpenParticipationResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static AutoMatchmake_Postpone(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.AutoMatchmake_PostponeRequest(stream);
		} else {
			return new Responses.AutoMatchmake_PostponeResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static BrowseMatchmakeSession(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.BrowseMatchmakeSessionRequest(stream);
		} else {
			return new Responses.BrowseMatchmakeSessionResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static BrowseMatchmakeSessionWithHostUrls(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.BrowseMatchmakeSessionWithHostUrlsRequest(stream);
		} else {
			return new Responses.BrowseMatchmakeSessionWithHostUrlsResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static CreateMatchmakeSession(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.CreateMatchmakeSessionRequest(stream);
		} else {
			return new Responses.CreateMatchmakeSessionResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static JoinMatchmakeSession(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.JoinMatchmakeSessionRequest(stream);
		} else {
			return new Responses.JoinMatchmakeSessionResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static ModifyCurrentGameAttribute(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.ModifyCurrentGameAttributeRequest(stream);
		} else {
			return new Responses.ModifyCurrentGameAttributeResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static UpdateNotificationData(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.UpdateNotificationDataRequest(stream);
		} else {
			return new Responses.UpdateNotificationDataResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetFriendNotificationData(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetFriendNotificationDataRequest(stream);
		} else {
			return new Responses.GetFriendNotificationDataResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static UpdateApplicationBuffer(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.UpdateApplicationBufferRequest(stream);
		} else {
			return new Responses.UpdateApplicationBufferResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static UpdateMatchmakeSessionAttribute(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.UpdateMatchmakeSessionAttributeRequest(stream);
		} else {
			return new Responses.UpdateMatchmakeSessionAttributeResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetlstFriendNotificationData(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetlstFriendNotificationDataRequest(stream);
		} else {
			return new Responses.GetlstFriendNotificationDataResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static UpdateMatchmakeSession(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.UpdateMatchmakeSessionRequest(stream);
		} else {
			return new Responses.UpdateMatchmakeSessionResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static AutoMatchmakeWithSearchCriteria_Postpone(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.AutoMatchmakeWithSearchCriteria_PostponeRequest(stream);
		} else {
			return new Responses.AutoMatchmakeWithSearchCriteria_PostponeResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetPlayingSession(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetPlayingSessionRequest(stream);
		} else {
			return new Responses.GetPlayingSessionResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static CreateCommunity(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.CreateCommunityRequest(stream);
		} else {
			return new Responses.CreateCommunityResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static UpdateCommunity(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.UpdateCommunityRequest(stream);
		} else {
			return new Responses.UpdateCommunityResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static JoinCommunity(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.JoinCommunityRequest(stream);
		} else {
			return new Responses.JoinCommunityResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static FindCommunityByGatheringId(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.FindCommunityByGatheringIdRequest(stream);
		} else {
			return new Responses.FindCommunityByGatheringIdResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static FindOfficialCommunity(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.FindOfficialCommunityRequest(stream);
		} else {
			return new Responses.FindOfficialCommunityResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static FindCommunityByParticipant(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.FindCommunityByParticipantRequest(stream);
		} else {
			return new Responses.FindCommunityByParticipantResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static UpdatePrivacySetting(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.UpdatePrivacySettingRequest(stream);
		} else {
			return new Responses.UpdatePrivacySettingResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetMyBlockList(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetMyBlockListRequest(stream);
		} else {
			return new Responses.GetMyBlockListResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static AddToBlockList(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.AddToBlockListRequest(stream);
		} else {
			return new Responses.AddToBlockListResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static RemoveFromBlockList(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.RemoveFromBlockListRequest(stream);
		} else {
			return new Responses.RemoveFromBlockListResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @returns {object} Parsed RMC body
	 */
	static ClearMyBlockList(rmcMessage) {
		if (rmcMessage.isRequest()) {
			return new Requests.ClearMyBlockListRequest();
		} else {
			return new Responses.ClearMyBlockListResponse();
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static ReportViolation(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.ReportViolationRequest(stream);
		} else {
			return new Responses.ReportViolationResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static IsViolationUser(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.IsViolationUserRequest(stream);
		} else {
			return new Responses.IsViolationUserResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static JoinMatchmakeSessionEx(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.JoinMatchmakeSessionExRequest(stream);
		} else {
			return new Responses.JoinMatchmakeSessionExResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetSimplePlayingSession(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetSimplePlayingSessionRequest(stream);
		} else {
			return new Responses.GetSimplePlayingSessionResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetSimpleCommunity(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetSimpleCommunityRequest(stream);
		} else {
			return new Responses.GetSimpleCommunityResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static AutoMatchmakeWithGatheringId_Postpone(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.AutoMatchmakeWithGatheringId_PostponeRequest(stream);
		} else {
			return new Responses.AutoMatchmakeWithGatheringId_PostponeResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static UpdateProgressScore(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.UpdateProgressScoreRequest(stream);
		} else {
			return new Responses.UpdateProgressScoreResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static DebugNotifyEvent(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.DebugNotifyEventRequest(stream);
		} else {
			return new Responses.DebugNotifyEventResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GenerateMatchmakeSessionSystemPassword(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GenerateMatchmakeSessionSystemPasswordRequest(stream);
		} else {
			return new Responses.GenerateMatchmakeSessionSystemPasswordResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static ClearMatchmakeSessionSystemPassword(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.ClearMatchmakeSessionSystemPasswordRequest(stream);
		} else {
			return new Responses.ClearMatchmakeSessionSystemPasswordResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static CreateMatchmakeSessionWithParam(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.CreateMatchmakeSessionWithParamRequest(stream);
		} else {
			return new Responses.CreateMatchmakeSessionWithParamResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static JoinMatchmakeSessionWithParam(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.JoinMatchmakeSessionWithParamRequest(stream);
		} else {
			return new Responses.JoinMatchmakeSessionWithParamResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static AutoMatchmakeWithParam_Postpone(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.AutoMatchmakeWithParam_PostponeRequest(stream);
		} else {
			return new Responses.AutoMatchmakeWithParam_PostponeResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static FindMatchmakeSessionByGatheringIdDetail(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.FindMatchmakeSessionByGatheringIdDetailRequest(stream);
		} else {
			return new Responses.FindMatchmakeSessionByGatheringIdDetailResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static BrowseMatchmakeSessionNoHolder(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.BrowseMatchmakeSessionNoHolderRequest(stream);
		} else {
			return new Responses.BrowseMatchmakeSessionNoHolderResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static BrowseMatchmakeSessionWithHostUrlsNoHolder(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.BrowseMatchmakeSessionWithHostUrlsNoHolderRequest(stream);
		} else {
			return new Responses.BrowseMatchmakeSessionWithHostUrlsNoHolderResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static UpdateMatchmakeSessionPart(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.UpdateMatchmakeSessionPartRequest(stream);
		} else {
			return new Responses.UpdateMatchmakeSessionPartResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static RequestMatchmaking(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.RequestMatchmakingRequest(stream);
		} else {
			return new Responses.RequestMatchmakingResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static WithdrawMatchmaking(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.WithdrawMatchmakingRequest(stream);
		} else {
			return new Responses.WithdrawMatchmakingResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @returns {object} Parsed RMC body
	 */
	static WithdrawMatchmakingAll(rmcMessage) {
		if (rmcMessage.isRequest()) {
			return new Requests.WithdrawMatchmakingAllRequest();
		} else {
			return new Responses.WithdrawMatchmakingAllResponse();
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static FindMatchmakeSessionByGatheringId(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.FindMatchmakeSessionByGatheringIdRequest(stream);
		} else {
			return new Responses.FindMatchmakeSessionByGatheringIdResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static FindMatchmakeSessionBySingleGatheringId(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.FindMatchmakeSessionBySingleGatheringIdRequest(stream);
		} else {
			return new Responses.FindMatchmakeSessionBySingleGatheringIdResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static FindMatchmakeSessionByOwner(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.FindMatchmakeSessionByOwnerRequest(stream);
		} else {
			return new Responses.FindMatchmakeSessionByOwnerResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static FindMatchmakeSessionByParticipant(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.FindMatchmakeSessionByParticipantRequest(stream);
		} else {
			return new Responses.FindMatchmakeSessionByParticipantResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static BrowseMatchmakeSessionNoHolderNoResultRange(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.BrowseMatchmakeSessionNoHolderNoResultRangeRequest(stream);
		} else {
			return new Responses.BrowseMatchmakeSessionNoHolderNoResultRangeResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static BrowseMatchmakeSessionWithHostUrlsNoHolderNoResultRange(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.BrowseMatchmakeSessionWithHostUrlsNoHolderNoResultRangeRequest(stream);
		} else {
			return new Responses.BrowseMatchmakeSessionWithHostUrlsNoHolderNoResultRangeResponse(stream);
		}
	}
}

module.exports = MatchmakeExtension;