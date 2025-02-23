import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import ParticipantDetails from '@/nex/protocols/match-making/types/participant-details';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetDetailedParticipants';

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
	public static Name = 'GetDetailedParticipants';

	private lstParticipants = new List(new ParticipantDetails());

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
