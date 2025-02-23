import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import Invitation from '@/nex/protocols/match-making/types/invitation';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetInvitationsSent';

	private idGathering = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.idGathering.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			idGathering: this.idGathering
		};
	}
}

export class Response {
	public static Name = 'GetInvitationsSent';

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
