import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import Bool from '@/nex/types/bool';
import RVString from '@/nex/types/string';
import SubscriptionData from '../types/subscription-data';
import type RMCMessage from '@/nex/rmc-message';
import type * as RMCs from '@/types/nex/rmcs/subscription/create-my-subscription-data-with-notification-params';

export class Request {
	public static Name = 'CreateMySubscriptionDataWithNotificationParams';

	private unk1 = new UInt32();
	private param = new SubscriptionData();
	private bUnk = new Bool();
	private unk2 = new UInt32();
	private unk3 = new UInt32();
	private strParam = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.unk1.extractFrom(stream);
		this.param.extractFrom(stream);
		this.bUnk.extractFrom(stream);
		this.unk2.extractFrom(stream);
		this.unk3.extractFrom(stream);
		this.strParam.extractFrom(stream);
	}

	public toJSON(): RMCs.Request {
		return {
			unk1: this.unk1,
			param: this.param,
			bUnk: this.bUnk,
			unk2: this.unk2,
			unk3: this.unk3,
			strParam: this.strParam
		};
	}
}

// * No response data
export class Response {
	public static Name = 'CreateMySubscriptionDataWithNotificationParams';

	constructor() {}

	public toJSON(): RMCs.Response {
		return {};
	}
}
