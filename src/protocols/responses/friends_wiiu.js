const Stream = require('../../stream'); // eslint-disable-line no-unused-vars

const FriendsWiiUTypes = require('../types/friends_wiiu');

class UpdateAndGetAllInformationResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.principalPreference = stream.readNEXStructure(FriendsWiiUTypes.PrincipalPreference);
		this.statusMessage = stream.readNEXStructure(FriendsWiiUTypes.Comment);
		this.friendList = stream.readNEXList(FriendsWiiUTypes.FriendInfo);
		this.sentFriendRequests = stream.readNEXList(FriendsWiiUTypes.FriendRequest);
		this.receivedFriendRequests = stream.readNEXList(FriendsWiiUTypes.FriendRequest);
		this.blacklist = stream.readNEXList(FriendsWiiUTypes.BlacklistedPrincipal);
		this.unknown1 = stream.readBoolean();
		this.notifications = stream.readNEXList(FriendsWiiUTypes.PersistentNotification);
		this.unknown2 = stream.readBoolean();
	}

	toJSON() {
		return {
			principalPreference: {
				__typeName: 'PrincipalPreference',
				__typeValue: this.principalPreference
			},
			statusMessage: {
				__typeName: 'Comment',
				__typeValue: this.statusMessage
			},
			friendList: {
				__typeName: 'List<FriendInfo>',
				__typeValue: this.friendList
			},
			sentFriendRequests: {
				__typeName: 'List<FriendRequest>',
				__typeValue: this.sentFriendRequests
			},
			receivedFriendRequests: {
				__typeName: 'List<FriendRequest>',
				__typeValue: this.receivedFriendRequests
			},
			blacklist: {
				__typeName: 'List<BlacklistedPrincipal>',
				__typeValue: this.blacklist
			},
			unknown1: {
				__typeName: 'boolean',
				__typeValue: this.unknown1
			},
			notifications: {
				__typeName: 'List<PersistentNotification>',
				__typeValue: this.notifications
			},
			unknown2: {
				__typeName: 'boolean',
				__typeValue: this.unknown2
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

module.exports = {
	UpdateAndGetAllInformationResponse,
	UpdatePresenceResponse
};
