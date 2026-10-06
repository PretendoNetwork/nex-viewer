import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import UInt64 from '@/nex/types/uint64';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'CompletePostObjects';

	private dataIds = new List(new UInt64());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.dataIds.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			dataIds: this.dataIds
		};
	}
}

// * No response data
export class Response {
	public static Name = 'CompletePostObjects';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
