import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/match-making/methods';
import type Packet from '@/types/nex/packet';

export default class MatchMakingProtocol {
	static ID = 0x15;
	static Name = 'MatchMaking';

	static Methods = {
		RegisterGathering: 0x1,
		UnregisterGathering: 0x2,
		UnregisterGatherings: 0x3,
		UpdateGathering: 0x4,
		Invite: 0x5,
		AcceptInvitation: 0x6,
		DeclineInvitation: 0x7,
		CancelInvitation: 0x8,
		GetInvitationsSent: 0x9,
		GetInvitationsReceived: 0xA,
		Participate: 0xB,
		CancelParticipation: 0xC,
		GetParticipants: 0xD,
		AddParticipants: 0xE,
		GetDetailedParticipants: 0xF,
		GetParticipantsURLs: 0x10,
		FindByType: 0x11,
		FindByDescription: 0x12,
		FindByDescriptionRegex: 0x13,
		FindByID: 0x14,
		FindBySingleID: 0x15,
		FindByOwner: 0x16,
		FindByParticipants: 0x17,
		FindInvitations: 0x18,
		FindBySQLQuery: 0x19,
		LaunchSession: 0x1A,
		UpdateSessionURL: 0x1B,
		GetSessionURL: 0x1C,
		GetState: 0x1D,
		SetState: 0x1E,
		ReportStats: 0x1F,
		GetStats: 0x20,
		DeleteGathering: 0x21,
		GetPendingDeletions: 0x22,
		DeleteFromDeletions: 0x23,
		MigrateGatheringOwnershipV1: 0x24,
		FindByDescriptionLike: 0x25,
		RegisterLocalURL: 0x26,
		RegisterLocalURLs: 0x27,
		UpdateSessionHostV1: 0x28,
		GetSessionURLs: 0x29,
		UpdateSessionHost: 0x2A,
		UpdateGatheringOwnership: 0x2B,
		MigrateGatheringOwnership: 0x2C
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x01: MatchMakingProtocol.RegisterGathering,
		0x02: MatchMakingProtocol.UnregisterGathering,
		0x03: MatchMakingProtocol.UnregisterGatherings,
		0x04: MatchMakingProtocol.UpdateGathering,
		0x05: MatchMakingProtocol.Invite,
		0x06: MatchMakingProtocol.AcceptInvitation,
		0x07: MatchMakingProtocol.DeclineInvitation,
		0x08: MatchMakingProtocol.CancelInvitation,
		0x09: MatchMakingProtocol.GetInvitationsSent,
		0x0A: MatchMakingProtocol.GetInvitationsReceived,
		0x0B: MatchMakingProtocol.Participate,
		0x0C: MatchMakingProtocol.CancelParticipation,
		0x0D: MatchMakingProtocol.GetParticipants,
		0x0E: MatchMakingProtocol.AddParticipants,
		0x0F: MatchMakingProtocol.GetDetailedParticipants,
		0x10: MatchMakingProtocol.GetParticipantsURLs,
		0x11: MatchMakingProtocol.FindByType,
		0x12: MatchMakingProtocol.FindByDescription,
		0x13: MatchMakingProtocol.FindByDescriptionRegex,
		0x14: MatchMakingProtocol.FindByID,
		0x15: MatchMakingProtocol.FindBySingleID,
		0x16: MatchMakingProtocol.FindByOwner,
		0x17: MatchMakingProtocol.FindByParticipants,
		0x18: MatchMakingProtocol.FindInvitations,
		0x19: MatchMakingProtocol.FindBySQLQuery,
		0x1A: MatchMakingProtocol.LaunchSession,
		0x1B: MatchMakingProtocol.UpdateSessionURL,
		0x1C: MatchMakingProtocol.GetSessionURL,
		0x1D: MatchMakingProtocol.GetState,
		0x1E: MatchMakingProtocol.SetState,
		0x1F: MatchMakingProtocol.ReportStats,
		0x20: MatchMakingProtocol.GetStats,
		0x21: MatchMakingProtocol.DeleteGathering,
		0x22: MatchMakingProtocol.GetPendingDeletions,
		0x23: MatchMakingProtocol.DeleteFromDeletions,
		0x24: MatchMakingProtocol.MigrateGatheringOwnershipV1,
		0x25: MatchMakingProtocol.FindByDescriptionLike,
		0x26: MatchMakingProtocol.RegisterLocalURL,
		0x27: MatchMakingProtocol.RegisterLocalURLs,
		0x28: MatchMakingProtocol.UpdateSessionHostV1,
		0x29: MatchMakingProtocol.GetSessionURLs,
		0x2A: MatchMakingProtocol.UpdateSessionHost,
		0x2B: MatchMakingProtocol.UpdateGatheringOwnership,
		0x2C: MatchMakingProtocol.MigrateGatheringOwnership
	};

	static handlePacket(packet: Packet): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = MatchMakingProtocol.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.parameters = new messageDecoder(packet.message);
		packet.message.methodName = messageDecoder.Name;
	}

	private static RegisterGathering(message: RMCMessage): typeof Methods.RegisterGathering.Request | typeof Methods.RegisterGathering.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RegisterGathering.Request;
		} else {
			return Methods.RegisterGathering.Response;
		}
	}

	private static UnregisterGathering(message: RMCMessage): typeof Methods.UnregisterGathering.Request | typeof Methods.UnregisterGathering.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnregisterGathering.Request;
		} else {
			return Methods.UnregisterGathering.Response;
		}
	}

	private static UnregisterGatherings(message: RMCMessage): typeof Methods.UnregisterGatherings.Request | typeof Methods.UnregisterGatherings.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnregisterGatherings.Request;
		} else {
			return Methods.UnregisterGatherings.Response;
		}
	}

	private static UpdateGathering(message: RMCMessage): typeof Methods.UpdateGathering.Request | typeof Methods.UpdateGathering.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateGathering.Request;
		} else {
			return Methods.UpdateGathering.Response;
		}
	}

	private static Invite(message: RMCMessage): typeof Methods.Invite.Request | typeof Methods.Invite.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.Invite.Request;
		} else {
			return Methods.Invite.Response;
		}
	}

	private static AcceptInvitation(message: RMCMessage): typeof Methods.AcceptInvitation.Request | typeof Methods.AcceptInvitation.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AcceptInvitation.Request;
		} else {
			return Methods.AcceptInvitation.Response;
		}
	}

	private static DeclineInvitation(message: RMCMessage): typeof Methods.DeclineInvitation.Request | typeof Methods.DeclineInvitation.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeclineInvitation.Request;
		} else {
			return Methods.DeclineInvitation.Response;
		}
	}

	private static CancelInvitation(message: RMCMessage): typeof Methods.CancelInvitation.Request | typeof Methods.CancelInvitation.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CancelInvitation.Request;
		} else {
			return Methods.CancelInvitation.Response;
		}
	}

	private static GetInvitationsSent(message: RMCMessage): typeof Methods.GetInvitationsSent.Request | typeof Methods.GetInvitationsSent.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetInvitationsSent.Request;
		} else {
			return Methods.GetInvitationsSent.Response;
		}
	}

	private static GetInvitationsReceived(message: RMCMessage): typeof Methods.GetInvitationsReceived.Request | typeof Methods.GetInvitationsReceived.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetInvitationsReceived.Request;
		} else {
			return Methods.GetInvitationsReceived.Response;
		}
	}

	private static Participate(message: RMCMessage): typeof Methods.Participate.Request | typeof Methods.Participate.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.Participate.Request;
		} else {
			return Methods.Participate.Response;
		}
	}

	private static CancelParticipation(message: RMCMessage): typeof Methods.CancelParticipation.Request | typeof Methods.CancelParticipation.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CancelParticipation.Request;
		} else {
			return Methods.CancelParticipation.Response;
		}
	}

	private static GetParticipants(message: RMCMessage): typeof Methods.GetParticipants.Request | typeof Methods.GetParticipants.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetParticipants.Request;
		} else {
			return Methods.GetParticipants.Response;
		}
	}

	private static AddParticipants(message: RMCMessage): typeof Methods.AddParticipants.Request | typeof Methods.AddParticipants.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AddParticipants.Request;
		} else {
			return Methods.AddParticipants.Response;
		}
	}

	private static GetDetailedParticipants(message: RMCMessage): typeof Methods.GetDetailedParticipants.Request | typeof Methods.GetDetailedParticipants.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetDetailedParticipants.Request;
		} else {
			return Methods.GetDetailedParticipants.Response;
		}
	}

	private static GetParticipantsURLs(message: RMCMessage): typeof Methods.GetParticipantsURLs.Request | typeof Methods.GetParticipantsURLs.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetParticipantsURLs.Request;
		} else {
			return Methods.GetParticipantsURLs.Response;
		}
	}

	private static FindByType(message: RMCMessage): typeof Methods.FindByType.Request | typeof Methods.FindByType.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.FindByType.Request;
		} else {
			return Methods.FindByType.Response;
		}
	}

	private static FindByDescription(message: RMCMessage): typeof Methods.FindByDescription.Request | typeof Methods.FindByDescription.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.FindByDescription.Request;
		} else {
			return Methods.FindByDescription.Response;
		}
	}

	private static FindByDescriptionRegex(message: RMCMessage): typeof Methods.FindByDescriptionRegex.Request | typeof Methods.FindByDescriptionRegex.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.FindByDescriptionRegex.Request;
		} else {
			return Methods.FindByDescriptionRegex.Response;
		}
	}

	private static FindByID(message: RMCMessage): typeof Methods.FindByID.Request | typeof Methods.FindByID.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.FindByID.Request;
		} else {
			return Methods.FindByID.Response;
		}
	}

	private static FindBySingleID(message: RMCMessage): typeof Methods.FindBySingleID.Request | typeof Methods.FindBySingleID.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.FindBySingleID.Request;
		} else {
			return Methods.FindBySingleID.Response;
		}
	}

	private static FindByOwner(message: RMCMessage): typeof Methods.FindByOwner.Request | typeof Methods.FindByOwner.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.FindByOwner.Request;
		} else {
			return Methods.FindByOwner.Response;
		}
	}

	private static FindByParticipants(message: RMCMessage): typeof Methods.FindByParticipants.Request | typeof Methods.FindByParticipants.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.FindByParticipants.Request;
		} else {
			return Methods.FindByParticipants.Response;
		}
	}

	private static FindInvitations(message: RMCMessage): typeof Methods.FindInvitations.Request | typeof Methods.FindInvitations.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.FindInvitations.Request;
		} else {
			return Methods.FindInvitations.Response;
		}
	}

	private static FindBySQLQuery(message: RMCMessage): typeof Methods.FindBySQLQuery.Request | typeof Methods.FindBySQLQuery.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.FindBySQLQuery.Request;
		} else {
			return Methods.FindBySQLQuery.Response;
		}
	}

	private static LaunchSession(message: RMCMessage): typeof Methods.LaunchSession.Request | typeof Methods.LaunchSession.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.LaunchSession.Request;
		} else {
			return Methods.LaunchSession.Response;
		}
	}

	private static UpdateSessionURL(message: RMCMessage): typeof Methods.UpdateSessionURL.Request | typeof Methods.UpdateSessionURL.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateSessionURL.Request;
		} else {
			return Methods.UpdateSessionURL.Response;
		}
	}

	private static GetSessionURL(message: RMCMessage): typeof Methods.GetSessionURL.Request | typeof Methods.GetSessionURL.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetSessionURL.Request;
		} else {
			return Methods.GetSessionURL.Response;
		}
	}

	private static GetState(message: RMCMessage): typeof Methods.GetState.Request | typeof Methods.GetState.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetState.Request;
		} else {
			return Methods.GetState.Response;
		}
	}

	private static SetState(message: RMCMessage): typeof Methods.SetState.Request | typeof Methods.SetState.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SetState.Request;
		} else {
			return Methods.SetState.Response;
		}
	}

	private static ReportStats(message: RMCMessage): typeof Methods.ReportStats.Request | typeof Methods.ReportStats.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ReportStats.Request;
		} else {
			return Methods.ReportStats.Response;
		}
	}

	private static GetStats(message: RMCMessage): typeof Methods.GetStats.Request | typeof Methods.GetStats.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetStats.Request;
		} else {
			return Methods.GetStats.Response;
		}
	}

	private static DeleteGathering(message: RMCMessage): typeof Methods.DeleteGathering.Request | typeof Methods.DeleteGathering.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeleteGathering.Request;
		} else {
			return Methods.DeleteGathering.Response;
		}
	}

	private static GetPendingDeletions(message: RMCMessage): typeof Methods.GetPendingDeletions.Request | typeof Methods.GetPendingDeletions.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetPendingDeletions.Request;
		} else {
			return Methods.GetPendingDeletions.Response;
		}
	}

	private static DeleteFromDeletions(message: RMCMessage): typeof Methods.DeleteFromDeletions.Request | typeof Methods.DeleteFromDeletions.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeleteFromDeletions.Request;
		} else {
			return Methods.DeleteFromDeletions.Response;
		}
	}

	private static MigrateGatheringOwnershipV1(message: RMCMessage): typeof Methods.MigrateGatheringOwnershipV1.Request | typeof Methods.MigrateGatheringOwnershipV1.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.MigrateGatheringOwnershipV1.Request;
		} else {
			return Methods.MigrateGatheringOwnershipV1.Response;
		}
	}

	private static FindByDescriptionLike(message: RMCMessage): typeof Methods.FindByDescriptionLike.Request | typeof Methods.FindByDescriptionLike.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.FindByDescriptionLike.Request;
		} else {
			return Methods.FindByDescriptionLike.Response;
		}
	}

	private static RegisterLocalURL(message: RMCMessage): typeof Methods.RegisterLocalURL.Request | typeof Methods.RegisterLocalURL.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RegisterLocalURL.Request;
		} else {
			return Methods.RegisterLocalURL.Response;
		}
	}

	private static RegisterLocalURLs(message: RMCMessage): typeof Methods.RegisterLocalURLs.Request | typeof Methods.RegisterLocalURLs.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RegisterLocalURLs.Request;
		} else {
			return Methods.RegisterLocalURLs.Response;
		}
	}

	private static UpdateSessionHostV1(message: RMCMessage): typeof Methods.UpdateSessionHostV1.Request | typeof Methods.UpdateSessionHostV1.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateSessionHostV1.Request;
		} else {
			return Methods.UpdateSessionHostV1.Response;
		}
	}

	private static GetSessionURLs(message: RMCMessage): typeof Methods.GetSessionURLs.Request | typeof Methods.GetSessionURLs.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetSessionURLs.Request;
		} else {
			return Methods.GetSessionURLs.Response;
		}
	}

	private static UpdateSessionHost(message: RMCMessage): typeof Methods.UpdateSessionHost.Request | typeof Methods.UpdateSessionHost.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateSessionHost.Request;
		} else {
			return Methods.UpdateSessionHost.Response;
		}
	}

	private static UpdateGatheringOwnership(message: RMCMessage): typeof Methods.UpdateGatheringOwnership.Request | typeof Methods.UpdateGatheringOwnership.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateGatheringOwnership.Request;
		} else {
			return Methods.UpdateGatheringOwnership.Response;
		}
	}

	private static MigrateGatheringOwnership(message: RMCMessage): typeof Methods.MigrateGatheringOwnership.Request | typeof Methods.MigrateGatheringOwnership.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.MigrateGatheringOwnership.Request;
		} else {
			return Methods.MigrateGatheringOwnership.Response;
		}
	}
}
