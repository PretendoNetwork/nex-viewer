const Packet = require('../../packet'); // eslint-disable-line no-unused-vars
const PacketV0 = require('../../packetv0'); // eslint-disable-line no-unused-vars
const PacketV1 = require('../../packetv1'); // eslint-disable-line no-unused-vars
const RMCMessage = require('../../rmc'); // eslint-disable-line no-unused-vars
const Stream = require('../../stream');

const Requests = require('../requests/utility_mk7');
const Responses = require('../responses/utility_mk7');

class UtilityMK7 {
	static ProtocolID = 0x6e;

	static ProtocolName = 'Utility (MK7)';

	static Methods = {
		AcquireNexUniqueId: 0x4,
		UnknownMethod0x5: 0x5
	};

	static MethodNames = Object.entries(UtilityMK7.Methods).reduce((namesObject, entry) => {
		const [key, value] = entry;
		namesObject[value] = key;
		return namesObject;
	}, {});

	static Handlers = {
		0x4: UtilityMK7.AcquireNexUniqueId,
		0x5: UtilityMK7.UnknownMethod0x5
	};

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet PRUDP packet
	 */
	static handlePacket(packet) {
		const methodId = packet.rmcMessage.methodId;

		const handler = UtilityMK7.Handlers[methodId];

		if (!handler) {
			console.log(`Unknown Utility (MK7) method ID ${methodId} (0x${methodId?.toString(16)}) (${UtilityMK7.MethodNames[methodId]})`);
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
	static AcquireNexUniqueId(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.AcquireNexUniqueIdRequest(stream);
		} else {
			return new Responses.AcquireNexUniqueIdResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static UnknownMethod0x5(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.UnknownMethod0x5Request(stream);
		} else {
			return new Responses.UnknownMethod0x5Response(stream);
		}
	}
}

module.exports = UtilityMK7;
