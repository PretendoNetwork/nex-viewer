import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import QBuffer from '@/nex/types/qbuffer';
import type RMCMessage from '@/nex/rmc-message';
import type * as RMCs from '@/types/nex/rmcs/secure-connection/send-report';

export class Request {
	public static Name = 'SendReport';

	private reportId = new UInt32();
	private reportData = new QBuffer();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.reportId.extractFrom(stream);
		this.reportData.extractFrom(stream);
	}

	public toJSON(): RMCs.Request {
		return {
			reportId: this.reportId,
			reportData: this.reportData
		};
	}
}

// * No response data
export class Response {
	public static Name = 'SendReport';

	constructor() {}

	public toJSON(): RMCs.Response {
		return {};
	}
}
