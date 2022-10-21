const Packet = require('../packet'); // eslint-disable-line no-unused-vars
const PacketV0 = require('../packetv0'); // eslint-disable-line no-unused-vars
const PacketV1 = require('../packetv1'); // eslint-disable-line no-unused-vars
const RMCMessage = require('../rmc'); // eslint-disable-line no-unused-vars
const Stream = require('../stream');

class NATTraversal {
	static ProtocolID = 0x3;

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
		packet.rmcData = handler(rmcMessage, stream);
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static RequestProbeInitiation(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				urlTargetList: stream.readNEXList(stream.readNEXStationURL)
			};
		} else {
			// * No response
			return {};
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
			return {
				urlStationToProbe: stream.readNEXStationURL()
			};
		} else {
			// * No response
			return {};
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
			return {
				urlTargetList: stream.readNEXList(stream.readNEXStationURL),
				urlStationToProbe: stream.readNEXStationURL()
			};
		} else {
			// * No response
			return {};
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
			return {
				cid: stream.readUInt32LE(),
				result: stream.readBoolean(),
				rtt: stream.readUInt32LE() // ! THIS IS NOT PRESENT ON 3DS, ONLY WIIU/SWITCH
			};
		} else {
			// * No response
			return {};
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
			return {
				natmapping: stream.readUInt32LE(),
				natfiltering: stream.readUInt32LE(),
				rtt: stream.readUInt32LE()
			};
		} else {
			// * No response
			return {};
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
			return {}; // * No request
		} else {
			return {
				relayMode: stream.readInt32LE(),
				currentUTCTime: stream.readNEXDateTime(),
				address: stream.readNEXString(),
				port: stream.readUInt16LE(),
				relayAddressType: stream.readInt32LE(),
				gameServerID: stream.readUInt32LE()
			};
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
			return {
				cid: stream.readUInt32LE(),
				result: stream.readBoolean(),
				detail: stream.readInt32LE(),
				rtt: stream.readUInt32LE()
			};
		} else {
			// * No response
			return {};
		}
	}
}


module.exports = NATTraversal;