/**
 * @typedef {import('../../packet')} Packet
 * @typedef {import('../../packetv0')} PacketV0
 * @typedef {import('../../packetv1')} PacketV1
 * @typedef {import('../../rmc')} RMCMessage
 */

const Stream = require('../../stream');

const Requests = require('../requests/matchmake_extension_mk8');
const Responses = require('../responses/matchmake_extension_mk8');

class MatchmakeExtensionMK8 {
	static ProtocolID = 0x6d;

	static ProtocolName = 'MatchmakeExtension (MK8)';

	static Methods = {
		JoinMatchmakeSessionWithExtraParticipants: 0x28
	};

	static MethodNames = Object.entries(MatchmakeExtensionMK8.Methods).reduce((namesObject, entry) => {
		const [key, value] = entry;
		namesObject[value] = key;
		return namesObject;
	}, {});

	static Handlers = {
		0x28: MatchmakeExtensionMK8.JoinMatchmakeSessionWithExtraParticipants
	};

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet PRUDP packet
	 */
	static handlePacket(packet) {
		const methodId = packet.rmcMessage.methodId;

		const handler = MatchmakeExtensionMK8.Handlers[methodId];

		if (!handler) {
			console.log(`Unknown MatchmakeExtension (MK8) method ID ${methodId} (0x${methodId.toString(16)}) (${MatchmakeExtensionMK8.MethodNames[methodId]})`);
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
	static JoinMatchmakeSessionWithExtraParticipants(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.JoinMatchmakeSessionWithExtraParticipantsRequest(stream);
		} else {
			return new Responses.JoinMatchmakeSessionWithExtraParticipantsResponse(stream);
		}
	}
}

module.exports = MatchmakeExtensionMK8;