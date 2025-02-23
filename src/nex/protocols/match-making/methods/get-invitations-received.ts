import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import Invitation from '@/nex/protocols/match-making/types/invitation';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'GetInvitationsReceived';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'GetInvitationsReceived';

	private lstInvitations = new List(new Invitation());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.lstInvitations.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			lstInvitations: this.lstInvitations
		};
	}
}
