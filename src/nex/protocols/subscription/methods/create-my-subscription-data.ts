import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import Bool from '@/nex/types/bool';
import SubscriptionData from '../types/subscription-data';
import type RMCMessage from '@/nex/rmc-message';
import type * as RMCs from '@/types/nex/rmcs/subscription/create-my-subscription-data';

export class Request {
	public static Name = 'CreateMySubscriptionData';

	private unk = new UInt32();
	private param = new SubscriptionData();
	private bUnk = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.unk.extractFrom(stream);
		this.param.extractFrom(stream);
		this.bUnk.extractFrom(stream);
	}

	public toJSON(): RMCs.Request {
		return {
			unk: this.unk,
			param: this.param,
			bUnk: this.bUnk
		};
	}
}

// * No response data
export class Response {
	public static Name = 'CreateMySubscriptionData';

	constructor() {}

	public toJSON(): RMCs.Response {
		return {};
	}
}
