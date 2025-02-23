import NEXByteStream from '@/nex/byte-stream';
import UInt64 from '@/nex/types/uint64';
import RVBuffer from '@/nex/types/buffer';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetCommonData';

	private uniqueId = new UInt64();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.uniqueId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			uniqueId: this.uniqueId
		};
	}
}

export class Response {
	public static Name = 'GetCommonData';

	private commonData = new RVBuffer();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.commonData.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			commonData: this.commonData
		};
	}
}
