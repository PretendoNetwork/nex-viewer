import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import UInt32 from '@/nex/types/uint32';
import ActivePlayerSubscriptionData from '../types/active-player-subscription-data';
import type * as RMCs from '@/types/nex/rmcs/subscription/get-active-player-subscription-data';
import type RMCMessage from '@/nex/rmc-message';

export class Request {
	public static Name = 'GetActivePlayerSubscriptionData';

	private uiUnk1 = new UInt32();
	private uiUnk2 = new UInt32();
	private uiUnk3 = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.uiUnk1.extractFrom(stream);
		this.uiUnk2.extractFrom(stream);
		this.uiUnk3.extractFrom(stream);
	}

	public toJSON(): RMCs.Request {
		return {
			uiUnk1: this.uiUnk1,
			uiUnk2: this.uiUnk2,
			uiUnk3: this.uiUnk3
		};
	}
}

export class Response {
	public static Name = 'GetActivePlayerSubscriptionData';

	private subscriptionDatas = new List(new ActivePlayerSubscriptionData());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.subscriptionDatas.extractFrom(stream);
	}

	public toJSON(): RMCs.Response {
		return {
			subscriptionDatas: this.subscriptionDatas
		};
	}
}
