import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import RVBuffer from '@/nex/types/buffer';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdateApplicationBuffer';

	private gid = new UInt32();
	private applicationBuffer = new RVBuffer();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.gid.extractFrom(stream);
		this.applicationBuffer.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			gid: this.gid,
			applicationBuffer: this.applicationBuffer
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UpdateApplicationBuffer';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
