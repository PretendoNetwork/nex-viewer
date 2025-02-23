import NEXByteStream from '@/nex/byte-stream';
import RVBuffer from '@/nex/types/buffer';
import UInt64 from '@/nex/types/uint64';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UploadCommonData';

	private commonData = new RVBuffer();
	private uniqueId = new UInt64();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.commonData.extractFrom(stream);
		this.uniqueId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			commonData: this.commonData,
			uniqueId: this.uniqueId
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UploadCommonData';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
