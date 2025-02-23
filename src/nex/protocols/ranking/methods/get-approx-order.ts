import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import RankingOrderParam from '@/nex/protocols/ranking/types/ranking-order-param';
import UInt64 from '@/nex/types/uint64';
import PID from '@/nex/types/pid';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetApproxOrder';

	private category = new UInt32();
	private orderParam = new RankingOrderParam();
	private score = new UInt32();
	private uniqueId = new UInt64();
	private principalId = new PID();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.category.extractFrom(stream);
		this.orderParam.extractFrom(stream);
		this.score.extractFrom(stream);
		this.uniqueId.extractFrom(stream);
		this.principalId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			category: this.category,
			orderParam: this.orderParam,
			score: this.score,
			uniqueId: this.uniqueId,
			principalId: this.principalId
		};
	}
}

export class Response {
	public static Name = 'GetApproxOrder';

	private pOrder = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.pOrder.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pOrder: this.pOrder
		};
	}
}
