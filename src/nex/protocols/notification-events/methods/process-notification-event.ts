import NEXByteStream from '@/nex/byte-stream';
import NotificationEvent from '@/nex/protocols/notification-events/types/notification-event';
import type RMCMessage from '@/nex/rmc-message';
import type * as RMCs from '@/types/nex/rmcs/notification-events/process-notification-event';

export class Request {
	public static Name = 'ProcessNotificationEvent';

	private oEvent = new NotificationEvent();

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
