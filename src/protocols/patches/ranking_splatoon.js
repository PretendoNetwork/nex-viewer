const Packet = require('../../packet'); // eslint-disable-line no-unused-vars
const PacketV0 = require('../../packetv0'); // eslint-disable-line no-unused-vars
const PacketV1 = require('../../packetv1'); // eslint-disable-line no-unused-vars
const RMCMessage = require('../../rmc'); // eslint-disable-line no-unused-vars
const Stream = require('../../stream');

class RankingSplatoon {
	static ProtocolID = 0x70;

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
		packet.rmcData = handler(rmcMessage, stream);
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @returns {object} Parsed RMC body
	 */
	static GetCompetitionRankingScore(rmcMessage) {
		// ! This function has an unknown request/response format
		if (rmcMessage.isRequest()) {
			return {
				unknown: rmcMessage.body
			};
		} else {
			return {
				unknown: rmcMessage.body
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @returns {object} Parsed RMC body
	 */
	static GetcompetitionRankingScoreByPeriodList(rmcMessage) {
		// ! This function has an unknown request/response format
		if (rmcMessage.isRequest()) {
			return {
				unknown: rmcMessage.body
			};
		} else {
			return {
				unknown: rmcMessage.body
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @returns {object} Parsed RMC body
	 */
	static UploadCompetitionRankingScore(rmcMessage) {
		// ! This function has an unknown request/response format
		if (rmcMessage.isRequest()) {
			return {
				unknown: rmcMessage.body
			};
		} else {
			return {
				unknown: rmcMessage.body
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @returns {object} Parsed RMC body
	 */
	static DeleteCompetitionRankingScore(rmcMessage) {
		// ! This function has an unknown request/response format
		if (rmcMessage.isRequest()) {
			return {
				unknown: rmcMessage.body
			};
		} else {
			return {
				unknown: rmcMessage.body
			};
		}
	}
}


module.exports = RankingSplatoon;