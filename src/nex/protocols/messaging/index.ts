import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/messaging/methods';
import AnyDataHolder from '@/nex/types/any-data-holder';
import UserMessage from '@/nex/protocols/messaging/types/user-message';
import TextMessage from '@/nex/protocols/messaging/types/text-message';
import BinaryMessage from '@/nex/protocols/messaging/types/binary-message';
import type PRUDPPacket from '@/types/nex/prudp-packet';

AnyDataHolder.Classes['UserMessage'] = UserMessage;
AnyDataHolder.Classes['TextMessage'] = TextMessage;
AnyDataHolder.Classes['BinaryMessage'] = BinaryMessage;

export default class MessagingProtocol {
	static ID = 0x17;
	static Name = 'Messaging';

	static Methods = {
		DeliverMessage: 0x1,
		GetNumberOfMessages: 0x2,
		GetMessagesHeaders: 0x3,
		RetrieveAllMessagesWithinRange: 0x4,
		RetrieveMessages: 0x5,
		DeleteMessages: 0x6,
		DeleteAllMessages: 0x7,
		DeliverMessageMultiTarget: 0x8
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x01: MessagingProtocol.DeliverMessage,
		0x02: MessagingProtocol.GetNumberOfMessages,
		0x03: MessagingProtocol.GetMessagesHeaders,
		0x04: MessagingProtocol.RetrieveAllMessagesWithinRange,
		0x05: MessagingProtocol.RetrieveMessages,
		0x06: MessagingProtocol.DeleteMessages,
		0x07: MessagingProtocol.DeleteAllMessages,
		0x08: MessagingProtocol.DeliverMessageMultiTarget
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = MessagingProtocol.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static DeliverMessage(message: RMCMessage): typeof Methods.DeliverMessage.Request | typeof Methods.DeliverMessage.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeliverMessage.Request;
		} else {
			return Methods.DeliverMessage.Response;
		}
	}

	private static GetNumberOfMessages(message: RMCMessage): typeof Methods.GetNumberOfMessages.Request | typeof Methods.GetNumberOfMessages.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetNumberOfMessages.Request;
		} else {
			return Methods.GetNumberOfMessages.Response;
		}
	}

	private static GetMessagesHeaders(message: RMCMessage): typeof Methods.GetMessagesHeaders.Request | typeof Methods.GetMessagesHeaders.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetMessagesHeaders.Request;
		} else {
			return Methods.GetMessagesHeaders.Response;
		}
	}

	private static RetrieveAllMessagesWithinRange(message: RMCMessage): typeof Methods.RetrieveAllMessagesWithinRange.Request | typeof Methods.RetrieveAllMessagesWithinRange.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RetrieveAllMessagesWithinRange.Request;
		} else {
			return Methods.RetrieveAllMessagesWithinRange.Response;
		}
	}

	private static RetrieveMessages(message: RMCMessage): typeof Methods.RetrieveMessages.Request | typeof Methods.RetrieveMessages.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RetrieveMessages.Request;
		} else {
			return Methods.RetrieveMessages.Response;
		}
	}

	private static DeleteMessages(message: RMCMessage): typeof Methods.DeleteMessages.Request | typeof Methods.DeleteMessages.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeleteMessages.Request;
		} else {
			return Methods.DeleteMessages.Response;
		}
	}

	private static DeleteAllMessages(message: RMCMessage): typeof Methods.DeleteAllMessages.Request | typeof Methods.DeleteAllMessages.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeleteAllMessages.Request;
		} else {
			return Methods.DeleteAllMessages.Response;
		}
	}

	private static DeliverMessageMultiTarget(message: RMCMessage): typeof Methods.DeliverMessageMultiTarget.Request | typeof Methods.DeliverMessageMultiTarget.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeliverMessageMultiTarget.Request;
		} else {
			return Methods.DeliverMessageMultiTarget.Response;
		}
	}
}
