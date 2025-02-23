import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import StationURL from '@/nex/types/station-url';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetSessionURLs';

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
	public static Name = 'GetSessionURLs';

	private lstURLs = new List(new StationURL());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.lstURLs.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			lstURLs: this.lstURLs
		};
	}
}
