import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import MatchmakeSessionSearchCriteria from '@/nex/protocols/match-making/types/matchmake-session-search-criteria';
import AnyDataHolder from '@/nex/types/any-data-holder';
import RVString from '@/nex/types/string';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'AutoMatchmakeWithSearchCriteria_Postpone';

	private lstSearchCriteria = new List(new MatchmakeSessionSearchCriteria());
	private anyGathering = new AnyDataHolder();
	private strMessage = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.lstSearchCriteria.extractFrom(stream);
		this.anyGathering.extractFrom(stream);
		this.strMessage.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			lstSearchCriteria: this.lstSearchCriteria,
			anyGathering: this.anyGathering,
			strMessage: this.strMessage
		};
	}
}

export class Response {
	public static Name = 'AutoMatchmakeWithSearchCriteria_Postpone';

	private joinedGathering = new AnyDataHolder();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.joinedGathering.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			joinedGathering: this.joinedGathering
		};
	}
}
