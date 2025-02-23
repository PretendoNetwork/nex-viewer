import NEXByteStream from '@/nex/byte-stream';
import MatchmakeSessionSearchCriteria from '@/nex/protocols/match-making/types/matchmake-session-search-criteria';
import List from '@/nex/types/list';
import MatchmakeSession from '@/nex/protocols/match-making/types/matchmake-session';
import GatheringURLs from '@/nex/protocols/match-making/types/gathering-urls';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'BrowseMatchmakeSessionWithHostUrlsNoHolderNoResultRange';

	private searchCriteria = new MatchmakeSessionSearchCriteria();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.searchCriteria.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			searchCriteria: this.searchCriteria
		};
	}
}

export class Response {
	public static Name = 'BrowseMatchmakeSessionWithHostUrlsNoHolderNoResultRange';

	private lstMatchmakeSession = new List(new MatchmakeSession());
	private lstGatheringUrls = new List(new GatheringURLs());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.lstMatchmakeSession.extractFrom(stream);
		this.lstGatheringUrls.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			lstMatchmakeSession: this.lstMatchmakeSession,
			lstGatheringUrls: this.lstGatheringUrls
		};
	}
}
