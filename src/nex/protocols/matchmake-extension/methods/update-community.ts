import NEXByteStream from '@/nex/byte-stream';
import PersistentGathering from '@/nex/protocols/match-making/types/persistent-gathering';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdateCommunity';

	private community = new PersistentGathering();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.community.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			community: this.community
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UpdateCommunity';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
