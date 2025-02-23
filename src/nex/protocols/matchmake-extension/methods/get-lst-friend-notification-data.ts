import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import UInt32 from '@/nex/types/uint32';
import NotificationEvent from '@/nex/protocols/notification-events/types/notification-event';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetlstFriendNotificationData';

	private lstTypes = new List(new UInt32());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.lstTypes.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			lstTypes: this.lstTypes
		};
	}
}

export class Response {
	public static Name = 'GetlstFriendNotificationData';

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
