import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import PID from '@/nex/types/pid';
import RVString from '@/nex/types/string';
import Bool from '@/nex/types/bool';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'Invite';

	private idGathering = new UInt32();
	private lstPrincipals = new List(new PID());
	private strMessage = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.idGathering.extractFrom(stream);
		this.lstPrincipals.extractFrom(stream);
		this.strMessage.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			idGathering: this.idGathering,
			lstPrincipals: this.lstPrincipals,
			strMessage: this.strMessage
		};
	}
}

export class Response {
	public static Name = 'Invite';

	private retval = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.retval.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			retval: this.retval
		};
	}
}
