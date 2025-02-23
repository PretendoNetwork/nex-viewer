import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import PID from '@/nex/types/pid';
import PlayingSession from '@/nex/protocols/match-making/types/playing-session';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetPlayingSession';

	private lstPid = new List(new PID());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.lstPid.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			lstPid: this.lstPid
		};
	}
}

export class Response {
	public static Name = 'GetPlayingSession';

	private lstPlayingSession = new List(new PlayingSession());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.lstPlayingSession.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			lstPlayingSession: this.lstPlayingSession
		};
	}
}
