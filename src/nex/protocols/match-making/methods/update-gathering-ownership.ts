import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import Bool from '@/nex/types/bool';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdateGatheringOwnership';

	private gid = new UInt32();
	private participantsOnly = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.gid.extractFrom(stream);
		this.participantsOnly.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			gid: this.gid,
			participantsOnly: this.participantsOnly
		};
	}
}

export class Response {
	public static Name = 'UpdateGatheringOwnership';

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
