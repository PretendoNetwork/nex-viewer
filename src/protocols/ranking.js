const Packet = require('../packet'); // eslint-disable-line no-unused-vars
const PacketV0 = require('../packetv0'); // eslint-disable-line no-unused-vars
const PacketV1 = require('../packetv1'); // eslint-disable-line no-unused-vars
const RMCMessage = require('../rmc'); // eslint-disable-line no-unused-vars
const Stream = require('../stream');

const RankingTypes = require('./types/ranking');

const RankingSplatoon = require('./patches/ranking_splatoon');

class Ranking {
	static ProtocolID = 0x70;

	static Methods = {
		UploadScore: 0x01,
		DeleteScore: 0x02,
		DeleteAllScores: 0x03,
		UploadCommonData: 0x04,
		DeleteCommonData: 0x05,
		GetCommonData: 0x06,
		ChangeAttributes: 0x07,
		ChangeAllAttributes: 0x08,
		GetRanking: 0x09,
		GetApproxOrder: 0x0a,
		GetStats: 0x0b,
		GetRankingByPIDList: 0x0c,
		GetRankingByUniqueIdList: 0x0d,
		GetCachedTopXRanking: 0x0e,
		GetCachedTopXRankings: 0x0f
	};

	static MethodNames = Object.entries(Ranking.Methods).reduce((namesObject, entry) => {
		const [key, value] = entry;
		namesObject[value] = key;
		return namesObject;
	}, {});

	static Handlers = {
		0x01: Ranking.UploadScore,
		0x02: Ranking.DeleteScore,
		0x03: Ranking.DeleteAllScores,
		0x04: Ranking.UploadCommonData,
		0x05: Ranking.DeleteCommonData,
		0x06: Ranking.GetCommonData,
		0x07: Ranking.ChangeAttributes,
		0x08: Ranking.ChangeAllAttributes,
		0x09: Ranking.GetRanking,
		0x0a: Ranking.GetApproxOrder,
		0x0b: Ranking.GetStats,
		0x0c: Ranking.GetRankingByPIDList,
		0x0d: Ranking.GetRankingByUniqueIdList,
		0x0e: Ranking.GetCachedTopXRanking,
		0x0f: Ranking.GetCachedTopXRankings
	};

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet PRUDP packet
	 */
	static handlePacket(packet) {
		const methodId = packet.rmcMessage.methodId;

		// Check if method is a Splatoon patched method
		if (packet.connection.accessKey === '6f599f81' && methodId >= 0x10) {
			RankingSplatoon.handlePacket(packet);
			return;
		}

		const handler = Ranking.Handlers[methodId];

		if (!handler) {
			console.log(`Unknown Ranking method ID ${methodId} (0x${methodId?.toString(16)}) (${Ranking.MethodNames[methodId]})`);
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
	static UploadScore(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				scoreData: stream.readNEXStructure(RankingTypes.RankingScoreData),
				uniqueId: stream.readUInt64LE()
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
	static DeleteScore(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				category: stream.readUInt32LE(),
				uniqueId: stream.readUInt64LE()
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
	static DeleteAllScores(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				uniqueId: stream.readUInt64LE()
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
	static UploadCommonData(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				commonData: stream.readNEXBuffer(),
				uniqueId: stream.readUInt64LE()
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
	static DeleteCommonData(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				uniqueId: stream.readUInt64LE()
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
	static GetCommonData(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				uniqueId: stream.readUInt64LE()
			};
		} else {
			return {
				commonData: stream.readNEXBuffer()
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static ChangeAttributes(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				category: stream.readUInt32LE(),
				changeParam: stream.readNEXStructure(RankingTypes.RankingChangeAttributesParam),
				uniqueId: stream.readUInt64LE()
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
	static ChangeAllAttributes(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				changeParam: stream.readNEXStructure(RankingTypes.RankingChangeAttributesParam),
				uniqueId: stream.readUInt64LE()
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
	static GetRanking(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				rankingMode: stream.readUInt8(),
				category: stream.readUInt32LE(),
				orderParam: stream.readNEXStructure(RankingTypes.RankingOrderParam),
				uniqueId: stream.readUInt64LE(),
				principalId: stream.readUInt32LE()
			};
		} else {
			return {
				pResult: stream.readNEXStructure(RankingTypes.RankingResult)
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetApproxOrder(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				category: stream.readUInt32LE(),
				orderParam: stream.readNEXStructure(RankingTypes.RankingOrderParam),
				score: stream.readUInt32LE(),
				uniqueId: stream.readUInt64LE(),
				principalId: stream.readUInt32LE()
			};
		} else {
			return {
				pOrder: stream.readUInt32LE()
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetStats(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				category: stream.readUInt32LE(),
				orderParam: stream.readNEXStructure(RankingTypes.RankingOrderParam),
				flags: stream.readUInt32LE()
			};
		} else {
			return {
				pStats: stream.readNEXStructure(RankingTypes.RankingStats)
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetRankingByPIDList(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				principalIdList: stream.readNEXList(stream.readUInt32LE),
				rankingMode: stream.readUInt8(),
				category: stream.readUInt32LE(),
				orderParam: stream.readNEXStructure(RankingTypes.RankingOrderParam),
				uniqueId: stream.readUInt64LE()
			};
		} else {
			return {
				pResult: stream.readNEXStructure(RankingTypes.RankingResult)
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetRankingByUniqueIdList(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				nexUniqueIdList: stream.readNEXList(stream.readUInt64LE),
				rankingMode: stream.readUInt8(),
				category: stream.readUInt32LE(),
				orderParam: stream.readNEXStructure(RankingTypes.RankingOrderParam),
				uniqueId: stream.readUInt64LE()
			};
		} else {
			return {
				pResult: stream.readNEXStructure(RankingTypes.RankingResult)
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetCachedTopXRanking(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				category: stream.readUInt32LE(),
				orderParam: stream.readNEXStructure(RankingTypes.RankingOrderParam)
			};
		} else {
			return {
				pResult: stream.readNEXStructure(RankingTypes.RankingCachedResult)
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetCachedTopXRankings(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				categories: stream.readNEXList(stream.readUInt32LE),
				orderParams: stream.readNEXList(RankingTypes.RankingOrderParam)
			};
		} else {
			return {
				pResults: stream.readNEXList(RankingTypes.RankingCachedResult)
			};
		}
	}
}


module.exports = Ranking;