import NEXByteStream from '@/nex/byte-stream';
import MatchmakeSessionSearchCriteria from '@/nex/protocols/match-making/types/matchmake-session-search-criteria';
import ResultRange from '@/nex/types/result-range';
import List from '@/nex/types/list';
import AnyDataHolder from '@/nex/types/any-data-holder';
import GatheringURLs from '@/nex/protocols/match-making/types/gathering-urls';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'BrowseMatchmakeSessionWithHostUrls';

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
	public static Name = 'BrowseMatchmakeSessionWithHostUrls';

	private lstGathering = new List(new AnyDataHolder());
	private lstGatheringUrls = new List(new GatheringURLs());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.lstGathering.extractFrom(stream);
		this.lstGatheringUrls.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			lstGathering: this.lstGathering,
			lstGatheringUrls: this.lstGatheringUrls
		};
	}
}
