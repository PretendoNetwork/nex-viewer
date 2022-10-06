const Packet = require('../packet');
const PacketV0 = require('../packetv0');
const PacketV1 = require('../packetv1');
const Stream = require('../stream');
const NEXTypes = require('../types');

class UserMessage extends NEXTypes.Data {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.m_uiID = stream.readUInt32LE();
		this.m_uiParentID = stream.readUInt32LE();
		this.m_pidSender = stream.readUInt32LE();
		this.m_receptiontime = stream.readNEXDateTime();
		this.m_uiLifeTime = stream.readUInt32LE();
		this.m_uiFlags = stream.readUInt32LE();
		this.m_strSubject = stream.readNEXString();
		this.m_strSender = stream.readNEXString();
		this.m_messageRecipient = stream.readNEXStructure(MessageRecipient);
	}
}

class MessageRecipient extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.m_uiRecipientType = stream.readUInt32LE();
		this.m_principalId = stream.readUInt32LE();
		this.m_gatheringId = stream.readUInt32LE();
	}
}

class TextMessage extends UserMessage {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.m_strTextBody = stream.readNEXString();
	}
}

class BinaryMessage extends UserMessage {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.m_binaryBody = stream.readNEXQBuffer();
	}
}


NEXTypes.AnyDataHolder.addType('TextMessage', TextMessage);
NEXTypes.AnyDataHolder.addType('BinaryMessage', BinaryMessage);

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
		const handler = MessageDelivery.Handlers[packet.rmcMessage.methodId];

		if (!handler) {
			console.log(`Unknown MessageDelivery method ID ${packet.rmcMessage.methodId} (0x${packet.rmcMessage.methodId.toString(16)})`);
			return;
		}

		packet.rmcData = handler(packet);
		console.log(packet.rmcData)
	}

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet
	 */
	static DeliverMessage(packet) {
		const { rmcMessage } = packet;
		const stream = new Stream(rmcMessage.body, packet.connection);

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