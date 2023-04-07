const Packet = require('../../packet'); // eslint-disable-line no-unused-vars
const PacketV0 = require('../../packetv0'); // eslint-disable-line no-unused-vars
const PacketV1 = require('../../packetv1'); // eslint-disable-line no-unused-vars
const RMCMessage = require('../../rmc'); // eslint-disable-line no-unused-vars
const Stream = require('../../stream');

const Requests = require('../requests/shop_badge_arcade');
const Responses = require('../responses/shop_badge_arcade');

class ShopBadgeArcade {
	static ProtocolID = 0xC8;

	static ProtocolName = 'Shop (Badge Arcade)';

	static Methods = {
		GetRivToken: 0x1,
		PostPlayLog: 0x2
	};

	static MethodNames = Object.entries(ShopBadgeArcade.Methods).reduce((namesObject, entry) => {
		const [key, value] = entry;
		namesObject[value] = key;
		return namesObject;
	}, {});

	static Handlers = {
		0x1: ShopBadgeArcade.GetRivToken,
		0x2: ShopBadgeArcade.PostPlayLog
	};

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet PRUDP packet
	 */
	static handlePacket(packet) {
		const methodId = packet.rmcMessage.methodId;

		const handler = ShopBadgeArcade.Handlers[methodId];

		if (!handler) {
			console.log(`Unknown Shop (Badge Arcade) method ID ${methodId} (0x${methodId?.toString(16)}) (${ShopBadgeArcade.MethodNames[methodId]})`);
			return;
		}

		const { rmcMessage } = packet;
		const stream = new Stream(rmcMessage.body, packet.connection);

		packet.rmcData = {
			protocolName: this.ProtocolName,
			methodName: this.MethodNames[methodId],
			body: handler(rmcMessage, stream)
		};
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetRivToken(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetRivTokenRequest(stream);
		} else {
			return new Responses.GetRivTokenResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static PostPlayLog(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.PostPlayLogRequest(stream);
		} else {
			return new Responses.PostPlayLogResponse(stream);
		}
	}
}

module.exports = ShopBadgeArcade;
