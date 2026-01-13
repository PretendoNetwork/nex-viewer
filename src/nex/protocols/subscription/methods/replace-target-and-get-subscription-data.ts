import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import PID from '@/nex/types/pid';
import SubscriptionData from '../types/subscription-data';
import type RMCMessage from '@/nex/rmc-message';
import type * as RMCs from '@/types/nex/rmcs/subscription/replace-target-and-get-subscription-data';

export class Request {
	public static Name = 'ReplaceTargetAndGetSubscriptionData';

	private newTargetPids = new List(new PID());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.newTargetPids.extractFrom(stream);
	}

	public toJSON(): RMCs.Request {
		return {
			newTargetPids: this.newTargetPids
		};
	}
}

export class Response {
	public static Name = 'ReplaceTargetAndGetSubscriptionData';

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
