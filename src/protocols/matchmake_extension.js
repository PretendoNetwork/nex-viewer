const Packet = require('../packet'); // eslint-disable-line no-unused-vars
const PacketV0 = require('../packetv0'); // eslint-disable-line no-unused-vars
const PacketV1 = require('../packetv1'); // eslint-disable-line no-unused-vars
const RMCMessage = require('../rmc'); // eslint-disable-line no-unused-vars
const Stream = require('../stream');
const NEXTypes = require('../types');

const MatchMakingTypes = require('./types/match_making');
const NotificationsTypes = require('./types/notifications');

class MatchmakeExtension {
	static ProtocolID = 0x6d;

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

		const handler = MatchmakeExtension.Handlers[methodId];

		if (!handler) {
			console.log(`Unknown MatchmakeExtension method ID ${methodId} (0x${methodId?.toString(16)}) (${MatchmakeExtension.MethodNames[methodId]})`);
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
	static CloseParticipation(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				gid: stream.readUInt32LE()
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
	static OpenParticipation(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				gid: stream.readUInt32LE()
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
	static AutoMatchmake_Postpone(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				anyGathering: stream.readNEXAnyDataHolder(),
				strMessage: stream.readNEXString()
			};
		} else {
			return {
				joinedGathering: stream.readNEXAnyDataHolder()
			};
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
			return {
				searchCriteria: stream.readNEXStructure(MatchMakingTypes.MatchmakeSessionSearchCriteria),
				resultRange: stream.readNEXStructure(NEXTypes.ResultRange)
			};
		} else {
			return {
				lstGathering: stream.readNEXList(stream.readNEXAnyDataHolder)
			};
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
			return {
				searchCriteria: stream.readNEXStructure(MatchMakingTypes.MatchmakeSessionSearchCriteria),
				resultRange: stream.readNEXStructure(NEXTypes.ResultRange)
			};
		} else {
			return {
				lstGathering: stream.readNEXList(stream.readNEXAnyDataHolder),
				lstGatheringUrls: stream.readNEXList(MatchMakingTypes.GatheringURLs)
			};
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
			const returnData = {
				anyGathering: stream.readNEXAnyDataHolder(),
				strMessage: stream.readNEXString()
			};

			if (stream.connection.title.nex_version.major >= 3 && stream.connection.title.nex_version.minor >= 5) {
				returnData.participationCount = stream.readUInt16LE();
			}

			return returnData;
		} else {
			return {
				gid: stream.readUInt32LE(),
				sessionKey: stream.readNEXBuffer()
			};
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
			return {
				gid: stream.readUInt32LE(),
				strMessage: stream.readNEXString()
			};
		} else {
			return {
				sessionKey: stream.readNEXBuffer()
			};
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
			return {
				gid: stream.readUInt32LE(),
				attribIndex: stream.readUInt32LE(),
				newValue: stream.readUInt32LE()
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
	static UpdateNotificationData(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			// * This has a different format on the Switch
			// * On the Switch uiParam1 and uiParam2 are uint64
			return {
				uiType: stream.readUInt32LE(),
				uiParam1: stream.readUInt32LE(),
				uiParam2: stream.readUInt32LE(),
				strParam: stream.readNEXString()
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
	static GetFriendNotificationData(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				uiType: stream.readInt32LE()
			};
		} else {
			return {
				dataList: stream.readNEXList(NotificationsTypes.NotificationEvent)
			};
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
			return {
				gid: stream.readInt32LE(),
				applicationBuffer: stream.readNEXBuffer()
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
	static UpdateMatchmakeSessionAttribute(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				gid: stream.readInt32LE(),
				attribs: stream.readNEXList(stream.readInt32LE)
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
	static GetlstFriendNotificationData(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				lstTypes: stream.readNEXList(stream.readInt32LE)
			};
		} else {
			return {
				dataList: stream.readNEXList(NotificationsTypes.NotificationEvent)
			};
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
			return {
				anyGathering: stream.readNEXAnyDataHolder()
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
	static AutoMatchmakeWithSearchCriteria_Postpone(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				lstSearchCriteria: stream.readNEXList(MatchMakingTypes.MatchmakeSessionSearchCriteria),
				anyGathering: stream.readNEXAnyDataHolder(),
				strMessage: stream.readNEXString()
			};
		} else {
			return {
				joinedGathering: stream.readNEXAnyDataHolder()
			};
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
			return {
				lstPid: stream.readNEXList(stream.readUInt32LE)
			};
		} else {
			return {
				lstPlayingSession: stream.readNEXList(MatchMakingTypes.PlayingSession)
			};
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
			return {
				community: stream.readNEXStructure(MatchMakingTypes.PersistentGathering),
				strMessage: stream.readNEXString(),
			};
		} else {
			return {
				gid: stream.readUInt32LE()
			};
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
			return {
				community: stream.readNEXStructure(MatchMakingTypes.PersistentGathering)
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
	static JoinCommunity(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				gid: stream.readUInt32LE(),
				strMessage: stream.readNEXString(),
				strPassword: stream.readNEXString()
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
	static FindCommunityByGatheringId(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				lstGid: stream.readNEXList(stream.readUInt32LE)
			};
		} else {
			return {
				lstCommunity: stream.readNEXList(MatchMakingTypes.PersistentGathering)
			};
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
			return {
				isAvailableOnly: stream.readBoolean(),
				resultRange: stream.readNEXStructure(NEXTypes.ResultRange)
			};
		} else {
			return {
				lstCommunity: stream.readNEXList(MatchMakingTypes.PersistentGathering)
			};
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
			return {
				pid: stream.readUInt32LE(),
				resultRange: stream.readNEXStructure(NEXTypes.ResultRange)
			};
		} else {
			return {
				lstCommunity: stream.readNEXList(MatchMakingTypes.PersistentGathering)
			};
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
			return {
				onlineStatus: stream.readBoolean(),
				participationCommunity: stream.readBoolean()
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
	static GetMyBlockList(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {}; // * No request
		} else {
			return {
				lstPrincipalId: stream.readNEXList(stream.readUInt32LE)
			};
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
			return {
				lstPrincipalId: stream.readNEXList(stream.readUInt32LE)
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
	static RemoveFromBlockList(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				lstPrincipalId: stream.readNEXList(stream.readUInt32LE)
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
	static ClearMyBlockList(rmcMessage) {
		if (rmcMessage.isRequest()) {
			return {}; // * No request
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
	static ReportViolation(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				pid: stream.readUInt32LE(),
				userName: stream.readNEXString(),
				violationCode: stream.readUInt32LE()
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
	static IsViolationUser(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {}; // * No request
		} else {
			return {
				flag: stream.readBoolean(),
				score: stream.readUInt32LE()
			};
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
			return {
				gid: stream.readUInt32LE(),
				strMessage: stream.readNEXString(),
				dontCareMyBlockList: stream.readBoolean(),
				participationCount: stream.readUInt16LE()
			};
		} else {
			return {
				sessionKey: stream.readNEXBuffer()
			};
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
			return {
				lstPrincipalId: stream.readNEXList(stream.readUInt32LE),
				includeLoginUser: stream.readBoolean()
			};
		} else {
			return {
				lstSimplePlayingSession: stream.readNEXList(MatchMakingTypes.SimplePlayingSession)
			};
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
			return {
				gatheringIdList: stream.readNEXList(stream.readUInt32LE)
			};
		} else {
			return {
				lstSimpleCommunityList: stream.readNEXList(MatchMakingTypes.SimpleCommunity)
			};
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
			return {
				lstGid: stream.readNEXList(stream.readUInt32LE),
				anyGathering: stream.readNEXAnyDataHolder(),
				strMessage: stream.readNEXString()
			};
		} else {
			return {
				joinedGathering: stream.readNEXAnyDataHolder()
			};
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
			return {
				gid: stream.readUInt32LE(),
				progressScore: stream.readUInt8()
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
	static DebugNotifyEvent(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				pid: stream.readUInt32LE(),
				mainType: stream.readUInt32LE(),
				subType: stream.readUInt32LE(),
				param1: stream.readUInt64LE(),
				param2: stream.readUInt64LE(),
				stringParam: stream.readNEXString()
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
	static GenerateMatchmakeSessionSystemPassword(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				gid: stream.readUInt32LE()
			};
		} else {
			return {
				password: stream.readNEXString()
			};
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
			return {
				gid: stream.readUInt32LE()
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
	static CreateMatchmakeSessionWithParam(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				createMatchmakeSessionParam: stream.readNEXStructure(MatchMakingTypes.CreateMatchmakeSessionParam)
			};
		} else {
			return {
				joinedMatchmakeSession: stream.readNEXStructure(MatchMakingTypes.MatchmakeSession)
			};
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
			return {
				joinMatchmakeSessionParam: stream.readNEXStructure(MatchMakingTypes.JoinMatchmakeSessionParam)
			};
		} else {
			return {
				joinedMatchmakeSession: stream.readNEXStructure(MatchMakingTypes.MatchmakeSession)
			};
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
			return {
				autoMatchmakeParam: stream.readNEXStructure(MatchMakingTypes.AutoMatchmakeParam)
			};
		} else {
			return {
				joinedMatchmakeSession: stream.readNEXStructure(MatchMakingTypes.MatchmakeSession)
			};
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
			return {
				gid: stream.readUInt32LE()
			};
		} else {
			return {
				matchmakeSession: stream.readNEXStructure(MatchMakingTypes.MatchmakeSession)
			};
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
			return {
				searchCriteria: stream.readNEXStructure(MatchMakingTypes.MatchmakeSessionSearchCriteria),
				resultRange: stream.readNEXStructure(NEXTypes.ResultRange)
			};
		} else {
			return {
				lstMatchmakeSession: stream.readNEXList(MatchMakingTypes.MatchmakeSession)
			};
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
			return {
				searchCriteria: stream.readNEXStructure(MatchMakingTypes.MatchmakeSessionSearchCriteria),
				resultRange: stream.readNEXStructure(NEXTypes.ResultRange)
			};
		} else {
			return {
				lstMatchmakeSession: stream.readNEXList(MatchMakingTypes.MatchmakeSession),
				lstGatheringUrls: stream.readNEXList(MatchMakingTypes.GatheringURLs)
			};
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
			return {
				updateMatchmakeSessionParam: stream.readNEXStructure(MatchMakingTypes.UpdateMatchmakeSessionParam)
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
	static RequestMatchmaking(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				autoMatchmakeParam: stream.readNEXStructure(MatchMakingTypes.AutoMatchmakeParam)
			};
		} else {
			return {
				requestId: stream.readUInt64LE()
			};
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
			return {
				requestId: stream.readUInt64LE()
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
	static WithdrawMatchmakingAll(rmcMessage) {
		if (rmcMessage.isRequest()) {
			return {}; // * No request
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
	static FindMatchmakeSessionByGatheringId(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				lstGid: stream.readNEXList(stream.readUInt32LE)
			};
		} else {
			return {
				lstMatchmakeSession: stream.readNEXList(MatchMakingTypes.MatchmakeSession)
			};
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
			return {
				gid: stream.readUInt32LE()
			};
		} else {
			return {
				matchmakeSession: stream.readNEXStructure(MatchMakingTypes.MatchmakeSession)
			};
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
			return {
				id: stream.readUInt32LE(),
				resultRange: stream.readNEXStructure(NEXTypes.ResultRange)
			};
		} else {
			return {
				lstMatchmakeSession: stream.readNEXList(MatchMakingTypes.MatchmakeSession)
			};
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
			return {
				param: stream.readNEXStructure(MatchMakingTypes.FindMatchmakeSessionByParticipantParam)
			};
		} else {
			return {
				lstSession: stream.readNEXList(MatchMakingTypes.FindMatchmakeSessionByParticipantResult)
			};
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
			return {
				searchCriteria: stream.readNEXStructure(MatchMakingTypes.MatchmakeSessionSearchCriteria)
			};
		} else {
			return {
				lstMatchmakeSession: stream.readNEXList(MatchMakingTypes.MatchmakeSession)
			};
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
			return {
				searchCriteria: stream.readNEXStructure(MatchMakingTypes.MatchmakeSessionSearchCriteria)
			};
		} else {
			return {
				lstMatchmakeSession: stream.readNEXList(MatchMakingTypes.MatchmakeSession),
				lstGatheringUrls: stream.readNEXList(MatchMakingTypes.GatheringURLs)
			};
		}
	}
}

module.exports = MatchmakeExtension;