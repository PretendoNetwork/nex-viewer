import NEXByteStream from '@/nex/byte-stream';
import Int32 from '@/nex/types/int32';
import List from '@/nex/types/list';
import NotificationEvent from '@/nex/protocols/notification-events/types/notification-event';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetFriendNotificationData';

	private uiType = new Int32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.uiType.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			uiType: this.uiType
		};
	}
}

export class Response {
	public static Name = 'GetFriendNotificationData';

	private dataList = new List(new NotificationEvent());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.dataList.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			dataList: this.dataList
		};
	}
}
