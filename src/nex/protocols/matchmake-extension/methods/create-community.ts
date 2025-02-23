import NEXByteStream from '@/nex/byte-stream';
import PersistentGathering from '@/nex/protocols/match-making/types/persistent-gathering';
import RVString from '@/nex/types/string';
import UInt32 from '@/nex/types/uint32';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'CreateCommunity';

	private community = new PersistentGathering();
	private strMessage = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.community.extractFrom(stream);
		this.strMessage.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			community: this.community,
			strMessage: this.strMessage
		};
	}
}

export class Response {
	public static Name = 'CreateCommunity';

	private gid = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.gid.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			gid: this.gid
		};
	}
}
