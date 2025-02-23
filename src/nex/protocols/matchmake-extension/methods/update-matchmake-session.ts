import NEXByteStream from '@/nex/byte-stream';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdateMatchmakeSession';

	private anyGathering = new AnyDataHolder();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.anyGathering.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			anyGathering: this.anyGathering
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UpdateMatchmakeSession';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
