const Stream = require('../../stream'); // eslint-disable-line no-unused-vars
const NEXTypes = require('../../types');
const MatchMakingTypes = require('../types/match_making');

class CloseParticipationRequest {
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

class OpenParticipationRequest {
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

class AutoMatchmake_PostponeRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.anyGathering = stream.readNEXAnyDataHolder();
		this.strMessage = stream.readNEXString();
	}

	toJSON() {
		return {
			anyGathering: {
				__typeName: 'AnyDataHolder',
				__typeValue: this.anyGathering
			},
			strMessage: {
				__typeName: 'String',
				__typeValue: this.strMessage
			}
		};
	}
}

class BrowseMatchmakeSessionRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.searchCriteria = stream.readNEXStructure(MatchMakingTypes.MatchmakeSessionSearchCriteria);
		this.resultRange = stream.readNEXStructure(NEXTypes.ResultRange);
	}

	toJSON() {
		return {
			searchCriteria: {
				__typeName: 'MatchmakeSessionSearchCriteria',
				__typeValue: this.searchCriteria
			},
			resultRange: {
				__typeName: 'ResultRange',
				__typeValue: this.resultRange
			}
		};
	}
}

class BrowseMatchmakeSessionWithHostUrlsRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.searchCriteria = stream.readNEXStructure(MatchMakingTypes.MatchmakeSessionSearchCriteria);
		this.resultRange = stream.readNEXStructure(NEXTypes.ResultRange);
	}

	toJSON() {
		return {
			searchCriteria: {
				__typeName: 'MatchmakeSessionSearchCriteria',
				__typeValue: this.searchCriteria
			},
			resultRange: {
				__typeName: 'ResultRange',
				__typeValue: this.resultRange
			}
		};
	}
}

class CreateMatchmakeSessionRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		let nexVersion;
		if (stream.connection.title.nex_match_making_version) {
			nexVersion = stream.connection.title.nex_match_making_version;
		} else {
			nexVersion = stream.connection.title.nex_version;
		}

		this.anyGathering = stream.readNEXAnyDataHolder();
		this.strMessage = stream.readNEXString();

		if (nexVersion.major >= 3 && nexVersion.minor >= 5) {
			this.participationCount = stream.readUInt16LE();
		}
	}

	toJSON() {
		const data = {
			anyGathering: {
				__typeName: 'AnyDataHolder',
				__typeValue: this.anyGathering
			},
			strMessage: {
				__typeName: 'String',
				__typeValue: this.strMessage
			}
		};

		if (this.participationCount !== undefined) {
			data.participationCount = {
				__typeName: 'uint16',
				__typeValue: this.participationCount
			};
		}

		return data;
	}
}

class JoinMatchmakeSessionRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.gid = stream.readUInt32LE();
		this.strMessage = stream.readNEXString();
	}

	toJSON() {
		return {
			gid: {
				__typeName: 'uint32',
				__typeValue: this.gid
			},
			strMessage: {
				__typeName: 'String',
				__typeValue: this.strMessage
			}
		};
	}
}

class ModifyCurrentGameAttributeRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.gid = stream.readUInt32LE();
		this.attribIndex = stream.readUInt32LE();
		this.newValue = stream.readUInt32LE();
	}

	toJSON() {
		return {
			gid: {
				__typeName: 'uint32',
				__typeValue: this.gid
			},
			attribIndex: {
				__typeName: 'uint32',
				__typeValue: this.attribIndex
			},
			newValue: {
				__typeName: 'uint32',
				__typeValue: this.newValue
			}
		};
	}
}

class UpdateNotificationDataRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		// * This has a different format on the Switch
		// * On the Switch uiParam1 and uiParam2 are uint64
		this.uiType = stream.readUInt32LE();
		this.uiParam1 = stream.readUInt32LE();
		this.uiParam2 = stream.readUInt32LE();
		this.strParam = stream.readNEXString();
	}

	toJSON() {
		return {
			uiType: {
				__typeName: 'uint32',
				__typeValue: this.uiType
			},
			uiParam1: {
				__typeName: 'uint32',
				__typeValue: this.uiParam1
			},
			uiParam2: {
				__typeName: 'uint32',
				__typeValue: this.uiParam2
			},
			strParam: {
				__typeName: 'String',
				__typeValue: this.strParam
			}
		};
	}
}

class GetFriendNotificationDataRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.uiType = stream.readInt32LE();
	}

	toJSON() {
		return {
			uiType: {
				__typeName: 'sint32',
				__typeValue: this.uiType
			}
		};
	}
}

class UpdateApplicationBufferRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.gid = stream.readUInt32LE();
		this.applicationBuffer = stream.readNEXBuffer();
	}

	toJSON() {
		return {
			gid: {
				__typeName: 'uint32',
				__typeValue: this.gid
			},
			applicationBuffer: {
				__typeName: 'Buffer',
				__typeValue: this.applicationBuffer
			}
		};
	}
}

class UpdateMatchmakeSessionAttributeRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.gid = stream.readUInt32LE();
		this.attribs = stream.readNEXList(stream.readInt32LE);
	}

	toJSON() {
		return {
			gid: {
				__typeName: 'uint32',
				__typeValue: this.gid
			},
			attribs: {
				__typeName: 'List<uint32>',
				__typeValue: this.attribs
			}
		};
	}
}

class GetlstFriendNotificationDataRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstTypes = stream.readNEXList(stream.readUInt32LE);
	}

	toJSON() {
		return {
			lstTypes: {
				__typeName: 'List<uint32>',
				__typeValue: this.lstTypes
			}
		};
	}
}

class UpdateMatchmakeSessionRequest {
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

class AutoMatchmakeWithSearchCriteria_PostponeRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstSearchCriteria = stream.readNEXList(MatchMakingTypes.MatchmakeSessionSearchCriteria);
		this.anyGathering = stream.readNEXAnyDataHolder();
		this.strMessage = stream.readNEXString();
	}

	toJSON() {
		return {
			lstSearchCriteria: {
				__typeName: 'List<MatchmakeSessionSearchCriteria>',
				__typeValue: this.lstSearchCriteria
			},
			anyGathering: {
				__typeName: 'AnyDataHolder',
				__typeValue: this.anyGathering
			},
			strMessage: {
				__typeName: 'String',
				__typeValue: this.strMessage
			}
		};
	}
}

class GetPlayingSessionRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstPid = stream.readNEXList(stream.readPID);
	}

	toJSON() {
		return {
			lstPid: {
				__typeName: 'List<PID>',
				__typeValue: this.lstPid
			}
		};
	}
}

class CreateCommunityRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.community = stream.readNEXStructure(MatchMakingTypes.PersistentGathering);
		this.strMessage = stream.readNEXString();
	}

	toJSON() {
		return {
			community: {
				__typeName: 'PersistentGathering',
				__typeValue: this.community
			},
			strMessage: {
				__typeName: 'String',
				__typeValue: this.strMessage
			}
		};
	}
}

class UpdateCommunityRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.community = stream.readNEXStructure(MatchMakingTypes.PersistentGathering);
	}

	toJSON() {
		return {
			community: {
				__typeName: 'PersistentGathering',
				__typeValue: this.community
			}
		};
	}
}

class JoinCommunityRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.gid = stream.readUInt32LE();
		this.strMessage = stream.readNEXString();
		this.strPassword = stream.readNEXString();
	}

	toJSON() {
		return {
			gid: {
				__typeName: 'uint32',
				__typeValue: this.gid
			},
			strMessage: {
				__typeName: 'String',
				__typeValue: this.strMessage
			},
			strPassword: {
				__typeName: 'String',
				__typeValue: this.strPassword
			}
		};
	}
}

class FindCommunityByGatheringIdRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstGid = stream.readNEXList(stream.readUInt32LE);
	}

	toJSON() {
		return {
			lstGid: {
				__typeName: 'List<uint32>',
				__typeValue: this.lstGid
			}
		};
	}
}

class FindOfficialCommunityRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.isAvailableOnly = stream.readBoolean();
		this.resultRange = stream.readNEXStructure(NEXTypes.ResultRange);
	}

	toJSON() {
		return {
			isAvailableOnly: {
				__typeName: 'boolean',
				__typeValue: this.isAvailableOnly
			},
			resultRange: {
				__typeName: 'ResultRange',
				__typeValue: this.resultRange
			}
		};
	}
}

class FindCommunityByParticipantRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pid = stream.readPID();
		this.resultRange = stream.readNEXStructure(NEXTypes.ResultRange);
	}

	toJSON() {
		return {
			pid: {
				__typeName: 'PID',
				__typeValue: this.pid
			},
			resultRange: {
				__typeName: 'ResultRange',
				__typeValue: this.resultRange
			}
		};
	}
}

class UpdatePrivacySettingRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.onlineStatus = stream.readBoolean();
		this.participationCommunity = stream.readBoolean();
	}

	toJSON() {
		return {
			onlineStatus: {
				__typeName: 'boolean',
				__typeValue: this.onlineStatus
			},
			participationCommunity: {
				__typeName: 'boolean',
				__typeValue: this.participationCommunity
			}
		};
	}
}

class GetMyBlockListRequest {
	// * Requests nothing
	toJSON() {
		return {};
	}
}

class AddToBlockListRequest {
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

class RemoveFromBlockListRequest {
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

class ClearMyBlockListRequest {
	// * Requests nothing
	toJSON() {
		return {};
	}
}

class ReportViolationRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pid = stream.readPID();
		this.userName = stream.readNEXString();
		this.violationCode = stream.readUInt32LE();
	}

	toJSON() {
		return {
			pid: {
				__typeName: 'PID',
				__typeValue: this.pid
			},
			userName: {
				__typeName: 'String',
				__typeValue: this.userName
			},
			violationCode: {
				__typeName: 'uint32',
				__typeValue: this.violationCode
			}
		};
	}
}

class IsViolationUserRequest {
	// * Requests nothing
	toJSON() {
		return {};
	}
}

class JoinMatchmakeSessionExRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.gid = stream.readUInt32LE();
		this.strMessage = stream.readNEXString();
		this.dontCareMyBlockList = stream.readBoolean();
		this.participationCount = stream.readUInt16LE();
	}

	toJSON() {
		return {
			gid: {
				__typeName: 'uint32',
				__typeValue: this.gid
			},
			strMessage: {
				__typeName: 'String',
				__typeValue: this.strMessage
			},
			dontCareMyBlockList: {
				__typeName: 'boolean',
				__typeValue: this.dontCareMyBlockList
			},
			participationCount: {
				__typeName: 'uint16',
				__typeValue: this.participationCount
			}
		};
	}
}

class GetSimplePlayingSessionRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstPrincipalId = stream.readNEXList(stream.readPID);
		this.includeLoginUser = stream.readBoolean();
	}

	toJSON() {
		return {
			lstPrincipalId: {
				__typeName: 'List<PID>',
				__typeValue: this.lstPrincipalId
			},
			includeLoginUser: {
				__typeName: 'boolean',
				__typeValue: this.includeLoginUser
			}
		};
	}
}

class GetSimpleCommunityRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.gatheringIdList = stream.readNEXList(stream.readUInt32LE);
	}

	toJSON() {
		return {
			gatheringIdList: {
				__typeName: 'List<uint32>',
				__typeValue: this.gatheringIdList
			}
		};
	}
}

class AutoMatchmakeWithGatheringId_PostponeRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstGid = stream.readNEXList(stream.readUInt32LE);
		this.anyGathering = stream.readNEXAnyDataHolder();
		this.strMessage = stream.readNEXString();
	}

	toJSON() {
		return {
			lstGid: {
				__typeName: 'List<uint32>',
				__typeValue: this.lstGid
			},
			anyGathering: {
				__typeName: 'AnyDataHolder',
				__typeValue: this.anyGathering
			},
			strMessage: {
				__typeName: 'String',
				__typeValue: this.strMessage
			}
		};
	}
}

class UpdateProgressScoreRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.gid = stream.readUInt32LE();
		this.progressScore = stream.readUInt8();
	}

	toJSON() {
		return {
			gid: {
				__typeName: 'uint32',
				__typeValue: this.gid
			},
			progressScore: {
				__typeName: 'uint8',
				__typeValue: this.progressScore
			}
		};
	}
}

class DebugNotifyEventRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pid = stream.readPID();
		this.mainType = stream.readUInt32LE();
		this.subType = stream.readUInt32LE();
		this.param1 = stream.readUInt64LE();
		this.param2 = stream.readUInt64LE();
		this.stringParam = stream.readNEXString();
	}

	toJSON() {
		return {
			pid: {
				__typeName: 'PID',
				__typeValue: this.pid
			},
			mainType: {
				__typeName: 'uui9nt32int8',
				__typeValue: this.mainType
			},
			subType: {
				__typeName: 'uint32',
				__typeValue: this.subType
			},
			param1: {
				__typeName: 'uint64',
				__typeValue: this.param1
			},
			param2: {
				__typeName: 'uint64',
				__typeValue: this.param2
			},
			stringParam: {
				__typeName: 'String',
				__typeValue: this.stringParam
			}
		};
	}
}

class GenerateMatchmakeSessionSystemPasswordRequest {
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

class ClearMatchmakeSessionSystemPasswordRequest {
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

class CreateMatchmakeSessionWithParamRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.createMatchmakeSessionParam = stream.readNEXStructure(MatchMakingTypes.CreateMatchmakeSessionParam);
	}

	toJSON() {
		return {
			createMatchmakeSessionParam: {
				__typeName: 'CreateMatchmakeSessionParam',
				__typeValue: this.createMatchmakeSessionParam
			}
		};
	}
}

class JoinMatchmakeSessionWithParamRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.joinMatchmakeSessionParam = stream.readNEXStructure(MatchMakingTypes.JoinMatchmakeSessionParam);
	}

	toJSON() {
		return {
			joinMatchmakeSessionParam: {
				__typeName: 'JoinMatchmakeSessionParam',
				__typeValue: this.joinMatchmakeSessionParam
			}
		};
	}
}

class AutoMatchmakeWithParam_PostponeRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.autoMatchmakeParam = stream.readNEXStructure(MatchMakingTypes.AutoMatchmakeParam);
	}

	toJSON() {
		return {
			autoMatchmakeParam: {
				__typeName: 'AutoMatchmakeParam',
				__typeValue: this.autoMatchmakeParam
			}
		};
	}
}

class FindMatchmakeSessionByGatheringIdDetailRequest {
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

class BrowseMatchmakeSessionNoHolderRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.searchCriteria = stream.readNEXStructure(MatchMakingTypes.MatchmakeSessionSearchCriteria);
		this.resultRange = stream.readNEXStructure(NEXTypes.ResultRange);
	}

	toJSON() {
		return {
			searchCriteria: {
				__typeName: 'MatchmakeSessionSearchCriteria',
				__typeValue: this.searchCriteria
			},
			resultRange: {
				__typeName: 'ResultRange',
				__typeValue: this.resultRange
			}
		};
	}
}

class BrowseMatchmakeSessionWithHostUrlsNoHolderRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.searchCriteria = stream.readNEXStructure(MatchMakingTypes.MatchmakeSessionSearchCriteria);
		this.resultRange = stream.readNEXStructure(NEXTypes.ResultRange);
	}

	toJSON() {
		return {
			searchCriteria: {
				__typeName: 'MatchmakeSessionSearchCriteria',
				__typeValue: this.searchCriteria
			},
			resultRange: {
				__typeName: 'ResultRange',
				__typeValue: this.resultRange
			}
		};
	}
}

class UpdateMatchmakeSessionPartRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.updateMatchmakeSessionParam = stream.readNEXStructure(MatchMakingTypes.UpdateMatchmakeSessionParam);
	}

	toJSON() {
		return {
			updateMatchmakeSessionParam: {
				__typeName: 'UpdateMatchmakeSessionParam',
				__typeValue: this.updateMatchmakeSessionParam
			}
		};
	}
}

class RequestMatchmakingRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.autoMatchmakeParam = stream.readNEXStructure(MatchMakingTypes.AutoMatchmakeParam);
	}

	toJSON() {
		return {
			autoMatchmakeParam: {
				__typeName: 'AutoMatchmakeParam',
				__typeValue: this.autoMatchmakeParam
			}
		};
	}
}

class WithdrawMatchmakingRequest {
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

class WithdrawMatchmakingAllRequest {
	// * Requests nothing
	toJSON() {
		return {};
	}
}

class FindMatchmakeSessionByGatheringIdRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstGid = stream.readNEXList(stream.readUInt32LE);
	}

	toJSON() {
		return {
			lstGid: {
				__typeName: 'List<uint32>',
				__typeValue: this.lstGid
			}
		};
	}
}

class FindMatchmakeSessionBySingleGatheringIdRequest {
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

class FindMatchmakeSessionByOwnerRequest {
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

class FindMatchmakeSessionByParticipantRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(MatchMakingTypes.FindMatchmakeSessionByParticipantParam);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'FindMatchmakeSessionByParticipantParam',
				__typeValue: this.param
			}
		};
	}
}

class BrowseMatchmakeSessionNoHolderNoResultRangeRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.searchCriteria = stream.readNEXStructure(MatchMakingTypes.MatchmakeSessionSearchCriteria);
	}

	toJSON() {
		return {
			searchCriteria: {
				__typeName: 'MatchmakeSessionSearchCriteria',
				__typeValue: this.searchCriteria
			}
		};
	}
}

class BrowseMatchmakeSessionWithHostUrlsNoHolderNoResultRangeRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.searchCriteria = stream.readNEXStructure(MatchMakingTypes.MatchmakeSessionSearchCriteria);
	}

	toJSON() {
		return {
			searchCriteria: {
				__typeName: 'MatchmakeSessionSearchCriteria',
				__typeValue: this.searchCriteria
			}
		};
	}
}

module.exports = {
	CloseParticipationRequest,
	OpenParticipationRequest,
	AutoMatchmake_PostponeRequest,
	BrowseMatchmakeSessionRequest,
	BrowseMatchmakeSessionWithHostUrlsRequest,
	CreateMatchmakeSessionRequest,
	JoinMatchmakeSessionRequest,
	ModifyCurrentGameAttributeRequest,
	UpdateNotificationDataRequest,
	GetFriendNotificationDataRequest,
	UpdateApplicationBufferRequest,
	UpdateMatchmakeSessionAttributeRequest,
	GetlstFriendNotificationDataRequest,
	UpdateMatchmakeSessionRequest,
	AutoMatchmakeWithSearchCriteria_PostponeRequest,
	GetPlayingSessionRequest,
	CreateCommunityRequest,
	UpdateCommunityRequest,
	JoinCommunityRequest,
	FindCommunityByGatheringIdRequest,
	FindOfficialCommunityRequest,
	FindCommunityByParticipantRequest,
	UpdatePrivacySettingRequest,
	GetMyBlockListRequest,
	AddToBlockListRequest,
	RemoveFromBlockListRequest,
	ClearMyBlockListRequest,
	ReportViolationRequest,
	IsViolationUserRequest,
	JoinMatchmakeSessionExRequest,
	GetSimplePlayingSessionRequest,
	GetSimpleCommunityRequest,
	AutoMatchmakeWithGatheringId_PostponeRequest,
	UpdateProgressScoreRequest,
	DebugNotifyEventRequest,
	GenerateMatchmakeSessionSystemPasswordRequest,
	ClearMatchmakeSessionSystemPasswordRequest,
	CreateMatchmakeSessionWithParamRequest,
	JoinMatchmakeSessionWithParamRequest,
	AutoMatchmakeWithParam_PostponeRequest,
	FindMatchmakeSessionByGatheringIdDetailRequest,
	BrowseMatchmakeSessionNoHolderRequest,
	BrowseMatchmakeSessionWithHostUrlsNoHolderRequest,
	UpdateMatchmakeSessionPartRequest,
	RequestMatchmakingRequest,
	WithdrawMatchmakingRequest,
	WithdrawMatchmakingAllRequest,
	FindMatchmakeSessionByGatheringIdRequest,
	FindMatchmakeSessionBySingleGatheringIdRequest,
	FindMatchmakeSessionByOwnerRequest,
	FindMatchmakeSessionByParticipantRequest,
	BrowseMatchmakeSessionNoHolderNoResultRangeRequest,
	BrowseMatchmakeSessionWithHostUrlsNoHolderNoResultRangeRequest
};
