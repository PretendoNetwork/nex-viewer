import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import StationURL from '@/nex/types/station-url';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'RegisterLocalURL';

	private gid = new UInt32();
	private url = new StationURL();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.gid.extractFrom(stream);
		this.url.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			gid: this.gid,
			url: this.url
		};
	}
}

// * No response data
export class Response {
	public static Name = 'RegisterLocalURL';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
