const Stream = require('../../stream'); // eslint-disable-line no-unused-vars
const MatchMakingTypes = require('../types/match_making');

class RegisterGatheringResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.retval = stream.readUInt32LE();
	}

	toJSON() {
		return {
			'%retval%': {
				__typeName: 'uint32',
				__typeValue: this.retval
			}
		};
	}
}

class UnregisterGatheringResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.retval = stream.readBoolean();
	}

	toJSON() {
		return {
			'%retval%': {
				__typeName: 'boolean',
				__typeValue: this.retval
			}
		};
	}
}

class UnregisterGatheringsResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.retval = stream.readBoolean();
	}

	toJSON() {
		return {
			'%retval%': {
				__typeName: 'boolean',
				__typeValue: this.retval
			}
		};
	}
}

class UpdateGatheringResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.retval = stream.readBoolean();
	}

	toJSON() {
		return {
			'%retval%': {
				__typeName: 'boolean',
				__typeValue: this.retval
			}
		};
	}
}

class InviteResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.retval = stream.readBoolean();
	}

	toJSON() {
		return {
			'%retval%': {
				__typeName: 'boolean',
				__typeValue: this.retval
			}
		};
	}
}

class AcceptInvitationResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.retval = stream.readBoolean();
	}

	toJSON() {
		return {
			'%retval%': {
				__typeName: 'boolean',
				__typeValue: this.retval
			}
		};
	}
}

class DeclineInvitationResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.retval = stream.readBoolean();
	}

	toJSON() {
		return {
			'%retval%': {
				__typeName: 'boolean',
				__typeValue: this.retval
			}
		};
	}
}

class CancelInvitationResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.retval = stream.readBoolean();
	}

	toJSON() {
		return {
			'%retval%': {
				__typeName: 'boolean',
				__typeValue: this.retval
			}
		};
	}
}

class GetInvitationsSentResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstInvitations = stream.readNEXList(MatchMakingTypes.Invitation);
	}

	toJSON() {
		return {
			lstInvitations: {
				__typeName: 'List<Invitation>',
				__typeValue: this.lstInvitations
			}
		};
	}
}

class GetInvitationsReceivedResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstInvitations = stream.readNEXList(MatchMakingTypes.Invitation);
	}

	toJSON() {
		return {
			lstInvitations: {
				__typeName: 'List<Invitation>',
				__typeValue: this.lstInvitations
			}
		};
	}
}

class ParticipateResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.retval = stream.readBoolean();
	}

	toJSON() {
		return {
			'%retval%': {
				__typeName: 'boolean',
				__typeValue: this.retval
			}
		};
	}
}

class CancelParticipationResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.retval = stream.readBoolean();
	}

	toJSON() {
		return {
			'%retval%': {
				__typeName: 'boolean',
				__typeValue: this.retval
			}
		};
	}
}

class GetParticipantsResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.retval = stream.readNEXList(stream.readUInt32LE);
	}

	toJSON() {
		return {
			'%retval%': {
				__typeName: 'List<PID>',
				__typeValue: this.retval
			}
		};
	}
}

class AddParticipantsResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.retval = stream.readBoolean();
	}

	toJSON() {
		return {
			'%retval%': {
				__typeName: 'boolean',
				__typeValue: this.retval
			}
		};
	}
}

class GetDetailedParticipantsResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstParticipants = stream.readNEXList(MatchMakingTypes.ParticipantDetails);
	}

	toJSON() {
		return {
			lstParticipants: {
				__typeName: 'List<ParticipantDetails>',
				__typeValue: this.lstParticipants
			}
		};
	}
}

class GetParticipantsURLsResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstStationURL = stream.readNEXList(stream.readNEXStationURL);
	}

	toJSON() {
		return {
			lstStationURL: {
				__typeName: 'List<StationURL>',
				__typeValue: this.lstStationURL
			}
		};
	}
}

class FindByTypeResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstGathering = stream.readNEXList(stream.readNEXAnyDataHolder);
	}

	toJSON() {
		return {
			lstGathering: {
				__typeName: 'List<AnyDataHolder>',
				__typeValue: this.lstGathering
			}
		};
	}
}

class FindByDescriptionResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstGathering = stream.readNEXList(stream.readNEXAnyDataHolder);
	}

	toJSON() {
		return {
			lstGathering: {
				__typeName: 'List<AnyDataHolder>',
				__typeValue: this.lstGathering
			}
		};
	}
}

class FindByDescriptionRegexResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstGathering = stream.readNEXList(stream.readNEXAnyDataHolder);
	}

	toJSON() {
		return {
			lstGathering: {
				__typeName: 'List<AnyDataHolder>',
				__typeValue: this.lstGathering
			}
		};
	}
}

class FindByIDResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstGathering = stream.readNEXList(stream.readNEXAnyDataHolder);
	}

	toJSON() {
		return {
			lstGathering: {
				__typeName: 'List<AnyDataHolder>',
				__typeValue: this.lstGathering
			}
		};
	}
}

class FindBySingleIDResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.bResult = stream.readBoolean();
		this.pGathering = stream.readNEXAnyDataHolder();
	}

	toJSON() {
		return {
			bResult: {
				__typeName: 'boolean',
				__typeValue: this.bResult
			},
			pGathering: {
				__typeName: 'AnyDataHolder',
				__typeValue: this.pGathering
			}
		};
	}
}

class FindByOwnerResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstGathering = stream.readNEXList(stream.readNEXAnyDataHolder);
	}

	toJSON() {
		return {
			lstGathering: {
				__typeName: 'List<AnyDataHolder>',
				__typeValue: this.lstGathering
			}
		};
	}
}

class FindByParticipantsResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstGathering = stream.readNEXList(stream.readNEXAnyDataHolder);
	}

	toJSON() {
		return {
			lstGathering: {
				__typeName: 'List<AnyDataHolder>',
				__typeValue: this.lstGathering
			}
		};
	}
}

class FindInvitationsResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstGathering = stream.readNEXList(stream.readNEXAnyDataHolder);
	}

	toJSON() {
		return {
			lstGathering: {
				__typeName: 'List<AnyDataHolder>',
				__typeValue: this.lstGathering
			}
		};
	}
}

class FindBySQLQueryResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstGathering = stream.readNEXList(stream.readNEXAnyDataHolder);
	}

	toJSON() {
		return {
			lstGathering: {
				__typeName: 'List<AnyDataHolder>',
				__typeValue: this.lstGathering
			}
		};
	}
}

class LaunchSessionResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.retval = stream.readBoolean();
	}

	toJSON() {
		return {
			'%retval%': {
				__typeName: 'boolean',
				__typeValue: this.retval
			}
		};
	}
}

class UpdateSessionURLResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.retval = stream.readBoolean();
	}

	toJSON() {
		return {
			'%retval%': {
				__typeName: 'boolean',
				__typeValue: this.retval
			}
		};
	}
}

class GetSessionURLResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.retval = stream.readBoolean();
		this.strURL = stream.readNEXString();
	}

	toJSON() {
		return {
			'%retval%': {
				__typeName: 'boolean',
				__typeValue: this.retval
			},
			strURL: {
				__typeName: 'String',
				__typeValue: this.strURL
			}
		};
	}
}

class GetStateResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.retval = stream.readBoolean();
		this.uiState = stream.readUInt32LE();
	}

	toJSON() {
		return {
			'%retval%': {
				__typeName: 'boolean',
				__typeValue: this.retval
			},
			uiState: {
				__typeName: 'uint32',
				__typeValue: this.uiState
			}
		};
	}
}

class SetStateResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.retval = stream.readBoolean();
	}

	toJSON() {
		return {
			'%retval%': {
				__typeName: 'boolean',
				__typeValue: this.retval
			}
		};
	}
}

class ReportStatsResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.retval = stream.readBoolean();
	}

	toJSON() {
		return {
			'%retval%': {
				__typeName: 'boolean',
				__typeValue: this.retval
			}
		};
	}
}

class GetStatsResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.retval = stream.readBoolean();
		this.lstStats = stream.readNEXList(MatchMakingTypes.GatheringStats);
	}

	toJSON() {
		return {
			'%retval%': {
				__typeName: 'boolean',
				__typeValue: this.retval
			},
			lstStats: {
				__typeName: 'List<GatheringStats>',
				__typeValue: this.lstStats
			}
		};
	}
}

class DeleteGatheringResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.retval = stream.readBoolean();
	}

	toJSON() {
		return {
			'%retval%': {
				__typeName: 'boolean',
				__typeValue: this.retval
			}
		};
	}
}

class GetPendingDeletionsResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.retval = stream.readBoolean();
		this.lstDeletions = stream.readNEXList(MatchMakingTypes.DeletionEntry);
	}

	toJSON() {
		return {
			'%retval%': {
				__typeName: 'boolean',
				__typeValue: this.retval
			},
			lstDeletions: {
				__typeName: 'List<DeletionEntry>',
				__typeValue: this.lstDeletions
			}
		};
	}
}

class DeleteFromDeletionsResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.retval = stream.readBoolean();
	}

	toJSON() {
		return {
			'%retval%': {
				__typeName: 'boolean',
				__typeValue: this.retval
			}
		};
	}
}

class MigrateGatheringOwnershipV1Response {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.retval = stream.readBoolean();
	}

	toJSON() {
		return {
			'%retval%': {
				__typeName: 'boolean',
				__typeValue: this.retval
			}
		};
	}
}

class FindByDescriptionLikeResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstGathering = stream.readNEXList(stream.readNEXAnyDataHolder);
	}

	toJSON() {
		return {
			lstGathering: {
				__typeName: 'List<AnyDataHolder>',
				__typeValue: this.lstGathering
			}
		};
	}
}

class RegisterLocalURLResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class RegisterLocalURLsResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class UpdateSessionHostV1Response {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class GetSessionURLsResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstURLs = stream.readNEXList(stream.readNEXStationURL);
	}

	toJSON() {
		return {
			lstURLs: {
				__typeName: 'List<StationURL>',
				__typeValue: this.lstURLs
			}
		};
	}
}

class UpdateSessionHostResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class UpdateGatheringOwnershipResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.retval = stream.readBoolean();
	}

	toJSON() {
		return {
			'%retval%': {
				__typeName: 'boolean',
				__typeValue: this.retval
			}
		};
	}
}

class MigrateGatheringOwnershipResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}


module.exports = {
	RegisterGatheringResponse,
	UnregisterGatheringResponse,
	UnregisterGatheringsResponse,
	UpdateGatheringResponse,
	InviteResponse,
	AcceptInvitationResponse,
	DeclineInvitationResponse,
	CancelInvitationResponse,
	GetInvitationsSentResponse,
	GetInvitationsReceivedResponse,
	ParticipateResponse,
	CancelParticipationResponse,
	GetParticipantsResponse,
	AddParticipantsResponse,
	GetDetailedParticipantsResponse,
	GetParticipantsURLsResponse,
	FindByTypeResponse,
	FindByDescriptionResponse,
	FindByDescriptionRegexResponse,
	FindByIDResponse,
	FindBySingleIDResponse,
	FindByOwnerResponse,
	FindByParticipantsResponse,
	FindInvitationsResponse,
	FindBySQLQueryResponse,
	LaunchSessionResponse,
	UpdateSessionURLResponse,
	GetSessionURLResponse,
	GetStateResponse,
	SetStateResponse,
	ReportStatsResponse,
	GetStatsResponse,
	DeleteGatheringResponse,
	GetPendingDeletionsResponse,
	DeleteFromDeletionsResponse,
	MigrateGatheringOwnershipV1Response,
	FindByDescriptionLikeResponse,
	RegisterLocalURLResponse,
	RegisterLocalURLsResponse,
	UpdateSessionHostV1Response,
	GetSessionURLsResponse,
	UpdateSessionHostResponse,
	UpdateGatheringOwnershipResponse,
	MigrateGatheringOwnershipResponse
};