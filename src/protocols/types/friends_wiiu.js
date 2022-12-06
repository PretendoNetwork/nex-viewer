const Stream = require('../../stream'); // eslint-disable-line no-unused-vars
const NEXTypes = require('../../types');

class NNAInfo extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(NEXTypes.Data);
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.principalBasicInfo = stream.readNEXStructure(PrincipalBasicInfo);
		this.unknown1 = stream.readUInt8();
		this.unknown2 = stream.readUInt8();
	}

	toJSON() {
		return {
			__typeInherits: this._parentTypes.map(value => ({
				__typeName: value.constructor.name,
				__typeValue: value
			})),
			principalBasicInfo: {
				__typeName: 'PrincipalBasicInfo',
				__typeValue: this.principalBasicInfo
			},
			unknown1: {
				__typeName: 'uint8',
				__typeValue: this.unknown1
			},
			unknown2: {
				__typeName: 'uint8',
				__typeValue: this.unknown2
			}
		};
	}
}
NEXTypes.AnyDataHolder.addType('NNAInfo', NNAInfo);

class PrincipalBasicInfo extends NEXTypes.Structure {
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
		this.nnid = stream.readNEXString();
		this.mii = stream.readNEXStructure(MiiV2);
		this.unknown2 = stream.readUInt8();
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
			nnid: {
				__typeName: 'String',
				__typeValue: this.nnid
			},
			mii: {
				__typeName: 'MiiV2',
				__typeValue: this.mii
			},
			unknown2: {
				__typeName: 'uint8',
				__typeValue: this.unknown2
			}
		};
	}
}

class MiiV2 extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(NEXTypes.Data);
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.name = stream.readNEXString();
		this.unknown1 = stream.readUInt8();
		this.unknown2 = stream.readUInt8();
		this.data = stream.readNEXBuffer();
		this.unknown3 = stream.readNEXDateTime();
	}

	toJSON() {
		return {
			__typeInherits: this._parentTypes.map(value => ({
				__typeName: value.constructor.name,
				__typeValue: value
			})),
			name: {
				__typeName: 'String',
				__typeValue: this.name
			},
			unknown1: {
				__typeName: 'uint8',
				__typeValue: this.unknown1
			},
			unknown2: {
				__typeName: 'uint8',
				__typeValue: this.unknown2
			},
			data: {
				__typeName: 'Buffer',
				__typeValue: this.data
			},
			unknown3: {
				__typeName: 'DateTime',
				__typeValue: this.unknown3
			}
		};
	}
}

class NintendoPresenceV2 extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(NEXTypes.Data);
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.changedFlags = stream.readUInt32LE();
		this.isOnline = stream.readBoolean();
		this.gameKey = stream.readNEXStructure(GameKey);
		this.unknown1 = stream.readUInt8();
		this.message = stream.readNEXString();
		this.unknown2 = stream.readUInt32LE();
		this.unknown3 = stream.readUInt8();
		this.gameServerId = stream.readUInt32LE();
		this.unknown4 = stream.readUInt32LE();
		this.pid = stream.readPID();
		this.gatheringId = stream.readUInt32LE();
		this.applicationData = stream.readNEXBuffer();
		this.unknown5 = stream.readUInt8();
		this.unknown6 = stream.readUInt8();
		this.unknown7 = stream.readUInt8();
	}

	toJSON() {
		return {
			__typeInherits: this._parentTypes.map(value => ({
				__typeName: value.constructor.name,
				__typeValue: value
			})),
			changedFlags: {
				__typeName: 'uint32',
				__typeValue: this.changedFlags
			},
			isOnline: {
				__typeName: 'boolean',
				__typeValue: this.isOnline
			},
			gameKey: {
				__typeName: 'GameKey',
				__typeValue: this.gameKey
			},
			unknown1: {
				__typeName: 'uint8',
				__typeValue: this.unknown1
			},
			message: {
				__typeName: 'String',
				__typeValue: this.message
			},
			unknown2: {
				__typeName: 'uint32',
				__typeValue: this.unknown2
			},
			unknown3: {
				__typeName: 'uint8',
				__typeValue: this.unknown3
			},
			gameServerId: {
				__typeName: 'uint32',
				__typeValue: this.gameServerId
			},
			unknown4: {
				__typeName: 'uint32',
				__typeValue: this.unknown4
			},
			pid: {
				__typeName: 'PID',
				__typeValue: this.pid
			},
			gatheringId: {
				__typeName: 'uint32',
				__typeValue: this.gatheringId
			},
			applicationData: {
				__typeName: 'Buffer',
				__typeValue: this.applicationData
			},
			unknown5: {
				__typeName: 'uint8',
				__typeValue: this.unknown5
			},
			unknown6: {
				__typeName: 'uint8',
				__typeValue: this.unknown6
			},
			unknown7: {
				__typeName: 'uint8',
				__typeValue: this.unknown7
			}
		};
	}
}
NEXTypes.AnyDataHolder.addType('NintendoPresenceV2', NintendoPresenceV2);

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

class PrincipalPreference extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(NEXTypes.Data);
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.showOnlinePresence = stream.readBoolean();
		this.showCurrentlyPlayingTitle = stream.readBoolean();
		this.blockFriendRequests = stream.readBoolean();
	}

	toJSON() {
		return {
			__typeInherits: this._parentTypes.map(value => ({
				__typeName: value.constructor.name,
				__typeValue: value
			})),
			showOnlinePresence: {
				__typeName: 'boolean',
				__typeValue: this.showOnlinePresence
			},
			showCurrentlyPlayingTitle: {
				__typeName: 'boolean',
				__typeValue: this.showCurrentlyPlayingTitle
			},
			blockFriendRequests: {
				__typeName: 'boolean',
				__typeValue: this.blockFriendRequests
			}
		};
	}
}
NEXTypes.AnyDataHolder.addType('PrincipalPreference', PrincipalPreference);

class Comment extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(NEXTypes.Data);
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.unknown = stream.readUInt8();
		this.statusMessage = stream.readNEXString();
		this.lastChangedOn = stream.readNEXDateTime();
	}

	toJSON() {
		return {
			__typeInherits: this._parentTypes.map(value => ({
				__typeName: value.constructor.name,
				__typeValue: value
			})),
			unknown: {
				__typeName: 'uint8',
				__typeValue: this.unknown
			},
			statusMessage: {
				__typeName: 'String',
				__typeValue: this.statusMessage
			},
			lastChangedOn: {
				__typeName: 'DateTime',
				__typeValue: this.lastChangedOn
			}
		};
	}
}

class FriendInfo extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(NEXTypes.Data);
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.NNAInfo = stream.readNEXStructure(NNAInfo);
		this.presence = stream.readNEXStructure(NintendoPresenceV2);
		this.statusMessage = stream.readNEXStructure(Comment);
		this.becameFriend = stream.readNEXDateTime();
		this.lastOnline = stream.readNEXDateTime();
		this.unknown = stream.readUInt64LE();
	}

	toJSON() {
		return {
			__typeInherits: this._parentTypes.map(value => ({
				__typeName: value.constructor.name,
				__typeValue: value
			})),
			NNAInfo: {
				__typeName: 'NNAInfo',
				__typeValue: this.NNAInfo
			},
			presence: {
				__typeName: 'NintendoPresenceV2',
				__typeValue: this.presence
			},
			statusMessage: {
				__typeName: 'Comment',
				__typeValue: this.statusMessage
			},
			becameFriend: {
				__typeName: 'DateTime',
				__typeValue: this.becameFriend
			},
			lastOnline: {
				__typeName: 'DateTime',
				__typeValue: this.lastOnline
			},
			unknown: {
				__typeName: 'uint64',
				__typeValue: this.unknown
			}
		};
	}
}
NEXTypes.AnyDataHolder.addType('FriendInfo', FriendInfo);

class FriendRequest extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(NEXTypes.Data);
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.principalBasicInfo = stream.readNEXStructure(PrincipalBasicInfo);
		this.message = stream.readNEXStructure(FriendRequestMessage);
		this.sentOn = stream.readNEXDateTime();
	}

	toJSON() {
		return {
			__typeInherits: this._parentTypes.map(value => ({
				__typeName: value.constructor.name,
				__typeValue: value
			})),
			principalBasicInfo: {
				__typeName: 'PrincipalBasicInfo',
				__typeValue: this.principalBasicInfo
			},
			message: {
				__typeName: 'FriendRequestMessage',
				__typeValue: this.message
			},
			sentOn: {
				__typeName: 'DateTime',
				__typeValue: this.sentOn
			}
		};
	}
}
NEXTypes.AnyDataHolder.addType('FriendRequest', FriendRequest);

class FriendRequestMessage extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(NEXTypes.Data);
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.friendRequestId = stream.readUInt64LE();
		this.isRecieved = stream.readBoolean();
		this.unknown1 = stream.readUInt8();
		this.message = stream.readNEXString();
		this.unknown2 = stream.readUInt8();
		this.unknown3 = stream.readNEXString();
		this.gameKey = stream.readNEXStructure(GameKey);
		this.unknown4 = stream.readNEXDateTime();
		this.expiresOn = stream.readNEXDateTime();
	}

	toJSON() {
		return {
			__typeInherits: this._parentTypes.map(value => ({
				__typeName: value.constructor.name,
				__typeValue: value
			})),
			friendRequestId: {
				__typeName: 'uint64',
				__typeValue: this.friendRequestId
			},
			isRecieved: {
				__typeName: 'uint8',
				__typeValue: this.isRecieved
			},
			unknown1: {
				__typeName: 'uint8',
				__typeValue: this.unknown1
			},
			message: {
				__typeName: 'String',
				__typeValue: this.message
			},
			unknown2: {
				__typeName: 'uint8',
				__typeValue: this.unknown2
			},
			unknown3: {
				__typeName: 'String',
				__typeValue: this.unknown3
			},
			gameKey: {
				__typeName: 'GameKey',
				__typeValue: this.gameKey
			},
			unknown4: {
				__typeName: 'DateTime',
				__typeValue: this.unknown4
			},
			expiresOn: {
				__typeName: 'DateTime',
				__typeValue: this.expiresOn
			}
		};
	}
}

class BlacklistedPrincipal extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(NEXTypes.Data);
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.principalBasicInfo = stream.readNEXStructure(PrincipalBasicInfo);
		this.gameKey = stream.readNEXStructure(GameKey);
		this.blacklistedSince = stream.readNEXDateTime();
	}

	toJSON() {
		return {
			__typeInherits: this._parentTypes.map(value => ({
				__typeName: value.constructor.name,
				__typeValue: value
			})),
			principalBasicInfo: {
				__typeName: 'PrincipalBasicInfo',
				__typeValue: this.principalBasicInfo
			},
			gameKey: {
				__typeName: 'GameKey',
				__typeValue: this.gameKey
			},
			blacklistedSince: {
				__typeName: 'DateTime',
				__typeValue: this.blacklistedSince
			}
		};
	}
}

class PersistentNotification extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(NEXTypes.Data);
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.unknown1 = stream.readUInt64LE();
		this.unknown2 = stream.readUInt32LE();
		this.unknown3 = stream.readUInt32LE();
		this.unknown4 = stream.readUInt32LE();
		this.unknown5 = stream.readNEXString();
	}

	toJSON() {
		return {
			__typeInherits: this._parentTypes.map(value => ({
				__typeName: value.constructor.name,
				__typeValue: value
			})),
			unknown1: {
				__typeName: 'uint64',
				__typeValue: this.unknown1
			},
			unknown2: {
				__typeName: 'uint32',
				__typeValue: this.unknown2
			},
			unknown3: {
				__typeName: 'uint32',
				__typeValue: this.unknown3
			},
			unknown4: {
				__typeName: 'uint32',
				__typeValue: this.unknown4
			},
			unknown5: {
				__typeName: 'String',
				__typeValue: this.unknown5
			}
		};
	}
}

class PersistentNotificationList extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(NEXTypes.Data);
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.notifications = stream.readNEXString(PersistentNotification);
	}

	toJSON() {
		return {
			__typeInherits: this._parentTypes.map(value => ({
				__typeName: value.constructor.name,
				__typeValue: value
			})),
			notifications: {
				__typeName: 'List<PersistentNotification>',
				__typeValue: this.notifications
			}
		};
	}
}
NEXTypes.AnyDataHolder.addType('PersistentNotificationList', PersistentNotificationList);

module.exports = {
	NNAInfo,
	PrincipalBasicInfo,
	MiiV2,
	NintendoPresenceV2,
	GameKey,
	PrincipalPreference,
	Comment,
	FriendInfo,
	FriendRequest,
	FriendRequestMessage,
	BlacklistedPrincipal,
	PersistentNotification,
	PersistentNotificationList
};