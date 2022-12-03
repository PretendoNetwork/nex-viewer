const Packet = require('../packet'); // eslint-disable-line no-unused-vars
const PacketV0 = require('../packetv0'); // eslint-disable-line no-unused-vars
const PacketV1 = require('../packetv1'); // eslint-disable-line no-unused-vars
const RMCMessage = require('../rmc'); // eslint-disable-line no-unused-vars
const Stream = require('../stream');
const NEXTypes = require('../types');

const MatchMakingTypes = require('./types/match_making');

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
			return {
				anyGathering: stream.readNEXAnyDataHolder()
			};
		} else {
			return {
				retval: stream.readUInt32LE()
			};
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
			return {
				idGathering: stream.readUInt32LE()
			};
		} else {
			return {
				retval: stream.readBoolean()
			};
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
			return {
				lstGatherings: stream.readNEXList(stream.readUInt32LE)
			};
		} else {
			return {
				retval: stream.readBoolean()
			};
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
			return {
				anyGathering: stream.readNEXAnyDataHolder()
			};
		} else {
			return {
				retval: stream.readBoolean()
			};
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
			return {
				idGathering: stream.readUInt32LE(),
				lstPrincipals: stream.readNEXList(stream.readUInt32LE),
				strMessage: stream.readNEXString()
			};
		} else {
			return {
				retval: stream.readBoolean()
			};
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
			return {
				idGathering: stream.readUInt32LE(),
				strMessage: stream.readNEXString()
			};
		} else {
			return {
				retval: stream.readBoolean()
			};
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
			return {
				idGathering: stream.readUInt32LE(),
				strMessage: stream.readNEXString()
			};
		} else {
			return {
				retval: stream.readBoolean()
			};
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
			return {
				idGathering: stream.readUInt32LE(),
				lstPrincipals: stream.readNEXList(stream.readUInt32LE),
				strMessage: stream.readNEXString()
			};
		} else {
			return {
				retval: stream.readBoolean()
			};
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
			return {
				idGathering: stream.readUInt32LE()
			};
		} else {
			return {
				lstInvitations: stream.readNEXList(MatchMakingTypes.Invitation)
			};
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
			return {}; // * No request
		} else {
			return {
				lstInvitations: stream.readNEXList(MatchMakingTypes.Invitation)
			};
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
			return {
				idGathering: stream.readUInt32LE(),
				strMessage: stream.readNEXString()
			};
		} else {
			return {
				retval: stream.readBoolean()
			};
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
			return {
				idGathering: stream.readUInt32LE(),
				strMessage: stream.readNEXString()
			};
		} else {
			return {
				retval: stream.readBoolean()
			};
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
			return {
				idGathering: stream.readUInt32LE()
			};
		} else {
			return {
				retval: stream.readNEXList(stream.readUInt32LE)
			};
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
			return {
				idGathering: stream.readUInt32LE(),
				lstPrincipals: stream.readNEXList(stream.readUInt32LE),
				strMessage: stream.readNEXString()
			};
		} else {
			return {
				retval: stream.readBoolean()
			};
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
			return {
				idGathering: stream.readUInt32LE()
			};
		} else {
			return {
				lstParticipants: stream.readNEXList(MatchMakingTypes.ParticipantDetails)
			};
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
			return {
				idGathering: stream.readUInt32LE()
			};
		} else {
			return {
				lstStationURL: stream.readNEXList(stream.readNEXStationURL)
			};
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
			return {
				strType: stream.readNEXString(),
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
	static FindByDescription(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				strDescription: stream.readNEXString(),
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
	static FindByDescriptionRegex(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				strDescriptionRegex: stream.readNEXString(),
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
	static FindByID(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				lstID: stream.readNEXList(stream.readUInt32LE)
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
	static FindBySingleID(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				id: stream.readUInt32LE()
			};
		} else {
			return {
				bResult: stream.readBoolean(),
				pGathering: stream.readNEXAnyDataHolder()
			};
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
			return {
				id: stream.readUInt32LE(),
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
	static FindByParticipants(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				pid: stream.readNEXList(stream.readUInt32LE)
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
	static FindInvitations(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
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
	static FindBySQLQuery(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				strQuery: stream.readNEXString(),
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
	static LaunchSession(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				idGathering: stream.readUInt32LE(),
				strURL: stream.readNEXString()
			};
		} else {
			return {
				retval: stream.readBoolean()
			};
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
			return {
				idGathering: stream.readUInt32LE(),
				strURL: stream.readNEXString()
			};
		} else {
			return {
				retval: stream.readBoolean()
			};
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
			return {
				idGathering: stream.readUInt32LE()
			};
		} else {
			return {
				retval: stream.readBoolean(),
				strURL: stream.readNEXString()
			};
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
			return {
				idGathering: stream.readUInt32LE()
			};
		} else {
			return {
				retval: stream.readBoolean(),
				uiState: stream.readUInt32LE()
			};
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
			return {
				idGathering: stream.readUInt32LE(),
				uiNewState: stream.readUInt32LE()
			};
		} else {
			return {
				retval: stream.readBoolean()
			};
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
			return {
				idGathering: stream.readUInt32LE(),
				lstStats: stream.readNEXList(MatchMakingTypes.GatheringStats)
			};
		} else {
			return {
				retval: stream.readBoolean()
			};
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
			return {
				idGathering: stream.readUInt32LE(),
				lstParticipants: stream.readNEXList(stream.readUInt32LE),
				lstColumns: stream.readNEXList(stream.readUInt8)
			};
		} else {
			return {
				retval: stream.readBoolean(),
				lstStats: stream.readNEXList(MatchMakingTypes.GatheringStats)
			};
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
			return {
				gid: stream.readUInt32LE()
			};
		} else {
			return {
				retval: stream.readBoolean()
			};
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
			return {
				uiReason: stream.readUInt32LE(),
				resultRange: stream.readNEXStructure(NEXTypes.ResultRange)
			};
		} else {
			return {
				retval: stream.readBoolean(),
				lstDeletions: stream.readNEXList(MatchMakingTypes.DeletionEntry)
			};
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
			return {
				lstDeletions: stream.readNEXStructure(stream.readUInt32LE)
			};
		} else {
			return {
				retval: stream.readBoolean()
			};
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
			return {
				gid: stream.readUInt32LE(),
				lstPotentialNewOwnersID: stream.readNEXStructure(stream.readUInt32LE),
			};
		} else {
			return {
				retval: stream.readBoolean()
			};
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
			return {
				strDescriptionLike: stream.readNEXString(),
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
	static RegisterLocalURL(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				gid: stream.readUInt32LE(),
				url: stream.readNEXStationURL()
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
	static RegisterLocalURLs(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				gid: stream.readUInt32LE(),
				lstUrls: stream.readNEXList(stream.readNEXStationURL)
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
	static UpdateSessionHostV1(rmcMessage, stream) {
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
	static GetSessionURLs(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				gid: stream.readUInt32LE()
			};
		} else {
			return {
				lstURLs: stream.readNEXList(stream.readNEXStationURL)
			};
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
			return {
				gid: stream.readUInt32LE(),
				isMigrateOwner: stream.readBoolean()
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
	static UpdateGatheringOwnership(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				gid: stream.readUInt32LE(),
				participantsOnly: stream.readBoolean()
			};
		} else {
			return {
				retval: stream.readBoolean()
			};
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
			return {
				gid: stream.readUInt32LE(),
				lstPotentialNewOwnersID: stream.readNEXList(stream.readUInt32LE),
				participantsOnly: stream.readBoolean()
			};
		} else {
			return {}; // * No response
		}
	}
}


module.exports = MatchMaking;