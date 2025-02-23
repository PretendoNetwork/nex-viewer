import NEXByteStream from '@/nex/byte-stream';
import UInt64 from '@/nex/types/uint64';
import MatchmakeRefereeRound from '@/nex/protocols/matchmake-referee/types/matchmake-referee-round';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetRound';

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
	public static Name = 'GetRound';

	private round = new MatchmakeRefereeRound();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.round.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			round: this.round
		};
	}
}
