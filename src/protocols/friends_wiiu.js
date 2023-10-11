/**
 * @typedef {import('../packet')} Packet
 * @typedef {import('../packetv0')} PacketV0
 * @typedef {import('../packetv1')} PacketV1
 * @typedef {import('../rmc')} RMCMessage
 */

const Stream = require('../stream');

const Requests = require('./requests/friends_wiiu');
const Responses = require('./responses/friends_wiiu');

class FriendsWiiU {
	static ProtocolID = 0x66;

	static ProtocolName = 'Friends (Wii U)';

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
			console.log(`Unknown FriendsWiiU method ID ${methodId} (0x${methodId?.toString(16)}) (${FriendsWiiU.MethodNames[methodId]})`);
			return;
		}

		const { rmcMessage } = packet;
		const stream = new Stream(rmcMessage.body, packet.connection);

		packet.rmcData = {
			body: handler(rmcMessage, stream)
		};
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static UpdateAndGetAllInformation(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.UpdateAndGetAllInformationRequest(stream);
		} else {
			return new Responses.UpdateAndGetAllInformationResponse(stream);
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
			return new Requests.UpdatePresenceRequest(stream);
		} else {
			return new Responses.UpdatePresenceResponse(stream);
		}
	}
}


module.exports = FriendsWiiU;