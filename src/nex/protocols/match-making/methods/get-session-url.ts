import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import Bool from '@/nex/types/bool';
import RVString from '@/nex/types/string';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetSessionURL';

	private idGathering = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.idGathering.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			idGathering: this.idGathering
		};
	}
}

export class Response {
	public static Name = 'GetSessionURL';

	private retval = new Bool();
	private strURL = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.retval.extractFrom(stream);
		this.strURL.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			retval: this.retval,
			strURL: this.strURL
		};
	}
}
