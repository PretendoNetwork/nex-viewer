const Packet = require('../packet'); // eslint-disable-line no-unused-vars
const PacketV0 = require('../packetv0'); // eslint-disable-line no-unused-vars
const PacketV1 = require('../packetv1'); // eslint-disable-line no-unused-vars
const RMCMessage = require('../rmc'); // eslint-disable-line no-unused-vars
const Stream = require('../stream');

const MatchMakingTypes = require('./types/match_making');

class MatchMakingExt {
	static ProtocolID = 0x32;

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
		packet.rmcData = handler(rmcMessage, stream);
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static EndParticipation(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				idGathering: stream.readUInt32LE(),
				strMessage: stream.readNEXString()
			};
		} else {
			return {
				retval: stream.readBoolean()
			};
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
			return {
				idGathering: stream.readUInt32LE(),
				bOnlyActive: stream.readBoolean()
			};
		} else {
			return {
				lstParticipants: stream.readNEXList(stream.readUInt32LE)
			};
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
			return {
				idGathering: stream.readUInt32LE(),
				bOnlyActive: stream.readBoolean()
			};
		} else {
			return {
				lstParticipants: stream.readNEXList(MatchMakingTypes.ParticipantDetails)
			};
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
			return {
				lstGatherings: stream.readNEXList(stream.readUInt32LE)
			};
		} else {
			return {
				lstGatheringURLs: stream.readNEXList(MatchMakingTypes.GatheringURLs)
			};
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
			return {
				id: stream.readUInt32LE(),
				descr: stream.readNEXString()
			};
		} else {
			return {
				retval: stream.readNEXString()
			};
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
			return {
				lstDeletions: stream.readNEXList(stream.readUInt32LE),
				pid: stream.readUInt32LE()
			};
		} else {
			return {}; // * No response
		}
	}
}


module.exports = MatchMakingExt;