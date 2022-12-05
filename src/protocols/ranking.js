const Packet = require('../packet'); // eslint-disable-line no-unused-vars
const PacketV0 = require('../packetv0'); // eslint-disable-line no-unused-vars
const PacketV1 = require('../packetv1'); // eslint-disable-line no-unused-vars
const RMCMessage = require('../rmc'); // eslint-disable-line no-unused-vars
const Stream = require('../stream');

const RankingSplatoon = require('./patches/ranking_splatoon');

const Requests = require('./requests/ranking');
const Responses = require('./responses/ranking');

class Ranking {
	static ProtocolID = 0x70;

	static ProtocolName = 'Ranking';

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
	static UploadScore(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.UploadScoreRequest(stream);
		} else {
			return new Responses.UploadScoreResponse(stream);
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
			return new Requests.DeleteScoreRequest(stream);
		} else {
			return new Responses.DeleteScoreResponse(stream);
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
			return new Requests.DeleteAllScoresRequest(stream);
		} else {
			return new Responses.DeleteAllScoresResponse(stream);
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
			return new Requests.UploadCommonDataRequest(stream);
		} else {
			return new Responses.UploadCommonDataResponse(stream);
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
			return new Requests.DeleteCommonDataRequest(stream);
		} else {
			return new Responses.DeleteCommonDataResponse(stream);
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
			return new Requests.GetCommonDataRequest(stream);
		} else {
			return new Responses.GetCommonDataResponse(stream);
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
			return new Requests.ChangeAttributesRequest(stream);
		} else {
			return new Responses.ChangeAttributesResponse(stream);
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
			return new Requests.ChangeAllAttributesRequest(stream);
		} else {
			return new Responses.ChangeAllAttributesResponse(stream);
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
			return new Requests.GetRankingRequest(stream);
		} else {
			return new Responses.GetRankingResponse(stream);
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
			return new Requests.GetApproxOrderRequest(stream);
		} else {
			return new Responses.GetApproxOrderResponse(stream);
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
			return new Requests.GetStatsRequest(stream);
		} else {
			return new Responses.GetStatsResponse(stream);
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
			return new Requests.GetRankingByPIDListRequest(stream);
		} else {
			return new Responses.GetRankingByPIDListResponse(stream);
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
			return new Requests.GetRankingByUniqueIdListRequest(stream);
		} else {
			return new Responses.GetRankingByUniqueIdListResponse(stream);
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
			return new Requests.GetCachedTopXRankingRequest(stream);
		} else {
			return new Responses.GetCachedTopXRankingResponse(stream);
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
			return new Requests.GetCachedTopXRankingsRequest(stream);
		} else {
			return new Responses.GetCachedTopXRankingsResponse(stream);
		}
	}
}


module.exports = Ranking;