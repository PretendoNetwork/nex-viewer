const Packet = require('../packet');
const PacketV0 = require('../packetv0');
const PacketV1 = require('../packetv1');
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
	}

	static Handlers = {
		0x1: SecureConnection.Register
	}

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet
	 */
	static handlePacket(packet) {
		const handler = SecureConnection.Handlers[packet.rmcMessage.methodId];

		if (!handler) {
			console.log(`Unknown SecureConnection method ID ${packet.rmcMessage.methodId} (0x${packet.rmcMessage.methodId.toString(16)})`);
			return;
		}

		packet.rmcData = handler(packet);
	}

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet
	 */
	static Register(packet) {
		const { rmcMessage } = packet;
		const stream = new Stream(rmcMessage.body, packet.connection);

		if (rmcMessage.isRequest()) {
			return {
				vecMyURLs: stream.readNEXList(stream.readNEXStationURL)
			}
		} else {
			return {
				retval: stream.readUInt32LE(),
				pidConnectionID: stream.readUInt32LE(),
				urlPublic: stream.readNEXStationURL()
			}
		}
	}
}


module.exports = SecureConnection;