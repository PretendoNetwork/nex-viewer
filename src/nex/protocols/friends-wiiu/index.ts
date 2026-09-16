import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/friends-wiiu/methods';
import AnyDataHolder from '@/nex/types/any-data-holder';
import BlacklistedPrincipal from '@/nex/protocols/friends-wiiu/types/blacklisted-principal';
import Comment from '@/nex/protocols/friends-wiiu/types/comment';
import FriendInfo from '@/nex/protocols/friends-wiiu/types/friend-info';
import FriendRequestMessage from '@/nex/protocols/friends-wiiu/types/friend-request-message';
import FriendRequest from '@/nex/protocols/friends-wiiu/types/friend-request';
import GameKey from '@/nex/protocols/friends-wiiu/types/game-key';
import MiiV2 from '@/nex/protocols/friends-wiiu/types/mii-v2';
import NintendoPresenceV2 from '@/nex/protocols/friends-wiiu/types/nintendo-presence-v2';
import NNAInfo from '@/nex/protocols/friends-wiiu/types/nna-info';
import PersistentNotificationList from '@/nex/protocols/friends-wiiu/types/persistent-notification-list';
import PersistentNotification from '@/nex/protocols/friends-wiiu/types/persistent-notification';
import PrincipalBasicInfo from '@/nex/protocols/friends-wiiu/types/principal-basic-info';
import PrincipalPreference from '@/nex/protocols/friends-wiiu/types/principal-preference';
import PrincipalRequestBlockSetting from '@/nex/protocols/friends-wiiu/types/principal-request-block-setting';
import type PRUDPPacket from '@/types/nex/prudp-packet';

AnyDataHolder.Classes['BlacklistedPrincipal'] = BlacklistedPrincipal;
AnyDataHolder.Classes['Comment'] = Comment;
AnyDataHolder.Classes['FriendInfo'] = FriendInfo;
AnyDataHolder.Classes['FriendRequestMessage'] = FriendRequestMessage;
AnyDataHolder.Classes['FriendRequest'] = FriendRequest;
AnyDataHolder.Classes['GameKey'] = GameKey;
AnyDataHolder.Classes['MiiV2'] = MiiV2;
AnyDataHolder.Classes['NintendoPresenceV2'] = NintendoPresenceV2;
AnyDataHolder.Classes['NNAInfo'] = NNAInfo;
AnyDataHolder.Classes['PersistentNotificationList'] = PersistentNotificationList;
AnyDataHolder.Classes['PersistentNotification'] = PersistentNotification;
AnyDataHolder.Classes['PrincipalBasicInfo'] = PrincipalBasicInfo;
AnyDataHolder.Classes['PrincipalPreference'] = PrincipalPreference;
AnyDataHolder.Classes['PrincipalRequestBlockSetting'] = PrincipalRequestBlockSetting;

export default class FriendsWiiUProtocol {
	static ID = 0x66;
	static Name = 'FriendsWiiU';

	static Methods = {
		UpdateAndGetAllInformation: 0x1,
		AddFriend: 0x2,
		AddFriendByName: 0x3,
		RemoveFriend: 0x4,
		AddFriendRequest: 0x5,
		CancelFriendRequest: 0x6,
		AcceptFriendRequest: 0x7,
		DeleteFriendRequest: 0x8,
		DenyFriendRequest: 0x9,
		MarkFriendRequestsAsReceived: 0xA,
		AddBlackList: 0xB,
		RemoveBlackList: 0xC,
		UpdatePresence: 0xD,
		UpdateMii: 0xE,
		UpdateComment: 0xF,
		UpdatePreference: 0x10,
		GetBasicInfo: 0x11,
		DeletePersistentNotification: 0x12,
		CheckSettingStatus: 0x13,
		GetRequestBlockSettings: 0x14
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x1: FriendsWiiUProtocol.UpdateAndGetAllInformation,
		0x2: FriendsWiiUProtocol.AddFriend,
		0x3: FriendsWiiUProtocol.AddFriendByName,
		0x4: FriendsWiiUProtocol.RemoveFriend,
		0x5: FriendsWiiUProtocol.AddFriendRequest,
		0x6: FriendsWiiUProtocol.CancelFriendRequest,
		0x7: FriendsWiiUProtocol.AcceptFriendRequest,
		0x8: FriendsWiiUProtocol.DeleteFriendRequest,
		0x9: FriendsWiiUProtocol.DenyFriendRequest,
		0xA: FriendsWiiUProtocol.MarkFriendRequestsAsReceived,
		0xB: FriendsWiiUProtocol.AddBlackList,
		0xC: FriendsWiiUProtocol.RemoveBlackList,
		0xD: FriendsWiiUProtocol.UpdatePresence,
		0xE: FriendsWiiUProtocol.UpdateMii,
		0xF: FriendsWiiUProtocol.UpdateComment,
		0x10: FriendsWiiUProtocol.UpdatePreference,
		0x11: FriendsWiiUProtocol.GetBasicInfo,
		0x12: FriendsWiiUProtocol.DeletePersistentNotification,
		0x13: FriendsWiiUProtocol.CheckSettingStatus,
		0x14: FriendsWiiUProtocol.GetRequestBlockSettings
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = FriendsWiiUProtocol.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static UpdateAndGetAllInformation(message: RMCMessage): typeof Methods.UpdateAndGetAllInformation.Request | typeof Methods.UpdateAndGetAllInformation.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateAndGetAllInformation.Request;
		} else {
			return Methods.UpdateAndGetAllInformation.Response;
		}
	}

	private static AddFriend(message: RMCMessage): typeof Methods.AddFriend.Request | typeof Methods.AddFriend.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AddFriend.Request;
		} else {
			return Methods.AddFriend.Response;
		}
	}

	private static AddFriendByName(message: RMCMessage): typeof Methods.AddFriendByName.Request | typeof Methods.AddFriendByName.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AddFriendByName.Request;
		} else {
			return Methods.AddFriendByName.Response;
		}
	}

	private static RemoveFriend(message: RMCMessage): typeof Methods.RemoveFriend.Request | typeof Methods.RemoveFriend.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RemoveFriend.Request;
		} else {
			return Methods.RemoveFriend.Response;
		}
	}

	private static AddFriendRequest(message: RMCMessage): typeof Methods.AddFriendRequest.Request | typeof Methods.AddFriendRequest.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AddFriendRequest.Request;
		} else {
			return Methods.AddFriendRequest.Response;
		}
	}

	private static CancelFriendRequest(message: RMCMessage): typeof Methods.CancelFriendRequest.Request | typeof Methods.CancelFriendRequest.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CancelFriendRequest.Request;
		} else {
			return Methods.CancelFriendRequest.Response;
		}
	}

	private static AcceptFriendRequest(message: RMCMessage): typeof Methods.AcceptFriendRequest.Request | typeof Methods.AcceptFriendRequest.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AcceptFriendRequest.Request;
		} else {
			return Methods.AcceptFriendRequest.Response;
		}
	}

	private static DeleteFriendRequest(message: RMCMessage): typeof Methods.DeleteFriendRequest.Request | typeof Methods.DeleteFriendRequest.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeleteFriendRequest.Request;
		} else {
			return Methods.DeleteFriendRequest.Response;
		}
	}

	private static DenyFriendRequest(message: RMCMessage): typeof Methods.DenyFriendRequest.Request | typeof Methods.DenyFriendRequest.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DenyFriendRequest.Request;
		} else {
			return Methods.DenyFriendRequest.Response;
		}
	}

	private static MarkFriendRequestsAsReceived(message: RMCMessage): typeof Methods.MarkFriendRequestsAsReceived.Request | typeof Methods.MarkFriendRequestsAsReceived.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.MarkFriendRequestsAsReceived.Request;
		} else {
			return Methods.MarkFriendRequestsAsReceived.Response;
		}
	}

	private static AddBlackList(message: RMCMessage): typeof Methods.AddBlackList.Request | typeof Methods.AddBlackList.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AddBlackList.Request;
		} else {
			return Methods.AddBlackList.Response;
		}
	}

	private static RemoveBlackList(message: RMCMessage): typeof Methods.RemoveBlackList.Request | typeof Methods.RemoveBlackList.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RemoveBlackList.Request;
		} else {
			return Methods.RemoveBlackList.Response;
		}
	}

	private static UpdatePresence(message: RMCMessage): typeof Methods.UpdatePresence.Request | typeof Methods.UpdatePresence.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdatePresence.Request;
		} else {
			return Methods.UpdatePresence.Response;
		}
	}

	private static UpdateMii(message: RMCMessage): typeof Methods.UpdateMii.Request | typeof Methods.UpdateMii.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateMii.Request;
		} else {
			return Methods.UpdateMii.Response;
		}
	}

	private static UpdateComment(message: RMCMessage): typeof Methods.UpdateComment.Request | typeof Methods.UpdateComment.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateComment.Request;
		} else {
			return Methods.UpdateComment.Response;
		}
	}

	private static UpdatePreference(message: RMCMessage): typeof Methods.UpdatePreference.Request | typeof Methods.UpdatePreference.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdatePreference.Request;
		} else {
			return Methods.UpdatePreference.Response;
		}
	}

	private static GetBasicInfo(message: RMCMessage): typeof Methods.GetBasicInfo.Request | typeof Methods.GetBasicInfo.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetBasicInfo.Request;
		} else {
			return Methods.GetBasicInfo.Response;
		}
	}

	private static DeletePersistentNotification(message: RMCMessage): typeof Methods.DeletePersistentNotification.Request | typeof Methods.DeletePersistentNotification.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeletePersistentNotification.Request;
		} else {
			return Methods.DeletePersistentNotification.Response;
		}
	}

	private static CheckSettingStatus(message: RMCMessage): typeof Methods.CheckSettingStatus.Request | typeof Methods.CheckSettingStatus.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CheckSettingStatus.Request;
		} else {
			return Methods.CheckSettingStatus.Response;
		}
	}

	private static GetRequestBlockSettings(message: RMCMessage): typeof Methods.GetRequestBlockSettings.Request | typeof Methods.GetRequestBlockSettings.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetRequestBlockSettings.Request;
		} else {
			return Methods.GetRequestBlockSettings.Response;
		}
	}
}
