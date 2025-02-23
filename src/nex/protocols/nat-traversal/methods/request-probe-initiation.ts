import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import StationURL from '@/nex/types/station-url';
import type RMCMessage from '@/nex/rmc-message';
import type * as RMCs from '@/types/nex/rmcs/nat-traversal/request-probe-initiation';

export class Request {
	public static Name = 'RequestProbeInitiationExt';

	private urlTargetList = new List(new StationURL());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.urlTargetList.extractFrom(stream);
	}

	public toJSON(): RMCs.Request {
		return {
			urlTargetList: this.urlTargetList
		};
	}
}

// * No response data
export class Response {
	public static Name = 'RequestProbeInitiationExt';

	constructor() {}

	public toJSON(): RMCs.Response {
		return {};
	}
}
