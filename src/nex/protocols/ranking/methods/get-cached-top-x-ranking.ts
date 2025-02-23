import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import RankingOrderParam from '@/nex/protocols/ranking/types/ranking-order-param';
import RankingCachedResult from '@/nex/protocols/ranking/types/ranking-cached-result';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetCachedTopXRanking';

	private category = new UInt32();
	private orderParam = new RankingOrderParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.category.extractFrom(stream);
		this.orderParam.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			category: this.category,
			orderParam: this.orderParam
		};
	}
}

export class Response {
	public static Name = 'GetCachedTopXRanking';

	private pResult = new RankingCachedResult();

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
