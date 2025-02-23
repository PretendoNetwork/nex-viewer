import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import UInt64 from '@/nex/types/uint64';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'DeleteScore';

	private category = new UInt32();
	private uniqueId = new UInt64();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.category.extractFrom(stream);
		this.uniqueId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			category: this.category,
			uniqueId: this.uniqueId
		};
	}
}

// * No response data
export class Response {
	public static Name = 'DeleteScore';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
