import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import type RMCMessage from '@/nex/rmc-message';
import type * as RMCs from '@/types/nex/rmcs/subscription/clear-my-subscription-data-with-notification-params';

export class Request {
	public static Name = 'ClearMySubscriptionDataWithNotificationParams';

	private unk1 = new UInt32();
	private unk2 = new UInt32();
	private strParam = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.unk1.extractFrom(stream);
		this.unk2.extractFrom(stream);
		this.strParam.extractFrom(stream);
	}

	public toJSON(): RMCs.Request {
		return {
			unk1: this.unk1,
			unk2: this.unk2,
			strParam: this.strParam
		};
	}
}

// * No response data
export class Response {
	public static Name = 'ClearMySubscriptionDataWithNotificationParams';

	constructor() {}

	public toJSON(): RMCs.Response {
		return {};
	}
}
