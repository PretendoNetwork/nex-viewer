/**
 * @typedef {import('../packet')} Packet
 * @typedef {import('../packetv0')} PacketV0
 * @typedef {import('../packetv1')} PacketV1
 * @typedef {import('../rmc')} RMCMessage
 */

const Stream = require('../stream');

const Requests = require('./requests/match_making_ext');
const Responses = require('./responses/match_making_ext');

class MatchMakingExt {
	static ProtocolID = 0x32;

	static ProtocolName = 'Match making (extension)';

	static Methods = {
		EndParticipation: 0x1,
		GetParticipants: 0x2,
		GetDetailedParticipants: 0x3,
		GetParticipantsURLs: 0x4,
		GetGatheringRelations: 0x5,
		DeleteFromDeletions: 0x6
	};

	static MethodNames = Object.entries(MatchMakingExt.Methods).reduce((namesObject, entry) => {
		const [key, value] = entry;
		namesObject[value] = key;
		return namesObject;
	}, {});

	static Handlers = {
		0x1: MatchMakingExt.EndParticipation,
		0x2: MatchMakingExt.GetParticipants,
		0x3: MatchMakingExt.GetDetailedParticipants,
		0x4: MatchMakingExt.GetParticipantsURLs,
		0x5: MatchMakingExt.GetGatheringRelations,
		0x6: MatchMakingExt.DeleteFromDeletions
	};

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet PRUDP packet
	 */
	static handlePacket(packet) {
		const methodId = packet.rmcMessage.methodId;

		const handler = MatchMakingExt.Handlers[methodId];

		if (!handler) {
			console.log(`Unknown MatchMakingExt method ID ${methodId} (0x${methodId?.toString(16)}) (${MatchMakingExt.MethodNames[methodId]})`);
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
	static EndParticipation(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.EndParticipationRequest(stream);
		} else {
			return new Responses.EndParticipationResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetParticipants(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetParticipantsRequest(stream);
		} else {
			return new Responses.GetParticipantsResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetDetailedParticipants(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetDetailedParticipantsRequest(stream);
		} else {
			return new Responses.GetDetailedParticipantsResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetParticipantsURLs(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetParticipantsURLsRequest(stream);
		} else {
			return new Responses.GetParticipantsURLsResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetGatheringRelations(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetGatheringRelationsRequest(stream);
		} else {
			return new Responses.GetGatheringRelationsResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static DeleteFromDeletions(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.DeleteFromDeletionsRequest(stream);
		} else {
			return new Responses.DeleteFromDeletionsResponse(stream);
		}
	}
}


module.exports = MatchMakingExt;