import NEXByteStream from '@/nex/byte-stream';
import StationURL from '@/nex/types/station-url';
import type RMCMessage from '@/nex/rmc-message';
import type * as RMCs from '@/types/nex/rmcs/nat-traversal/initiate-probe';

export class Request {
	public static Name = 'InitiateProbe';

	private urlStationToProbe = new StationURL();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.urlStationToProbe.extractFrom(stream);
	}

	public toJSON(): RMCs.Request {
		return {
			urlStationToProbe: this.urlStationToProbe
		};
	}
}

// * No response data
export class Response {
	public static Name = 'InitiateProbe';

	constructor() {}

	public toJSON(): RMCs.Response {
		return {};
	}
}
