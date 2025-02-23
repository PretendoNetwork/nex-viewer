import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'JoinCommunity';

	private gid = new UInt32();
	private strMessage = new RVString();
	private strPassword = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.gid.extractFrom(stream);
		this.strMessage.extractFrom(stream);
		this.strPassword.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			gid: this.gid,
			strMessage: this.strMessage,
			strPassword: this.strPassword
		};
	}
}

// * No response data
export class Response {
	public static Name = 'JoinCommunity';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
