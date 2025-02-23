import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import MatchmakeRefereeStatsTarget from '@/nex/protocols/matchmake-referee/types/matchmake-referee-stats-target';
import MatchmakeRefereeStats from '@/nex/protocols/matchmake-referee/types/matchmake-referee-stats';
import QResult from '@/nex/types/qresult';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetStatsPrimaries';

	private targets = new List(new MatchmakeRefereeStatsTarget());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.targets.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			targets: this.targets
		};
	}
}

export class Response {
	public static Name = 'GetStatsPrimaries';

	private stats = new List(new MatchmakeRefereeStats());
	private results = new List(new QResult());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.stats.extractFrom(stream);
		this.results.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			stats: this.stats,
			results: this.results
		};
	}
}
