import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import UInt32 from '@/nex/types/uint32';
import RankingOrderParam from '@/nex/protocols/ranking/types/ranking-order-param';
import RankingCachedResult from '@/nex/protocols/ranking/types/ranking-cached-result';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetCachedTopXRankings';

	private categories = new List(new UInt32());
	private orderParams = new List(new RankingOrderParam());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.categories.extractFrom(stream);
		this.orderParams.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			categories: this.categories,
			orderParams: this.orderParams
		};
	}
}

export class Response {
	public static Name = 'GetCachedTopXRankings';

	private pResults = new List(new RankingCachedResult());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.pResults.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pResults: this.pResults
		};
	}
}
