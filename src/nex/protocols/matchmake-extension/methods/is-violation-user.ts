import NEXByteStream from '@/nex/byte-stream';
import Bool from '@/nex/types/bool';
import UInt32 from '@/nex/types/uint32';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'IsViolationUser';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'IsViolationUser';

	private flag = new Bool();
	private score = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.flag.extractFrom(stream);
		this.score.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			flag: this.flag,
			score: this.score
		};
	}
}
