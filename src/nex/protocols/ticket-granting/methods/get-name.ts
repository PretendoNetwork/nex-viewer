import NEXByteStream from '@/nex/byte-stream';
import RVString from '@/nex/types/string';
import PID from '@/nex/types/pid';
import type RMCMessage from '@/nex/rmc-message';
import type * as RMCs from '@/types/nex/rmcs/ticket-granting/get-name';

export class Request {
	public static Name = 'GetName';

	private id = new PID();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.id.extractFrom(stream);
	}

	public toJSON(): RMCs.Request {
		return {
			id: this.id
		};
	}
}

export class Response {
	public static Name = 'GetName';

	private retval = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.retval.extractFrom(stream);
	}

	public toJSON(): RMCs.Response {
		return {
			retval: this.retval
		};
	}
}
