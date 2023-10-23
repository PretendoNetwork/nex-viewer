/**
 * @typedef {import('../packet')} Packet
 * @typedef {import('../packetv0')} PacketV0
 * @typedef {import('../packetv1')} PacketV1
 * @typedef {import('../rmc')} RMCMessage
 */

const Stream = require('../stream');

const SecureConnectionBadgeArcade = require('./patches/secure_connection_badge_arcade');

const Requests = require('./requests/secure_connection');
const Responses = require('./responses/secure_connection');

class SecureConnection {
	static ProtocolID = 0xB;

	static ProtocolName = 'Secure Connection';

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

		// Check if method is a Badge Arcade patched method
		if (packet.connection.accessKey === '82d5962d' && methodId >= 0x9) {
			SecureConnectionBadgeArcade.handlePacket(packet);
			return;
		}

		const handler = SecureConnection.Handlers[methodId];

		if (!handler) {
			console.log(`Unknown SecureConnection method ID ${methodId} (0x${methodId?.toString(16)}) (${SecureConnection.MethodNames[methodId]})`);
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
	static Register(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.RegisterRequest(stream);
		} else {
			return new Responses.RegisterResponse(stream);
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
			return new Requests.RequestConnectionDataRequest(stream);
		} else {
			return new Responses.RequestConnectionDataResponse(stream);
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
			return new Requests.RequestUrlsRequest(stream);
		} else {
			return new Responses.RequestUrlsResponse(stream);
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
			return new Requests.RegisterExRequest(stream);
		} else {
			return new Responses.RegisterExResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @returns {object} Parsed RMC body
	 */
	static TestConnectivity(rmcMessage) {
		if (rmcMessage.isRequest()) {
			return new Requests.TestConnectivityRequest();
		} else {
			return new Responses.TestConnectivityResponse();
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static UpdateURLs(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.UpdateURLsRequest(stream);
		} else {
			return new Responses.UpdateURLsResponse(stream);
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
			return new Requests.ReplaceURLRequest(stream);
		} else {
			return new Responses.ReplaceURLResponse(stream);
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
			return new Requests.SendReportRequest(stream);
		} else {
			return new Responses.SendReportResponse(stream);
		}
	}
}


module.exports = SecureConnection;
