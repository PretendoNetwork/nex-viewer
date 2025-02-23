import NEXByteStream from '@/nex/byte-stream';
import CreateMatchmakeSessionParam from '@/nex/protocols/match-making/types/create-matchmake-session-param';
import MatchmakeSession from '@/nex/protocols/match-making/types/matchmake-session';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'CreateMatchmakeSessionWithParam';

	private createMatchmakeSessionParam = new CreateMatchmakeSessionParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.createMatchmakeSessionParam.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			createMatchmakeSessionParam: this.createMatchmakeSessionParam
		};
	}
}

export class Response {
	public static Name = 'CreateMatchmakeSessionWithParam';

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
