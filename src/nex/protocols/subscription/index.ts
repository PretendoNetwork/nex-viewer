import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/subscription/methods';
import type Packet from '@/types/nex/packet';

export default class Subscription {
	static ID = 0x75;
	static Name = 'Subscription';

	static Methods = {
		CreateMySubscriptionData: 0x1,
		UpdateMySubscriptionData: 0x2,
		GetFriendSubscriptionData: 0x7,
		GetTargetSubscriptionData: 0x8,
		GetActivePlayerSubscriptionData: 0x9,
		GetSubscriptionData: 0xA,
		ReplaceTargetAndGetSubscriptionData: 0xB,
		// xenoblade
		GetSubscriptionUserFriendList: 0xE,
		GetPrivacyLevels: 0xF,
		CreateMySubscriptionDataWithNotificationParams: 0x10,
		UpdateMySubscriptionDataWithNotificationParams: 0x11,
		ClearMySubscriptionDataWithNotificationParams: 0x12
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x1: Subscription.CreateMySubscriptionData,
		0x2: Subscription.UpdateMySubscriptionData,
		0x7: Subscription.GetFriendSubscriptionData,
		0x8: Subscription.GetTargetSubscriptionData,
		0x9: Subscription.GetActivePlayerSubscriptionData,
		0xA: Subscription.GetSubscriptionData,
		0xB: Subscription.ReplaceTargetAndGetSubscriptionData,
		// 0xE: Subscription.GetSubscriptionUserFriendList,
		// 0xF: Subscription.GetPrivacyLevels,
		0x10: Subscription.CreateMySubscriptionDataWithNotificationParams,
		0x11: Subscription.UpdateMySubscriptionDataWithNotificationParams
		// 0x12: Subscription.ClearMySubscriptionDataWithNotificationParams
	};

	static handlePacket(packet: Packet): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = Subscription.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.parameters = new messageDecoder(packet.message);
		packet.message.methodName = messageDecoder.Name;
	}

	private static CreateMySubscriptionData(message: RMCMessage): typeof Methods.CreateMySubscriptionData.Request | typeof Methods.CreateMySubscriptionData.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CreateMySubscriptionData.Request;
		} else {
			return Methods.CreateMySubscriptionData.Response;
		}
	}

	private static UpdateMySubscriptionData(message: RMCMessage): typeof Methods.UpdateMySubscriptionData.Request | typeof Methods.UpdateMySubscriptionData.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateMySubscriptionData.Request;
		} else {
			return Methods.UpdateMySubscriptionData.Response;
		}
	}

	private static GetFriendSubscriptionData(message: RMCMessage): typeof Methods.GetFriendSubscriptionData.Request | typeof Methods.GetFriendSubscriptionData.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetFriendSubscriptionData.Request;
		} else {
			return Methods.GetFriendSubscriptionData.Response;
		}
	}

	private static GetTargetSubscriptionData(message: RMCMessage): typeof Methods.GetTargetSubscriptionData.Request | typeof Methods.GetTargetSubscriptionData.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetTargetSubscriptionData.Request;
		} else {
			return Methods.GetTargetSubscriptionData.Response;
		}
	}

	private static GetActivePlayerSubscriptionData(message: RMCMessage): typeof Methods.GetActivePlayerSubscriptionData.Request | typeof Methods.GetActivePlayerSubscriptionData.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetActivePlayerSubscriptionData.Request;
		} else {
			return Methods.GetActivePlayerSubscriptionData.Response;
		}
	}

	private static GetSubscriptionData(message: RMCMessage): typeof Methods.GetSubscriptionData.Request | typeof Methods.GetSubscriptionData.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetSubscriptionData.Request;
		} else {
			return Methods.GetSubscriptionData.Response;
		}
	}

	private static ReplaceTargetAndGetSubscriptionData(message: RMCMessage): typeof Methods.ReplaceTargetAndGetSubscriptionData.Request | typeof Methods.ReplaceTargetAndGetSubscriptionData.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ReplaceTargetAndGetSubscriptionData.Request;
		} else {
			return Methods.ReplaceTargetAndGetSubscriptionData.Response;
		}
	}

	private static CreateMySubscriptionDataWithNotificationParams(message: RMCMessage): typeof Methods.CreateMySubscriptionDataWithNotificationParams.Request | typeof Methods.CreateMySubscriptionDataWithNotificationParams.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CreateMySubscriptionDataWithNotificationParams.Request;
		} else {
			return Methods.CreateMySubscriptionDataWithNotificationParams.Response;
		}
	}

	private static UpdateMySubscriptionDataWithNotificationParams(message: RMCMessage): typeof Methods.UpdateMySubscriptionDataWithNotificationParams.Request | typeof Methods.UpdateMySubscriptionDataWithNotificationParams.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateMySubscriptionDataWithNotificationParams.Request;
		} else {
			return Methods.UpdateMySubscriptionDataWithNotificationParams.Response;
		}
	}
}
