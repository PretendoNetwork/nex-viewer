const Packet = require('../packet'); // eslint-disable-line no-unused-vars
const PacketV0 = require('../packetv0'); // eslint-disable-line no-unused-vars
const PacketV1 = require('../packetv1'); // eslint-disable-line no-unused-vars
const RMCMessage = require('../rmc'); // eslint-disable-line no-unused-vars
const Stream = require('../stream');

const Requests = require('./requests/utility');
const Responses = require('./responses/utility');

class Utility {
	static ProtocolID = 0x6e;

	static ProtocolName = 'Utility';

	static Methods = {
		AcquireNexUniqueId: 0x1,
		AcquireNexUniqueIdWithPassword: 0x2,
		AssociateNexUniqueIdWithMyPrincipalId: 0x3,
		AssociateNexUniqueIdsWithMyPrincipalId: 0x4,
		GetAssociatedNexUniqueIdWithMyPrincipalId: 0x5,
		GetAssociatedNexUniqueIdsWithMyPrincipalId: 0x6,
		GetIntegerSettings: 0x7,
		GetStringSettings: 0x8
	};

	static MethodNames = Object.entries(Utility.Methods).reduce((namesObject, entry) => {
		const [key, value] = entry;
		namesObject[value] = key;
		return namesObject;
	}, {});

	static Handlers = {
		0x1: Utility.AcquireNexUniqueId,
		0x2: Utility.AcquireNexUniqueIdWithPassword,
		0x3: Utility.AssociateNexUniqueIdWithMyPrincipalId,
		0x4: Utility.AssociateNexUniqueIdsWithMyPrincipalId,
		0x5: Utility.GetAssociatedNexUniqueIdWithMyPrincipalId,
		0x6: Utility.GetAssociatedNexUniqueIdsWithMyPrincipalId,
		0x7: Utility.GetIntegerSettings,
		0x8: Utility.GetStringSettings
	};

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet PRUDP packet
	 */
	static handlePacket(packet) {
		const methodId = packet.rmcMessage.methodId;

		// TODO - Add patches for Mario Kart 7
		if (packet.connection.accessKey === '6181dff1') {
			return;
		}

		const handler = Utility.Handlers[methodId];

		if (!handler) {
			console.log(`Unknown Utility method ID ${methodId} (0x${methodId?.toString(16)}) (${Utility.MethodNames[methodId]})`);
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
	static AcquireNexUniqueIdWithPassword(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.AcquireNexUniqueIdWithPasswordRequest(stream);
		} else {
			return new Responses.AcquireNexUniqueIdWithPasswordResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static AssociateNexUniqueIdWithMyPrincipalId(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.AssociateNexUniqueIdWithMyPrincipalIdRequest(stream);
		} else {
			return new Responses.AssociateNexUniqueIdWithMyPrincipalIdResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static AssociateNexUniqueIdsWithMyPrincipalId(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.AssociateNexUniqueIdsWithMyPrincipalIdRequest(stream);
		} else {
			return new Responses.AssociateNexUniqueIdsWithMyPrincipalIdResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetAssociatedNexUniqueIdWithMyPrincipalId(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetAssociatedNexUniqueIdWithMyPrincipalIdRequest(stream);
		} else {
			return new Responses.GetAssociatedNexUniqueIdWithMyPrincipalIdResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetAssociatedNexUniqueIdsWithMyPrincipalId(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetAssociatedNexUniqueIdsWithMyPrincipalIdRequest(stream);
		} else {
			return new Responses.GetAssociatedNexUniqueIdsWithMyPrincipalIdResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetIntegerSettings(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetIntegerSettingsRequest(stream);
		} else {
			return new Responses.GetIntegerSettingsResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetStringSettings(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetStringSettingsRequest(stream);
		} else {
			return new Responses.GetStringSettingsResponse(stream);
		}
	}
}


module.exports = Utility;
