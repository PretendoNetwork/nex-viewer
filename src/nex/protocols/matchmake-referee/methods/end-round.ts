import NEXByteStream from '@/nex/byte-stream';
import MatchmakeRefereeEndRoundParam from '@/nex/protocols/matchmake-referee/types/matchmake-referee-end-round-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'EndRound';

	private endRoundParam = new MatchmakeRefereeEndRoundParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.endRoundParam.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			endRoundParam: this.endRoundParam
		};
	}
}

// * No response data
export class Response {
	public static Name = 'EndRound';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
