import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/notification-events/methods';
import type Packet from '@/types/nex/packet';

export default class NotificationEventsProtocol {
	static ID = 0xE;
	static Name = 'NotificationEvents';

	static Methods = {
		ProcessNotificationEvent: 0x1
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x1: NotificationEventsProtocol.ProcessNotificationEvent
	};

	static handlePacket(packet: Packet): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = NotificationEventsProtocol.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.parameters = new messageDecoder(packet.message);
		packet.message.methodName = messageDecoder.Name;
	}

	private static ProcessNotificationEvent(message: RMCMessage): typeof Methods.ProcessNotificationEvent.Request | typeof Methods.ProcessNotificationEvent.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ProcessNotificationEvent.Request;
		} else {
			return Methods.ProcessNotificationEvent.Response;
		}
	}
}
