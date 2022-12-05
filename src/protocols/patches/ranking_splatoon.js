const Packet = require('../../packet'); // eslint-disable-line no-unused-vars
const PacketV0 = require('../../packetv0'); // eslint-disable-line no-unused-vars
const PacketV1 = require('../../packetv1'); // eslint-disable-line no-unused-vars
const RMCMessage = require('../../rmc'); // eslint-disable-line no-unused-vars
const Stream = require('../../stream');

const Requests = require('../requests/ranking_splatoon');
const Responses = require('../responses/ranking_splatoon');

class RankingSplatoon {
	static ProtocolID = 0x70;

	static ProtocolName = 'Ranking (Splatoon)';

	static Methods = {
		GetCompetitionRankingScore: 0x10,
		GetcompetitionRankingScoreByPeriodList: 0x11,
		UploadCompetitionRankingScore: 0x12,
		DeleteCompetitionRankingScore: 0x13
	};

	static MethodNames = Object.entries(RankingSplatoon.Methods).reduce((namesObject, entry) => {
		const [key, value] = entry;
		namesObject[value] = key;
		return namesObject;
	}, {});

	static Handlers = {
		0x10: RankingSplatoon.GetCompetitionRankingScore,
		0x11: RankingSplatoon.GetcompetitionRankingScoreByPeriodList,
		0x12: RankingSplatoon.UploadCompetitionRankingScore,
		0x13: RankingSplatoon.DeleteCompetitionRankingScore
	};

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet PRUDP packet
	 */
	static handlePacket(packet) {
		const methodId = packet.rmcMessage.methodId;

		const handler = RankingSplatoon.Handlers[methodId];

		if (!handler) {
			console.log(`Unknown RankingSplatoon method ID ${methodId} (0x${methodId?.toString(16)}) (${RankingSplatoon.MethodNames[methodId]})`);
			return;
		}

		const { rmcMessage } = packet;
		const stream = new Stream(rmcMessage.body, packet.connection);

		packet.rmcData = {
			protocolName: this.ProtocolName,
			methodName: this.MethodNames[methodId],
			body: handler(rmcMessage, stream)
		};
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetCompetitionRankingScore(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetCompetitionRankingScoreRequest(stream);
		} else {
			return new Responses.GetCompetitionRankingScoreResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetcompetitionRankingScoreByPeriodList(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetcompetitionRankingScoreByPeriodListRequest(stream);
		} else {
			return new Responses.GetcompetitionRankingScoreByPeriodListResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static UploadCompetitionRankingScore(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.UploadCompetitionRankingScoreRequest(stream);
		} else {
			return new Responses.UploadCompetitionRankingScoreResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static DeleteCompetitionRankingScore(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.DeleteCompetitionRankingScoreRequest(stream);
		} else {
			return new Responses.DeleteCompetitionRankingScoreResponse(stream);
		}
	}
}

module.exports = RankingSplatoon;