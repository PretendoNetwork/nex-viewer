import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import SubscriptionData from '../types/subscription-data';
import type RMCMessage from '@/nex/rmc-message';
import type * as RMCs from '@/types/nex/rmcs/subscription/get-friend-subscription-data';

// * No request data
export class Request {
	public static Name = 'GetFriendSubscriptionData';

	constructor() {}

	public toJSON(): RMCs.Request {
		return {};
	}
}

export class Response {
	public static Name = 'GetFriendSubscriptionData';

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
