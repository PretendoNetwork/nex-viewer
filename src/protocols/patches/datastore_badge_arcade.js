/**
 * @typedef {import('../../packet')} Packet
 * @typedef {import('../../packetv0')} PacketV0
 * @typedef {import('../../packetv1')} PacketV1
 * @typedef {import('../../rmc')} RMCMessage
 */

const Stream = require('../../stream');

const Requests = require('../requests/datastore_badge_arcade');
const Responses = require('../responses/datastore_badge_arcade');

class DataStoreBadgeArcade {
	static ProtocolID = 0x73;

	static ProtocolName = 'DataStore (Badge Arcade)';

	static Methods = {
		GetMetaByOwnerId: 0x2d
	};

	static MethodNames = Object.entries(DataStoreBadgeArcade.Methods).reduce((namesObject, entry) => {
		const [key, value] = entry;
		namesObject[value] = key;
		return namesObject;
	}, {});

	static Handlers = {
		0x2d: DataStoreBadgeArcade.GetMetaByOwnerId
	};

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet PRUDP packet
	 */
	static handlePacket(packet) {
		const methodId = packet.rmcMessage.methodId;

		const handler = DataStoreBadgeArcade.Handlers[methodId];

		if (!handler) {
			console.log(`Unknown DataStore (Badge Arcade) method ID ${methodId} (0x${methodId.toString(16)}) (${DataStoreBadgeArcade.MethodNames[methodId]})`);
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
	static GetMetaByOwnerId(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetMetaByOwnerIdRequest(stream);
		} else {
			return new Responses.GetMetaByOwnerIdResponse(stream);
		}
	}
}

module.exports = DataStoreBadgeArcade;
