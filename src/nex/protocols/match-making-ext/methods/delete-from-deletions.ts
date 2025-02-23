import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import UInt32 from '@/nex/types/uint32';
import PID from '@/nex/types/pid';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'DeleteFromDeletions';

	private lstDeletions = new List(new UInt32());
	private pid = new PID();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.lstDeletions.extractFrom(stream);
		this.pid.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			lstDeletions: this.lstDeletions,
			pid: this.pid
		};
	}
}

// * No response data
export class Response {
	public static Name = 'DeleteFromDeletions';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
