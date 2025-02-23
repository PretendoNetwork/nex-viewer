import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'ModifyCurrentGameAttribute';

	private gid = new UInt32();
	private attribIndex = new UInt32();
	private newValue = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.gid.extractFrom(stream);
		this.attribIndex.extractFrom(stream);
		this.newValue.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			gid: this.gid,
			attribIndex: this.attribIndex,
			newValue: this.newValue
		};
	}
}

// * No response data
export class Response {
	public static Name = 'ModifyCurrentGameAttribute';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
