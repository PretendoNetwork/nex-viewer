import NEXByteStream from '@/nex/byte-stream';
import JoinMatchmakeSessionParam from '@/nex/protocols/match-making/types/join-matchmake-session-param';
import MatchmakeSession from '@/nex/protocols/match-making/types/matchmake-session';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'JoinMatchmakeSessionWithParam';

	private joinMatchmakeSessionParam = new JoinMatchmakeSessionParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.joinMatchmakeSessionParam.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			joinMatchmakeSessionParam: this.joinMatchmakeSessionParam
		};
	}
}

export class Response {
	public static Name = 'JoinMatchmakeSessionWithParam';

	private joinedMatchmakeSession = new MatchmakeSession();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.joinedMatchmakeSession.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			joinedMatchmakeSession: this.joinedMatchmakeSession
		};
	}
}
