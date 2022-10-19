const Packet = require('../packet'); // eslint-disable-line no-unused-vars
const PacketV0 = require('../packetv0'); // eslint-disable-line no-unused-vars
const PacketV1 = require('../packetv1'); // eslint-disable-line no-unused-vars
const RMCMessage = require('../rmc'); // eslint-disable-line no-unused-vars
const Stream = require('../stream');

const NotificationsTypes = require('./types/notifications');

class Notifications {
	static ProtocolID = 0xE;

	static Methods = {
		ProcessNotificationEvent: 0x1
	};

	static MethodNames = Object.entries(Notifications.Methods).reduce((namesObject, entry) => {
		const [key, value] = entry;
		namesObject[value] = key;
		return namesObject;
	}, {});

	static Handlers = {
		0x1: Notifications.ProcessNotificationEvent
	};

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet PRUDP packet
	 */
	static handlePacket(packet) {
		const methodId = packet.rmcMessage.methodId;

		const handler = Notifications.Handlers[methodId];

		if (!handler) {
			console.log(`Unknown Notifications method ID ${methodId} (0x${methodId.toString(16)}) (${Notifications.MethodNames[methodId]})`);
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
	static ProcessNotificationEvent(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				oEvent: stream.readNEXStructure(NotificationsTypes.NotificationEvent)
			};
		} else {
			return {}; // * No response
		}
	}
}


module.exports = Notifications;