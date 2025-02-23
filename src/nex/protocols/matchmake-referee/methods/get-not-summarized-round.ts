import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import MatchmakeRefereeRound from '@/nex/protocols/matchmake-referee/types/matchmake-referee-round';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'GetNotSummarizedRound';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'GetNotSummarizedRound';

	private rounds = new List(new MatchmakeRefereeRound());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.rounds.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			rounds: this.rounds
		};
	}
}
