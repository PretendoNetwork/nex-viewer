import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import SubscriptionData from '../types/subscription-data';
import type RMCMessage from '@/nex/rmc-message';
import type * as RMCs from '@/types/nex/rmcs/subscription/get-target-subscription-data';

// * No request data
export class Request {
	public static Name = 'GetTargetSubscriptionData';

	constructor() {}

	public toJSON(): RMCs.Request {
		return {};
	}
}

export class Response {
	public static Name = 'GetTargetSubscriptionData';

	private subscriptionData = new List(new SubscriptionData());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.subscriptionData.extractFrom(stream);
	}

	public toJSON(): RMCs.Response {
		return {
			subscriptionData: this.subscriptionData
		};
	}
}
