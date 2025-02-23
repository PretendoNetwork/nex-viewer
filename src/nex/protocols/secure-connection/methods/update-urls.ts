import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import StationURL from '@/nex/types/station-url';
import type RMCMessage from '@/nex/rmc-message';
import type * as RMCs from '@/types/nex/rmcs/secure-connection/update-urls';

export class Request {
	public static Name = 'UpdateURLs';

	private vecMyURLs = new List(new StationURL());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.vecMyURLs.extractFrom(stream);
	}

	public toJSON(): RMCs.Request {
		return {
			vecMyURLs: this.vecMyURLs
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UpdateURLs';

	constructor() {}

	public toJSON(): RMCs.Response {
		return {};
	}
}
