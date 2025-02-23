import NEXByteStream from '@/nex/byte-stream';
import Bool from '@/nex/types/bool';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdatePrivacySetting';

	private onlineStatus = new Bool();
	private participationCommunity = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.onlineStatus.extractFrom(stream);
		this.participationCommunity.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			onlineStatus: this.onlineStatus,
			participationCommunity: this.participationCommunity
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UpdatePrivacySetting';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
