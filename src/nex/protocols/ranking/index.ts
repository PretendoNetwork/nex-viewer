import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/ranking/methods';
import type Packet from '@/types/nex/packet';

export default class RankingProtocol {
	static ID = 0x70;
	static Name = 'Ranking';

	static Methods = {
		UploadScore: 0x1,
		DeleteScore: 0x2,
		DeleteAllScores: 0x3,
		UploadCommonData: 0x4,
		DeleteCommonData: 0x5,
		GetCommonData: 0x6,
		ChangeAttributes: 0x7,
		ChangeAllAttributes: 0x8,
		GetRanking: 0x9,
		GetApproxOrder: 0xA,
		GetStats: 0xB,
		GetRankingByPIDList: 0xC,
		GetRankingByUniqueIdList: 0xD,
		GetCachedTopXRanking: 0xE,
		GetCachedTopXRankings: 0xF
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x1: RankingProtocol.UploadScore,
		0x2: RankingProtocol.DeleteScore,
		0x3: RankingProtocol.DeleteAllScores,
		0x4: RankingProtocol.UploadCommonData,
		0x5: RankingProtocol.DeleteCommonData,
		0x6: RankingProtocol.GetCommonData,
		0x7: RankingProtocol.ChangeAttributes,
		0x8: RankingProtocol.ChangeAllAttributes,
		0x9: RankingProtocol.GetRanking,
		0xA: RankingProtocol.GetApproxOrder,
		0xB: RankingProtocol.GetStats,
		0xC: RankingProtocol.GetRankingByPIDList,
		0xD: RankingProtocol.GetRankingByUniqueIdList,
		0xE: RankingProtocol.GetCachedTopXRanking,
		0xF: RankingProtocol.GetCachedTopXRankings
	};

	static handlePacket(packet: Packet): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = RankingProtocol.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.parameters = new messageDecoder(packet.message);
		packet.message.methodName = messageDecoder.Name;
	}

	private static UploadScore(message: RMCMessage): typeof Methods.UploadScore.Request | typeof Methods.UploadScore.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UploadScore.Request;
		} else {
			return Methods.UploadScore.Response;
		}
	}

	private static DeleteScore(message: RMCMessage): typeof Methods.DeleteScore.Request | typeof Methods.DeleteScore.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeleteScore.Request;
		} else {
			return Methods.DeleteScore.Response;
		}
	}

	private static DeleteAllScores(message: RMCMessage): typeof Methods.DeleteAllScores.Request | typeof Methods.DeleteAllScores.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeleteAllScores.Request;
		} else {
			return Methods.DeleteAllScores.Response;
		}
	}

	private static UploadCommonData(message: RMCMessage): typeof Methods.UploadCommonData.Request | typeof Methods.UploadCommonData.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UploadCommonData.Request;
		} else {
			return Methods.UploadCommonData.Response;
		}
	}

	private static DeleteCommonData(message: RMCMessage): typeof Methods.DeleteCommonData.Request | typeof Methods.DeleteCommonData.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeleteCommonData.Request;
		} else {
			return Methods.DeleteCommonData.Response;
		}
	}

	private static GetCommonData(message: RMCMessage): typeof Methods.GetCommonData.Request | typeof Methods.GetCommonData.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetCommonData.Request;
		} else {
			return Methods.GetCommonData.Response;
		}
	}

	private static ChangeAttributes(message: RMCMessage): typeof Methods.ChangeAttributes.Request | typeof Methods.ChangeAttributes.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ChangeAttributes.Request;
		} else {
			return Methods.ChangeAttributes.Response;
		}
	}

	private static ChangeAllAttributes(message: RMCMessage): typeof Methods.ChangeAllAttributes.Request | typeof Methods.ChangeAllAttributes.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ChangeAllAttributes.Request;
		} else {
			return Methods.ChangeAllAttributes.Response;
		}
	}

	private static GetRanking(message: RMCMessage): typeof Methods.GetRanking.Request | typeof Methods.GetRanking.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetRanking.Request;
		} else {
			return Methods.GetRanking.Response;
		}
	}

	private static GetApproxOrder(message: RMCMessage): typeof Methods.GetApproxOrder.Request | typeof Methods.GetApproxOrder.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetApproxOrder.Request;
		} else {
			return Methods.GetApproxOrder.Response;
		}
	}

	private static GetStats(message: RMCMessage): typeof Methods.GetStats.Request | typeof Methods.GetStats.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetStats.Request;
		} else {
			return Methods.GetStats.Response;
		}
	}

	private static GetRankingByPIDList(message: RMCMessage): typeof Methods.GetRankingByPIDList.Request | typeof Methods.GetRankingByPIDList.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetRankingByPIDList.Request;
		} else {
			return Methods.GetRankingByPIDList.Response;
		}
	}

	private static GetRankingByUniqueIdList(message: RMCMessage): typeof Methods.GetRankingByUniqueIdList.Request | typeof Methods.GetRankingByUniqueIdList.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetRankingByUniqueIdList.Request;
		} else {
			return Methods.GetRankingByUniqueIdList.Response;
		}
	}

	private static GetCachedTopXRanking(message: RMCMessage): typeof Methods.GetCachedTopXRanking.Request | typeof Methods.GetCachedTopXRanking.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetCachedTopXRanking.Request;
		} else {
			return Methods.GetCachedTopXRanking.Response;
		}
	}

	private static GetCachedTopXRankings(message: RMCMessage): typeof Methods.GetCachedTopXRankings.Request | typeof Methods.GetCachedTopXRankings.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetCachedTopXRankings.Request;
		} else {
			return Methods.GetCachedTopXRankings.Response;
		}
	}
}
