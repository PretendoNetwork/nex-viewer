import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import StationURL from '@/nex/types/station-url';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'RegisterLocalURLs';

	private gid = new UInt32();
	private lstUrls = new List(new StationURL());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.gid.extractFrom(stream);
		this.lstUrls.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			gid: this.gid,
			lstUrls: this.lstUrls
		};
	}
}

// * No response data
export class Response {
	public static Name = 'RegisterLocalURLs';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
