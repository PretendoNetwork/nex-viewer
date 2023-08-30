const semver = require('semver');
const Stream = require('../../stream'); // eslint-disable-line no-unused-vars
const MatchMakingTypes = require('../types/match_making');
const NotificationsTypes = require('../types/notifications');

class CloseParticipationResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class OpenParticipationResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class AutoMatchmake_PostponeResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.joinedGathering = stream.readNEXAnyDataHolder();
	}

	toJSON() {
		return {
			joinedGathering: {
				__typeName: 'AnyDataHolder',
				__typeValue: this.joinedGathering
			}
		};
	}
}

class BrowseMatchmakeSessionResponse {
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

class BrowseMatchmakeSessionWithHostUrlsResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstGathering = stream.readNEXList(stream.readNEXAnyDataHolder);
		this.lstGatheringUrls = stream.readNEXList(MatchMakingTypes.GatheringURLs);
	}

	toJSON() {
		return {
			lstGathering: {
				__typeName: 'List<AnyDataHolder>',
				__typeValue: this.lstGathering
			},
			lstGatheringUrls: {
				__typeName: 'List<GatheringURLs>',
				__typeValue: this.lstGatheringUrls
			}
		};
	}
}

class CreateMatchmakeSessionResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		const nexVersion = stream.connection.title.nex_match_making_version || stream.connection.title.nex_version;

		this.gid = stream.readUInt32LE();

		if (semver.gte(nexVersion, '3.0.0')) {
			this.sessionKey = stream.readNEXBuffer();
		}
	}

	toJSON() {
		const data = {
			gid: {
				__typeName: 'uint32',
				__typeValue: this.gid
			}
		};

		if (this.sessionKey !== undefined) {
			data.sessionKey = {
				__typeName: 'Buffer',
				__typeValue: this.sessionKey
			};
		}

		return data;
	}
}

class JoinMatchmakeSessionResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		const nexVersion = stream.connection.title.nex_match_making_version || stream.connection.title.nex_version;

		if (semver.gte(nexVersion, '3.0.0')) {
			this.sessionKey = stream.readNEXBuffer();
		}
	}

	toJSON() {
		const data = {};

		if (this.sessionKey !== undefined) {
			data.sessionKey = {
				__typeName: 'Buffer',
				__typeValue: this.sessionKey
			};
		}

		return data;
	}
}

class ModifyCurrentGameAttributeResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class UpdateNotificationDataResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class GetFriendNotificationDataResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.dataList = stream.readNEXList(NotificationsTypes.NotificationEvent);
	}

	toJSON() {
		return {
			dataList: {
				__typeName: 'List<NotificationEvent>',
				__typeValue: this.dataList
			}
		};
	}
}

class UpdateApplicationBufferResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class UpdateMatchmakeSessionAttributeResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class GetlstFriendNotificationDataResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.dataList = stream.readNEXList(NotificationsTypes.NotificationEvent);
	}

	toJSON() {
		return {
			dataList: {
				__typeName: 'List<NotificationEvent>',
				__typeValue: this.dataList
			}
		};
	}
}

class UpdateMatchmakeSessionResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class AutoMatchmakeWithSearchCriteria_PostponeResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.joinedGathering = stream.readNEXAnyDataHolder();
	}

	toJSON() {
		return {
			joinedGathering: {
				__typeName: 'AnyDataHolder',
				__typeValue: this.joinedGathering
			}
		};
	}
}

class GetPlayingSessionResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstPlayingSession = stream.readNEXList(MatchMakingTypes.PlayingSession);
	}

	toJSON() {
		return {
			lstPlayingSession: {
				__typeName: 'List<PlayingSession>',
				__typeValue: this.lstPlayingSession
			}
		};
	}
}

class CreateCommunityResponse {
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

class UpdateCommunityResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class JoinCommunityResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class FindCommunityByGatheringIdResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstCommunity = stream.readNEXList(MatchMakingTypes.PersistentGathering);
	}

	toJSON() {
		return {
			lstCommunity: {
				__typeName: 'List<PersistentGathering>',
				__typeValue: this.lstCommunity
			}
		};
	}
}

class FindOfficialCommunityResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstCommunity = stream.readNEXList(MatchMakingTypes.PersistentGathering);
	}

	toJSON() {
		return {
			lstCommunity: {
				__typeName: 'List<PersistentGathering>',
				__typeValue: this.lstCommunity
			}
		};
	}
}

class FindCommunityByParticipantResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstCommunity = stream.readNEXList(MatchMakingTypes.PersistentGathering);
	}

	toJSON() {
		return {
			lstCommunity: {
				__typeName: 'List<PersistentGathering>',
				__typeValue: this.lstCommunity
			}
		};
	}
}

class UpdatePrivacySettingResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class GetMyBlockListResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstPrincipalId = stream.readNEXList(stream.readPID);
	}

	toJSON() {
		return {
			lstPrincipalId: {
				__typeName: 'List<PID>',
				__typeValue: this.lstPrincipalId
			}
		};
	}
}

class AddToBlockListResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class RemoveFromBlockListResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class ClearMyBlockListResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class ReportViolationResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class IsViolationUserResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.flag = stream.readBoolean();
		this.score = stream.readUInt32LE();
	}

	toJSON() {
		return {
			flag: {
				__typeName: 'boolean',
				__typeValue: this.flag
			},
			score: {
				__typeName: 'uint32',
				__typeValue: this.score
			}
		};
	}
}

class JoinMatchmakeSessionExResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.sessionKey = stream.readNEXBuffer();
	}

	toJSON() {
		return {
			sessionKey: {
				__typeName: 'Buffer',
				__typeValue: this.sessionKey
			}
		};
	}
}

class GetSimplePlayingSessionResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstSimplePlayingSession = stream.readNEXList(MatchMakingTypes.SimplePlayingSession);
	}

	toJSON() {
		return {
			lstSimplePlayingSession: {
				__typeName: 'List<SimplePlayingSession>',
				__typeValue: this.lstSimplePlayingSession
			}
		};
	}
}

class GetSimpleCommunityResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstSimpleCommunityList = stream.readNEXList(MatchMakingTypes.SimpleCommunity);
	}

	toJSON() {
		return {
			lstSimpleCommunityList: {
				__typeName: 'List<SimpleCommunity>',
				__typeValue: this.lstSimpleCommunityList
			}
		};
	}
}

class AutoMatchmakeWithGatheringId_PostponeResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.joinedGathering = stream.readNEXAnyDataHolder();
	}

	toJSON() {
		return {
			joinedGathering: {
				__typeName: 'AnyDataHolder',
				__typeValue: this.joinedGathering
			}
		};
	}
}

class UpdateProgressScoreResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class DebugNotifyEventResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class GenerateMatchmakeSessionSystemPasswordResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.password = stream.readNEXString();
	}

	toJSON() {
		return {
			password: {
				__typeName: 'String',
				__typeValue: this.password
			}
		};
	}
}

class ClearMatchmakeSessionSystemPasswordResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class CreateMatchmakeSessionWithParamResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.joinedMatchmakeSession = stream.readNEXStructure(MatchMakingTypes.MatchmakeSession);
	}

	toJSON() {
		return {
			joinedMatchmakeSession: {
				__typeName: 'MatchmakeSession',
				__typeValue: this.joinedMatchmakeSession
			}
		};
	}
}

class JoinMatchmakeSessionWithParamResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.joinedMatchmakeSession = stream.readNEXStructure(MatchMakingTypes.MatchmakeSession);
	}

	toJSON() {
		return {
			joinedMatchmakeSession: {
				__typeName: 'MatchmakeSession',
				__typeValue: this.joinedMatchmakeSession
			}
		};
	}
}

class AutoMatchmakeWithParam_PostponeResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.joinedMatchmakeSession = stream.readNEXStructure(MatchMakingTypes.MatchmakeSession);
	}

	toJSON() {
		return {
			joinedMatchmakeSession: {
				__typeName: 'MatchmakeSession',
				__typeValue: this.joinedMatchmakeSession
			}
		};
	}
}

class FindMatchmakeSessionByGatheringIdDetailResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.matchmakeSession = stream.readNEXStructure(MatchMakingTypes.MatchmakeSession);
	}

	toJSON() {
		return {
			matchmakeSession: {
				__typeName: 'MatchmakeSession',
				__typeValue: this.matchmakeSession
			}
		};
	}
}

class BrowseMatchmakeSessionNoHolderResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstMatchmakeSession = stream.readNEXList(MatchMakingTypes.MatchmakeSession);
	}

	toJSON() {
		return {
			lstMatchmakeSession: {
				__typeName: 'List<MatchmakeSession>',
				__typeValue: this.lstMatchmakeSession
			}
		};
	}
}

class BrowseMatchmakeSessionWithHostUrlsNoHolderResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstMatchmakeSession = stream.readNEXList(MatchMakingTypes.MatchmakeSession);
		this.lstGatheringUrls = stream.readNEXList(MatchMakingTypes.GatheringURLs);
	}

	toJSON() {
		return {
			lstMatchmakeSession: {
				__typeName: 'List<MatchmakeSession>',
				__typeValue: this.lstMatchmakeSession
			},
			lstGatheringUrls: {
				__typeName: 'List<GatheringURLs>',
				__typeValue: this.lstGatheringUrls
			}
		};
	}
}

class UpdateMatchmakeSessionPartResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class RequestMatchmakingResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.requestId = stream.readUInt64LE();
	}

	toJSON() {
		return {
			requestId: {
				__typeName: 'uint64',
				__typeValue: this.requestId
			}
		};
	}
}

class WithdrawMatchmakingResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class WithdrawMatchmakingAllResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class FindMatchmakeSessionByGatheringIdResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstMatchmakeSession = stream.readNEXList(MatchMakingTypes.MatchmakeSession);
	}

	toJSON() {
		return {
			lstMatchmakeSession: {
				__typeName: 'List<MatchmakeSession>',
				__typeValue: this.lstMatchmakeSession
			}
		};
	}
}

class FindMatchmakeSessionBySingleGatheringIdResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.matchmakeSession = stream.readNEXStructure(MatchMakingTypes.MatchmakeSession);
	}

	toJSON() {
		return {
			matchmakeSession: {
				__typeName: 'MatchmakeSession',
				__typeValue: this.matchmakeSession
			}
		};
	}
}

class FindMatchmakeSessionByOwnerResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstMatchmakeSession = stream.readNEXList(MatchMakingTypes.MatchmakeSession);
	}

	toJSON() {
		return {
			lstMatchmakeSession: {
				__typeName: 'List<MatchmakeSession>',
				__typeValue: this.lstMatchmakeSession
			}
		};
	}
}

class FindMatchmakeSessionByParticipantResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstSession = stream.readNEXList(MatchMakingTypes.FindMatchmakeSessionByParticipantResult);
	}

	toJSON() {
		return {
			lstSession: {
				__typeName: 'List<FindMatchmakeSessionByParticipantResult>',
				__typeValue: this.lstSession
			}
		};
	}
}

class BrowseMatchmakeSessionNoHolderNoResultRangeResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstMatchmakeSession = stream.readNEXList(MatchMakingTypes.MatchmakeSession);
	}

	toJSON() {
		return {
			lstMatchmakeSession: {
				__typeName: 'List<MatchmakeSession>',
				__typeValue: this.lstMatchmakeSession
			}
		};
	}
}

class BrowseMatchmakeSessionWithHostUrlsNoHolderNoResultRangeResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstMatchmakeSession = stream.readNEXList(MatchMakingTypes.MatchmakeSession);
		this.lstGatheringUrls = stream.readNEXList(MatchMakingTypes.GatheringURLs);
	}

	toJSON() {
		return {
			lstMatchmakeSession: {
				__typeName: 'List<MatchmakeSession>',
				__typeValue: this.lstMatchmakeSession
			},
			lstGatheringUrls: {
				__typeName: 'List<GatheringURLs>',
				__typeValue: this.lstGatheringUrls
			}
		};
	}
}

module.exports = {
	CloseParticipationResponse,
	OpenParticipationResponse,
	AutoMatchmake_PostponeResponse,
	BrowseMatchmakeSessionResponse,
	BrowseMatchmakeSessionWithHostUrlsResponse,
	CreateMatchmakeSessionResponse,
	JoinMatchmakeSessionResponse,
	ModifyCurrentGameAttributeResponse,
	UpdateNotificationDataResponse,
	GetFriendNotificationDataResponse,
	UpdateApplicationBufferResponse,
	UpdateMatchmakeSessionAttributeResponse,
	GetlstFriendNotificationDataResponse,
	UpdateMatchmakeSessionResponse,
	AutoMatchmakeWithSearchCriteria_PostponeResponse,
	GetPlayingSessionResponse,
	CreateCommunityResponse,
	UpdateCommunityResponse,
	JoinCommunityResponse,
	FindCommunityByGatheringIdResponse,
	FindOfficialCommunityResponse,
	FindCommunityByParticipantResponse,
	UpdatePrivacySettingResponse,
	GetMyBlockListResponse,
	AddToBlockListResponse,
	RemoveFromBlockListResponse,
	ClearMyBlockListResponse,
	ReportViolationResponse,
	IsViolationUserResponse,
	JoinMatchmakeSessionExResponse,
	GetSimplePlayingSessionResponse,
	GetSimpleCommunityResponse,
	AutoMatchmakeWithGatheringId_PostponeResponse,
	UpdateProgressScoreResponse,
	DebugNotifyEventResponse,
	GenerateMatchmakeSessionSystemPasswordResponse,
	ClearMatchmakeSessionSystemPasswordResponse,
	CreateMatchmakeSessionWithParamResponse,
	JoinMatchmakeSessionWithParamResponse,
	AutoMatchmakeWithParam_PostponeResponse,
	FindMatchmakeSessionByGatheringIdDetailResponse,
	BrowseMatchmakeSessionNoHolderResponse,
	BrowseMatchmakeSessionWithHostUrlsNoHolderResponse,
	UpdateMatchmakeSessionPartResponse,
	RequestMatchmakingResponse,
	WithdrawMatchmakingResponse,
	WithdrawMatchmakingAllResponse,
	FindMatchmakeSessionByGatheringIdResponse,
	FindMatchmakeSessionBySingleGatheringIdResponse,
	FindMatchmakeSessionByOwnerResponse,
	FindMatchmakeSessionByParticipantResponse,
	BrowseMatchmakeSessionNoHolderNoResultRangeResponse,
	BrowseMatchmakeSessionWithHostUrlsNoHolderNoResultRangeResponse
};
