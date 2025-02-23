import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/nat-traversal/methods';
import type Packet from '@/types/nex/packet';

export default class NATTraversalProtocol {
	static ID = 0x3;
	static Name = 'NATTraversal';

	static Methods = {
		RequestProbeInitiation: 0x1,
		InitiateProbe: 0x2,
		RequestProbeInitiationExt: 0x3,
		ReportNATTraversalResult: 0x4,
		ReportNATProperties: 0x5,
		GetRelaySignatureKey: 0x6,
		ReportNATTraversalResultDetail: 0x7
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x1: NATTraversalProtocol.RequestProbeInitiation,
		0x2: NATTraversalProtocol.InitiateProbe,
		0x3: NATTraversalProtocol.RequestProbeInitiationExt,
		0x4: NATTraversalProtocol.ReportNATTraversalResult,
		0x5: NATTraversalProtocol.ReportNATProperties,
		0x6: NATTraversalProtocol.GetRelaySignatureKey,
		0x7: NATTraversalProtocol.ReportNATTraversalResultDetail
	};

	static handlePacket(packet: Packet): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = NATTraversalProtocol.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.parameters = new messageDecoder(packet.message);
		packet.message.methodName = messageDecoder.Name;
	}

	private static RequestProbeInitiation(message: RMCMessage): typeof Methods.RequestProbeInitiation.Request | typeof Methods.RequestProbeInitiation.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RequestProbeInitiation.Request;
		} else {
			return Methods.RequestProbeInitiation.Response;
		}
	}

	private static InitiateProbe(message: RMCMessage): typeof Methods.InitiateProbe.Request | typeof Methods.InitiateProbe.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.InitiateProbe.Request;
		} else {
			return Methods.InitiateProbe.Response;
		}
	}

	private static RequestProbeInitiationExt(message: RMCMessage): typeof Methods.RequestProbeInitiationExt.Request | typeof Methods.RequestProbeInitiationExt.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RequestProbeInitiationExt.Request;
		} else {
			return Methods.RequestProbeInitiationExt.Response;
		}
	}

	private static ReportNATTraversalResult(message: RMCMessage): typeof Methods.ReportNATTraversalResult.Request | typeof Methods.ReportNATTraversalResult.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ReportNATTraversalResult.Request;
		} else {
			return Methods.ReportNATTraversalResult.Response;
		}
	}

	private static ReportNATProperties(message: RMCMessage): typeof Methods.ReportNATProperties.Request | typeof Methods.ReportNATProperties.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ReportNATProperties.Request;
		} else {
			return Methods.ReportNATProperties.Response;
		}
	}

	private static GetRelaySignatureKey(message: RMCMessage): typeof Methods.GetRelaySignatureKey.Request | typeof Methods.GetRelaySignatureKey.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetRelaySignatureKey.Request;
		} else {
			return Methods.GetRelaySignatureKey.Response;
		}
	}

	private static ReportNATTraversalResultDetail(message: RMCMessage): typeof Methods.ReportNATTraversalResultDetail.Request | typeof Methods.ReportNATTraversalResultDetail.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ReportNATTraversalResultDetail.Request;
		} else {
			return Methods.ReportNATTraversalResultDetail.Response;
		}
	}
}
