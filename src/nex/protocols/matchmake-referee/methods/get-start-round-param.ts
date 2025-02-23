import NEXByteStream from '@/nex/byte-stream';
import UInt64 from '@/nex/types/uint64';
import MatchmakeRefereeStartRoundParam from '@/nex/protocols/matchmake-referee/types/matchmake-referee-start-round-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetStartRoundParam';

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
	public static Name = 'GetStartRoundParam';

	private param = new MatchmakeRefereeStartRoundParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.param.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			param: this.param
		};
	}
}
