import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/secure-connection/methods';
import type Packet from '@/types/nex/packet';

export default class SecureConnectionProtocol {
	static ID = 0xB;
	static Name = 'SecureConnection';

	static Methods = {
		Register: 0x1,
		RequestConnectionData: 0x2,
		RequestURLs: 0x3,
		RegisterEx: 0x4,
		TestConnectivity: 0x5,
		UpdateURLs: 0x6,
		ReplaceURL: 0x7,
		SendReport: 0x8
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x1: SecureConnectionProtocol.Register,
		0x2: SecureConnectionProtocol.RequestConnectionData,
		0x3: SecureConnectionProtocol.RequestURLs,
		0x4: SecureConnectionProtocol.RegisterEx,
		0x5: SecureConnectionProtocol.TestConnectivity,
		0x6: SecureConnectionProtocol.UpdateURLs,
		0x7: SecureConnectionProtocol.ReplaceURL,
		0x8: SecureConnectionProtocol.SendReport
	};

	static handlePacket(packet: Packet): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = SecureConnectionProtocol.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.parameters = new messageDecoder(packet.message);
		packet.message.methodName = messageDecoder.Name;
	}

	private static Register(message: RMCMessage): typeof Methods.Register.Request | typeof Methods.Register.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.Register.Request;
		} else {
			return Methods.Register.Response;
		}
	}

	private static RequestConnectionData(message: RMCMessage): typeof Methods.RequestConnectionData.Request | typeof Methods.RequestConnectionData.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RequestConnectionData.Request;
		} else {
			return Methods.RequestConnectionData.Response;
		}
	}

	private static RequestURLs(message: RMCMessage): typeof Methods.RequestURLs.Request | typeof Methods.RequestURLs.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RequestURLs.Request;
		} else {
			return Methods.RequestURLs.Response;
		}
	}

	private static RegisterEx(message: RMCMessage): typeof Methods.RegisterEx.Request | typeof Methods.RegisterEx.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RegisterEx.Request;
		} else {
			return Methods.RegisterEx.Response;
		}
	}

	private static TestConnectivity(message: RMCMessage): typeof Methods.TestConnectivity.Request | typeof Methods.TestConnectivity.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.TestConnectivity.Request;
		} else {
			return Methods.TestConnectivity.Response;
		}
	}

	private static UpdateURLs(message: RMCMessage): typeof Methods.UpdateURLs.Request | typeof Methods.UpdateURLs.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateURLs.Request;
		} else {
			return Methods.UpdateURLs.Response;
		}
	}

	private static ReplaceURL(message: RMCMessage): typeof Methods.ReplaceURL.Request | typeof Methods.ReplaceURL.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ReplaceURL.Request;
		} else {
			return Methods.ReplaceURL.Response;
		}
	}

	private static SendReport(message: RMCMessage): typeof Methods.SendReport.Request | typeof Methods.SendReport.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SendReport.Request;
		} else {
			return Methods.SendReport.Response;
		}
	}
}
