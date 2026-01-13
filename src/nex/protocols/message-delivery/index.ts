import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/message-delivery/methods';
import type Packet from '@/types/nex/packet';

import '@/nex/protocols/messaging/types/binary-message';
import '@/nex/protocols/messaging/types/text-message';

export default class MessageDelivery {
	static ID = 0x1B;
	static Name = 'MessageDelivery';

	static Methods = {
		DeliverMessage: 0x1
		// DeliverMessageMultiTarget: 0x2
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x1: MessageDelivery.DeliverMessage
		// 0x2: MessageDelivery.DeliverMessageMultiTarget
	};

	static handlePacket(packet: Packet): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = MessageDelivery.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.parameters = new messageDecoder(packet.message);
		packet.message.methodName = messageDecoder.Name;
	}

	private static DeliverMessage(message: RMCMessage): typeof Methods.DeliverMessage.Request | typeof Methods.DeliverMessage.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeliverMessage.Request;
		} else {
			return Methods.DeliverMessage.Response;
		}
	}
}
