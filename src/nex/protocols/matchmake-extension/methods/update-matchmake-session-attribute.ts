import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdateMatchmakeSessionAttribute';

	private gid = new UInt32();
	private attribs = new List(new UInt32());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.gid.extractFrom(stream);
		this.attribs.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			gid: this.gid,
			attribs: this.attribs
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UpdateMatchmakeSessionAttribute';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
