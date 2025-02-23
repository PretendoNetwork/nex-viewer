import NEXByteStream from '@/nex/byte-stream';
import Bool from '@/nex/types/bool';
import ResultRange from '@/nex/types/result-range';
import List from '@/nex/types/list';
import PersistentGathering from '@/nex/protocols/match-making/types/persistent-gathering';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'FindOfficialCommunity';

	private isAvailableOnly = new Bool();
	private resultRange = new ResultRange();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.isAvailableOnly.extractFrom(stream);
		this.resultRange.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			isAvailableOnly: this.isAvailableOnly,
			resultRange: this.resultRange
		};
	}
}

export class Response {
	public static Name = 'FindOfficialCommunity';

	private lstCommunity = new List(new PersistentGathering());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.lstCommunity.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			lstCommunity: this.lstCommunity
		};
	}
}
