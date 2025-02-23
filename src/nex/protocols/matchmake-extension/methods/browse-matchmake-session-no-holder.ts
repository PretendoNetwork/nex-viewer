import NEXByteStream from '@/nex/byte-stream';
import MatchmakeSessionSearchCriteria from '@/nex/protocols/match-making/types/matchmake-session-search-criteria';
import ResultRange from '@/nex/types/result-range';
import List from '@/nex/types/list';
import MatchmakeSession from '@/nex/protocols/match-making/types/matchmake-session';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'BrowseMatchmakeSessionNoHolder';

	private searchCriteria = new MatchmakeSessionSearchCriteria();
	private resultRange = new ResultRange();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.searchCriteria.extractFrom(stream);
		this.resultRange.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			searchCriteria: this.searchCriteria,
			resultRange: this.resultRange
		};
	}
}

export class Response {
	public static Name = 'BrowseMatchmakeSessionNoHolder';

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
