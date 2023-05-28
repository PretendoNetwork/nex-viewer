const Packet = require('../../packet'); // eslint-disable-line no-unused-vars
const PacketV0 = require('../../packetv0'); // eslint-disable-line no-unused-vars
const PacketV1 = require('../../packetv1'); // eslint-disable-line no-unused-vars
const RMCMessage = require('../../rmc'); // eslint-disable-line no-unused-vars
const Stream = require('../../stream');

const Requests = require('../requests/ranking_mk7');
const Responses = require('../responses/ranking_mk7');

class RankingMK7 {
	static ProtocolID = 0x6e;

	static ProtocolName = 'Ranking (MK7)';

	static Methods = {
		UploadCommunityRankingData: 0x05,
		UploadCommunityScore: 0x14,
		GetCommunityRanking: 0x16,
		GetCommunityInfo: 0x19
	};

	static MethodNames = Object.entries(RankingMK7.Methods).reduce((namesObject, entry) => {
		const [key, value] = entry;
		namesObject[value] = key;
		return namesObject;
	}, {});

	static Handlers = {
		0x05: RankingMK7.UploadCommunityRankingData,
		0x14: RankingMK7.UploadCommunityScore,
		0x16: RankingMK7.GetCommunityRanking,
		0x19: RankingMK7.GetCommunityInfo
	};

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet PRUDP packet
	 */
	static handlePacket(packet) {
		const methodId = packet.rmcMessage.methodId;

		const handler = RankingMK7.Handlers[methodId];

		if (!handler) {
			console.log(`Unknown Ranking (MK7) method ID ${methodId} (0x${methodId?.toString(16)}) (${RankingMK7.MethodNames[methodId]})`);
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
	static UploadCommunityRankingData(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.UploadCommunityRankingDataRequest(stream);
		} else {
			return new Responses.UploadCommunityRankingDataResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static UploadCommunityScore(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.UploadCommunityScoreRequest(stream);
		} else {
			return new Responses.UploadCommunityScoreResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetCommunityRanking(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetCommunityRankingRequest(stream);
		} else {
			return new Responses.GetCommunityRankingResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetCommunityInfo(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetCommunityInfoRequest(stream);
		} else {
			return new Responses.GetCommunityInfoResponse(stream);
		}
	}
}

module.exports = RankingMK7;
