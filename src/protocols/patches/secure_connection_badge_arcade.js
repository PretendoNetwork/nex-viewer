/**
 * @typedef {import('../../packet')} Packet
 * @typedef {import('../../packetv0')} PacketV0
 * @typedef {import('../../packetv1')} PacketV1
 * @typedef {import('../../rmc')} RMCMessage
 */

const Stream = require('../../stream');

const Requests = require('../requests/secure_connection_badge_arcade');
const Responses = require('../responses/secure_connection_badge_arcade');

class SecureConnectionBadgeArcade {
	static ProtocolID = 0xB;

	static ProtocolName = 'Secure Connection (Badge Arcade)';

	static Methods = {
		GetMaintenanceStatus: 0x9
	};

	static MethodNames = Object.entries(SecureConnectionBadgeArcade.Methods).reduce((namesObject, entry) => {
		const [key, value] = entry;
		namesObject[value] = key;
		return namesObject;
	}, {});

	static Handlers = {
		0x9: SecureConnectionBadgeArcade.GetMaintenanceStatus
	};

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet PRUDP packet
	 */
	static handlePacket(packet) {
		const methodId = packet.rmcMessage.methodId;

		const handler = SecureConnectionBadgeArcade.Handlers[methodId];

		if (!handler) {
			console.log(`Unknown Secure Connection (Badge Arcade) method ID ${methodId} (0x${methodId.toString(16)}) (${SecureConnectionBadgeArcade.MethodNames[methodId]})`);
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
	static GetMaintenanceStatus(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetMaintenanceStatusRequest(stream);
		} else {
			return new Responses.GetMaintenanceStatusResponse(stream);
		}
	}
}

module.exports = SecureConnectionBadgeArcade;
