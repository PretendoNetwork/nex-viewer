import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import Bool from '@/nex/types/bool';
import Int32 from '@/nex/types/int32';
import type RMCMessage from '@/nex/rmc-message';
import type * as RMCs from '@/types/nex/rmcs/nat-traversal/report-nat-traversal-result-detail';

export class Request {
	public static Name = 'ReportNATTraversalResultDetail';

	private cid = new UInt32();
	private result = new Bool();
	private detail = new Int32();
	private rtt = new UInt32(); // * ReportNATTraversalResult does not send this on the 3DS, is that true here too?

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.cid.extractFrom(stream);
		this.result.extractFrom(stream);
		this.detail.extractFrom(stream);
		this.rtt.extractFrom(stream);
	}

	public toJSON(): RMCs.Request {
		return {
			cid: this.cid,
			result: this.result,
			detail: this.detail,
			rtt: this.rtt
		};
	}
}

// * No response data
export class Response {
	public static Name = 'ReportNATTraversalResultDetail';

	constructor() {}

	public toJSON(): RMCs.Response {
		return {};
	}
}
