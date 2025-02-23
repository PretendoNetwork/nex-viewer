import NEXByteStream from '@/nex/byte-stream';
import FindMatchmakeSessionByParticipantParam from '@/nex/protocols/match-making/types/find-matchmake-session-by-participant-param';
import List from '@/nex/types/list';
import FindMatchmakeSessionByParticipantResult from '@/nex/protocols/match-making/types/find-matchmake-session-by-participant-result';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'FindMatchmakeSessionByParticipant';

	private param = new FindMatchmakeSessionByParticipantParam();

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

export class Response {
	public static Name = 'FindMatchmakeSessionByParticipant';

	private lstSession = new List(new FindMatchmakeSessionByParticipantResult());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.lstSession.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			lstSession: this.lstSession
		};
	}
}
