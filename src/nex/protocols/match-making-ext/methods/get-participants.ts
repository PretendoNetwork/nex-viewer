import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import Bool from '@/nex/types/bool';
import List from '@/nex/types/list';
import PID from '@/nex/types/pid';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetParticipants';

	private idGathering = new List(new UInt32());
	private bOnlyActive = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.idGathering.extractFrom(stream);
		this.bOnlyActive.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			idGathering: this.idGathering,
			bOnlyActive: this.bOnlyActive
		};
	}
}

// * No response data
export class Response {
	public static Name = 'GetParticipants';

	private lstParticipants = new List(new PID());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.lstParticipants.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			lstParticipants: this.lstParticipants
		};
	}
}
