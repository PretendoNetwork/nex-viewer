import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/subscription/methods';
import AnyDataHolder from '@/nex/types/any-data-holder';
import SubscriptionData from '@/nex/protocols/subscription/types/subscription-data';
import ActivePlayerSubscriptionData from '@/nex/protocols/subscription/types/active-player-subscription-data';
import type PRUDPPacket from '@/types/nex/prudp-packet';

AnyDataHolder.Classes['SubscriptionData'] = SubscriptionData;
AnyDataHolder.Classes['ActivePlayerSubscriptionData'] = ActivePlayerSubscriptionData;

export default class SubscriptionProtocol {
	static ID = 0x75;
	static Name = 'Subscription';

	static Methods = {
		CreateMySubscriptionData: 0x1,
		UpdateMySubscriptionData: 0x2,
		ClearMySubscriptionData: 0x3,
		AddTarget: 0x4,
		DeleteTarget: 0x5,
		ClearTarget: 0x6,
		GetFriendSubscriptionData: 0x7,
		GetTargetSubscriptionData: 0x8,
		GetActivePlayerSubscriptionData: 0x9,
		GetSubscriptionData: 0xA,
		ReplaceTargetAndGetSubscriptionData: 0xB,
		SetPrivacyLevel: 0xC,
		GetPrivacyLevel: 0xD
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x1: SubscriptionProtocol.CreateMySubscriptionData,
		0x2: SubscriptionProtocol.UpdateMySubscriptionData,
		0x3: SubscriptionProtocol.ClearMySubscriptionData,
		0x4: SubscriptionProtocol.AddTarget,
		0x5: SubscriptionProtocol.DeleteTarget,
		0x6: SubscriptionProtocol.ClearTarget,
		0x7: SubscriptionProtocol.GetFriendSubscriptionData,
		0x8: SubscriptionProtocol.GetTargetSubscriptionData,
		0x9: SubscriptionProtocol.GetActivePlayerSubscriptionData,
		0xA: SubscriptionProtocol.GetSubscriptionData,
		0xB: SubscriptionProtocol.ReplaceTargetAndGetSubscriptionData,
		0xC: SubscriptionProtocol.SetPrivacyLevel,
		0xD: SubscriptionProtocol.GetPrivacyLevel
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = SubscriptionProtocol.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
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

	private static ClearMySubscriptionData(message: RMCMessage): typeof Methods.ClearMySubscriptionData.Request | typeof Methods.ClearMySubscriptionData.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ClearMySubscriptionData.Request;
		} else {
			return Methods.ClearMySubscriptionData.Response;
		}
	}

	private static AddTarget(message: RMCMessage): typeof Methods.AddTarget.Request | typeof Methods.AddTarget.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AddTarget.Request;
		} else {
			return Methods.AddTarget.Response;
		}
	}

	private static DeleteTarget(message: RMCMessage): typeof Methods.DeleteTarget.Request | typeof Methods.DeleteTarget.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeleteTarget.Request;
		} else {
			return Methods.DeleteTarget.Response;
		}
	}

	private static ClearTarget(message: RMCMessage): typeof Methods.ClearTarget.Request | typeof Methods.ClearTarget.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ClearTarget.Request;
		} else {
			return Methods.ClearTarget.Response;
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

	private static SetPrivacyLevel(message: RMCMessage): typeof Methods.SetPrivacyLevel.Request | typeof Methods.SetPrivacyLevel.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SetPrivacyLevel.Request;
		} else {
			return Methods.SetPrivacyLevel.Response;
		}
	}

	private static GetPrivacyLevel(message: RMCMessage): typeof Methods.GetPrivacyLevel.Request | typeof Methods.GetPrivacyLevel.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetPrivacyLevel.Request;
		} else {
			return Methods.GetPrivacyLevel.Response;
		}
	}
}
