import RMCMessage from '@/nex/rmc-message';
import MatchmakeExtensionProtocol from '@/nex/protocols/matchmake-extension';
import * as Methods from '@/nex/protocols/matchmake-extension/super-smash-bros-4/methods';
import AnyDataHolder from '@/nex/types/any-data-holder';
import CommunityCompetition from '@/nex/protocols/matchmake-extension/super-smash-bros-4/types/community-competition';
import type PRUDPPacket from '@/types/nex/prudp-packet';

AnyDataHolder.Classes['CommunityCompetition'] = CommunityCompetition;

export default class MatchmakeExtensionProtocolSuperSmashBros4 {
	static ID = 0x6D;
	static Name = 'MatchmakeExtension (Super Smash Bros. 4)';

	static Methods = {
		GetTournament: 0x24,
		GetTournamentReplayId: 0x25,
		GetTournamentResult: 0x26,
		SetTournamentReplayId: 0x27,
		GetTournamentProfiles: 0x28,
		JoinOrCreateMatchmakeSession: 0x29,
		RegisterTournamentPlayerInfo: 0x2A,
		RegisterTournamentBot: 0x2B,
		ReportTournamentBotRoundResult: 0x2C,
		ReplaceTournamentLeafNode: 0x2D,
		StartTournament: 0x2E,
		AutoTournamentMatchmake: 0x2F,
		SimpleFindByID: 0x30,
		GetTournamentCompetitions: 0x31,
		GetTournamentCompetition: 0x32,
		GetTournamentReplayIds: 0x33,
		RegisterCommunityCompetition: 0x34,
		UnregisterCommunityCompetition: 0x35,
		UnregisterCommunityCompetitionById: 0x36,
		GetCommunityCompetitions: 0x37,
		GetCommunityCompetitionById: 0x38,
		FindCommunityCompetitionsByParticipant: 0x39,
		FindCommunityCompetitionsByGatheringId: 0x3A,
		SelectCommunityCompetitionByOwner: 0x3B,
		JoinCommunityCompetition: 0x3C,
		JoinCommunityCompetitionByGatheringId: 0x3D,
		EndCommunityCompetitionParticipation: 0x3E,
		EndCommunityCompetitionParticipationByGatheringId: 0x3F,
		SearchCommunityCompetition: 0x40,
		PostCommunityCompetitionMatchResult: 0x41,
		GetCommunityCompetitionRanking: 0x42,
		DEBUG_RegisterCommunityCompetition: 0x43,
		DEBUG_UnregisterCommunityCompetition: 0x44,
		DEBUG_JoinCommunityCompetition: 0x45,
		DEBUG_EndCommunityCompetitionParticipation: 0x46,
		DEBUG_PostCommunityCompetitionMatchResult: 0x47
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x24: MatchmakeExtensionProtocolSuperSmashBros4.GetTournament,
		0x25: MatchmakeExtensionProtocolSuperSmashBros4.GetTournamentReplayId,
		0x26: MatchmakeExtensionProtocolSuperSmashBros4.GetTournamentResult,
		0x27: MatchmakeExtensionProtocolSuperSmashBros4.SetTournamentReplayId,
		0x28: MatchmakeExtensionProtocolSuperSmashBros4.GetTournamentProfiles,
		0x29: MatchmakeExtensionProtocolSuperSmashBros4.JoinOrCreateMatchmakeSession,
		0x2A: MatchmakeExtensionProtocolSuperSmashBros4.RegisterTournamentPlayerInfo,
		0x2B: MatchmakeExtensionProtocolSuperSmashBros4.RegisterTournamentBot,
		0x2C: MatchmakeExtensionProtocolSuperSmashBros4.ReportTournamentBotRoundResult,
		0x2D: MatchmakeExtensionProtocolSuperSmashBros4.ReplaceTournamentLeafNode,
		0x2E: MatchmakeExtensionProtocolSuperSmashBros4.StartTournament,
		0x2F: MatchmakeExtensionProtocolSuperSmashBros4.AutoTournamentMatchmake,
		0x30: MatchmakeExtensionProtocolSuperSmashBros4.SimpleFindByID,
		0x31: MatchmakeExtensionProtocolSuperSmashBros4.GetTournamentCompetitions,
		0x32: MatchmakeExtensionProtocolSuperSmashBros4.GetTournamentCompetition,
		0x33: MatchmakeExtensionProtocolSuperSmashBros4.GetTournamentReplayIds,
		0x34: MatchmakeExtensionProtocolSuperSmashBros4.RegisterCommunityCompetition,
		0x35: MatchmakeExtensionProtocolSuperSmashBros4.UnregisterCommunityCompetition,
		0x36: MatchmakeExtensionProtocolSuperSmashBros4.UnregisterCommunityCompetitionById,
		0x37: MatchmakeExtensionProtocolSuperSmashBros4.GetCommunityCompetitions,
		0x38: MatchmakeExtensionProtocolSuperSmashBros4.GetCommunityCompetitionById,
		0x39: MatchmakeExtensionProtocolSuperSmashBros4.FindCommunityCompetitionsByParticipant,
		0x3A: MatchmakeExtensionProtocolSuperSmashBros4.FindCommunityCompetitionsByGatheringId,
		0x3B: MatchmakeExtensionProtocolSuperSmashBros4.SelectCommunityCompetitionByOwner,
		0x3C: MatchmakeExtensionProtocolSuperSmashBros4.JoinCommunityCompetition,
		0x3D: MatchmakeExtensionProtocolSuperSmashBros4.JoinCommunityCompetitionByGatheringId,
		0x3E: MatchmakeExtensionProtocolSuperSmashBros4.EndCommunityCompetitionParticipation,
		0x3F: MatchmakeExtensionProtocolSuperSmashBros4.EndCommunityCompetitionParticipationByGatheringId,
		0x40: MatchmakeExtensionProtocolSuperSmashBros4.SearchCommunityCompetition,
		0x41: MatchmakeExtensionProtocolSuperSmashBros4.PostCommunityCompetitionMatchResult,
		0x42: MatchmakeExtensionProtocolSuperSmashBros4.GetCommunityCompetitionRanking,
		0x43: MatchmakeExtensionProtocolSuperSmashBros4.DEBUG_RegisterCommunityCompetition,
		0x44: MatchmakeExtensionProtocolSuperSmashBros4.DEBUG_UnregisterCommunityCompetition,
		0x45: MatchmakeExtensionProtocolSuperSmashBros4.DEBUG_JoinCommunityCompetition,
		0x46: MatchmakeExtensionProtocolSuperSmashBros4.DEBUG_EndCommunityCompetitionParticipation,
		0x47: MatchmakeExtensionProtocolSuperSmashBros4.DEBUG_PostCommunityCompetitionMatchResult
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = MatchmakeExtensionProtocolSuperSmashBros4.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			MatchmakeExtensionProtocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static GetTournament(message: RMCMessage): typeof Methods.GetTournament.Request | typeof Methods.GetTournament.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetTournament.Request;
		} else {
			return Methods.GetTournament.Response;
		}
	}

	private static GetTournamentReplayId(message: RMCMessage): typeof Methods.GetTournamentReplayId.Request | typeof Methods.GetTournamentReplayId.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetTournamentReplayId.Request;
		} else {
			return Methods.GetTournamentReplayId.Response;
		}
	}

	private static GetTournamentResult(message: RMCMessage): typeof Methods.GetTournamentResult.Request | typeof Methods.GetTournamentResult.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetTournamentResult.Request;
		} else {
			return Methods.GetTournamentResult.Response;
		}
	}

	private static SetTournamentReplayId(message: RMCMessage): typeof Methods.SetTournamentReplayId.Request | typeof Methods.SetTournamentReplayId.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SetTournamentReplayId.Request;
		} else {
			return Methods.SetTournamentReplayId.Response;
		}
	}

	private static GetTournamentProfiles(message: RMCMessage): typeof Methods.GetTournamentProfiles.Request | typeof Methods.GetTournamentProfiles.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetTournamentProfiles.Request;
		} else {
			return Methods.GetTournamentProfiles.Response;
		}
	}

	private static JoinOrCreateMatchmakeSession(message: RMCMessage): typeof Methods.JoinOrCreateMatchmakeSession.Request | typeof Methods.JoinOrCreateMatchmakeSession.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.JoinOrCreateMatchmakeSession.Request;
		} else {
			return Methods.JoinOrCreateMatchmakeSession.Response;
		}
	}

	private static RegisterTournamentPlayerInfo(message: RMCMessage): typeof Methods.RegisterTournamentPlayerInfo.Request | typeof Methods.RegisterTournamentPlayerInfo.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RegisterTournamentPlayerInfo.Request;
		} else {
			return Methods.RegisterTournamentPlayerInfo.Response;
		}
	}

	private static RegisterTournamentBot(message: RMCMessage): typeof Methods.RegisterTournamentBot.Request | typeof Methods.RegisterTournamentBot.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RegisterTournamentBot.Request;
		} else {
			return Methods.RegisterTournamentBot.Response;
		}
	}

	private static ReportTournamentBotRoundResult(message: RMCMessage): typeof Methods.ReportTournamentBotRoundResult.Request | typeof Methods.ReportTournamentBotRoundResult.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ReportTournamentBotRoundResult.Request;
		} else {
			return Methods.ReportTournamentBotRoundResult.Response;
		}
	}

	private static ReplaceTournamentLeafNode(message: RMCMessage): typeof Methods.ReplaceTournamentLeafNode.Request | typeof Methods.ReplaceTournamentLeafNode.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ReplaceTournamentLeafNode.Request;
		} else {
			return Methods.ReplaceTournamentLeafNode.Response;
		}
	}

	private static StartTournament(message: RMCMessage): typeof Methods.StartTournament.Request | typeof Methods.StartTournament.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.StartTournament.Request;
		} else {
			return Methods.StartTournament.Response;
		}
	}

	private static AutoTournamentMatchmake(message: RMCMessage): typeof Methods.AutoTournamentMatchmake.Request | typeof Methods.AutoTournamentMatchmake.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AutoTournamentMatchmake.Request;
		} else {
			return Methods.AutoTournamentMatchmake.Response;
		}
	}

	private static SimpleFindByID(message: RMCMessage): typeof Methods.SimpleFindByID.Request | typeof Methods.SimpleFindByID.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SimpleFindByID.Request;
		} else {
			return Methods.SimpleFindByID.Response;
		}
	}

	private static GetTournamentCompetitions(message: RMCMessage): typeof Methods.GetTournamentCompetitions.Request | typeof Methods.GetTournamentCompetitions.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetTournamentCompetitions.Request;
		} else {
			return Methods.GetTournamentCompetitions.Response;
		}
	}

	private static GetTournamentCompetition(message: RMCMessage): typeof Methods.GetTournamentCompetition.Request | typeof Methods.GetTournamentCompetition.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetTournamentCompetition.Request;
		} else {
			return Methods.GetTournamentCompetition.Response;
		}
	}

	private static GetTournamentReplayIds(message: RMCMessage): typeof Methods.GetTournamentReplayIds.Request | typeof Methods.GetTournamentReplayIds.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetTournamentReplayIds.Request;
		} else {
			return Methods.GetTournamentReplayIds.Response;
		}
	}

	private static RegisterCommunityCompetition(message: RMCMessage): typeof Methods.RegisterCommunityCompetition.Request | typeof Methods.RegisterCommunityCompetition.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RegisterCommunityCompetition.Request;
		} else {
			return Methods.RegisterCommunityCompetition.Response;
		}
	}

	private static UnregisterCommunityCompetition(message: RMCMessage): typeof Methods.UnregisterCommunityCompetition.Request | typeof Methods.UnregisterCommunityCompetition.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnregisterCommunityCompetition.Request;
		} else {
			return Methods.UnregisterCommunityCompetition.Response;
		}
	}

	private static UnregisterCommunityCompetitionById(message: RMCMessage): typeof Methods.UnregisterCommunityCompetitionById.Request | typeof Methods.UnregisterCommunityCompetitionById.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnregisterCommunityCompetitionById.Request;
		} else {
			return Methods.UnregisterCommunityCompetitionById.Response;
		}
	}

	private static GetCommunityCompetitions(message: RMCMessage): typeof Methods.GetCommunityCompetitions.Request | typeof Methods.GetCommunityCompetitions.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetCommunityCompetitions.Request;
		} else {
			return Methods.GetCommunityCompetitions.Response;
		}
	}

	private static GetCommunityCompetitionById(message: RMCMessage): typeof Methods.GetCommunityCompetitionById.Request | typeof Methods.GetCommunityCompetitionById.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetCommunityCompetitionById.Request;
		} else {
			return Methods.GetCommunityCompetitionById.Response;
		}
	}

	private static FindCommunityCompetitionsByParticipant(message: RMCMessage): typeof Methods.FindCommunityCompetitionsByParticipant.Request | typeof Methods.FindCommunityCompetitionsByParticipant.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.FindCommunityCompetitionsByParticipant.Request;
		} else {
			return Methods.FindCommunityCompetitionsByParticipant.Response;
		}
	}

	private static FindCommunityCompetitionsByGatheringId(message: RMCMessage): typeof Methods.FindCommunityCompetitionsByGatheringId.Request | typeof Methods.FindCommunityCompetitionsByGatheringId.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.FindCommunityCompetitionsByGatheringId.Request;
		} else {
			return Methods.FindCommunityCompetitionsByGatheringId.Response;
		}
	}

	private static SelectCommunityCompetitionByOwner(message: RMCMessage): typeof Methods.SelectCommunityCompetitionByOwner.Request | typeof Methods.SelectCommunityCompetitionByOwner.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SelectCommunityCompetitionByOwner.Request;
		} else {
			return Methods.SelectCommunityCompetitionByOwner.Response;
		}
	}

	private static JoinCommunityCompetition(message: RMCMessage): typeof Methods.JoinCommunityCompetition.Request | typeof Methods.JoinCommunityCompetition.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.JoinCommunityCompetition.Request;
		} else {
			return Methods.JoinCommunityCompetition.Response;
		}
	}

	private static JoinCommunityCompetitionByGatheringId(message: RMCMessage): typeof Methods.JoinCommunityCompetitionByGatheringId.Request | typeof Methods.JoinCommunityCompetitionByGatheringId.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.JoinCommunityCompetitionByGatheringId.Request;
		} else {
			return Methods.JoinCommunityCompetitionByGatheringId.Response;
		}
	}

	private static EndCommunityCompetitionParticipation(message: RMCMessage): typeof Methods.EndCommunityCompetitionParticipation.Request | typeof Methods.EndCommunityCompetitionParticipation.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.EndCommunityCompetitionParticipation.Request;
		} else {
			return Methods.EndCommunityCompetitionParticipation.Response;
		}
	}

	private static EndCommunityCompetitionParticipationByGatheringId(message: RMCMessage): typeof Methods.EndCommunityCompetitionParticipationByGatheringId.Request | typeof Methods.EndCommunityCompetitionParticipationByGatheringId.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.EndCommunityCompetitionParticipationByGatheringId.Request;
		} else {
			return Methods.EndCommunityCompetitionParticipationByGatheringId.Response;
		}
	}

	private static SearchCommunityCompetition(message: RMCMessage): typeof Methods.SearchCommunityCompetition.Request | typeof Methods.SearchCommunityCompetition.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchCommunityCompetition.Request;
		} else {
			return Methods.SearchCommunityCompetition.Response;
		}
	}

	private static PostCommunityCompetitionMatchResult(message: RMCMessage): typeof Methods.PostCommunityCompetitionMatchResult.Request | typeof Methods.PostCommunityCompetitionMatchResult.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PostCommunityCompetitionMatchResult.Request;
		} else {
			return Methods.PostCommunityCompetitionMatchResult.Response;
		}
	}

	private static GetCommunityCompetitionRanking(message: RMCMessage): typeof Methods.GetCommunityCompetitionRanking.Request | typeof Methods.GetCommunityCompetitionRanking.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetCommunityCompetitionRanking.Request;
		} else {
			return Methods.GetCommunityCompetitionRanking.Response;
		}
	}

	private static DEBUG_RegisterCommunityCompetition(message: RMCMessage): typeof Methods.DEBUG_RegisterCommunityCompetition.Request | typeof Methods.DEBUG_RegisterCommunityCompetition.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DEBUG_RegisterCommunityCompetition.Request;
		} else {
			return Methods.DEBUG_RegisterCommunityCompetition.Response;
		}
	}

	private static DEBUG_UnregisterCommunityCompetition(message: RMCMessage): typeof Methods.DEBUG_UnregisterCommunityCompetition.Request | typeof Methods.DEBUG_UnregisterCommunityCompetition.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DEBUG_UnregisterCommunityCompetition.Request;
		} else {
			return Methods.DEBUG_UnregisterCommunityCompetition.Response;
		}
	}

	private static DEBUG_JoinCommunityCompetition(message: RMCMessage): typeof Methods.DEBUG_JoinCommunityCompetition.Request | typeof Methods.DEBUG_JoinCommunityCompetition.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DEBUG_JoinCommunityCompetition.Request;
		} else {
			return Methods.DEBUG_JoinCommunityCompetition.Response;
		}
	}

	private static DEBUG_EndCommunityCompetitionParticipation(message: RMCMessage): typeof Methods.DEBUG_EndCommunityCompetitionParticipation.Request | typeof Methods.DEBUG_EndCommunityCompetitionParticipation.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DEBUG_EndCommunityCompetitionParticipation.Request;
		} else {
			return Methods.DEBUG_EndCommunityCompetitionParticipation.Response;
		}
	}

	private static DEBUG_PostCommunityCompetitionMatchResult(message: RMCMessage): typeof Methods.DEBUG_PostCommunityCompetitionMatchResult.Request | typeof Methods.DEBUG_PostCommunityCompetitionMatchResult.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DEBUG_PostCommunityCompetitionMatchResult.Request;
		} else {
			return Methods.DEBUG_PostCommunityCompetitionMatchResult.Response;
		}
	}
}
