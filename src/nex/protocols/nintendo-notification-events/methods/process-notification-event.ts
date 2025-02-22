import NEXByteStream from '@/nex/byte-stream';
import NintendoNotificationEvent from '@/nex/protocols/nintendo-notification-events/types/nintendo-notification-event';
import type RMCMessage from '@/nex/rmc-message';
import type * as RMCs from '@/types/nex/rmcs/nintendo-notification-events/process-notification-event';

export class Request {
	public static Name = 'ProcessNotificationEvent';

	private oEvent = new NintendoNotificationEvent();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.oEvent.extractFrom(stream);
	}

	public toJSON(): RMCs.Request {
		return {
			oEvent: this.oEvent
		};
	}
}

// * No response data
export class Response {
	public static Name = 'ProcessNotificationEvent';

	constructor() {}

	public toJSON(): RMCs.Response {
		return {};
	}
}