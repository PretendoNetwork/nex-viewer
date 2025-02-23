import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GenerateMatchmakeSessionSystemPassword';

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

export class Response {
	public static Name = 'GenerateMatchmakeSessionSystemPassword';

	private password = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.password.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			password: this.password
		};
	}
}
