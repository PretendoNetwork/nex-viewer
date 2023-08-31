const semver = require('semver');
const Stream = require('../../stream'); // eslint-disable-line no-unused-vars
const NEXTypes = require('../../types');

class Gathering extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_idMyself = stream.readUInt32LE();
		this.m_pidOwner = stream.readPID();
		this.m_pidHost = stream.readPID();
		this.m_uiMinParticipants = stream.readUInt16LE();
		this.m_uiMaxParticipants = stream.readUInt16LE();
		this.m_uiParticipationPolicy = stream.readUInt32LE();
		this.m_uiPolicyArgument = stream.readUInt32LE();
		this.m_uiFlags = stream.readUInt32LE();
		this.m_uiState = stream.readUInt32LE();
		this.m_strDescription = stream.readNEXString();
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			m_idMyself: {
				__typeName: 'uint32',
				__typeValue: this.m_idMyself
			},
			m_pidOwner: {
				__typeName: 'PID',
				__typeValue: this.m_pidOwner
			},
			m_pidHost: {
				__typeName: 'PID',
				__typeValue: this.m_pidHost
			},
			m_uiMinParticipants: {
				__typeName: 'uint16',
				__typeValue: this.m_uiMinParticipants
			},
			m_uiMaxParticipants: {
				__typeName: 'uint16',
				__typeValue: this.m_uiMaxParticipants
			},
			m_uiParticipationPolicy: {
				__typeName: 'uint32',
				__typeValue: this.m_uiParticipationPolicy
			},
			m_uiPolicyArgument: {
				__typeName: 'uint32',
				__typeValue: this.m_uiPolicyArgument
			},
			m_uiFlags: {
				__typeName: 'uint32',
				__typeValue: this.m_uiFlags
			},
			m_uiState: {
				__typeName: 'uint32',
				__typeValue: this.m_uiState
			},
			m_strDescription: {
				__typeName: 'String',
				__typeValue: this.m_strDescription
			}
		};
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

	toJSON() {
		return {
			__typeInherits: this._parentTypes.map(value => ({
				__typeName: value.constructor.name,
				__typeValue: value
			})),
			__structureVersion: this._structureHeader.version,
			m_CommunityType: {
				__typeName: 'uint32',
				__typeValue: this.m_CommunityType
			},
			m_Password: {
				__typeName: 'String',
				__typeValue: this.m_Password
			},
			m_Attribs: {
				__typeName: 'List<uint32>',
				__typeValue: this.m_Attribs
			},
			m_ApplicationBuffer: {
				__typeName: 'Buffer',
				__typeValue: this.m_ApplicationBuffer
			},
			m_ParticipationStartDate: {
				__typeName: 'DateTime',
				__typeValue: this.m_ParticipationStartDate
			},
			m_ParticipationEndDate: {
				__typeName: 'DateTime',
				__typeValue: this.m_ParticipationEndDate
			},
			m_MatchmakeSessionCount: {
				__typeName: 'uint32',
				__typeValue: this.m_MatchmakeSessionCount
			},
			m_ParticipationCount: {
				__typeName: 'uint32',
				__typeValue: this.m_ParticipationCount
			}
		};
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
		const nexVersion = stream.connection.title.nex_match_making_version || stream.connection.title.nex_version;

		this.m_GameMode = stream.readUInt32LE();
		this.m_Attribs = stream.readNEXList(stream.readUInt32LE);
		this.m_OpenParticipation = stream.readBoolean();
		this.m_MatchmakeSystemType = stream.readUInt32LE();
		this.m_ApplicationBuffer = stream.readNEXBuffer();
		this.m_ParticipationCount = stream.readUInt32LE();

		if (semver.gte(nexVersion, '3.4.0')) {
			this.m_ProgressScore = stream.readUInt8();
		}

		if (semver.gte(nexVersion, '3.0.0')) {
			this.m_SessionKey = stream.readNEXBuffer();
		}

		if (semver.gte(nexVersion, '3.5.0')) {
			this.m_Option0 = stream.readUInt32LE();
		}

		if (semver.gte(nexVersion, '3.6.0')) {
			this.m_MatchmakeParam = stream.readNEXStructure(MatchmakeParam);
			this.m_StartedTime = stream.readNEXDateTime();
		}

		if (semver.gte(nexVersion, '3.7.0')) {
			this.m_UserPassword = stream.readNEXString();
		}

		if (semver.gte(nexVersion, '3.8.0')) {
			this.m_ReferGid = stream.readUInt32LE();
			this.m_UserPasswordEnabled = stream.readBoolean();
			this.m_SystemPasswordEnabled = stream.readBoolean();
		}

		if (semver.gte(nexVersion, '4.0.0')) {
			this.m_Codeword = stream.readNEXString();
		}
	}

	toJSON() {
		const data = {
			__typeInherits: this._parentTypes.map(value => ({
				__typeName: value.constructor.name,
				__typeValue: value
			})),
			__structureVersion: this._structureHeader.version,
			m_GameMode: {
				__typeName: 'uint32',
				__typeValue: this.m_GameMode
			},
			m_Attribs: {
				__typeName: 'List<uint32>',
				__typeValue: this.m_Attribs
			},
			m_OpenParticipation: {
				__typeName: 'boolean',
				__typeValue: this.m_OpenParticipation
			},
			m_MatchmakeSystemType: {
				__typeName: 'uint32',
				__typeValue: this.m_MatchmakeSystemType
			},
			m_ApplicationBuffer: {
				__typeName: 'Buffer',
				__typeValue: this.m_ApplicationBuffer
			},
			m_ParticipationCount: {
				__typeName: 'uint32',
				__typeValue: this.m_ParticipationCount
			}
		};

		if (this.m_ProgressScore !== undefined) {
			data.m_ProgressScore = {
				__typeName: 'uint8',
				__typeValue: this.m_ProgressScore
			}; // If prudpv1
		}

		if (this.m_SessionKey !== undefined) {
			data.m_SessionKey = {
				__typeName: 'Buffer',
				__typeValue: this.m_SessionKey
			}; // If prudpv1
		}

		if (this.m_Option0 !== undefined) {
			data.m_Option0 = {
				__typeName: 'uint32',
				__typeValue: this.m_Option0
			}; // If prudpv1
		}

		if (this.m_MatchmakeParam !== undefined) {
			data.m_MatchmakeParam = {
				__typeName: 'MatchmakeParam',
				__typeValue: this.m_MatchmakeParam
			}; // If prudpv1
		}

		if (this.m_StartedTime !== undefined) {
			data.m_StartedTime = {
				__typeName: 'DateTime',
				__typeValue: this.m_StartedTime
			}; // If prudpv1
		}

		if (this.m_UserPassword !== undefined) {
			data.m_UserPassword = {
				__typeName: 'String',
				__typeValue: this.m_UserPassword
			}; // If prudpv1
		}

		if (this.m_ReferGid !== undefined) {
			data.m_ReferGid = {
				__typeName: 'uint32',
				__typeValue: this.m_ReferGid
			}; // If prudpv1
		}

		if (this.m_UserPasswordEnabled !== undefined) {
			data.m_UserPasswordEnabled = {
				__typeName: 'boolean',
				__typeValue: this.m_UserPasswordEnabled
			}; // If prudpv1
		}

		if (this.m_SystemPasswordEnabled !== undefined) {
			data.m_SystemPasswordEnabled = {
				__typeName: 'boolean',
				__typeValue: this.m_SystemPasswordEnabled
			}; // If prudpv1
		}

		if (this.m_Codeword !== undefined) {
			data.m_Codeword = {
				__typeName: 'String',
				__typeValue: this.m_Codeword
			}; // If prudpv1
		}

		return data;
	}
}
NEXTypes.AnyDataHolder.addType('MatchmakeSession', MatchmakeSession);

class MatchmakeSessionSearchCriteria extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		const nexVersion = stream.connection.title.nex_match_making_version || stream.connection.title.nex_version;

		this.m_Attribs = stream.readNEXList(stream.readNEXString);
		this.m_GameMode = stream.readNEXString();
		this.m_MinParticipants = stream.readNEXString();
		this.m_MaxParticipants = stream.readNEXString();
		this.m_MatchmakeSystemType = stream.readNEXString();
		this.m_VacantOnly = stream.readBoolean();
		this.m_ExcludeLocked = stream.readBoolean();
		this.m_ExcludeNonHostPid = stream.readBoolean();

		if (semver.gte(nexVersion, '3.0.0')) {
			this.m_SelectionMethod = stream.readUInt32LE();
		}

		if (semver.gte(nexVersion, '3.4.0')) {
			this.m_VacantParticipants = stream.readUInt16LE();
		}

		if (semver.gte(nexVersion, '3.6.0')) {
			this.m_MatchmakeParam = stream.readNEXStructure(MatchmakeParam);
		}

		if (semver.gte(nexVersion, '3.7.0')) {
			this.m_ExcludeUserPasswordSet = stream.readBoolean();
			this.m_ExcludeSystemPasswordSet = stream.readBoolean();
		}

		if (semver.gte(nexVersion, '3.8.0')) {
			this.m_ReferGid = stream.readUInt32LE();
		}

		if (semver.gte(nexVersion, '4.0.0')) {
			this.m_Codeword = stream.readNEXString();
			this.m_ResultRange = stream.readNEXStructure(NEXTypes.ResultRange);
		}
	}

	toJSON() {
		const data = {
			__typeInherits: this._parentTypes.map(value => ({
				__typeName: value.constructor.name,
				__typeValue: value
			})),
			__structureVersion: this._structureHeader.version,
			m_Attribs: {
				__typeName: 'List<String>',
				__typeValue: this.m_Attribs
			},
			m_GameMode: {
				__typeName: 'String',
				__typeValue: this.m_GameMode
			},
			m_MinParticipants: {
				__typeName: 'String',
				__typeValue: this.m_MinParticipants
			},
			m_MaxParticipants: {
				__typeName: 'String',
				__typeValue: this.m_MaxParticipants
			},
			m_MatchmakeSystemType: {
				__typeName: 'String',
				__typeValue: this.m_MatchmakeSystemType
			},
			m_VacantOnly: {
				__typeName: 'boolean',
				__typeValue: this.m_VacantOnly
			},
			m_ExcludeLocked: {
				__typeName: 'boolean',
				__typeValue: this.m_ExcludeLocked
			},
			m_ExcludeNonHostPid: {
				__typeName: 'boolean',
				__typeValue: this.m_ExcludeNonHostPid
			}
		};

		if (this.m_SelectionMethod !== undefined) {
			data.m_SelectionMethod = {
				__typeName: 'uint32',
				__typeValue: this.m_SelectionMethod
			};
		}

		if (this.m_VacantParticipants !== undefined) {
			data.m_VacantParticipants = {
				__typeName: 'uint16',
				__typeValue: this.m_VacantParticipants
			}; // If prudpv1
		}

		if (this.m_MatchmakeParam !== undefined) {
			data.m_MatchmakeParam = {
				__typeName: 'MatchmakeParam',
				__typeValue: this.m_MatchmakeParam
			}; // If prudpv1
		}

		if (this.m_ExcludeUserPasswordSet !== undefined) {
			data.m_ExcludeUserPasswordSet = {
				__typeName: 'boolean',
				__typeValue: this.m_ExcludeUserPasswordSet
			}; // If prudpv1
		}

		if (this.m_ExcludeSystemPasswordSet !== undefined) {
			data.m_ExcludeSystemPasswordSet = {
				__typeName: 'boolean',
				__typeValue: this.m_ExcludeSystemPasswordSet
			}; // If prudpv1
		}

		if (this.m_ReferGid !== undefined) {
			data.m_ReferGid = {
				__typeName: 'uint32',
				__typeValue: this.m_ReferGid
			}; // If prudpv1
		}

		if (this.m_Codeword !== undefined) {
			data.m_Codeword = {
				__typeName: 'String',
				__typeValue: this.m_Codeword
			}; // If prudpv1
		}

		if (this.m_ResultRange !== undefined) {
			data.m_ResultRange = {
				__typeName: 'ResultRange',
				__typeValue: this.m_ResultRange
			}; // If prudpv1
		}

		return data;
	}
}

class CreateMatchmakeSessionParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.sourceMatchmakeSession = stream.readNEXStructure(MatchmakeSession);
		this.additionalParticipants = stream.readNEXList(stream.readPID);
		this.gidForParticipationCheck = stream.readUInt32LE();
		this.createMatchmakeSessionOption = stream.readUInt32LE();
		this.joinMessage = stream.readNEXString();
		this.participationCount = stream.readUInt16LE();
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			sourceMatchmakeSession: {
				__typeName: 'MatchmakeSession',
				__typeValue: this.sourceMatchmakeSession
			},
			additionalParticipants: {
				__typeName: 'List<PID>',
				__typeValue: this.additionalParticipants
			},
			gidForParticipationCheck: {
				__typeName: 'uint32',
				__typeValue: this.gidForParticipationCheck
			},
			createMatchmakeSessionOption: {
				__typeName: 'uint32',
				__typeValue: this.createMatchmakeSessionOption
			},
			joinMessage: {
				__typeName: 'String',
				__typeValue: this.joinMessage
			},
			participationCount: {
				__typeName: 'uint16',
				__typeValue: this.participationCount
			}
		};
	}
}

class JoinMatchmakeSessionParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		const nexVersion = stream.connection.title.nex_match_making_version || stream.connection.title.nex_version;

		this.gid = stream.readUInt32LE();
		this.additionalParticipants = stream.readNEXList(stream.readPID);
		this.gidForParticipationCheck = stream.readUInt32LE();
		this.joinMatchmakeSessionOption = stream.readUInt32LE();
		this.joinMatchmakeSessionBehavior = stream.readUInt8();
		this.strUserPassword = stream.readNEXString();
		this.strSystemPassword = stream.readNEXString();
		this.joinMessage = stream.readNEXString();
		this.participationCount = stream.readUInt16LE();

		// * From Dani:
		// * - "Just for future reference, Minecraft has structure version 1 on JoinMatchmakeSessionParam"
		// * These fields COULD be different structure versions, not related to NEX updates.
		// * Need to do more research

		// * Assuming this to be 3.10.0
		// * Not seen in Terraria, which is 3.8.3
		if (semver.gte(nexVersion, '3.10.0')) {
			this.extraParticipants = stream.readUInt16LE();
		}

		// * Assuming this to be 4.0.0
		// * Not seen in Minecraft, which is 3.10.0
		if (semver.gte(nexVersion, '4.0.0')) {
			this.blockListParam = stream.readNEXStructure(MatchmakeBlockListParam);
		}
	}

	toJSON() {
		const data = {
			__structureVersion: this._structureHeader.version,
			gid: {
				__typeName: 'uint32',
				__typeValue: this.gid
			},
			additionalParticipants: {
				__typeName: 'List<PID>',
				__typeValue: this.additionalParticipants
			},
			gidForParticipationCheck: {
				__typeName: 'uint32',
				__typeValue: this.gidForParticipationCheck
			},
			joinMatchmakeSessionOption: {
				__typeName: 'uint32',
				__typeValue: this.joinMatchmakeSessionOption
			},
			joinMatchmakeSessionBehavior: {
				__typeName: 'uint8',
				__typeValue: this.joinMatchmakeSessionBehavior
			},
			strUserPassword: {
				__typeName: 'String',
				__typeValue: this.strUserPassword
			},
			strSystemPassword: {
				__typeName: 'String',
				__typeValue: this.strSystemPassword
			},
			joinMessage: {
				__typeName: 'String',
				__typeValue: this.joinMessage
			},
			participationCount: {
				__typeName: 'uint16',
				__typeValue: this.participationCount
			}
		};

		if (this.extraParticipants !== undefined) {
			data.extraParticipants = {
				__typeName: 'uint16',
				__typeValue: this.extraParticipants
			};
		}

		if (this.blockListParam !== undefined) {
			data.blockListParam = {
				__typeName: 'MatchmakeBlockListParam',
				__typeValue: this.blockListParam
			};
		}

		return data;
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
		this.matchmakeParam = stream.readNEXStructure(MatchmakeParam);
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

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			gid: {
				__typeName: 'uint32',
				__typeValue: this.gid
			},
			modificationFlag: {
				__typeName: 'uint32',
				__typeValue: this.modificationFlag
			},
			attributes: {
				__typeName: 'List<uint32>',
				__typeValue: this.attributes
			},
			openParticipation: {
				__typeName: 'boolean',
				__typeValue: this.openParticipation
			},
			applicationBuffer: {
				__typeName: 'Buffer',
				__typeValue: this.applicationBuffer
			},
			progressScore: {
				__typeName: 'uint8',
				__typeValue: this.progressScore
			},
			matchmakeParam: {
				__typeName: 'MatchmakeParam',
				__typeValue: this.matchmakeParam
			},
			startedTime: {
				__typeName: 'DateTime',
				__typeValue: this.startedTime
			},
			userPassword: {
				__typeName: 'String',
				__typeValue: this.userPassword
			},
			gameMode: {
				__typeName: 'uint132',
				__typeValue: this.gameMode
			},
			description: {
				__typeName: 'String',
				__typeValue: this.description
			},
			minParticipants: {
				__typeName: 'uint16',
				__typeValue: this.minParticipants
			},
			maxParticipants: {
				__typeName: 'uint16',
				__typeValue: this.maxParticipants
			},
			matchmakeSystemType: {
				__typeName: 'Stri32',
				__typeValue: this.matchmakeSystemType
			},
			participationPolicy: {
				__typeName: 'uint32',
				__typeValue: this.participationPolicy
			},
			policyArgument: {
				__typeName: 'uint32',
				__typeValue: this.policyArgument
			},
			codeword: {
				__typeName: 'String',
				__typeValue: this.codeword
			}
		};
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

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			optionFlag: {
				__typeName: 'uint32',
				__typeValue: this.optionFlag
			}
		};
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

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			m_Params: {
				__typeName: 'Map<String, Variant>',
				__typeValue: this.m_Params
			}
		};
	}
}

class AutoMatchmakeParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		const nexVersion = stream.connection.title.nex_match_making_version || stream.connection.title.nex_version;

		this.sourceMatchmakeSession = stream.readNEXStructure(MatchmakeSession);
		this.additionalParticipants = stream.readNEXList(stream.readPID);
		this.gidForParticipationCheck = stream.readUInt32LE();
		this.autoMatchmakeOption = stream.readUInt32LE();
		this.joinMessage = stream.readNEXString();
		this.participationCount = stream.readUInt16LE();
		this.lstSearchCriteria = stream.readNEXList(MatchmakeSessionSearchCriteria);
		this.targetGids = stream.readNEXList(stream.readUInt32LE);

		if (semver.gte(nexVersion, '4.0.0')) {
			this.blockListParam = stream.readNEXStructure(MatchmakeBlockListParam);
		}
	}

	toJSON() {
		const data = {
			__structureVersion: this._structureHeader.version,
			sourceMatchmakeSession: {
				__typeName: 'MatchmakeSession',
				__typeValue: this.sourceMatchmakeSession
			},
			additionalParticipants: {
				__typeName: 'List<PID>',
				__typeValue: this.additionalParticipants
			},
			gidForParticipationCheck: {
				__typeName: 'uint32',
				__typeValue: this.gidForParticipationCheck
			},
			autoMatchmakeOption: {
				__typeName: 'uint32',
				__typeValue: this.autoMatchmakeOption
			},
			joinMessage: {
				__typeName: 'String',
				__typeValue: this.joinMessage
			},
			participationCount: {
				__typeName: 'uint16',
				__typeValue: this.participationCount
			},
			lstSearchCriteria: {
				__typeName: 'List<MatchmakeSessionSearchCriteria>',
				__typeValue: this.lstSearchCriteria
			},
			targetGids: {
				__typeName: 'List<uint32>',
				__typeValue: this.targetGids
			}
		};

		if (this.blockListParam !== undefined) {
			data.blockListParam = {
				__typeName: 'MatchmakeBlockListParam',
				__typeValue: this.blockListParam
			}; // If prudpv1
		}

		return data;
	}
}

class FindMatchmakeSessionByParticipantParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_principalIdList = stream.readNEXList(stream.readPID);
		this.m_resultOptions = stream.readUInt32LE();
		this.m_blockListParam = stream.readNEXStructure(MatchmakeBlockListParam);
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			m_principalIdList: {
				__typeName: 'List<PID>',
				__typeValue: this.m_principalIdList
			},
			m_resultOptions: {
				__typeName: 'uint32',
				__typeValue: this.m_resultOptions
			},
			m_blockListParam: {
				__typeName: 'MatchmakeBlockListParam',
				__typeValue: this.m_blockListParam
			}
		};
	}
}

class FindMatchmakeSessionByParticipantResult extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_principalId = stream.readPID();
		this.m_session = stream.readNEXStructure(MatchmakeSession);
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			m_principalId: {
				__typeName: 'PID',
				__typeValue: this.m_principalId
			},
			m_session: {
				__typeName: 'MatchmakeSession',
				__typeValue: this.m_session
			}
		};
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

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			m_gid: {
				__typeName: 'uint32',
				__typeValue: this.m_gid
			},
			m_lstStationURLs: {
				__typeName: 'List<StationURL>',
				__typeValue: this.m_lstStationURLs
			}
		};
	}
}

class GatheringStats extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_pidParticipant = stream.readPID();
		this.m_uiFlags = stream.readUInt32LE();
		this.m_lstValues = stream.readNEXList(stream.readFloatLE);
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			m_pidParticipant: {
				__typeName: 'PID',
				__typeValue: this.m_pidParticipant
			},
			m_uiFlags: {
				__typeName: 'uint32',
				__typeValue: this.m_uiFlags
			},
			m_lstValues: {
				__typeName: 'List<Float>',
				__typeValue: this.m_lstValues
			}
		};
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

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			m_idGathering: {
				__typeName: 'uint32',
				__typeValue: this.m_idGathering
			},
			m_idGuest: {
				__typeName: 'uint32',
				__typeValue: this.m_idGuest
			},
			m_strMessage: {
				__typeName: 'String',
				__typeValue: this.m_strMessage
			}
		};
	}
}

class ParticipantDetails extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_idParticipant = stream.readPID();
		this.m_strName = stream.readNEXString();
		this.m_strMessage = stream.readNEXString();
		this.m_uiParticipants = stream.readUInt16LE();
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			m_idParticipant: {
				__typeName: 'PID',
				__typeValue: this.m_idParticipant
			},
			m_strName: {
				__typeName: 'String',
				__typeValue: this.m_strName
			},
			m_strMessage: {
				__typeName: 'String',
				__typeValue: this.m_strMessage
			},
			m_uiParticipants: {
				__typeName: 'uint16',
				__typeValue: this.m_uiParticipants
			}
		};
	}
}

class DeletionEntry extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_idGathering = stream.readUInt32LE();
		this.m_pid = stream.readPID();
		this.m_uiReason = stream.readUInt32LE();
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			m_idGathering: {
				__typeName: 'uint32',
				__typeValue: this.m_idGathering
			},
			m_pid: {
				__typeName: 'PID',
				__typeValue: this.m_pid
			},
			m_uiReason: {
				__typeName: 'uint32',
				__typeValue: this.m_uiReason
			}
		};
	}
}

class PlayingSession extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_PrincipalId = stream.readPID();
		this.m_Gathering = stream.readNEXAnyDataHolder();
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			m_PrincipalId: {
				__typeName: 'PID',
				__typeValue: this.m_PrincipalId
			},
			m_Gathering: {
				__typeName: 'AnyDataHolder',
				__typeValue: this.m_Gathering
			}
		};
	}
}

class SimplePlayingSession extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_PrincipalID = stream.readPID();
		this.m_GatheringID = stream.readUInt32LE();
		this.m_GameMode = stream.readUInt32LE();
		this.m_Attribute_0 = stream.readUInt32LE();
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			m_PrincipalID: {
				__typeName: 'PID',
				__typeValue: this.m_PrincipalID
			},
			m_GatheringID: {
				__typeName: 'uint32',
				__typeValue: this.m_GatheringID
			},
			m_GameMode: {
				__typeName: 'uint32',
				__typeValue: this.m_GameMode
			},
			m_Attribute_0: {
				__typeName: 'uint32',
				__typeValue: this.m_Attribute_0
			}
		};
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

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			m_GatheringID: {
				__typeName: 'uint32',
				__typeValue: this.m_GatheringID
			},
			m_MatchmakeSessionCount: {
				__typeName: 'uint32',
				__typeValue: this.m_MatchmakeSessionCount
			}
		};
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
