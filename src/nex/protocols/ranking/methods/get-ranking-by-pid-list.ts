import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import PID from '@/nex/types/pid';
import UInt8 from '@/nex/types/uint8';
import UInt32 from '@/nex/types/uint32';
import RankingOrderParam from '@/nex/protocols/ranking/types/ranking-order-param';
import UInt64 from '@/nex/types/uint64';
import RankingResult from '@/nex/protocols/ranking/types/ranking-result';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetRankingByPIDList';

	private principalIdList = new List(new PID());
	private rankingMode = new UInt8();
	private category = new UInt32();
	private orderParam = new RankingOrderParam();
	private uniqueId = new UInt64();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.principalIdList.extractFrom(stream);
		this.rankingMode.extractFrom(stream);
		this.category.extractFrom(stream);
		this.orderParam.extractFrom(stream);
		this.uniqueId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			principalIdList: this.principalIdList,
			rankingMode: this.rankingMode,
			category: this.category,
			orderParam: this.orderParam,
			uniqueId: this.uniqueId
		};
	}
}

export class Response {
	public static Name = 'GetRankingByPIDList';

	private pResult = new RankingResult();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.pResult.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pResult: this.pResult
		};
	}
}
