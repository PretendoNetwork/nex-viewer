import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import Bool from '@/nex/types/bool';
import type RMCMessage from '@/nex/rmc-message';
import type * as RMCs from '@/types/nex/rmcs/match-making-ext/end-participation';

export class Request {
	public static Name = 'EndParticipation';

	private idGathering = new UInt32();
	private strMessage = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.idGathering.extractFrom(stream);
		this.strMessage.extractFrom(stream);
	}

	public toJSON(): RMCs.Request {
		return {
			idGathering: this.idGathering,
			strMessage: this.strMessage
		};
	}
}

export class Response {
	public static Name = 'EndParticipation';

	private retval = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.retval.extractFrom(stream);
	}

	public toJSON(): RMCs.Response {
		return {
			retval: this.retval
		};
	}
}
