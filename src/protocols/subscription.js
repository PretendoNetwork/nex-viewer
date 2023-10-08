const Packet = require('../packet'); // eslint-disable-line no-unused-vars
const PacketV0 = require('../packetv0'); // eslint-disable-line no-unused-vars
const PacketV1 = require('../packetv1'); // eslint-disable-line no-unused-vars
const RMCMessage = require('../rmc'); // eslint-disable-line no-unused-vars
const Stream = require('../stream');

const Requests = require('./requests/subscription');
const Responses = require('./responses/subscription');

class Subscription {
	static ProtocolID = 0x75;

	static ProtocolName = 'Subscription';

	static Methods = {
		CreateMySubscriptionData: 0x1,
		UpdateMySubscriptionData: 0x2,
		ClearMySubscriptionData: 0x3,
		AddTarget: 0x4,
		DeleteTarget: 0x5,
		ClearTarget: 0x6,
		GetFriendSubscriptionData: 0x7,
		GetTargetSubscriptionData: 0x8,
		GetActivePlayerSubscriptionData: 0x9,
		GetSubscriptionData: 0xA,
		ReplaceTargetAndGetSubscriptionData: 0xB,
		SetPrivacyLevel: 0xC,
		GetPrivacyLevel: 0xD,
		GetSubscriptionUserFriendList: 0xE,
		GetPrivacyLevels: 0xF,
		CreateMySubscriptionDataWithNotificationParams: 0x10,
		UnknownMethod17: 0x11,
		ClearMySubscriptionDataWithNotificationParams: 0x12
	};

	static MethodNames = Object.entries(Subscription.Methods).reduce((namesObject, entry) => {
		const [key, value] = entry;
		namesObject[value] = key;
		return namesObject;
	}, {});

	static Handlers = {
		0x01: Subscription.CreateMySubscriptionData,
		0x02: Subscription.UpdateMySubscriptionData,
		0x03: Subscription.ClearMySubscriptionData,
		0x04: Subscription.AddTarget,
		0x05: Subscription.DeleteTarget,
		0x06: Subscription.ClearTarget,
		0x07: Subscription.GetFriendSubscriptionData,
		0x08: Subscription.GetTargetSubscriptionData,
		0x09: Subscription.GetActivePlayerSubscriptionData,
		0x0A: Subscription.GetSubscriptionData,
		0x0B: Subscription.ReplaceTargetAndGetSubscriptionData,
		0x0C: Subscription.SetPrivacyLevel,
		0x0D: Subscription.GetPrivacyLevel,
		0x0E: Subscription.GetSubscriptionUserFriendList,
		0x0F: Subscription.GetPrivacyLevels,
		0x10: Subscription.CreateMySubscriptionDataWithNotificationParams,
		0x11: Subscription.UnknownMethod17,
		0x12: Subscription.ClearMySubscriptionDataWithNotificationParams
	};

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet PRUDP packet
	 */
	static handlePacket(packet) {
		const methodId = packet.rmcMessage.methodId;

		const handler = Subscription.Handlers[methodId];

		if (!handler) {
			console.log(`Unknown Subscription method ID ${methodId} (0x${methodId?.toString(16)}) (${Subscription.MethodNames[methodId]})`);
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
	static CreateMySubscriptionData(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.CreateMySubscriptionDataRequest(stream);
		} else {
			return new Responses.CreateMySubscriptionDataResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static UpdateMySubscriptionData(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.UpdateMySubscriptionDataRequest(stream);
		} else {
			return new Responses.UpdateMySubscriptionDataResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static ClearMySubscriptionData(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.ClearMySubscriptionDataRequest(stream);
		} else {
			return new Responses.ClearMySubscriptionDataResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static AddTarget(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.AddTargetRequest(stream);
		} else {
			return new Responses.AddTargetResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static DeleteTarget(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.DeleteTargetRequest(stream);
		} else {
			return new Responses.DeleteTargetResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static ClearTarget(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.ClearTargetRequest(stream);
		} else {
			return new Responses.ClearTargetResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetFriendSubscriptionData(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetFriendSubscriptionDataRequest(stream);
		} else {
			return new Responses.GetFriendSubscriptionDataResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetTargetSubscriptionData(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetTargetSubscriptionDataRequest(stream);
		} else {
			return new Responses.GetTargetSubscriptionDataResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetActivePlayerSubscriptionData(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetActivePlayerSubscriptionDataRequest(stream);
		} else {
			return new Responses.GetActivePlayerSubscriptionDataResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetSubscriptionData(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetSubscriptionDataRequest(stream);
		} else {
			return new Responses.GetSubscriptionDataResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static ReplaceTargetAndGetSubscriptionData(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.ReplaceTargetAndGetSubscriptionDataRequest(stream);
		} else {
			return new Responses.ReplaceTargetAndGetSubscriptionDataResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static SetPrivacyLevel(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.SetPrivacyLevelRequest(stream);
		} else {
			return new Responses.SetPrivacyLevelResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetPrivacyLevel(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetPrivacyLevelRequest(stream);
		} else {
			return new Responses.GetPrivacyLevelResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetSubscriptionUserFriendList(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetSubscriptionUserFriendListRequest(stream);
		} else {
			return new Responses.GetSubscriptionUserFriendListResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetPrivacyLevels(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetPrivacyLevelsRequest(stream);
		} else {
			return new Responses.GetPrivacyLevelsResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static CreateMySubscriptionDataWithNotificationParams(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.CreateMySubscriptionDataWithNotificationParamsRequest(stream);
		} else {
			return new Responses.CreateMySubscriptionDataWithNotificationParamsResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static UnknownMethod17(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.UnknownMethod17Request(stream);
		} else {
			return new Responses.UnknownMethod17Response(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static ClearMySubscriptionDataWithNotificationParams(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.ClearMySubscriptionDataWithNotificationParamsRequest(stream);
		} else {
			return new Responses.ClearMySubscriptionDataWithNotificationParamsResponse(stream);
		}
	}
}


module.exports = Subscription;
