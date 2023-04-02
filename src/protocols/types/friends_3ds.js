const Stream = require('../../stream'); // eslint-disable-line no-unused-vars
const NEXTypes = require('../../types');

class GameKey extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(NEXTypes.Data);
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.titleId = stream.readUInt64LE();
		this.titleVersion = stream.readUInt16LE();
	}

	toJSON() {
		return {
			__typeInherits: this._parentTypes.map(value => ({
				__typeName: value.constructor.name,
				__typeValue: value
			})),
			titleId: {
				__typeName: 'uint64',
				__typeValue: this.titleId
			},
			titleVersion: {
				__typeName: 'uint16',
				__typeValue: this.titleVersion
			}
		};
	}
}

class NintendoPresence extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(NEXTypes.Data);
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_changedBitFlag = stream.readUInt32LE();
		this.m_gameKey = stream.readNEXStructure(GameKey);
		this.m_gameModeDescription = stream.readNEXString();
		this.m_joinAvailabilityFlag = stream.readUInt32LE();
		this.m_matchmakeSystemType = stream.readUInt8();
		this.m_joinGameID = stream.readUInt32LE();
		this.m_joinGameMode = stream.readUInt32LE();
		this.m_ownerPrincipalID = stream.readPID();
		this.m_joinGroupID = stream.readUInt32LE();
		this.m_applicationArg = stream.readNEXBuffer();
	}

	toJSON() {
		return {
			__typeInherits: this._parentTypes.map(value => ({
				__typeName: value.constructor.name,
				__typeValue: value
			})),
			m_changedBitFlag: {
				__typeName: 'uint32',
				__typeValue: this.m_changedBitFlag
			},
			m_gameKey: {
				__typeName: 'GameKey',
				__typeValue: this.m_gameKey
			},
			m_gameModeDescription: {
				__typeName: 'String',
				__typeValue: this.m_gameModeDescription
			},
			m_joinAvailabilityFlag: {
				__typeName: 'uint32',
				__typeValue: this.m_joinAvailabilityFlag
			},
			m_matchmakeSystemType: {
				__typeName: 'uint8',
				__typeValue: this.m_matchmakeSystemType
			},
			m_joinGameID: {
				__typeName: 'uint32',
				__typeValue: this.m_joinGameID
			},
			m_joinGameMode: {
				__typeName: 'uint32',
				__typeValue: this.m_joinGameMode
			},
			m_ownerPrincipalID: {
				__typeName: 'PID',
				__typeValue: this.m_ownerPrincipalID
			},
			m_joinGroupID: {
				__typeName: 'uint32',
				__typeValue: this.m_joinGroupID
			},
			m_applicationArg: {
				__typeName: 'Buffer',
				__typeValue: this.m_applicationArg
			}
		};
	}
}

class FriendPresence extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(NEXTypes.Data);
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.pid = stream.readPID();
		this.presence = stream.readNEXStructure(NintendoPresence);
	}

	toJSON() {
		return {
			__typeInherits: this._parentTypes.map(value => ({
				__typeName: value.constructor.name,
				__typeValue: value
			})),
			m_ownerPrincipalID: {
				__typeName: 'PID',
				__typeValue: this.pid
			},
			m_gameKey: {
				__typeName: 'NintendoPresence',
				__typeValue: this.presence
			}
		};
	}
}

class FriendRelationship extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(NEXTypes.Data);
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.pid = stream.readPID();
		this.localFriendCode = stream.readUInt64LE();
		this.relationshipType = stream.readUInt8();
	}

	toJSON() {
		return {
			__typeInherits: this._parentTypes.map(value => ({
				__typeName: value.constructor.name,
				__typeValue: value
			})),
			pid: {
				__typeName: 'PID',
				__typeValue: this.pid
			},
			localFriendCode: {
				__typeName: 'uint64',
				__typeValue: this.localFriendCode
			},
			relationshipType: {
				__typeName: 'uint8',
				__typeValue: this.relationshipType
			}
		};
	}
}

class FriendPersistentInfo extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(NEXTypes.Data);
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.pid = stream.readPID();
		this.region = stream.readUInt8();
		this.country = stream.readUInt8();
		this.area = stream.readUInt8();
		this.language = stream.readUInt8();
		this.platform = stream.readUInt8();
		this.gameKey = stream.readNEXStructure(GameKey);
		this.message = stream.readNEXString();
		this.messageUpdatedAt = stream.readNEXDateTime();
		this.friendedAt = stream.readNEXDateTime();
		this.lastOnline = stream.readNEXDateTime();
	}

	toJSON() {
		return {
			__typeInherits: this._parentTypes.map(value => ({
				__typeName: value.constructor.name,
				__typeValue: value
			})),
			pid: {
				__typeName: 'uint32',
				__typeValue: this.pid
			},
			region: {
				__typeName: 'uint8',
				__typeValue: this.region
			},
			country: {
				__typeName: 'uint8',
				__typeValue: this.country
			},
			area: {
				__typeName: 'uint8',
				__typeValue: this.area
			},
			language: {
				__typeName: 'uint8',
				__typeValue: this.language
			},
			platform: {
				__typeName: 'uint8',
				__typeValue: this.platform
			},
			gameKey: {
				__typeName: 'GameKey',
				__typeValue: this.gameKey
			},
			message: {
				__typeName: 'String',
				__typeValue: this.message
			},
			messageUpdatedAt: {
				__typeName: 'DateTime',
				__typeValue: this.messageUpdatedAt
			},
			friendedAt: {
				__typeName: 'DateTime',
				__typeValue: this.friendedAt
			},
			lastOnline: {
				__typeName: 'DateTime',
				__typeValue: this.lastOnline
			}
		};
	}
}

module.exports = {
	GameKey,
	NintendoPresence,
	FriendPresence,
	FriendRelationship,
	FriendPersistentInfo
};
