import NEXByteStream from '@/nex/byte-stream';
import UInt64 from '@/nex/types/uint64';
import List from '@/nex/types/list';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetRoundParticipants';

	private roundId = new UInt64();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.roundId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			roundId: this.roundId
		};
	}
}

export class Response {
	public static Name = 'GetRoundParticipants';

	private pids = new List(new UInt64());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.pids.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pids: this.pids
		};
	}
}
