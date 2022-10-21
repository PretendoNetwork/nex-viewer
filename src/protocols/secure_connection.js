const Packet = require('../packet'); // eslint-disable-line no-unused-vars
const PacketV0 = require('../packetv0'); // eslint-disable-line no-unused-vars
const PacketV1 = require('../packetv1'); // eslint-disable-line no-unused-vars
const RMCMessage = require('../rmc'); // eslint-disable-line no-unused-vars
const Stream = require('../stream');
const NEXTypes = require('../types');
const SecureConnectionTypes = require('./types/secure_connection');

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
		0x1: SecureConnection.Register,
		0x2: SecureConnection.RequestConnectionData,
		0x3: SecureConnection.RequestUrls,
		0x4: SecureConnection.RegisterEx,
		0x5: SecureConnection.TestConnectivity,
		0x6: SecureConnection.UpdateURLs,
		0x7: SecureConnection.ReplaceURL,
		0x8: SecureConnection.SendReport
	};

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet PRUDP packet
	 */
	static handlePacket(packet) {
		const methodId = packet.rmcMessage.methodId;

		const handler = SecureConnection.Handlers[methodId];

		if (!handler) {
			console.log(`Unknown SecureConnection method ID ${methodId} (0x${methodId?.toString(16)}) (${SecureConnection.MethodNames[methodId]})`);
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

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static RequestConnectionData(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				cidTarget: stream.readUInt32LE(),
				pidTarget: stream.readUInt32LE()
			};
		} else {
			return {
				retval: stream.readBoolean(),
				pvecConnectionsData: stream.readNEXList(SecureConnectionTypes.ConnectionData)
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static RequestUrls(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				cidTarget: stream.readUInt32LE(),
				pidTarget: stream.readUInt32LE()
			};
		} else {
			return {
				retval: stream.readBoolean(),
				plstURLs: stream.readNEXList(NEXTypes.StationURL)
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static RegisterEx(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				vecMyURLs: stream.readNEXList(stream.readNEXStationURL),
				hCustomData: stream.readNEXAnyDataHolder()
			};
		} else {
			return {
				retval: stream.readUInt32LE(),
				pidConnectionID: stream.readUInt32LE(),
				urlPublic: stream.readNEXStationURL()
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @returns {object} Parsed RMC body
	 */
	static TestConnectivity(rmcMessage) {
		if (rmcMessage.isRequest()) {
			return {}; // * No request
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
	static ReplaceURL(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				target: stream.readNEXStationURL(),
				url: stream.readNEXStationURL()
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
	static SendReport(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				reportId: stream.readUInt32LE(),
				reportData: stream.readNEXQBuffer()
			};
		} else {
			return {}; // * No response
		}
	}
}


module.exports = SecureConnection;