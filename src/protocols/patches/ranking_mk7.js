const Packet = require('../../packet'); // eslint-disable-line no-unused-vars
const PacketV0 = require('../../packetv0'); // eslint-disable-line no-unused-vars
const PacketV1 = require('../../packetv1'); // eslint-disable-line no-unused-vars
const RMCMessage = require('../../rmc'); // eslint-disable-line no-unused-vars
const Stream = require('../../stream');

const Requests = require('../requests/ranking_mk7');
const Responses = require('../responses/ranking_mk7');

class RankingMK7 {
	static ProtocolID = 0x6e;

	static ProtocolName = 'Ranking (MK7)';

	static Methods = {
		UnknownMethod0x16: 0x16,
		UnknownMethod0x19: 0x19
	};

	static MethodNames = Object.entries(RankingMK7.Methods).reduce((namesObject, entry) => {
		const [key, value] = entry;
		namesObject[value] = key;
		return namesObject;
	}, {});

	static Handlers = {
		0x16: RankingMK7.UnknownMethod0x16,
		0x19: RankingMK7.UnknownMethod0x19
	};

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet PRUDP packet
	 */
	static handlePacket(packet) {
		const methodId = packet.rmcMessage.methodId;

		const handler = RankingMK7.Handlers[methodId];

		if (!handler) {
			console.log(`Unknown Ranking (MK7) method ID ${methodId} (0x${methodId.toString(16)}) (${RankingMK7.MethodNames[methodId]})`);
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
	static UnknownMethod0x16(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.UnknownMethod0x16Request(stream);
		} else {
			return new Responses.UnknownMethod0x16Response(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static UnknownMethod0x19(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.UnknownMethod0x19Request(stream);
		} else {
			return new Responses.UnknownMethod0x19Response(stream);
		}
	}
}

module.exports = RankingMK7;
