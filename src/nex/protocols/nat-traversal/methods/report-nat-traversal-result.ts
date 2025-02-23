import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import Bool from '@/nex/types/bool';
import type RMCMessage from '@/nex/rmc-message';
import type * as RMCs from '@/types/nex/rmcs/nat-traversal/report-nat-traversal-result';

export class Request {
	public static Name = 'ReportNATTraversalResult';

	private cid = new UInt32();
	private result = new Bool();
	private rtt: UInt32; // * Not seen on the 3DS. NEX version difference?

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.cid.extractFrom(stream);
		this.result.extractFrom(stream);

		if (stream.hasDataLeft()) {
			this.rtt = new UInt32();
			this.rtt.extractFrom(stream);
		}
	}

	public toJSON(): RMCs.Request {
		const json: RMCs.Request = {
			cid: this.cid,
			result: this.result,
			rtt: this.rtt
		};

		if (this.rtt !== undefined) {
			json.rtt = this.rtt;
		}

		return json;
	}
}

// * No response data
export class Response {
	public static Name = 'ReportNATTraversalResult';

	constructor() {}

	public toJSON(): RMCs.Response {
		return {};
	}
}
