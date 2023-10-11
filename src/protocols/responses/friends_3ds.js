/**
 * @typedef {import('../../stream')} Stream
 */

const Friends3DSTypes = require('../types/friends_3ds');

class SyncFriendResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.friendRelationships = stream.readNEXList(Friends3DSTypes.FriendRelationship);
	}

	toJSON() {
		return {
			friendRelationships: {
				__typeName: 'List<FriendRelationship>',
				__typeValue: this.friendRelationships
			}
		};
	}
}

class UpdatePresenceResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class GetFriendPresenceResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.presenceList = stream.readNEXList(Friends3DSTypes.FriendPresence);
	}

	toJSON() {
		return {
			presenceList: {
				__typeName: 'List<FriendPresence>',
				__typeValue: this.presenceList
			}
		};
	}
}

class GetFriendPersistentInfoResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.infoList = stream.readNEXList(Friends3DSTypes.FriendPersistentInfo);
	}

	toJSON() {
		return {
			presenceList: {
				__typeName: 'List<FriendPersistentInfo>',
				__typeValue: this.infoList
			}
		};
	}
}

module.exports = {
	SyncFriendResponse,
	UpdatePresenceResponse,
	GetFriendPresenceResponse,
	GetFriendPersistentInfoResponse
};
