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
}

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
		this.pid = stream.readUInt32LE();
		this.nnid = stream.readNEXString();
		this.mii = stream.readNEXStructure(MiiV2);
		this.unknown2 = stream.readUInt8();
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
		this.pid = stream.readUInt32LE();
		this.gatheringId = stream.readUInt32LE();
		this.applicationData = stream.readNEXBuffer();
		this.unknown5 = stream.readUInt8();
		this.unknown6 = stream.readUInt8();
		this.unknown7 = stream.readUInt8();
	}
}

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
}

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
		this.Unknown = stream.readUInt8();
		this.statusMessage = stream.readNEXString();
		this.lastChangedOn = stream.readNEXDateTime();
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
}

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
		this.principalInfo = stream.readNEXStructure(PrincipalBasicInfo);
		this.message = stream.readNEXStructure(FriendRequestMessage);
		this.sentOn = stream.readNEXDateTime();
	}
}

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
}

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
	PersistentNotification
};