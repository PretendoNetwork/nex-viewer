import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/matchmake-extension/methods';
import type Packet from '@/types/nex/packet';

export default class MatchmakeExtensionProtocol {
	static ID = 0x6D;
	static Name = 'MatchmakeExtension';

	static Methods = {
		CloseParticipation: 0x1,
		OpenParticipation: 0x2,
		AutoMatchmake_Postpone: 0x3,
		BrowseMatchmakeSession: 0x4,
		BrowseMatchmakeSessionWithHostUrls: 0x5,
		CreateMatchmakeSession: 0x6,
		JoinMatchmakeSession: 0x7,
		ModifyCurrentGameAttribute: 0x8,
		UpdateNotificationData: 0x9,
		GetFriendNotificationData: 0xA,
		UpdateApplicationBuffer: 0xB,
		UpdateMatchmakeSessionAttribute: 0xC,
		GetlstFriendNotificationData: 0xD,
		UpdateMatchmakeSession: 0xE,
		AutoMatchmakeWithSearchCriteria_Postpone: 0xF,
		GetPlayingSession: 0x10,
		CreateCommunity: 0x11,
		UpdateCommunity: 0x12,
		JoinCommunity: 0x13,
		FindCommunityByGatheringId: 0x14,
		FindOfficialCommunity: 0x15,
		FindCommunityByParticipant: 0x16,
		UpdatePrivacySetting: 0x17,
		GetMyBlackList: 0x18,
		AddToBlackList: 0x19,
		RemoveFromBlackList: 0x1A,
		ClearMyBlackList: 0x1B,
		ReportViolation: 0x1C,
		IsViolationUser: 0x1D,
		JoinMatchmakeSessionEx: 0x1E,
		GetSimplePlayingSession: 0x1F,
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
		BrowseMatchmakeSessionNoHolder: 0x2A,
		BrowseMatchmakeSessionWithHostUrlsNoHolder: 0x2B,
		UpdateMatchmakeSessionPart: 0x2C,
		RequestMatchmakeExtension: 0x2D,
		WithdrawMatchmakeExtension: 0x2E,
		WithdrawMatchmakeExtensionAll: 0x2F,
		FindMatchmakeSessionByGatheringId: 0x30,
		FindMatchmakeSessionBySingleGatheringId: 0x31,
		FindMatchmakeSessionByOwner: 0x32,
		FindMatchmakeSessionByParticipant: 0x33,
		BrowseMatchmakeSessionNoHolderNoResultRange: 0x34,
		BrowseMatchmakeSessionWithHostUrlsNoHolderNoResultRange: 0x35,
		FindCommunityByOwner: 0x36
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x01: MatchmakeExtensionProtocol.CloseParticipation,
		0x02: MatchmakeExtensionProtocol.OpenParticipation,
		0x03: MatchmakeExtensionProtocol.AutoMatchmake_Postpone,
		0x04: MatchmakeExtensionProtocol.BrowseMatchmakeSession,
		0x05: MatchmakeExtensionProtocol.BrowseMatchmakeSessionWithHostUrls,
		0x06: MatchmakeExtensionProtocol.CreateMatchmakeSession,
		0x07: MatchmakeExtensionProtocol.JoinMatchmakeSession,
		0x08: MatchmakeExtensionProtocol.ModifyCurrentGameAttribute,
		0x09: MatchmakeExtensionProtocol.UpdateNotificationData,
		0x0A: MatchmakeExtensionProtocol.GetFriendNotificationData,
		0x0B: MatchmakeExtensionProtocol.UpdateApplicationBuffer,
		0x0C: MatchmakeExtensionProtocol.UpdateMatchmakeSessionAttribute,
		0x0D: MatchmakeExtensionProtocol.GetlstFriendNotificationData,
		0x0E: MatchmakeExtensionProtocol.UpdateMatchmakeSession,
		0x0F: MatchmakeExtensionProtocol.AutoMatchmakeWithSearchCriteria_Postpone,
		0x10: MatchmakeExtensionProtocol.GetPlayingSession,
		0x11: MatchmakeExtensionProtocol.CreateCommunity,
		0x12: MatchmakeExtensionProtocol.UpdateCommunity,
		0x13: MatchmakeExtensionProtocol.JoinCommunity,
		0x14: MatchmakeExtensionProtocol.FindCommunityByGatheringId,
		0x15: MatchmakeExtensionProtocol.FindOfficialCommunity,
		0x16: MatchmakeExtensionProtocol.FindCommunityByParticipant,
		0x17: MatchmakeExtensionProtocol.UpdatePrivacySetting,
		0x18: MatchmakeExtensionProtocol.GetMyBlackList,
		0x19: MatchmakeExtensionProtocol.AddToBlackList,
		0x1A: MatchmakeExtensionProtocol.RemoveFromBlackList,
		0x1B: MatchmakeExtensionProtocol.ClearMyBlackList,
		0x1C: MatchmakeExtensionProtocol.ReportViolation,
		0x1D: MatchmakeExtensionProtocol.IsViolationUser,
		0x1E: MatchmakeExtensionProtocol.JoinMatchmakeSessionEx,
		0x1F: MatchmakeExtensionProtocol.GetSimplePlayingSession,
		0x20: MatchmakeExtensionProtocol.GetSimpleCommunity,
		0x21: MatchmakeExtensionProtocol.AutoMatchmakeWithGatheringId_Postpone,
		0x22: MatchmakeExtensionProtocol.UpdateProgressScore,
		0x23: MatchmakeExtensionProtocol.DebugNotifyEvent,
		0x24: MatchmakeExtensionProtocol.GenerateMatchmakeSessionSystemPassword,
		0x25: MatchmakeExtensionProtocol.ClearMatchmakeSessionSystemPassword,
		0x26: MatchmakeExtensionProtocol.CreateMatchmakeSessionWithParam,
		0x27: MatchmakeExtensionProtocol.JoinMatchmakeSessionWithParam,
		0x28: MatchmakeExtensionProtocol.AutoMatchmakeWithParam_Postpone,
		0x29: MatchmakeExtensionProtocol.FindMatchmakeSessionByGatheringIdDetail,
		0x2A: MatchmakeExtensionProtocol.BrowseMatchmakeSessionNoHolder,
		0x2B: MatchmakeExtensionProtocol.BrowseMatchmakeSessionWithHostUrlsNoHolder,
		0x2C: MatchmakeExtensionProtocol.UpdateMatchmakeSessionPart,
		0x2D: MatchmakeExtensionProtocol.RequestMatchmaking,
		0x2E: MatchmakeExtensionProtocol.WithdrawMatchmaking,
		0x2F: MatchmakeExtensionProtocol.WithdrawMatchmakingAll,
		0x30: MatchmakeExtensionProtocol.FindMatchmakeSessionByGatheringId,
		0x31: MatchmakeExtensionProtocol.FindMatchmakeSessionBySingleGatheringId,
		0x32: MatchmakeExtensionProtocol.FindMatchmakeSessionByOwner,
		0x33: MatchmakeExtensionProtocol.FindMatchmakeSessionByParticipant,
		0x34: MatchmakeExtensionProtocol.BrowseMatchmakeSessionNoHolderNoResultRange,
		0x35: MatchmakeExtensionProtocol.BrowseMatchmakeSessionWithHostUrlsNoHolderNoResultRange
	};

	static handlePacket(packet: Packet): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = MatchmakeExtensionProtocol.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.parameters = new messageDecoder(packet.message);
		packet.message.methodName = messageDecoder.Name;
	}

	private static CloseParticipation(message: RMCMessage): typeof Methods.CloseParticipation.Request | typeof Methods.CloseParticipation.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CloseParticipation.Request;
		} else {
			return Methods.CloseParticipation.Response;
		}
	}

	private static OpenParticipation(message: RMCMessage): typeof Methods.OpenParticipation.Request | typeof Methods.OpenParticipation.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.OpenParticipation.Request;
		} else {
			return Methods.OpenParticipation.Response;
		}
	}

	private static AutoMatchmake_Postpone(message: RMCMessage): typeof Methods.AutoMatchmake_Postpone.Request | typeof Methods.AutoMatchmake_Postpone.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AutoMatchmake_Postpone.Request;
		} else {
			return Methods.AutoMatchmake_Postpone.Response;
		}
	}

	private static BrowseMatchmakeSession(message: RMCMessage): typeof Methods.BrowseMatchmakeSession.Request | typeof Methods.BrowseMatchmakeSession.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.BrowseMatchmakeSession.Request;
		} else {
			return Methods.BrowseMatchmakeSession.Response;
		}
	}

	private static BrowseMatchmakeSessionWithHostUrls(message: RMCMessage): typeof Methods.BrowseMatchmakeSessionWithHostUrls.Request | typeof Methods.BrowseMatchmakeSessionWithHostUrls.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.BrowseMatchmakeSessionWithHostUrls.Request;
		} else {
			return Methods.BrowseMatchmakeSessionWithHostUrls.Response;
		}
	}

	private static CreateMatchmakeSession(message: RMCMessage): typeof Methods.CreateMatchmakeSession.Request | typeof Methods.CreateMatchmakeSession.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CreateMatchmakeSession.Request;
		} else {
			return Methods.CreateMatchmakeSession.Response;
		}
	}

	private static JoinMatchmakeSession(message: RMCMessage): typeof Methods.JoinMatchmakeSession.Request | typeof Methods.JoinMatchmakeSession.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.JoinMatchmakeSession.Request;
		} else {
			return Methods.JoinMatchmakeSession.Response;
		}
	}

	private static ModifyCurrentGameAttribute(message: RMCMessage): typeof Methods.ModifyCurrentGameAttribute.Request | typeof Methods.ModifyCurrentGameAttribute.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ModifyCurrentGameAttribute.Request;
		} else {
			return Methods.ModifyCurrentGameAttribute.Response;
		}
	}

	private static UpdateNotificationData(message: RMCMessage): typeof Methods.UpdateNotificationData.Request | typeof Methods.UpdateNotificationData.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateNotificationData.Request;
		} else {
			return Methods.UpdateNotificationData.Response;
		}
	}

	private static GetFriendNotificationData(message: RMCMessage): typeof Methods.GetFriendNotificationData.Request | typeof Methods.GetFriendNotificationData.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetFriendNotificationData.Request;
		} else {
			return Methods.GetFriendNotificationData.Response;
		}
	}

	private static UpdateApplicationBuffer(message: RMCMessage): typeof Methods.UpdateApplicationBuffer.Request | typeof Methods.UpdateApplicationBuffer.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateApplicationBuffer.Request;
		} else {
			return Methods.UpdateApplicationBuffer.Response;
		}
	}

	private static UpdateMatchmakeSessionAttribute(message: RMCMessage): typeof Methods.UpdateMatchmakeSessionAttribute.Request | typeof Methods.UpdateMatchmakeSessionAttribute.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateMatchmakeSessionAttribute.Request;
		} else {
			return Methods.UpdateMatchmakeSessionAttribute.Response;
		}
	}

	private static GetlstFriendNotificationData(message: RMCMessage): typeof Methods.GetlstFriendNotificationData.Request | typeof Methods.GetlstFriendNotificationData.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetlstFriendNotificationData.Request;
		} else {
			return Methods.GetlstFriendNotificationData.Response;
		}
	}

	private static UpdateMatchmakeSession(message: RMCMessage): typeof Methods.UpdateMatchmakeSession.Request | typeof Methods.UpdateMatchmakeSession.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateMatchmakeSession.Request;
		} else {
			return Methods.UpdateMatchmakeSession.Response;
		}
	}

	private static AutoMatchmakeWithSearchCriteria_Postpone(message: RMCMessage): typeof Methods.AutoMatchmakeWithSearchCriteria_Postpone.Request | typeof Methods.AutoMatchmakeWithSearchCriteria_Postpone.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AutoMatchmakeWithSearchCriteria_Postpone.Request;
		} else {
			return Methods.AutoMatchmakeWithSearchCriteria_Postpone.Response;
		}
	}

	private static GetPlayingSession(message: RMCMessage): typeof Methods.GetPlayingSession.Request | typeof Methods.GetPlayingSession.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetPlayingSession.Request;
		} else {
			return Methods.GetPlayingSession.Response;
		}
	}

	private static CreateCommunity(message: RMCMessage): typeof Methods.CreateCommunity.Request | typeof Methods.CreateCommunity.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CreateCommunity.Request;
		} else {
			return Methods.CreateCommunity.Response;
		}
	}

	private static UpdateCommunity(message: RMCMessage): typeof Methods.UpdateCommunity.Request | typeof Methods.UpdateCommunity.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateCommunity.Request;
		} else {
			return Methods.UpdateCommunity.Response;
		}
	}

	private static JoinCommunity(message: RMCMessage): typeof Methods.JoinCommunity.Request | typeof Methods.JoinCommunity.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.JoinCommunity.Request;
		} else {
			return Methods.JoinCommunity.Response;
		}
	}

	private static FindCommunityByGatheringId(message: RMCMessage): typeof Methods.FindCommunityByGatheringId.Request | typeof Methods.FindCommunityByGatheringId.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.FindCommunityByGatheringId.Request;
		} else {
			return Methods.FindCommunityByGatheringId.Response;
		}
	}

	private static FindOfficialCommunity(message: RMCMessage): typeof Methods.FindOfficialCommunity.Request | typeof Methods.FindOfficialCommunity.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.FindOfficialCommunity.Request;
		} else {
			return Methods.FindOfficialCommunity.Response;
		}
	}

	private static FindCommunityByParticipant(message: RMCMessage): typeof Methods.FindCommunityByParticipant.Request | typeof Methods.FindCommunityByParticipant.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.FindCommunityByParticipant.Request;
		} else {
			return Methods.FindCommunityByParticipant.Response;
		}
	}

	private static UpdatePrivacySetting(message: RMCMessage): typeof Methods.UpdatePrivacySetting.Request | typeof Methods.UpdatePrivacySetting.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdatePrivacySetting.Request;
		} else {
			return Methods.UpdatePrivacySetting.Response;
		}
	}

	private static GetMyBlackList(message: RMCMessage): typeof Methods.GetMyBlackList.Request | typeof Methods.GetMyBlackList.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetMyBlackList.Request;
		} else {
			return Methods.GetMyBlackList.Response;
		}
	}

	private static AddToBlackList(message: RMCMessage): typeof Methods.AddToBlackList.Request | typeof Methods.AddToBlackList.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AddToBlackList.Request;
		} else {
			return Methods.AddToBlackList.Response;
		}
	}

	private static RemoveFromBlackList(message: RMCMessage): typeof Methods.RemoveFromBlackList.Request | typeof Methods.RemoveFromBlackList.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RemoveFromBlackList.Request;
		} else {
			return Methods.RemoveFromBlackList.Response;
		}
	}

	private static ClearMyBlackList(message: RMCMessage): typeof Methods.ClearMyBlackList.Request | typeof Methods.ClearMyBlackList.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ClearMyBlackList.Request;
		} else {
			return Methods.ClearMyBlackList.Response;
		}
	}

	private static ReportViolation(message: RMCMessage): typeof Methods.ReportViolation.Request | typeof Methods.ReportViolation.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ReportViolation.Request;
		} else {
			return Methods.ReportViolation.Response;
		}
	}

	private static IsViolationUser(message: RMCMessage): typeof Methods.IsViolationUser.Request | typeof Methods.IsViolationUser.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.IsViolationUser.Request;
		} else {
			return Methods.IsViolationUser.Response;
		}
	}

	private static JoinMatchmakeSessionEx(message: RMCMessage): typeof Methods.JoinMatchmakeSessionEx.Request | typeof Methods.JoinMatchmakeSessionEx.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.JoinMatchmakeSessionEx.Request;
		} else {
			return Methods.JoinMatchmakeSessionEx.Response;
		}
	}

	private static GetSimplePlayingSession(message: RMCMessage): typeof Methods.GetSimplePlayingSession.Request | typeof Methods.GetSimplePlayingSession.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetSimplePlayingSession.Request;
		} else {
			return Methods.GetSimplePlayingSession.Response;
		}
	}

	private static GetSimpleCommunity(message: RMCMessage): typeof Methods.GetSimpleCommunity.Request | typeof Methods.GetSimpleCommunity.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetSimpleCommunity.Request;
		} else {
			return Methods.GetSimpleCommunity.Response;
		}
	}

	private static AutoMatchmakeWithGatheringId_Postpone(message: RMCMessage): typeof Methods.AutoMatchmakeWithGatheringId_Postpone.Request | typeof Methods.AutoMatchmakeWithGatheringId_Postpone.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AutoMatchmakeWithGatheringId_Postpone.Request;
		} else {
			return Methods.AutoMatchmakeWithGatheringId_Postpone.Response;
		}
	}

	private static UpdateProgressScore(message: RMCMessage): typeof Methods.UpdateProgressScore.Request | typeof Methods.UpdateProgressScore.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateProgressScore.Request;
		} else {
			return Methods.UpdateProgressScore.Response;
		}
	}

	private static DebugNotifyEvent(message: RMCMessage): typeof Methods.DebugNotifyEvent.Request | typeof Methods.DebugNotifyEvent.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DebugNotifyEvent.Request;
		} else {
			return Methods.DebugNotifyEvent.Response;
		}
	}

	private static GenerateMatchmakeSessionSystemPassword(message: RMCMessage): typeof Methods.GenerateMatchmakeSessionSystemPassword.Request | typeof Methods.GenerateMatchmakeSessionSystemPassword.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GenerateMatchmakeSessionSystemPassword.Request;
		} else {
			return Methods.GenerateMatchmakeSessionSystemPassword.Response;
		}
	}

	private static ClearMatchmakeSessionSystemPassword(message: RMCMessage): typeof Methods.ClearMatchmakeSessionSystemPassword.Request | typeof Methods.ClearMatchmakeSessionSystemPassword.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ClearMatchmakeSessionSystemPassword.Request;
		} else {
			return Methods.ClearMatchmakeSessionSystemPassword.Response;
		}
	}

	private static CreateMatchmakeSessionWithParam(message: RMCMessage): typeof Methods.CreateMatchmakeSessionWithParam.Request | typeof Methods.CreateMatchmakeSessionWithParam.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CreateMatchmakeSessionWithParam.Request;
		} else {
			return Methods.CreateMatchmakeSessionWithParam.Response;
		}
	}

	private static JoinMatchmakeSessionWithParam(message: RMCMessage): typeof Methods.JoinMatchmakeSessionWithParam.Request | typeof Methods.JoinMatchmakeSessionWithParam.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.JoinMatchmakeSessionWithParam.Request;
		} else {
			return Methods.JoinMatchmakeSessionWithParam.Response;
		}
	}

	private static AutoMatchmakeWithParam_Postpone(message: RMCMessage): typeof Methods.AutoMatchmakeWithParam_Postpone.Request | typeof Methods.AutoMatchmakeWithParam_Postpone.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AutoMatchmakeWithParam_Postpone.Request;
		} else {
			return Methods.AutoMatchmakeWithParam_Postpone.Response;
		}
	}

	private static FindMatchmakeSessionByGatheringIdDetail(message: RMCMessage): typeof Methods.FindMatchmakeSessionByGatheringIdDetail.Request | typeof Methods.FindMatchmakeSessionByGatheringIdDetail.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.FindMatchmakeSessionByGatheringIdDetail.Request;
		} else {
			return Methods.FindMatchmakeSessionByGatheringIdDetail.Response;
		}
	}

	private static BrowseMatchmakeSessionNoHolder(message: RMCMessage): typeof Methods.BrowseMatchmakeSessionNoHolder.Request | typeof Methods.BrowseMatchmakeSessionNoHolder.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.BrowseMatchmakeSessionNoHolder.Request;
		} else {
			return Methods.BrowseMatchmakeSessionNoHolder.Response;
		}
	}

	private static BrowseMatchmakeSessionWithHostUrlsNoHolder(message: RMCMessage): typeof Methods.BrowseMatchmakeSessionWithHostUrlsNoHolder.Request | typeof Methods.BrowseMatchmakeSessionWithHostUrlsNoHolder.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.BrowseMatchmakeSessionWithHostUrlsNoHolder.Request;
		} else {
			return Methods.BrowseMatchmakeSessionWithHostUrlsNoHolder.Response;
		}
	}

	private static UpdateMatchmakeSessionPart(message: RMCMessage): typeof Methods.UpdateMatchmakeSessionPart.Request | typeof Methods.UpdateMatchmakeSessionPart.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateMatchmakeSessionPart.Request;
		} else {
			return Methods.UpdateMatchmakeSessionPart.Response;
		}
	}

	private static RequestMatchmaking(message: RMCMessage): typeof Methods.RequestMatchmaking.Request | typeof Methods.RequestMatchmaking.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RequestMatchmaking.Request;
		} else {
			return Methods.RequestMatchmaking.Response;
		}
	}

	private static WithdrawMatchmaking(message: RMCMessage): typeof Methods.WithdrawMatchmaking.Request | typeof Methods.WithdrawMatchmaking.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.WithdrawMatchmaking.Request;
		} else {
			return Methods.WithdrawMatchmaking.Response;
		}
	}

	private static WithdrawMatchmakingAll(message: RMCMessage): typeof Methods.WithdrawMatchmakingAll.Request | typeof Methods.WithdrawMatchmakingAll.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.WithdrawMatchmakingAll.Request;
		} else {
			return Methods.WithdrawMatchmakingAll.Response;
		}
	}

	private static FindMatchmakeSessionByGatheringId(message: RMCMessage): typeof Methods.FindMatchmakeSessionByGatheringId.Request | typeof Methods.FindMatchmakeSessionByGatheringId.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.FindMatchmakeSessionByGatheringId.Request;
		} else {
			return Methods.FindMatchmakeSessionByGatheringId.Response;
		}
	}

	private static FindMatchmakeSessionBySingleGatheringId(message: RMCMessage): typeof Methods.FindMatchmakeSessionBySingleGatheringId.Request | typeof Methods.FindMatchmakeSessionBySingleGatheringId.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.FindMatchmakeSessionBySingleGatheringId.Request;
		} else {
			return Methods.FindMatchmakeSessionBySingleGatheringId.Response;
		}
	}

	private static FindMatchmakeSessionByOwner(message: RMCMessage): typeof Methods.FindMatchmakeSessionByOwner.Request | typeof Methods.FindMatchmakeSessionByOwner.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.FindMatchmakeSessionByOwner.Request;
		} else {
			return Methods.FindMatchmakeSessionByOwner.Response;
		}
	}

	private static FindMatchmakeSessionByParticipant(message: RMCMessage): typeof Methods.FindMatchmakeSessionByParticipant.Request | typeof Methods.FindMatchmakeSessionByParticipant.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.FindMatchmakeSessionByParticipant.Request;
		} else {
			return Methods.FindMatchmakeSessionByParticipant.Response;
		}
	}

	private static BrowseMatchmakeSessionNoHolderNoResultRange(message: RMCMessage): typeof Methods.BrowseMatchmakeSessionNoHolderNoResultRange.Request | typeof Methods.BrowseMatchmakeSessionNoHolderNoResultRange.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.BrowseMatchmakeSessionNoHolderNoResultRange.Request;
		} else {
			return Methods.BrowseMatchmakeSessionNoHolderNoResultRange.Response;
		}
	}

	private static BrowseMatchmakeSessionWithHostUrlsNoHolderNoResultRange(message: RMCMessage): typeof Methods.BrowseMatchmakeSessionWithHostUrlsNoHolderNoResultRange.Request | typeof Methods.BrowseMatchmakeSessionWithHostUrlsNoHolderNoResultRange.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.BrowseMatchmakeSessionWithHostUrlsNoHolderNoResultRange.Request;
		} else {
			return Methods.BrowseMatchmakeSessionWithHostUrlsNoHolderNoResultRange.Response;
		}
	}
}
