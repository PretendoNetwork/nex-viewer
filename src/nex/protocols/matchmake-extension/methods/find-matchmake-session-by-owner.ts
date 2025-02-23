import NEXByteStream from '@/nex/byte-stream';
import PID from '@/nex/types/pid';
import ResultRange from '@/nex/types/result-range';
import List from '@/nex/types/list';
import MatchmakeSession from '@/nex/protocols/match-making/types/matchmake-session';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'FindMatchmakeSessionByOwner';

	private id = new PID();
	private resultRange = new ResultRange();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.id.extractFrom(stream);
		this.resultRange.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			id: this.id,
			resultRange: this.resultRange
		};
	}
}

export class Response {
	public static Name = 'FindMatchmakeSessionByOwner';

	private lstMatchmakeSession = new List(new MatchmakeSession());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.lstMatchmakeSession.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			lstMatchmakeSession: this.lstMatchmakeSession
		};
	}
}
