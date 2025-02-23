import NEXByteStream from '@/nex/byte-stream';
import PID from '@/nex/types/pid';
import ResultRange from '@/nex/types/result-range';
import List from '@/nex/types/list';
import PersistentGathering from '@/nex/protocols/match-making/types/persistent-gathering';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'FindCommunityByParticipant';

	private pid = new PID();
	private resultRange = new ResultRange();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.pid.extractFrom(stream);
		this.resultRange.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pid: this.pid,
			resultRange: this.resultRange
		};
	}
}

export class Response {
	public static Name = 'FindCommunityByParticipant';

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
