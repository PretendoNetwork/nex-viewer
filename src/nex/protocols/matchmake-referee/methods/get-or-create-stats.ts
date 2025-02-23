import NEXByteStream from '@/nex/byte-stream';
import MatchmakeRefereeStatsInitParam from '@/nex/protocols/matchmake-referee/types/matchmake-referee-stats-init-param';
import MatchmakeRefereeStats from '@/nex/protocols/matchmake-referee/types/matchmake-referee-stats';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetOrCreateStats';

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

export class Response {
	public static Name = 'GetOrCreateStats';

	private stats = new MatchmakeRefereeStats();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.stats.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			stats: this.stats
		};
	}
}
