const Packet = require('../packet'); // eslint-disable-line no-unused-vars
const PacketV0 = require('../packetv0'); // eslint-disable-line no-unused-vars
const PacketV1 = require('../packetv1'); // eslint-disable-line no-unused-vars
const RMCMessage = require('../rmc'); // eslint-disable-line no-unused-vars
const Stream = require('../stream');

const NintendoNotificationsTypes = require('./types/nintendo_notifications');

class NintendoNotifications {
	static ProtocolID = 0x64;

	static ProtocolName = 'Nintendo notification events';

	static Methods = {
		ProcessNintendoNotificationEvent1: 0x1,
		ProcessNintendoNotificationEvent2: 0x2
	};

	static MethodNames = Object.entries(NintendoNotifications.Methods).reduce((namesObject, entry) => {
		const [key, value] = entry;
		namesObject[value] = key;
		return namesObject;
	}, {});

	static Handlers = {
		0x1: NintendoNotifications.ProcessNintendoNotificationEvent1,
		0x2: NintendoNotifications.ProcessNintendoNotificationEvent2
	};

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet PRUDP packet
	 */
	static handlePacket(packet) {
		const methodId = packet.rmcMessage.methodId;

		const handler = NintendoNotifications.Handlers[methodId];

		if (!handler) {
			console.log(`Unknown NintendoNotifications method ID ${methodId} (0x${methodId?.toString(16)}) (${NintendoNotifications.MethodNames[methodId]})`);
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
	static ProcessNintendoNotificationEvent1(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				eventObject: stream.readNEXStructure(NintendoNotificationsTypes.NintendoNotificationEvent)
			};
		} else {
			return {}; // * No response
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static ProcessNintendoNotificationEvent2(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				eventObject: stream.readNEXStructure(NintendoNotificationsTypes.NintendoNotificationEvent)
			};
		} else {
			return {}; // * No response
		}
	}
}


module.exports = NintendoNotifications;