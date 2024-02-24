/**
 * @typedef {import('../../stream')} Stream
 */
const NEXTypes = require('../../types');
const MatchMakingTypes = require('../types/match_making');

class RegisterGatheringRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.anyGathering = stream.readNEXAnyDataHolder();
	}

	toJSON() {
		return {
			anyGathering: {
				__typeName: 'AnyDataHolder',
				__typeValue: this.anyGathering
			}
		};
	}
}

class UnregisterGatheringRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.idGathering = stream.readUInt32LE();
	}

	toJSON() {
		return {
			idGathering: {
				__typeName: 'uint32',
				__typeValue: this.idGathering
			}
		};
	}
}

class UnregisterGatheringsRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstGatherings = stream.readNEXList(stream.readUInt32LE);
	}

	toJSON() {
		return {
			lstGatherings: {
				__typeName: 'List<uint32>',
				__typeValue: this.lstGatherings
			}
		};
	}
}

class UpdateGatheringRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.anyGathering = stream.readNEXAnyDataHolder();
	}

	toJSON() {
		return {
			anyGathering: {
				__typeName: 'AnyDataHolder',
				__typeValue: this.anyGathering
			}
		};
	}
}

class InviteRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.idGathering = stream.readUInt32LE();
		this.lstPrincipals = stream.readNEXList(stream.readPID);
		this.strMessage = stream.readNEXString();
	}

	toJSON() {
		return {
			idGathering: {
				__typeName: 'uint32',
				__typeValue: this.idGathering
			},
			lstPrincipals: {
				__typeName: 'List<PID>',
				__typeValue: this.lstPrincipals
			},
			strMessage: {
				__typeName: 'String',
				__typeValue: this.strMessage
			}
		};
	}
}

class AcceptInvitationRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.idGathering = stream.readUInt32LE();
		this.strMessage = stream.readNEXString();
	}

	toJSON() {
		return {
			idGathering: {
				__typeName: 'uint32',
				__typeValue: this.idGathering
			},
			strMessage: {
				__typeName: 'String',
				__typeValue: this.strMessage
			}
		};
	}
}

class DeclineInvitationRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.idGathering = stream.readUInt32LE();
		this.strMessage = stream.readNEXString();
	}

	toJSON() {
		return {
			idGathering: {
				__typeName: 'uint32',
				__typeValue: this.idGathering
			},
			strMessage: {
				__typeName: 'String',
				__typeValue: this.strMessage
			}
		};
	}
}

class CancelInvitationRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.idGathering = stream.readUInt32LE();
		this.lstPrincipals = stream.readNEXList(stream.readPID);
		this.strMessage = stream.readNEXString();
	}

	toJSON() {
		return {
			idGathering: {
				__typeName: 'uint32',
				__typeValue: this.idGathering
			},
			lstPrincipals: {
				__typeName: 'List<PID>',
				__typeValue: this.lstPrincipals
			},
			strMessage: {
				__typeName: 'List<String>',
				__typeValue: this.strMessage
			}
		};
	}
}

class GetInvitationsSentRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.idGathering = stream.readUInt32LE();
	}

	toJSON() {
		return {
			idGathering: {
				__typeName: 'uint32',
				__typeValue: this.idGathering
			}
		};
	}
}

class GetInvitationsReceivedRequest {
	// * Requests nothing
	toJSON() {
		return {};
	}
}

class ParticipateRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.idGathering = stream.readUInt32LE();
		this.strMessage = stream.readNEXString();
	}

	toJSON() {
		return {
			idGathering: {
				__typeName: 'uint32',
				__typeValue: this.idGathering
			},
			strMessage: {
				__typeName: 'String',
				__typeValue: this.strMessage
			}
		};
	}
}

class CancelParticipationRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.idGathering = stream.readUInt32LE();
		this.strMessage = stream.readNEXString();
	}

	toJSON() {
		return {
			idGathering: {
				__typeName: 'uint32',
				__typeValue: this.idGathering
			},
			strMessage: {
				__typeName: 'String',
				__typeValue: this.strMessage
			}
		};
	}
}

class GetParticipantsRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.idGathering = stream.readUInt32LE();
	}

	toJSON() {
		return {
			idGathering: {
				__typeName: 'uint32',
				__typeValue: this.idGathering
			}
		};
	}
}

class AddParticipantsRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.idGathering = stream.readUInt32LE();
		this.lstPrincipals = stream.readNEXList(stream.readPID);
		this.strMessage = stream.readNEXString();
	}

	toJSON() {
		return {
			idGathering: {
				__typeName: 'uint32',
				__typeValue: this.idGathering
			},
			lstPrincipals: {
				__typeName: 'List<PID>',
				__typeValue: this.lstPrincipals
			},
			strMessage: {
				__typeName: 'List<String>',
				__typeValue: this.strMessage
			}
		};
	}
}

class GetDetailedParticipantsRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.idGathering = stream.readUInt32LE();
	}

	toJSON() {
		return {
			idGathering: {
				__typeName: 'uint32',
				__typeValue: this.idGathering
			}
		};
	}
}

class GetParticipantsURLsRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.idGathering = stream.readUInt32LE();
	}

	toJSON() {
		return {
			idGathering: {
				__typeName: 'uint32',
				__typeValue: this.idGathering
			}
		};
	}
}

class FindByTypeRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.strType = stream.readNEXString();
		this.resultRange = stream.readNEXStructure(NEXTypes.ResultRange);
	}

	toJSON() {
		return {
			strType: {
				__typeName: 'String',
				__typeValue: this.strType
			},
			resultRange: {
				__typeName: 'ResultRange',
				__typeValue: this.resultRange
			}
		};
	}
}

class FindByDescriptionRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.strDescription = stream.readNEXString();
		this.resultRange = stream.readNEXStructure(NEXTypes.ResultRange);
	}

	toJSON() {
		return {
			strDescription: {
				__typeName: 'String',
				__typeValue: this.strDescription
			},
			resultRange: {
				__typeName: 'ResultRange',
				__typeValue: this.resultRange
			}
		};
	}
}

class FindByDescriptionRegexRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.strDescriptionRegex = stream.readNEXString();
		this.resultRange = stream.readNEXStructure(NEXTypes.ResultRange);
	}

	toJSON() {
		return {
			strDescriptionRegex: {
				__typeName: 'String',
				__typeValue: this.strDescriptionRegex
			},
			resultRange: {
				__typeName: 'ResultRange',
				__typeValue: this.resultRange
			}
		};
	}
}

class FindByIDRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstID = stream.readNEXList(stream.readUInt32LE);
	}

	toJSON() {
		return {
			lstID: {
				__typeName: 'List<uint32>',
				__typeValue: this.lstID
			}
		};
	}
}

class FindBySingleIDRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.id = stream.readUInt32LE();
	}

	toJSON() {
		return {
			id: {
				__typeName: 'uint32',
				__typeValue: this.id
			}
		};
	}
}

class FindByOwnerRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.id = stream.readPID();
		this.resultRange = stream.readNEXStructure(NEXTypes.ResultRange);
	}

	toJSON() {
		return {
			id: {
				__typeName: 'PID',
				__typeValue: this.id
			},
			resultRange: {
				__typeName: 'ResultRange',
				__typeValue: this.resultRange
			}
		};
	}
}

class FindByParticipantsRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pid = stream.readNEXList(stream.readPID);
	}

	toJSON() {
		return {
			pid: {
				__typeName: 'List<PID>',
				__typeValue: this.pid
			}
		};
	}
}

class FindInvitationsRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.resultRange = stream.readNEXStructure(NEXTypes.ResultRange);
	}

	toJSON() {
		return {
			resultRange: {
				__typeName: 'ResultRange',
				__typeValue: this.resultRange
			}
		};
	}
}

class FindBySQLQueryRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.strQuery = stream.readNEXString();
		this.resultRange = stream.readNEXStructure(NEXTypes.ResultRange);
	}

	toJSON() {
		return {
			strQuery: {
				__typeName: 'String',
				__typeValue: this.strQuery
			},
			resultRange: {
				__typeName: 'ResultRange',
				__typeValue: this.resultRange
			}
		};
	}
}

class LaunchSessionRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.idGathering = stream.readUInt32LE();
		this.strURL = stream.readNEXString();
	}

	toJSON() {
		return {
			idGathering: {
				__typeName: 'uint32',
				__typeValue: this.idGathering
			},
			strURL: {
				__typeName: 'String',
				__typeValue: this.strURL
			}
		};
	}
}

class UpdateSessionURLRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.idGathering = stream.readUInt32LE();
		this.strURL = stream.readNEXString();
	}

	toJSON() {
		return {
			idGathering: {
				__typeName: 'uint32',
				__typeValue: this.idGathering
			},
			strURL: {
				__typeName: 'String',
				__typeValue: this.strURL
			}
		};
	}
}

class GetSessionURLRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.idGathering = stream.readUInt32LE();
	}

	toJSON() {
		return {
			idGathering: {
				__typeName: 'uint32',
				__typeValue: this.idGathering
			}
		};
	}
}

class GetStateRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.idGathering = stream.readUInt32LE();
	}

	toJSON() {
		return {
			idGathering: {
				__typeName: 'uint32',
				__typeValue: this.idGathering
			}
		};
	}
}

class SetStateRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.idGathering = stream.readUInt32LE();
		this.uiNewState = stream.readUInt32LE();
	}

	toJSON() {
		return {
			idGathering: {
				__typeName: 'uint32',
				__typeValue: this.idGathering
			},
			uiNewState: {
				__typeName: 'uint32',
				__typeValue: this.uiNewState
			}
		};
	}
}

class ReportStatsRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.idGathering = stream.readUInt32LE();
		this.lstStats = stream.readNEXList(MatchMakingTypes.GatheringStats);
	}

	toJSON() {
		return {
			idGathering: {
				__typeName: 'uint32',
				__typeValue: this.idGathering
			},
			lstStats: {
				__typeName: 'List<GatheringStats>',
				__typeValue: this.lstStats
			}
		};
	}
}

class GetStatsRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.idGathering = stream.readUInt32LE();
		this.lstParticipants = stream.readNEXList(stream.readPID);
		this.lstColumns = stream.readNEXList(stream.readUInt8);
	}

	toJSON() {
		return {
			idGathering: {
				__typeName: 'uint32',
				__typeValue: this.idGathering
			},
			lstParticipants: {
				__typeName: 'List<PID>',
				__typeValue: this.lstParticipants
			},
			lstColumns: {
				__typeName: 'List<uint8>',
				__typeValue: this.lstColumns
			}
		};
	}
}

class DeleteGatheringRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.gid = stream.readUInt32LE();
	}

	toJSON() {
		return {
			gid: {
				__typeName: 'uint32',
				__typeValue: this.gid
			}
		};
	}
}

class GetPendingDeletionsRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.uiReason = stream.readUInt32LE();
		this.resultRange = stream.readNEXStructure(NEXTypes.ResultRange);
	}

	toJSON() {
		return {
			uiReason: {
				__typeName: 'uint32',
				__typeValue: this.uiReason
			},
			resultRange: {
				__typeName: 'ResultRange',
				__typeValue: this.resultRange
			}
		};
	}
}

class DeleteFromDeletionsRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstDeletions = stream.readNEXStructure(stream.readUInt32LE);
	}

	toJSON() {
		return {
			lstDeletions: {
				__typeName: 'List<uint32>',
				__typeValue: this.lstDeletions
			}
		};
	}
}

class MigrateGatheringOwnershipV1Request {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.gid = stream.readUInt32LE();
		this.lstPotentialNewOwnersID = stream.readNEXList(stream.readPID);
	}

	toJSON() {
		return {
			gid: {
				__typeName: 'uint32',
				__typeValue: this.gid
			},
			lstPotentialNewOwnersID: {
				__typeName: 'List<PID>',
				__typeValue: this.lstPotentialNewOwnersID
			}
		};
	}
}

class FindByDescriptionLikeRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.strDescriptionLike = stream.readNEXString();
		this.resultRange = stream.readNEXStructure(NEXTypes.ResultRange);
	}

	toJSON() {
		return {
			strDescriptionLike: {
				__typeName: 'String',
				__typeValue: this.strDescriptionLike
			},
			resultRange: {
				__typeName: 'ResultRange',
				__typeValue: this.resultRange
			}
		};
	}
}

class RegisterLocalURLRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.gid = stream.readUInt32LE();
		this.url = stream.readNEXStationURL();
	}

	toJSON() {
		return {
			gid: {
				__typeName: 'uint32',
				__typeValue: this.gid
			},
			url: {
				__typeName: 'StationURL',
				__typeValue: this.url
			}
		};
	}
}

class RegisterLocalURLsRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.gid = stream.readUInt32LE();
		this.lstUrls = stream.readNEXList(stream.readNEXStationURL);
	}

	toJSON() {
		return {
			gid: {
				__typeName: 'uint32',
				__typeValue: this.gid
			},
			lstUrls: {
				__typeName: 'List<StationURL>',
				__typeValue: this.lstUrls
			}
		};
	}
}

class UpdateSessionHostV1Request {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.gid = stream.readUInt32LE();
	}

	toJSON() {
		return {
			gid: {
				__typeName: 'uint32',
				__typeValue: this.gid
			}
		};
	}
}

class GetSessionURLsRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.gid = stream.readUInt32LE();
	}

	toJSON() {
		return {
			gid: {
				__typeName: 'uint32',
				__typeValue: this.gid
			}
		};
	}
}

class UpdateSessionHostRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.gid = stream.readUInt32LE();
		this.isMigrateOwner = stream.readBoolean();
	}

	toJSON() {
		return {
			gid: {
				__typeName: 'uint32',
				__typeValue: this.gid
			},
			isMigrateOwner: {
				__typeName: 'boolean',
				__typeValue: this.isMigrateOwner
			}
		};
	}
}

class UpdateGatheringOwnershipRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.gid = stream.readUInt32LE();
		this.participantsOnly = stream.readBoolean();
	}

	toJSON() {
		return {
			gid: {
				__typeName: 'uint32',
				__typeValue: this.gid
			},
			participantsOnly: {
				__typeName: 'boolean',
				__typeValue: this.participantsOnly
			}
		};
	}
}

class MigrateGatheringOwnershipRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.gid = stream.readUInt32LE();
		this.lstPotentialNewOwnersID = stream.readNEXList(stream.readPID);
		this.participantsOnly = stream.readBoolean();
	}

	toJSON() {
		return {
			gid: {
				__typeName: 'uint32',
				__typeValue: this.gid
			},
			lstPotentialNewOwnersID: {
				__typeName: 'List<PID>',
				__typeValue: this.lstPotentialNewOwnersID
			},
			participantsOnly: {
				__typeName: 'boolean',
				__typeValue: this.participantsOnly
			}
		};
	}
}


module.exports = {
	RegisterGatheringRequest,
	UnregisterGatheringRequest,
	UnregisterGatheringsRequest,
	UpdateGatheringRequest,
	InviteRequest,
	AcceptInvitationRequest,
	DeclineInvitationRequest,
	CancelInvitationRequest,
	GetInvitationsSentRequest,
	GetInvitationsReceivedRequest,
	ParticipateRequest,
	CancelParticipationRequest,
	GetParticipantsRequest,
	AddParticipantsRequest,
	GetDetailedParticipantsRequest,
	GetParticipantsURLsRequest,
	FindByTypeRequest,
	FindByDescriptionRequest,
	FindByDescriptionRegexRequest,
	FindByIDRequest,
	FindBySingleIDRequest,
	FindByOwnerRequest,
	FindByParticipantsRequest,
	FindInvitationsRequest,
	FindBySQLQueryRequest,
	LaunchSessionRequest,
	UpdateSessionURLRequest,
	GetSessionURLRequest,
	GetStateRequest,
	SetStateRequest,
	ReportStatsRequest,
	GetStatsRequest,
	DeleteGatheringRequest,
	GetPendingDeletionsRequest,
	DeleteFromDeletionsRequest,
	MigrateGatheringOwnershipV1Request,
	FindByDescriptionLikeRequest,
	RegisterLocalURLRequest,
	RegisterLocalURLsRequest,
	UpdateSessionHostV1Request,
	GetSessionURLsRequest,
	UpdateSessionHostRequest,
	UpdateGatheringOwnershipRequest,
	MigrateGatheringOwnershipRequest
};
