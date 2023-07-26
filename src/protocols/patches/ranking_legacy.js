const Packet = require('../../packet'); // eslint-disable-line no-unused-vars
const PacketV0 = require('../../packetv0'); // eslint-disable-line no-unused-vars
const PacketV1 = require('../../packetv1'); // eslint-disable-line no-unused-vars
const RMCMessage = require('../../rmc'); // eslint-disable-line no-unused-vars
const Stream = require('../../stream');

const Requests = require('../requests/ranking_legacy');
const Responses = require('../responses/ranking_legacy');

// * This is the old version of the Ranking protocol.
// * It has been rewritten on NEX 3.0.0 to the current Ranking protocol
class RankingLegacy {
	static ProtocolID = 0x6e;

	static ProtocolName = 'Ranking (Legacy)';

	static Methods = {
		UploadCommonData: 0x05,
		UnknownMethod0xE: 0x0e,
		UnknownMethod0xF: 0x0f,
		GetTotal: 0x10,
		UploadScoreWithLimit: 0x11,
		UploadSpecificPeriodScore: 0x14,
		GetSpecificPeriodDataList: 0x16,
		GetSpecificPeriodTotal: 0x19
	};

	static MethodNames = Object.entries(RankingLegacy.Methods).reduce((namesObject, entry) => {
		const [key, value] = entry;
		namesObject[value] = key;
		return namesObject;
	}, {});

	static Handlers = {
		0x05: RankingLegacy.UploadCommonData,
		0x0e: RankingLegacy.UnknownMethod0xE,
		0x0f: RankingLegacy.UnknownMethod0xF,
		0x10: RankingLegacy.GetTotal,
		0x11: RankingLegacy.UploadScoreWithLimit,
		0x14: RankingLegacy.UploadSpecificPeriodScore,
		0x16: RankingLegacy.GetSpecificPeriodDataList,
		0x19: RankingLegacy.GetSpecificPeriodTotal
	};

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet PRUDP packet
	 */
	static handlePacket(packet) {
		const methodId = packet.rmcMessage.methodId;

		const handler = RankingLegacy.Handlers[methodId];

		if (!handler) {
			console.log(`Unknown Ranking (Legacy) method ID ${methodId} (0x${methodId?.toString(16)}) (${RankingLegacy.MethodNames[methodId]})`);
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
	static UnknownMethod0xE(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.UnknownMethod0xERequest(stream);
		} else {
			return new Responses.UnknownMethod0xEResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static UnknownMethod0xF(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.UnknownMethod0xFRequest(stream);
		} else {
			return new Responses.UnknownMethod0xFResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetTotal(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetTotalRequest(stream);
		} else {
			return new Responses.GetTotalResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static UploadScoreWithLimit(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.UploadScoreWithLimitRequest(stream);
		} else {
			return new Responses.UploadScoreWithLimitResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static UploadSpecificPeriodScore(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.UploadSpecificPeriodScoreRequest(stream);
		} else {
			return new Responses.UploadSpecificPeriodScoreResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetSpecificPeriodDataList(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetSpecificPeriodDataListRequest(stream);
		} else {
			return new Responses.GetSpecificPeriodDataListResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetSpecificPeriodTotal(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetSpecificPeriodTotalRequest(stream);
		} else {
			return new Responses.GetSpecificPeriodTotalResponse(stream);
		}
	}
}

module.exports = RankingLegacy;
