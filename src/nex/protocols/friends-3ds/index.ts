import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/friends-3ds/methods';
import AnyDataHolder from '@/nex/types/any-data-holder';
import FriendComment from '@/nex/protocols/friends-3ds/types/friend-comment';
import FriendInfo from '@/nex/protocols/friends-3ds/types/friend-info';
import FriendMiiList from '@/nex/protocols/friends-3ds/types/friend-mii-list';
import FriendMii from '@/nex/protocols/friends-3ds/types/friend-mii';
import FriendPersistentInfo from '@/nex/protocols/friends-3ds/types/friend-persistent-info';
import FriendPicture from '@/nex/protocols/friends-3ds/types/friend-picture';
import FriendPresence from '@/nex/protocols/friends-3ds/types/friend-presence';
import FriendRelationship from '@/nex/protocols/friends-3ds/types/friend-relationship';
import GameKey from '@/nex/protocols/friends-3ds/types/game-key';
import MiiList from '@/nex/protocols/friends-3ds/types/mii-list';
import Mii from '@/nex/protocols/friends-3ds/types/mii';
import MyProfile from '@/nex/protocols/friends-3ds/types/my-profile';
import NintendoPresence from '@/nex/protocols/friends-3ds/types/nintendo-presence';
import PlayedGame from '@/nex/protocols/friends-3ds/types/played-game';
import type PRUDPPacket from '@/types/nex/prudp-packet';

AnyDataHolder.Classes['FriendComment'] = FriendComment;
AnyDataHolder.Classes['FriendInfo'] = FriendInfo;
AnyDataHolder.Classes['FriendMiiList'] = FriendMiiList;
AnyDataHolder.Classes['FriendMii'] = FriendMii;
AnyDataHolder.Classes['FriendPersistentInfo'] = FriendPersistentInfo;
AnyDataHolder.Classes['FriendPicture'] = FriendPicture;
AnyDataHolder.Classes['FriendPresence'] = FriendPresence;
AnyDataHolder.Classes['FriendRelationship'] = FriendRelationship;
AnyDataHolder.Classes['GameKey'] = GameKey;
AnyDataHolder.Classes['MiiList'] = MiiList;
AnyDataHolder.Classes['Mii'] = Mii;
AnyDataHolder.Classes['MyProfile'] = MyProfile;
AnyDataHolder.Classes['NintendoPresence'] = NintendoPresence;
AnyDataHolder.Classes['PlayedGame'] = PlayedGame;

export default class Friends3DSProtocol {
	static ID = 0x65;
	static Name = 'Friends3DS';

	static Methods = {
		UpdateProfile: 0x1,
		UpdateMii: 0x2,
		UpdateMiiList: 0x3,
		UpdatePlayedGames: 0x4,
		UpdatePreference: 0x5,
		GetFriendMii: 0x6,
		GetFriendMiiList: 0x7,
		IsActiveGame: 0x8,
		GetPrincipalIDByLocalFriendCode: 0x9,
		GetFriendRelationships: 0xA,
		AddFriendByPrincipalID: 0xB,
		AddFriendBylstPrincipalID: 0xC,
		RemoveFriendByLocalFriendCode: 0xD,
		RemoveFriendByPrincipalID: 0xE,
		GetAllFriends: 0xF,
		UpdateBlackList: 0x10,
		SyncFriend: 0x11,
		UpdatePresence: 0x12,
		UpdateFavoriteGameKey: 0x13,
		UpdateComment: 0x14,
		UpdatePicture: 0x15,
		GetFriendPresence: 0x16,
		GetFriendComment: 0x17,
		GetFriendPicture: 0x18,
		GetFriendPersistentInfo: 0x19,
		SendInvitation: 0x1A
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x1: Friends3DSProtocol.UpdateProfile,
		0x2: Friends3DSProtocol.UpdateMii,
		0x3: Friends3DSProtocol.UpdateMiiList,
		0x4: Friends3DSProtocol.UpdatePlayedGames,
		0x5: Friends3DSProtocol.UpdatePreference,
		0x6: Friends3DSProtocol.GetFriendMii,
		0x7: Friends3DSProtocol.GetFriendMiiList,
		0x8: Friends3DSProtocol.IsActiveGame,
		0x9: Friends3DSProtocol.GetPrincipalIDByLocalFriendCode,
		0xA: Friends3DSProtocol.GetFriendRelationships,
		0xB: Friends3DSProtocol.AddFriendByPrincipalID,
		0xC: Friends3DSProtocol.AddFriendBylstPrincipalID,
		0xD: Friends3DSProtocol.RemoveFriendByLocalFriendCode,
		0xE: Friends3DSProtocol.RemoveFriendByPrincipalID,
		0xF: Friends3DSProtocol.GetAllFriends,
		0x10: Friends3DSProtocol.UpdateBlackList,
		0x11: Friends3DSProtocol.SyncFriend,
		0x12: Friends3DSProtocol.UpdatePresence,
		0x13: Friends3DSProtocol.UpdateFavoriteGameKey,
		0x14: Friends3DSProtocol.UpdateComment,
		0x15: Friends3DSProtocol.UpdatePicture,
		0x16: Friends3DSProtocol.GetFriendPresence,
		0x17: Friends3DSProtocol.GetFriendComment,
		0x18: Friends3DSProtocol.GetFriendPicture,
		0x19: Friends3DSProtocol.GetFriendPersistentInfo,
		0x1A: Friends3DSProtocol.SendInvitation
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = Friends3DSProtocol.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static UpdateProfile(message: RMCMessage): typeof Methods.UpdateProfile.Request | typeof Methods.UpdateProfile.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateProfile.Request;
		} else {
			return Methods.UpdateProfile.Response;
		}
	}

	private static UpdateMii(message: RMCMessage): typeof Methods.UpdateMii.Request | typeof Methods.UpdateMii.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateMii.Request;
		} else {
			return Methods.UpdateMii.Response;
		}
	}

	private static UpdateMiiList(message: RMCMessage): typeof Methods.UpdateMiiList.Request | typeof Methods.UpdateMiiList.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateMiiList.Request;
		} else {
			return Methods.UpdateMiiList.Response;
		}
	}

	private static UpdatePlayedGames(message: RMCMessage): typeof Methods.UpdatePlayedGames.Request | typeof Methods.UpdatePlayedGames.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdatePlayedGames.Request;
		} else {
			return Methods.UpdatePlayedGames.Response;
		}
	}

	private static UpdatePreference(message: RMCMessage): typeof Methods.UpdatePreference.Request | typeof Methods.UpdatePreference.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdatePreference.Request;
		} else {
			return Methods.UpdatePreference.Response;
		}
	}

	private static GetFriendMii(message: RMCMessage): typeof Methods.GetFriendMii.Request | typeof Methods.GetFriendMii.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetFriendMii.Request;
		} else {
			return Methods.GetFriendMii.Response;
		}
	}

	private static GetFriendMiiList(message: RMCMessage): typeof Methods.GetFriendMiiList.Request | typeof Methods.GetFriendMiiList.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetFriendMiiList.Request;
		} else {
			return Methods.GetFriendMiiList.Response;
		}
	}

	private static IsActiveGame(message: RMCMessage): typeof Methods.IsActiveGame.Request | typeof Methods.IsActiveGame.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.IsActiveGame.Request;
		} else {
			return Methods.IsActiveGame.Response;
		}
	}

	private static GetPrincipalIDByLocalFriendCode(message: RMCMessage): typeof Methods.GetPrincipalIDByLocalFriendCode.Request | typeof Methods.GetPrincipalIDByLocalFriendCode.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetPrincipalIDByLocalFriendCode.Request;
		} else {
			return Methods.GetPrincipalIDByLocalFriendCode.Response;
		}
	}

	private static GetFriendRelationships(message: RMCMessage): typeof Methods.GetFriendRelationships.Request | typeof Methods.GetFriendRelationships.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetFriendRelationships.Request;
		} else {
			return Methods.GetFriendRelationships.Response;
		}
	}

	private static AddFriendByPrincipalID(message: RMCMessage): typeof Methods.AddFriendByPrincipalID.Request | typeof Methods.AddFriendByPrincipalID.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AddFriendByPrincipalID.Request;
		} else {
			return Methods.AddFriendByPrincipalID.Response;
		}
	}

	private static AddFriendBylstPrincipalID(message: RMCMessage): typeof Methods.AddFriendBylstPrincipalID.Request | typeof Methods.AddFriendBylstPrincipalID.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AddFriendBylstPrincipalID.Request;
		} else {
			return Methods.AddFriendBylstPrincipalID.Response;
		}
	}

	private static RemoveFriendByLocalFriendCode(message: RMCMessage): typeof Methods.RemoveFriendByLocalFriendCode.Request | typeof Methods.RemoveFriendByLocalFriendCode.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RemoveFriendByLocalFriendCode.Request;
		} else {
			return Methods.RemoveFriendByLocalFriendCode.Response;
		}
	}

	private static RemoveFriendByPrincipalID(message: RMCMessage): typeof Methods.RemoveFriendByPrincipalID.Request | typeof Methods.RemoveFriendByPrincipalID.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RemoveFriendByPrincipalID.Request;
		} else {
			return Methods.RemoveFriendByPrincipalID.Response;
		}
	}

	private static GetAllFriends(message: RMCMessage): typeof Methods.GetAllFriends.Request | typeof Methods.GetAllFriends.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetAllFriends.Request;
		} else {
			return Methods.GetAllFriends.Response;
		}
	}

	private static UpdateBlackList(message: RMCMessage): typeof Methods.UpdateBlackList.Request | typeof Methods.UpdateBlackList.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateBlackList.Request;
		} else {
			return Methods.UpdateBlackList.Response;
		}
	}

	private static SyncFriend(message: RMCMessage): typeof Methods.SyncFriend.Request | typeof Methods.SyncFriend.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SyncFriend.Request;
		} else {
			return Methods.SyncFriend.Response;
		}
	}

	private static UpdatePresence(message: RMCMessage): typeof Methods.UpdatePresence.Request | typeof Methods.UpdatePresence.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdatePresence.Request;
		} else {
			return Methods.UpdatePresence.Response;
		}
	}

	private static UpdateFavoriteGameKey(message: RMCMessage): typeof Methods.UpdateFavoriteGameKey.Request | typeof Methods.UpdateFavoriteGameKey.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateFavoriteGameKey.Request;
		} else {
			return Methods.UpdateFavoriteGameKey.Response;
		}
	}

	private static UpdateComment(message: RMCMessage): typeof Methods.UpdateComment.Request | typeof Methods.UpdateComment.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateComment.Request;
		} else {
			return Methods.UpdateComment.Response;
		}
	}

	private static UpdatePicture(message: RMCMessage): typeof Methods.UpdatePicture.Request | typeof Methods.UpdatePicture.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdatePicture.Request;
		} else {
			return Methods.UpdatePicture.Response;
		}
	}

	private static GetFriendPresence(message: RMCMessage): typeof Methods.GetFriendPresence.Request | typeof Methods.GetFriendPresence.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetFriendPresence.Request;
		} else {
			return Methods.GetFriendPresence.Response;
		}
	}

	private static GetFriendComment(message: RMCMessage): typeof Methods.GetFriendComment.Request | typeof Methods.GetFriendComment.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetFriendComment.Request;
		} else {
			return Methods.GetFriendComment.Response;
		}
	}

	private static GetFriendPicture(message: RMCMessage): typeof Methods.GetFriendPicture.Request | typeof Methods.GetFriendPicture.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetFriendPicture.Request;
		} else {
			return Methods.GetFriendPicture.Response;
		}
	}

	private static GetFriendPersistentInfo(message: RMCMessage): typeof Methods.GetFriendPersistentInfo.Request | typeof Methods.GetFriendPersistentInfo.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetFriendPersistentInfo.Request;
		} else {
			return Methods.GetFriendPersistentInfo.Response;
		}
	}

	private static SendInvitation(message: RMCMessage): typeof Methods.SendInvitation.Request | typeof Methods.SendInvitation.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SendInvitation.Request;
		} else {
			return Methods.SendInvitation.Response;
		}
	}
}
