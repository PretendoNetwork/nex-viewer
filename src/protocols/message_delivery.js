const Packet = require('../packet');
const PacketV0 = require('../packetv0');
const PacketV1 = require('../packetv1');
const RMCMessage = require('../rmc');
const Stream = require('../stream');

require('./types/message_delivery');

class MessageDelivery {
	static ProtocolID = 0x1B;

	static Methods = {
		DeliverMessage: 0x1
	}

	static Handlers = {
		0x1: MessageDelivery.DeliverMessage
	}

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet
	 */
	static handlePacket(packet) {
		const methodId = packet.rmcMessage.methodId;

		const handler = MessageDelivery.Handlers[methodId];

		if (!handler) {
			console.log(`Unknown MessageDelivery method ID ${methodId} (0x${methodId.toString(16)})`);
			return;
		}

		const { rmcMessage } = packet;
		const stream = new Stream(rmcMessage.body, packet.connection);
		packet.rmcData = handler(rmcMessage, stream);
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage
	 * @param {Stream} stream
	 * @returns Object
	 */
	static DeliverMessage(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				oUserMessage: stream.readNEXAnyDataHolder()
			}
		} else {
			// * No response
			return {}
		}
	}
}


module.exports = MessageDelivery;