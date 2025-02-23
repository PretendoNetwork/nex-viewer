import NEXByteStream from '@/nex/byte-stream';
import MatchmakeRefereeStatsInitParam from '@/nex/protocols/matchmake-referee/types/matchmake-referee-stats-init-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'CreateStats';

	private param = new MatchmakeRefereeStatsInitParam();

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

// * No response data
export class Response {
	public static Name = 'CreateStats';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
