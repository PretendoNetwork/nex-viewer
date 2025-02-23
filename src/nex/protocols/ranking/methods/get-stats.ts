import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import RankingOrderParam from '@/nex/protocols/ranking/types/ranking-order-param';
import RankingStats from '@/nex/protocols/ranking/types/ranking-stats';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetStats';

	private category = new UInt32();
	private orderParam = new RankingOrderParam();
	private flags = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.category.extractFrom(stream);
		this.orderParam.extractFrom(stream);
		this.flags.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			category: this.category,
			orderParam: this.orderParam,
			flags: this.flags
		};
	}
}

export class Response {
	public static Name = 'GetStats';

	private pStats = new RankingStats();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.pStats.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pStats: this.pStats
		};
	}
}
