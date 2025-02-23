import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import PID from '@/nex/types/pid';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'RemoveFromBlackList';

	private lstPrincipalId = new List(new PID());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.lstPrincipalId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			lstPrincipalId: this.lstPrincipalId
		};
	}
}

// * No response data
export class Response {
	public static Name = 'RemoveFromBlackList';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
