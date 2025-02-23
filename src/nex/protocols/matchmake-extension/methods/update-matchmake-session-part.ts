import NEXByteStream from '@/nex/byte-stream';
import UpdateMatchmakeSessionParam from '@/nex/protocols/match-making/types/update-matchmake-session-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdateMatchmakeSessionPart';

	private updateMatchmakeSessionParam = new UpdateMatchmakeSessionParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.updateMatchmakeSessionParam.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			updateMatchmakeSessionParam: this.updateMatchmakeSessionParam
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UpdateMatchmakeSessionPart';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
