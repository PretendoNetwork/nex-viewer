/**
 * @typedef {import('../packet')} Packet
 * @typedef {import('../packetv0')} PacketV0
 * @typedef {import('../packetv1')} PacketV1
 * @typedef {import('../rmc')} RMCMessage
 */

const Stream = require('../stream');

const Requests = require('./requests/match_making');
const Responses = require('./responses/match_making');

class MatchMaking {
	static ProtocolID = 0x15;

	static ProtocolName = 'Match making';

	static Methods = {
		RegisterGathering: 0x01,
		UnregisterGathering: 0x02,
		UnregisterGatherings: 0x03,
		UpdateGathering: 0x04,
		Invite: 0x05,
		AcceptInvitation: 0x06,
		DeclineInvitation: 0x07,
		CancelInvitation: 0x08,
		GetInvitationsSent: 0x09,
		GetInvitationsReceived: 0x0a,
		Participate: 0x0b,
		CancelParticipation: 0x0c,
		GetParticipants: 0x0d,
		AddParticipants: 0x0e,
		GetDetailedParticipants: 0x0f,
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
		LaunchSession: 0x1a,
		UpdateSessionURL: 0x1b,
		GetSessionURL: 0x1c,
		GetState: 0x1d,
		SetState: 0x1e,
		ReportStats: 0x1f,
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
		UpdateSessionHost: 0x2a,
		UpdateGatheringOwnership: 0x2b,
		MigrateGatheringOwnership: 0x2c
	};

	static MethodNames = Object.entries(MatchMaking.Methods).reduce((namesObject, entry) => {
		const [key, value] = entry;
		namesObject[value] = key;
		return namesObject;
	}, {});

	static Handlers = {
		0x01: MatchMaking.RegisterGathering,
		0x02: MatchMaking.UnregisterGathering,
		0x03: MatchMaking.UnregisterGatherings,
		0x04: MatchMaking.UpdateGathering,
		0x05: MatchMaking.Invite,
		0x06: MatchMaking.AcceptInvitation,
		0x07: MatchMaking.DeclineInvitation,
		0x08: MatchMaking.CancelInvitation,
		0x09: MatchMaking.GetInvitationsSent,
		0x0a: MatchMaking.GetInvitationsReceived,
		0x0b: MatchMaking.Participate,
		0x0c: MatchMaking.CancelParticipation,
		0x0d: MatchMaking.GetParticipants,
		0x0e: MatchMaking.AddParticipants,
		0x0f: MatchMaking.GetDetailedParticipants,
		0x10: MatchMaking.GetParticipantsURLs,
		0x11: MatchMaking.FindByType,
		0x12: MatchMaking.FindByDescription,
		0x13: MatchMaking.FindByDescriptionRegex,
		0x14: MatchMaking.FindByID,
		0x15: MatchMaking.FindBySingleID,
		0x16: MatchMaking.FindByOwner,
		0x17: MatchMaking.FindByParticipants,
		0x18: MatchMaking.FindInvitations,
		0x19: MatchMaking.FindBySQLQuery,
		0x1a: MatchMaking.LaunchSession,
		0x1b: MatchMaking.UpdateSessionURL,
		0x1c: MatchMaking.GetSessionURL,
		0x1d: MatchMaking.GetState,
		0x1e: MatchMaking.SetState,
		0x1f: MatchMaking.ReportStats,
		0x20: MatchMaking.GetStats,
		0x21: MatchMaking.DeleteGathering,
		0x22: MatchMaking.GetPendingDeletions,
		0x23: MatchMaking.DeleteFromDeletions,
		0x24: MatchMaking.MigrateGatheringOwnershipV1,
		0x25: MatchMaking.FindByDescriptionLike,
		0x26: MatchMaking.RegisterLocalURL,
		0x27: MatchMaking.RegisterLocalURLs,
		0x28: MatchMaking.UpdateSessionHostV1,
		0x29: MatchMaking.GetSessionURLs,
		0x2a: MatchMaking.UpdateSessionHost,
		0x2b: MatchMaking.UpdateGatheringOwnership,
		0x2c: MatchMaking.MigrateGatheringOwnership
	};

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet PRUDP packet
	 */
	static handlePacket(packet) {
		const methodId = packet.rmcMessage.methodId;

		const handler = MatchMaking.Handlers[methodId];

		if (!handler) {
			console.log(`Unknown MatchMaking method ID ${methodId} (0x${methodId?.toString(16)}) (${MatchMaking.MethodNames[methodId]})`);
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
	static RegisterGathering(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.RegisterGatheringRequest(stream);
		} else {
			return new Responses.RegisterGatheringResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static UnregisterGathering(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.UnregisterGatheringRequest(stream);
		} else {
			return new Responses.UnregisterGatheringResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static UnregisterGatherings(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.UnregisterGatheringsRequest(stream);
		} else {
			return new Responses.UnregisterGatheringsResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static UpdateGathering(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.UpdateGatheringRequest(stream);
		} else {
			return new Responses.UpdateGatheringResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static Invite(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.InviteRequest(stream);
		} else {
			return new Responses.InviteResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static AcceptInvitation(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.AcceptInvitationRequest(stream);
		} else {
			return new Responses.AcceptInvitationResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static DeclineInvitation(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.DeclineInvitationRequest(stream);
		} else {
			return new Responses.DeclineInvitationResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static CancelInvitation(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.CancelInvitationRequest(stream);
		} else {
			return new Responses.CancelInvitationResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetInvitationsSent(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetInvitationsSentRequest(stream);
		} else {
			return new Responses.GetInvitationsSentResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetInvitationsReceived(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetInvitationsReceivedRequest(stream);
		} else {
			return new Responses.GetInvitationsReceivedResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static Participate(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.ParticipateRequest(stream);
		} else {
			return new Responses.ParticipateResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static CancelParticipation(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.CancelParticipationRequest(stream);
		} else {
			return new Responses.CancelParticipationResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetParticipants(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetParticipantsRequest(stream);
		} else {
			return new Responses.GetParticipantsResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static AddParticipants(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.AddParticipantsRequest(stream);
		} else {
			return new Responses.AddParticipantsResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetDetailedParticipants(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetDetailedParticipantsRequest(stream);
		} else {
			return new Responses.GetDetailedParticipantsResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetParticipantsURLs(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetParticipantsURLsRequest(stream);
		} else {
			return new Responses.GetParticipantsURLsResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static FindByType(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.FindByTypeRequest(stream);
		} else {
			return new Responses.FindByTypeResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static FindByDescription(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.FindByDescriptionRequest(stream);
		} else {
			return new Responses.FindByDescriptionResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static FindByDescriptionRegex(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.FindByDescriptionRegexRequest(stream);
		} else {
			return new Responses.FindByDescriptionRegexResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static FindByID(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.FindByIDRequest(stream);
		} else {
			return new Responses.FindByIDResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static FindBySingleID(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.FindBySingleIDRequest(stream);
		} else {
			return new Responses.FindBySingleIDResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static FindByOwner(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.FindByOwnerRequest(stream);
		} else {
			return new Responses.FindByOwnerResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static FindByParticipants(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.FindByParticipantsRequest(stream);
		} else {
			return new Responses.FindByParticipantsResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static FindInvitations(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.FindInvitationsRequest(stream);
		} else {
			return new Responses.FindInvitationsResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static FindBySQLQuery(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.FindBySQLQueryRequest(stream);
		} else {
			return new Responses.FindBySQLQueryResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static LaunchSession(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.LaunchSessionRequest(stream);
		} else {
			return new Responses.LaunchSessionResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static UpdateSessionURL(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.UpdateSessionURLRequest(stream);
		} else {
			return new Responses.UpdateSessionURLResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetSessionURL(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetSessionURLRequest(stream);
		} else {
			return new Responses.GetSessionURLResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetState(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetStateRequest(stream);
		} else {
			return new Responses.GetStateResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static SetState(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.SetStateRequest(stream);
		} else {
			return new Responses.SetStateResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static ReportStats(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.ReportStatsRequest(stream);
		} else {
			return new Responses.ReportStatsResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetStats(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetStatsRequest(stream);
		} else {
			return new Responses.GetStatsResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static DeleteGathering(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.DeleteGatheringRequest(stream);
		} else {
			return new Responses.DeleteGatheringResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetPendingDeletions(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetPendingDeletionsRequest(stream);
		} else {
			return new Responses.GetPendingDeletionsResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static DeleteFromDeletions(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.DeleteFromDeletionsRequest(stream);
		} else {
			return new Responses.DeleteFromDeletionsResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static MigrateGatheringOwnershipV1(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.MigrateGatheringOwnershipV1Request(stream);
		} else {
			return new Responses.MigrateGatheringOwnershipV1Response(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static FindByDescriptionLike(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.FindByDescriptionLikeRequest(stream);
		} else {
			return new Responses.FindByDescriptionLikeResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static RegisterLocalURL(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.RegisterLocalURLRequest(stream);
		} else {
			return new Responses.RegisterLocalURLResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static RegisterLocalURLs(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.RegisterLocalURLsRequest(stream);
		} else {
			return new Responses.RegisterLocalURLsResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static UpdateSessionHostV1(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.UpdateSessionHostV1Request(stream);
		} else {
			return new Responses.UpdateSessionHostV1Response(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetSessionURLs(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetSessionURLsRequest(stream);
		} else {
			return new Responses.GetSessionURLsResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static UpdateSessionHost(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.UpdateSessionHostRequest(stream);
		} else {
			return new Responses.UpdateSessionHostResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static UpdateGatheringOwnership(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.UpdateGatheringOwnershipRequest(stream);
		} else {
			return new Responses.UpdateGatheringOwnershipResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static MigrateGatheringOwnership(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.MigrateGatheringOwnershipRequest(stream);
		} else {
			return new Responses.MigrateGatheringOwnershipResponse(stream);
		}
	}
}


module.exports = MatchMaking;