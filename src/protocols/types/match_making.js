const Stream = require('../../stream'); // eslint-disable-line no-unused-vars
const NEXTypes = require('../../types');

class Gathering extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_idMyself = stream.readUInt32LE();
		this.m_pidOwner = stream.readUInt32LE();
		this.m_pidHost = stream.readUInt32LE();
		this.m_uiMinParticipants = stream.readUInt16LE();
		this.m_uiMaxParticipants = stream.readUInt16LE();
		this.m_uiParticipationPolicy = stream.readUInt32LE();
		this.m_uiPolicyArgument = stream.readUInt32LE();
		this.m_uiFlags = stream.readUInt32LE();
		this.m_uiState = stream.readUInt32LE();
		this.m_strDescription = stream.readNEXString();
	}
}
NEXTypes.AnyDataHolder.addType('Gathering', Gathering);

class PersistentGathering extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(Gathering);
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_CommunityType = stream.readUInt32LE();
		this.m_Password = stream.readNEXString();
		this.m_Attribs = stream.readNEXList(stream.readUInt32LE);
		this.m_ApplicationBuffer = stream.readNEXBuffer();
		this.m_ParticipationStartDate = stream.readNEXDateTime();
		this.m_ParticipationEndDate = stream.readNEXDateTime();
		this.m_MatchmakeSessionCount = stream.readUInt32LE();
		this.m_ParticipationCount = stream.readUInt32LE();
	}
}

class MatchmakeSession extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(Gathering);
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_GameMode = stream.readUInt32LE();
		this.m_Attribs = stream.readNEXList(stream.readUInt32LE);
		this.m_OpenParticipation = stream.readBoolean();
		this.m_MatchmakeSystemType = stream.readUInt32LE();
		this.m_ApplicationBuffer = stream.readNEXBuffer();
		this.m_ParticipationCount = stream.readUInt32LE();

		if (stream.connection.title.nex_version.major >= 3 && stream.connection.title.nex_version.minor >= 5) {
			this.m_ProgressScore = stream.readUInt8();
		}

		if (stream.connection.title.nex_version.major >= 3) {
			this.m_SessionKey = stream.readNEXBuffer();
		}

		if (stream.connection.title.nex_version.major >= 3 && stream.connection.title.nex_version.minor >= 5) {
			this.m_Option0 = stream.readUInt32LE();
		}

		// TODO - Unsure if the minor check here is correct! This works for Splatoon
		if (stream.connection.title.nex_version.major >= 3 && stream.connection.title.nex_version.minor >= 8) {
			this.m_MatchmakeParam = stream.readNEXStructure(MatchmakeParam);
			this.m_StartedTime = stream.readNEXDateTime();
			this.m_UserPassword = stream.readNEXString();
			this.m_ReferGid = stream.readUInt32LE();
			this.m_UserPasswordEnabled = stream.readBoolean();
			this.m_SystemPasswordEnabled = stream.readBoolean();
		}

		if (stream.connection.title.nex_version.major >= 4) {
			this.m_Codeword = stream.readNEXString();
		}
	}
}

class MatchmakeSessionSearchCriteria extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_Attribs = stream.readNEXList(stream.readNEXString);
		this.m_GameMode = stream.readNEXString();
		this.m_MinParticipants = stream.readNEXString();
		this.m_MaxParticipants = stream.readNEXString();
		this.m_MatchmakeSystemType = stream.readNEXString();
		this.m_VacantOnly = stream.readBoolean();
		this.m_ExcludeLocked = stream.readBoolean();
		this.m_ExcludeNonHostPid = stream.readBoolean();
		this.m_SelectionMethod = stream.readUInt32LE();

		if (stream.connection.title.nex_version.major >= 3 && stream.connection.title.nex_version.minor >= 5) {
			this.m_VacantParticipants = stream.readUInt16LE();
		}

		// TODO - Unsure if the minor check here is correct! This works for Splatoon
		if (stream.connection.title.nex_version.major >= 3 && stream.connection.title.nex_version.minor >= 8) {
			this.m_MatchmakeParam = stream.readNEXStructure(MatchmakeParam);
			this.m_ExcludeUserPasswordSet = stream.readBoolean();
			this.m_ExcludeSystemPasswordSet = stream.readBoolean();
			this.m_ReferGid = stream.readUInt32LE();
		}

		if (stream.connection.title.nex_version.major >= 4) {
			this.m_Codeword = stream.readNEXString();
			this.m_ResultRange = stream.readNEXStructure(NEXTypes.ResultRange);
		}
	}
}

class CreateMatchmakeSessionParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.sourceMatchmakeSession = stream.readNEXStructure(MatchmakeSession);
		this.additionalParticipants = stream.readNEXList(stream.readUInt32LE);
		this.gidForParticipationCheck = stream.readUInt32LE();
		this.createMatchmakeSessionOption = stream.readUInt32LE();
		this.joinMessage = stream.readNEXString();
		this.participationCount = stream.readUInt16LE();
	}
}

class JoinMatchmakeSessionParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.gid = stream.readUInt32LE();
		this.additionalParticipants = stream.readNEXList(stream.readUInt32LE);
		this.gidForParticipationCheck = stream.readUInt32LE();
		this.joinMatchmakeSessionOption = stream.readUInt32LE();
		this.joinMatchmakeSessionBehavior = stream.readUInt8();
		this.strUserPassword = stream.readNEXString();
		this.strSystemPassword = stream.readNEXString();
		this.joinMessage = stream.readNEXString();
		this.participationCount = stream.readUInt16LE();
		this.extraParticipants = stream.readUInt16LE();
		this.blockListParam = stream.readNEXStructure(MatchmakeBlockListParam);
	}
}

class UpdateMatchmakeSessionParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.gid = stream.readUInt32LE();
		this.modificationFlag = stream.readUInt32LE();
		this.attributes = stream.readNEXList(stream.readUInt32LE);
		this.openParticipation = stream.readBoolean();
		this.applicationBuffer = stream.readNEXBuffer();
		this.progressScore = stream.readUInt8();
		this.blockListParam = stream.readNEXStructure(MatchmakeParam);
		this.startedTime = stream.readNEXDateTime();
		this.userPassword = stream.readNEXString();
		this.gameMode = stream.readUInt32LE();
		this.description = stream.readNEXString();
		this.minParticipants = stream.readUInt16LE();
		this.maxParticipants = stream.readUInt16LE();
		this.matchmakeSystemType = stream.readUInt32LE();
		this.participationPolicy = stream.readUInt32LE();
		this.policyArgument = stream.readUInt32LE();
		this.codeword = stream.readNEXString();
	}
}

class MatchmakeBlockListParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.optionFlag = stream.readUInt32LE();
	}
}

class MatchmakeParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_Params = stream.readNEXMap(stream.readNEXString, stream.readNEXVariant);
	}
}

class AutoMatchmakeParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.sourceMatchmakeSession = stream.readNEXStructure(MatchmakeSession);
		this.additionalParticipants = stream.readNEXList(stream.readUInt32LE);
		this.gidForParticipationCheck = stream.readUInt32LE();
		this.autoMatchmakeOption = stream.readUInt32LE();
		this.joinMessage = stream.readNEXString();
		this.participationCount = stream.readUInt16LE();
		this.lstSearchCriteria = stream.readNEXList(MatchmakeSessionSearchCriteria);
		//this.targetGids = stream.readNEXList(stream.readUInt32LE);

		if (stream.connection.title.nex_version.major >= 4) {
			this.blockListParam = stream.readNEXStructure(MatchmakeBlockListParam);
		}
	}
}

class FindMatchmakeSessionByParticipantParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_principalIdList = stream.readNEXList(stream.readUInt32LE);
		this.m_resultOptions = stream.readUInt32LE();
		this.m_blockListParam = stream.readNEXStructure(MatchmakeBlockListParam);
	}
}

class FindMatchmakeSessionByParticipantResult extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_principalId = stream.readUInt32LE();
		this.m_session = stream.readNEXStructure(MatchmakeSession);
	}
}

class GatheringURLs extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_gid = stream.readUInt32LE();
		this.m_lstStationURLs = stream.readNEXStructure(stream.readNEXStationURL);
	}
}

class GatheringStats extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_pidParticipant = stream.readUInt32LE();
		this.m_uiFlags = stream.readUInt32LE();
		this.m_lstValues = stream.readNEXList(stream.readFloatLE);
	}
}

class Invitation extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_idGathering = stream.readUInt32LE();
		this.m_idGuest = stream.readUInt32LE();
		this.m_strMessage = stream.readNEXString();
	}
}

class ParticipantDetails extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_idParticipant = stream.readUInt32LE();
		this.m_strName = stream.readNEXString();
		this.m_strMessage = stream.readNEXString();
		this.m_uiParticipants = stream.readUInt16LE();
	}
}

class DeletionEntry extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_idGathering = stream.readUInt32LE();
		this.m_pid = stream.readUInt32LE();
		this.m_uiReason = stream.readUInt32LE();
	}
}

class PlayingSession extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_PrincipalId = stream.readUInt32LE();
		this.m_Gathering = stream.readNEXAnyDataHolder();
	}
}

class SimplePlayingSession extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_PrincipalID = stream.readUInt32LE();
		this.m_GatheringID = stream.readUInt32LE();
		this.m_GameMode = stream.readUInt32LE();
		this.m_Attribute_0 = stream.readUInt32LE();
	}
}

class SimpleCommunity extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_GatheringID = stream.readUInt32LE();
		this.m_MatchmakeSessionCount = stream.readUInt32LE();
	}
}

module.exports = {
	Gathering,
	PersistentGathering,
	MatchmakeSession,
	MatchmakeSessionSearchCriteria,
	CreateMatchmakeSessionParam,
	JoinMatchmakeSessionParam,
	UpdateMatchmakeSessionParam,
	MatchmakeBlockListParam,
	MatchmakeParam,
	AutoMatchmakeParam,
	FindMatchmakeSessionByParticipantParam,
	FindMatchmakeSessionByParticipantResult,
	GatheringURLs,
	GatheringStats,
	Invitation,
	ParticipantDetails,
	DeletionEntry,
	PlayingSession,
	SimplePlayingSession,
	SimpleCommunity
};