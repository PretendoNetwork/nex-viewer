import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import UInt8 from '@/nex/types/uint8';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdateProgressScore';

	private gid = new UInt32();
	private progressScore = new UInt8();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.gid.extractFrom(stream);
		this.progressScore.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			gid: this.gid,
			progressScore: this.progressScore
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UpdateProgressScore';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
