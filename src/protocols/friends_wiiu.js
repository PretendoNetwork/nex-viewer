const Packet = require('../packet'); // eslint-disable-line no-unused-vars
const PacketV0 = require('../packetv0'); // eslint-disable-line no-unused-vars
const PacketV1 = require('../packetv1'); // eslint-disable-line no-unused-vars
const RMCMessage = require('../rmc'); // eslint-disable-line no-unused-vars
const Stream = require('../stream');

const FriendsWiiUTypes = require('./types/friends_wiiu');

class FriendsWiiU {
	static ProtocolID = 0x66;

	static Methods = {
		UpdateAndGetAllInformation: 0x01,
		AddFriend: 0x02,
		AddFriendByName: 0x03,
		RemoveFriend: 0x04,
		AddFriendRequest: 0x05,
		CancelFriendRequest: 0x06,
		AcceptFriendRequest: 0x07,
		DeleteFriendRequest: 0x08,
		DenyFriendRequest: 0x09,
		MarkFriendRequestsAsReceived: 0x0a,
		AddBlackList: 0x0b,
		RemoveBlackList: 0x0c,
		UpdatePresence: 0x0d,
		UpdateMii: 0x0e,
		UpdateComment: 0x0f,
		UpdatePreference: 0x10,
		GetBasicInfo: 0x11,
		DeletePersistentNotification: 0x12,
		CheckSettingStatus: 0x13,
		GetRequestBlockSettings: 0x14
	};

	static MethodNames = Object.entries(FriendsWiiU.Methods).reduce((namesObject, entry) => {
		const [key, value] = entry;
		namesObject[value] = key;
		return namesObject;
	}, {});

	static Handlers = {
		0x01: FriendsWiiU.UpdateAndGetAllInformation,
		0x0d: FriendsWiiU.UpdatePresence
	};

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet PRUDP packet
	 */
	static handlePacket(packet) {
		const methodId = packet.rmcMessage.methodId;

		const handler = FriendsWiiU.Handlers[methodId];

		if (!handler) {
			console.log(`Unknown FriendsWiiU method ID ${methodId} (0x${methodId.toString(16)}) (${FriendsWiiU.MethodNames[methodId]})`);
			return;
		}

		const { rmcMessage } = packet;
		const stream = new Stream(rmcMessage.body, packet.connection);
		packet.rmcData = handler(rmcMessage, stream);
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static UpdateAndGetAllInformation(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				NNAInfo: stream.readNEXStructure(FriendsWiiUTypes.NNAInfo),
				presence: stream.readNEXStructure(FriendsWiiUTypes.NintendoPresenceV2),
				birthday: stream.readNEXDateTime()
			};
		} else {
			return {
				principalPreference: stream.readNEXStructure(FriendsWiiUTypes.PrincipalPreference),
				statusMessage: stream.readNEXStructure(FriendsWiiUTypes.Comment),
				friendList: stream.readNEXList(FriendsWiiUTypes.FriendInfo),
				sentFriendRequests: stream.readNEXList(FriendsWiiUTypes.FriendRequest),
				receivedFriendRequests: stream.readNEXList(FriendsWiiUTypes.FriendRequest),
				blacklist: stream.readNEXList(FriendsWiiUTypes.BlacklistedPrincipal),
				unknown1: stream.readBoolean(),
				notifications: stream.readNEXList(FriendsWiiUTypes.PersistentNotification),
				unknown2: stream.readBoolean(),
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static UpdatePresence(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				presence: stream.readNEXStructure(FriendsWiiUTypes.NintendoPresenceV2)
			};
		} else {
			return {}; // * No response
		}
	}
}


module.exports = FriendsWiiU;