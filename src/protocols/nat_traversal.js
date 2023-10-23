/**
 * @typedef {import('../packet')} Packet
 * @typedef {import('../packetv0')} PacketV0
 * @typedef {import('../packetv1')} PacketV1
 * @typedef {import('../rmc')} RMCMessage
 */

const Stream = require('../stream');

const Requests = require('./requests/nat_traversal');
const Responses = require('./responses/nat_traversal');

class NATTraversal {
	static ProtocolID = 0x3;

	static ProtocolName = 'NAT Traversal';

	static Methods = {
		RequestProbeInitiation: 0x1,
		InitiateProbe: 0x2,
		RequestProbeInitiationExt: 0x3,
		ReportNATTraversalResult: 0x4,
		ReportNATProperties: 0x5,
		GetRelaySignatureKey: 0x6,
		ReportNATTraversalResultDetail: 0x7
	};

	static MethodNames = Object.entries(NATTraversal.Methods).reduce((namesObject, entry) => {
		const [key, value] = entry;
		namesObject[value] = key;
		return namesObject;
	}, {});

	static Handlers = {
		0x1: NATTraversal.RequestProbeInitiation,
		0x2: NATTraversal.InitiateProbe,
		0x3: NATTraversal.RequestProbeInitiationExt,
		0x4: NATTraversal.ReportNATTraversalResult,
		0x5: NATTraversal.ReportNATProperties,
		0x6: NATTraversal.GetRelaySignatureKey,
		0x7: NATTraversal.ReportNATTraversalResultDetail
	};

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet PRUDP packet
	 */
	static handlePacket(packet) {
		const methodId = packet.rmcMessage.methodId;

		const handler = NATTraversal.Handlers[methodId];

		if (!handler) {
			console.log(`Unknown NATTraversal method ID ${methodId} (0x${methodId?.toString(16)}) (${NATTraversal.MethodNames[methodId]})`);
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
	static RequestProbeInitiation(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.RequestProbeInitiationRequest(stream);
		} else {
			return new Responses.RequestProbeInitiationResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static InitiateProbe(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.InitiateProbeRequest(stream);
		} else {
			return new Responses.InitiateProbeResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static RequestProbeInitiationExt(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.RequestProbeInitiationExtRequest(stream);
		} else {
			return new Responses.RequestProbeInitiationExtResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static ReportNATTraversalResult(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.ReportNATTraversalResultRequest(stream);
		} else {
			return new Responses.ReportNATTraversalResultResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static ReportNATProperties(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.ReportNATPropertiesRequest(stream);
		} else {
			return new Responses.ReportNATPropertiesResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetRelaySignatureKey(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetRelaySignatureKeyRequest(stream);
		} else {
			return new Responses.GetRelaySignatureKeyResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static ReportNATTraversalResultDetail(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.ReportNATTraversalResultDetailRequest(stream);
		} else {
			return new Responses.ReportNATTraversalResultDetailResponse(stream);
		}
	}
}


module.exports = NATTraversal;