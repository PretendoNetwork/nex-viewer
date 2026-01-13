import NEXByteStream from '@/nex/byte-stream';
import SubscriptionData from '../types/subscription-data';
import type RMCMessage from '@/nex/rmc-message';
import type * as RMCs from '@/types/nex/rmcs/subscription/update-my-subscription-data';

export class Request {
	public static Name = 'UpdateMySubscriptionData';

	private param = new SubscriptionData();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.param.extractFrom(stream);
	}

	public toJSON(): RMCs.Request {
		return {
			param: this.param
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UpdateMySubscriptionData';

	constructor() {}

	public toJSON(): RMCs.Response {
		return {};
	}
}
