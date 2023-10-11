/**
 * @typedef {import('../packet')} Packet
 * @typedef {import('../packetv0')} PacketV0
 * @typedef {import('../packetv1')} PacketV1
 * @typedef {import('../rmc')} RMCMessage
 */

const Stream = require('../stream');

const Requests = require('./requests/friends_3ds');
const Responses = require('./responses/friends_3ds');

class Friends3DS {
	static ProtocolID = 0x65;

	static ProtocolName = 'Friends (3DS)';

	static Methods = {
		UpdateProfile: 0x01,
		UpdateMii: 0x02,
		UpdateMiiList: 0x03,
		UpdatePlayedGames: 0x04,
		UpdatePreference: 0x05,
		GetFriendMii: 0x06,
		GetFriendMiiList: 0x07,
		IsActiveGame: 0x08,
		GetPrincipalIDByLocalFriendCode: 0x09,
		GetFriendRelationships: 0x0a,
		AddFriendByPrincipalID: 0x0b,
		AddFriendBylstPrincipalID: 0x0c,
		RemoveFriendByLocalFriendCode: 0x0d,
		RemoveFriendByPrincipalID: 0x0e,
		GetAllFriends: 0x0f,
		UpdateBlackList: 0x10,
		SyncFriend: 0x11,
		UpdatePresence: 0x12,
		UpdateFavoriteGameKey: 0x13,
		UpdateComment: 0x14,
		UpdatePicture: 0x15,
		GetFriendPresence: 0x16,
		GetFriendComment: 0x17,
		GetFriendPicture: 0x18,
		GetFriendPersistentInfo: 0x19,
		SendInvitation: 0x1a
	};

	static MethodNames = Object.entries(Friends3DS.Methods).reduce((namesObject, entry) => {
		const [key, value] = entry;
		namesObject[value] = key;
		return namesObject;
	}, {});

	static Handlers = {
		0x11: Friends3DS.SyncFriend,
		0x12: Friends3DS.UpdatePresence,
		0x16: Friends3DS.GetFriendPresence,
		0x19: Friends3DS.GetFriendPersistentInfo
	};

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet PRUDP packet
	 */
	static handlePacket(packet) {
		const methodId = packet.rmcMessage.methodId;

		const handler = Friends3DS.Handlers[methodId];

		if (!handler) {
			console.log(`Unknown Friends3DS method ID ${methodId} (0x${methodId?.toString(16)}) (${Friends3DS.MethodNames[methodId]})`);
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
	static SyncFriend(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.SyncFriendRequest(stream);
		} else {
			return new Responses.SyncFriendResponse(stream);
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

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetFriendPresence(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetFriendPresenceRequest(stream);
		} else {
			return new Responses.GetFriendPresenceResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetFriendPersistentInfo(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetFriendPersistentInfoRequest(stream);
		} else {
			return new Responses.GetFriendPersistentInfoResponse(stream);
		}
	}
}


module.exports = Friends3DS;
