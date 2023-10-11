/**
 * @typedef {import('../packet')} Packet
 * @typedef {import('../packetv0')} PacketV0
 * @typedef {import('../packetv1')} PacketV1
 * @typedef {import('../rmc')} RMCMessage
 */

const Stream = require('../stream');

require('./types/message_delivery');

const Requests = require('./requests/message_delivery');
const Responses = require('./responses/message_delivery');

class MessageDelivery {
	static ProtocolID = 0x1B;

	static ProtocolName = 'Message Delivery';

	static Methods = {
		DeliverMessage: 0x1
	};

	static MethodNames = Object.entries(MessageDelivery.Methods).reduce((namesObject, entry) => {
		const [key, value] = entry;
		namesObject[value] = key;
		return namesObject;
	}, {});

	static Handlers = {
		0x1: MessageDelivery.DeliverMessage
	};

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet PRUDP packet
	 */
	static handlePacket(packet) {
		const methodId = packet.rmcMessage.methodId;

		const handler = MessageDelivery.Handlers[methodId];

		if (!handler) {
			console.log(`Unknown MessageDelivery method ID ${methodId} (0x${methodId?.toString(16)}) (${MessageDelivery.MethodNames[methodId]})`);
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
	static DeliverMessage(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.DeliverMessageRequest(stream);
		} else {
			return new Responses.DeliverMessageResponse(stream);
		}
	}
}

module.exports = MessageDelivery;