import NEXByteStream from '@/nex/byte-stream';
import UInt64 from '@/nex/types/uint64';
import DataStorePreparePostParam from '@/nex/protocols/datastore/types/datastore-prepare-post-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'PostMetaBinaryWithDataId';

	private dataId = new UInt64();
	private param = new DataStorePreparePostParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.dataId.extractFrom(stream);
		this.param.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			dataId: this.dataId,
			param: this.param
		};
	}
}

// * No response data
export class Response {
	public static Name = 'PostMetaBinaryWithDataId';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
