import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import UInt32 from '@/nex/types/uint32';
import GatheringURLs from '@/nex/protocols/match-making/types/gathering-urls';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetParticipantsURLs';

	private lstGatherings = new List(new UInt32());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.lstGatherings.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			lstGatherings: this.lstGatherings
		};
	}
}

// * No response data
export class Response {
	public static Name = 'GetParticipantsURLs';

	private lstGatheringURLs = new List(new GatheringURLs());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.lstGatheringURLs.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			lstGatheringURLs: this.lstGatheringURLs
		};
	}
}
