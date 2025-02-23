import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetGatheringRelations';

	private id = new UInt32();
	private descr = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.id.extractFrom(stream);
		this.descr.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			id: this.id,
			descr: this.descr
		};
	}
}

// * No response data
export class Response {
	public static Name = 'GetGatheringRelations';

	private retval = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.retval.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			retval: this.retval
		};
	}
}
