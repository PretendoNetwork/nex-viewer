import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/nintendo-notification-events/methods';
import AnyDataHolder from '@/nex/types/any-data-holder';
import NintendoNotificationEventGeneral from '@/nex/protocols/nintendo-notification-events/types/nintendo-notification-event-general';
import NintendoNotificationEventProfile from '@/nex/protocols/nintendo-notification-events/types/nintendo-notification-event-profile';
import type PRUDPPacket from '@/types/nex/prudp-packet';

AnyDataHolder.Classes['NintendoNotificationEventGeneral'] = NintendoNotificationEventGeneral;
AnyDataHolder.Classes['NintendoNotificationEventProfile'] = NintendoNotificationEventProfile;

export default class NintendoNotificationEventsProtocol {
	static ID = 0x64;
	static Name = 'NintendoNotificationEvents';

	static Methods = {
		ProcessNintendoNotificationEvent1: 0x1,
		ProcessNintendoNotificationEvent2: 0x2
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x1: NintendoNotificationEventsProtocol.ProcessNintendoNotificationEvent1,
		0x2: NintendoNotificationEventsProtocol.ProcessNintendoNotificationEvent2
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = NintendoNotificationEventsProtocol.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static ProcessNintendoNotificationEvent1(message: RMCMessage): typeof Methods.ProcessNintendoNotificationEvent1.Request | typeof Methods.ProcessNintendoNotificationEvent1.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ProcessNintendoNotificationEvent1.Request;
		} else {
			return Methods.ProcessNintendoNotificationEvent1.Response;
		}
	}

	private static ProcessNintendoNotificationEvent2(message: RMCMessage): typeof Methods.ProcessNintendoNotificationEvent2.Request | typeof Methods.ProcessNintendoNotificationEvent2.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ProcessNintendoNotificationEvent2.Request;
		} else {
			return Methods.ProcessNintendoNotificationEvent2.Response;
		}
	}
}
