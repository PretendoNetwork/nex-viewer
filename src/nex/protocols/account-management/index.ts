import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/account-management/methods';
import AnyDataHolder from '@/nex/types/any-data-holder';
import AccountExtraInfo from '@/nex/protocols/account-management/types/account-extra-info';
import type PRUDPPacket from '@/types/nex/prudp-packet';

AnyDataHolder.Classes['AccountExtraInfo'] = AccountExtraInfo;

export default class AccountManagementProtocol {
	static ID = 0x19;
	static Name = 'AccountManagement';

	static Methods = {
		CreateAccount: 0x1,
		DeleteAccount: 0x2,
		DisableAccount: 0x3,
		ChangePassword: 0x4,
		TestCapability: 0x5,
		GetName: 0x6,
		GetAccountData: 0x7,
		GetPrivateData: 0x8,
		GetPublicData: 0x9,
		GetMultiplePublicData: 0xA,
		UpdateAccountName: 0xB,
		UpdateAccountEmail: 0xC,
		UpdateCustomData: 0xD,
		FindByNameRegex: 0xE,
		UpdateAccountExpiryDate: 0xF,
		UpdateAccountEffectiveDate: 0x10,
		UpdateStatus: 0x11,
		GetStatus: 0x12,
		GetLastConnectionStats: 0x13,
		ResetPassword: 0x14,
		CreateAccountWithCustomData: 0x15,
		RetrieveAccount: 0x16,
		UpdateAccount: 0x17,
		ChangePasswordByGuest: 0x18,
		FindByNameLike: 0x19,
		CustomCreateAccount: 0x1A,
		NintendoCreateAccount: 0x1B,
		LookupOrCreateAccount: 0x1C,
		DisconnectPrincipal: 0x1D,
		DisconnectAllPrincipals: 0x1E
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x1: AccountManagementProtocol.CreateAccount,
		0x2: AccountManagementProtocol.DeleteAccount,
		0x3: AccountManagementProtocol.DisableAccount,
		0x4: AccountManagementProtocol.ChangePassword,
		0x5: AccountManagementProtocol.TestCapability,
		0x6: AccountManagementProtocol.GetName,
		0x7: AccountManagementProtocol.GetAccountData,
		0x8: AccountManagementProtocol.GetPrivateData,
		0x9: AccountManagementProtocol.GetPublicData,
		0xA: AccountManagementProtocol.GetMultiplePublicData,
		0xB: AccountManagementProtocol.UpdateAccountName,
		0xC: AccountManagementProtocol.UpdateAccountEmail,
		0xD: AccountManagementProtocol.UpdateCustomData,
		0xE: AccountManagementProtocol.FindByNameRegex,
		0xF: AccountManagementProtocol.UpdateAccountExpiryDate,
		0x10: AccountManagementProtocol.UpdateAccountEffectiveDate,
		0x11: AccountManagementProtocol.UpdateStatus,
		0x12: AccountManagementProtocol.GetStatus,
		0x13: AccountManagementProtocol.GetLastConnectionStats,
		0x14: AccountManagementProtocol.ResetPassword,
		0x15: AccountManagementProtocol.CreateAccountWithCustomData,
		0x16: AccountManagementProtocol.RetrieveAccount,
		0x17: AccountManagementProtocol.UpdateAccount,
		0x18: AccountManagementProtocol.ChangePasswordByGuest,
		0x19: AccountManagementProtocol.FindByNameLike,
		0x1A: AccountManagementProtocol.CustomCreateAccount,
		0x1B: AccountManagementProtocol.NintendoCreateAccount,
		0x1C: AccountManagementProtocol.LookupOrCreateAccount,
		0x1D: AccountManagementProtocol.DisconnectPrincipal,
		0x1E: AccountManagementProtocol.DisconnectAllPrincipals
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = AccountManagementProtocol.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static CreateAccount(message: RMCMessage): typeof Methods.CreateAccount.Request | typeof Methods.CreateAccount.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CreateAccount.Request;
		} else {
			return Methods.CreateAccount.Response;
		}
	}

	private static DeleteAccount(message: RMCMessage): typeof Methods.DeleteAccount.Request | typeof Methods.DeleteAccount.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeleteAccount.Request;
		} else {
			return Methods.DeleteAccount.Response;
		}
	}

	private static DisableAccount(message: RMCMessage): typeof Methods.DisableAccount.Request | typeof Methods.DisableAccount.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DisableAccount.Request;
		} else {
			return Methods.DisableAccount.Response;
		}
	}

	private static ChangePassword(message: RMCMessage): typeof Methods.ChangePassword.Request | typeof Methods.ChangePassword.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ChangePassword.Request;
		} else {
			return Methods.ChangePassword.Response;
		}
	}

	private static TestCapability(message: RMCMessage): typeof Methods.TestCapability.Request | typeof Methods.TestCapability.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.TestCapability.Request;
		} else {
			return Methods.TestCapability.Response;
		}
	}

	private static GetName(message: RMCMessage): typeof Methods.GetName.Request | typeof Methods.GetName.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetName.Request;
		} else {
			return Methods.GetName.Response;
		}
	}

	private static GetAccountData(message: RMCMessage): typeof Methods.GetAccountData.Request | typeof Methods.GetAccountData.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetAccountData.Request;
		} else {
			return Methods.GetAccountData.Response;
		}
	}

	private static GetPrivateData(message: RMCMessage): typeof Methods.GetPrivateData.Request | typeof Methods.GetPrivateData.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetPrivateData.Request;
		} else {
			return Methods.GetPrivateData.Response;
		}
	}

	private static GetPublicData(message: RMCMessage): typeof Methods.GetPublicData.Request | typeof Methods.GetPublicData.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetPublicData.Request;
		} else {
			return Methods.GetPublicData.Response;
		}
	}

	private static GetMultiplePublicData(message: RMCMessage): typeof Methods.GetMultiplePublicData.Request | typeof Methods.GetMultiplePublicData.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetMultiplePublicData.Request;
		} else {
			return Methods.GetMultiplePublicData.Response;
		}
	}

	private static UpdateAccountName(message: RMCMessage): typeof Methods.UpdateAccountName.Request | typeof Methods.UpdateAccountName.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateAccountName.Request;
		} else {
			return Methods.UpdateAccountName.Response;
		}
	}

	private static UpdateAccountEmail(message: RMCMessage): typeof Methods.UpdateAccountEmail.Request | typeof Methods.UpdateAccountEmail.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateAccountEmail.Request;
		} else {
			return Methods.UpdateAccountEmail.Response;
		}
	}

	private static UpdateCustomData(message: RMCMessage): typeof Methods.UpdateCustomData.Request | typeof Methods.UpdateCustomData.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateCustomData.Request;
		} else {
			return Methods.UpdateCustomData.Response;
		}
	}

	private static FindByNameRegex(message: RMCMessage): typeof Methods.FindByNameRegex.Request | typeof Methods.FindByNameRegex.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.FindByNameRegex.Request;
		} else {
			return Methods.FindByNameRegex.Response;
		}
	}

	private static UpdateAccountExpiryDate(message: RMCMessage): typeof Methods.UpdateAccountExpiryDate.Request | typeof Methods.UpdateAccountExpiryDate.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateAccountExpiryDate.Request;
		} else {
			return Methods.UpdateAccountExpiryDate.Response;
		}
	}

	private static UpdateAccountEffectiveDate(message: RMCMessage): typeof Methods.UpdateAccountEffectiveDate.Request | typeof Methods.UpdateAccountEffectiveDate.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateAccountEffectiveDate.Request;
		} else {
			return Methods.UpdateAccountEffectiveDate.Response;
		}
	}

	private static UpdateStatus(message: RMCMessage): typeof Methods.UpdateStatus.Request | typeof Methods.UpdateStatus.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateStatus.Request;
		} else {
			return Methods.UpdateStatus.Response;
		}
	}

	private static GetStatus(message: RMCMessage): typeof Methods.GetStatus.Request | typeof Methods.GetStatus.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetStatus.Request;
		} else {
			return Methods.GetStatus.Response;
		}
	}

	private static GetLastConnectionStats(message: RMCMessage): typeof Methods.GetLastConnectionStats.Request | typeof Methods.GetLastConnectionStats.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetLastConnectionStats.Request;
		} else {
			return Methods.GetLastConnectionStats.Response;
		}
	}

	private static ResetPassword(message: RMCMessage): typeof Methods.ResetPassword.Request | typeof Methods.ResetPassword.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ResetPassword.Request;
		} else {
			return Methods.ResetPassword.Response;
		}
	}

	private static CreateAccountWithCustomData(message: RMCMessage): typeof Methods.CreateAccountWithCustomData.Request | typeof Methods.CreateAccountWithCustomData.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CreateAccountWithCustomData.Request;
		} else {
			return Methods.CreateAccountWithCustomData.Response;
		}
	}

	private static RetrieveAccount(message: RMCMessage): typeof Methods.RetrieveAccount.Request | typeof Methods.RetrieveAccount.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RetrieveAccount.Request;
		} else {
			return Methods.RetrieveAccount.Response;
		}
	}

	private static UpdateAccount(message: RMCMessage): typeof Methods.UpdateAccount.Request | typeof Methods.UpdateAccount.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateAccount.Request;
		} else {
			return Methods.UpdateAccount.Response;
		}
	}

	private static ChangePasswordByGuest(message: RMCMessage): typeof Methods.ChangePasswordByGuest.Request | typeof Methods.ChangePasswordByGuest.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ChangePasswordByGuest.Request;
		} else {
			return Methods.ChangePasswordByGuest.Response;
		}
	}

	private static FindByNameLike(message: RMCMessage): typeof Methods.FindByNameLike.Request | typeof Methods.FindByNameLike.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.FindByNameLike.Request;
		} else {
			return Methods.FindByNameLike.Response;
		}
	}

	private static CustomCreateAccount(message: RMCMessage): typeof Methods.CustomCreateAccount.Request | typeof Methods.CustomCreateAccount.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CustomCreateAccount.Request;
		} else {
			return Methods.CustomCreateAccount.Response;
		}
	}

	private static NintendoCreateAccount(message: RMCMessage): typeof Methods.NintendoCreateAccount.Request | typeof Methods.NintendoCreateAccount.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.NintendoCreateAccount.Request;
		} else {
			return Methods.NintendoCreateAccount.Response;
		}
	}

	private static LookupOrCreateAccount(message: RMCMessage): typeof Methods.LookupOrCreateAccount.Request | typeof Methods.LookupOrCreateAccount.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.LookupOrCreateAccount.Request;
		} else {
			return Methods.LookupOrCreateAccount.Response;
		}
	}

	private static DisconnectPrincipal(message: RMCMessage): typeof Methods.DisconnectPrincipal.Request | typeof Methods.DisconnectPrincipal.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DisconnectPrincipal.Request;
		} else {
			return Methods.DisconnectPrincipal.Response;
		}
	}

	private static DisconnectAllPrincipals(message: RMCMessage): typeof Methods.DisconnectAllPrincipals.Request | typeof Methods.DisconnectAllPrincipals.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DisconnectAllPrincipals.Request;
		} else {
			return Methods.DisconnectAllPrincipals.Response;
		}
	}
}
