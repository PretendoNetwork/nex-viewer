const Packet = require('../packet'); // eslint-disable-line no-unused-vars
const PacketV0 = require('../packetv0'); // eslint-disable-line no-unused-vars
const PacketV1 = require('../packetv1'); // eslint-disable-line no-unused-vars
const RMCMessage = require('../rmc'); // eslint-disable-line no-unused-vars
const Stream = require('../stream');

class SecureConnection {
	static ProtocolID = 0xB;

	static Methods = {
		Register: 0x1,
		RequestConnectionData: 0x2,
		RequestUrls: 0x3,
		RegisterEx: 0x4,
		TestConnectivity: 0x5,
		UpdateURLs: 0x6,
		ReplaceURL: 0x7,
		SendReport: 0x8
	};

	static MethodNames = Object.entries(SecureConnection.Methods).reduce((namesObject, entry) => {
		const [key, value] = entry;
		namesObject[value] = key;
		return namesObject;
	}, {});

	static Handlers = {
		0x1: SecureConnection.Register
	};

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet PRUDP packet
	 */
	static handlePacket(packet) {
		const methodId = packet.rmcMessage.methodId;

		const handler = SecureConnection.Handlers[methodId];

		if (!handler) {
			console.log(`Unknown SecureConnection method ID ${methodId} (0x${methodId.toString(16)}) (${SecureConnection.MethodNames[methodId]})`);
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
	static Register(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				vecMyURLs: stream.readNEXList(stream.readNEXStationURL)
			};
		} else {
			return {
				retval: stream.readUInt32LE(),
				pidConnectionID: stream.readUInt32LE(),
				urlPublic: stream.readNEXStationURL()
			};
		}
	}
}


module.exports = SecureConnection;