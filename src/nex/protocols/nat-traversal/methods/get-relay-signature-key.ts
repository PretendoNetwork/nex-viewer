import NEXByteStream from '@/nex/byte-stream';
import Int32 from '@/nex/types/int32';
import DateTime from '@/nex/types/datetime';
import RVString from '@/nex/types/string';
import UInt16 from '@/nex/types/uint16';
import UInt32 from '@/nex/types/uint32';
import type RMCMessage from '@/nex/rmc-message';
import type * as RMCs from '@/types/nex/rmcs/nat-traversal/get-relay-signature-key';

// * No request data
export class Request {
	public static Name = 'GetRelaySignatureKey';

	constructor() {}

	public toJSON(): RMCs.Request {
		return {};
	}
}

export class Response {
	public static Name = 'GetRelaySignatureKey';

	private relayMode = new Int32();
	private currentUTCTime = new DateTime();
	private address = new RVString();
	private port = new UInt16();
	private relayAddressType = new Int32();
	private gameServerID = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.relayMode.extractFrom(stream);
		this.currentUTCTime.extractFrom(stream);
		this.address.extractFrom(stream);
		this.port.extractFrom(stream);
		this.relayAddressType.extractFrom(stream);
		this.gameServerID.extractFrom(stream);
	}

	public toJSON(): RMCs.Response {
		return {
			relayMode: this.relayMode,
			currentUTCTime: this.currentUTCTime,
			address: this.address,
			port: this.port,
			relayAddressType: this.relayAddressType,
			gameServerID: this.gameServerID
		};
	}
}
