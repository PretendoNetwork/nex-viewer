import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import PID from '@/nex/types/pid';
import type RMCMessage from '@/nex/rmc-message';
// import type * as RMCs from '@/types/nex/rmcs/subscription/get-subscription-user-friend-list';

// * No request data
export class Request {
	public static Name = 'GetSubscriptionUserFriendList';

	constructor() {}

	// public toJSON(): RMCs.Request {
	// 	return {};
	// }
}

export class Response {
	public static Name = 'GetSubscriptionUserFriendList';

	private subscriptionData = new List(new PID());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.subscriptionData.extractFrom(stream);
	}

	// public toJSON(): RMCs.Response {
	// 	return {
	// 		subscriptionData: this.subscriptionData
	// 	};
	// }
}
