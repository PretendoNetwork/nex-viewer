import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import PID from '@/nex/types/pid';
import Bool from '@/nex/types/bool';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'MigrateGatheringOwnershipV1';

	private gid = new UInt32();
	private lstPotentialNewOwnersID = new List(new PID());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.gid.extractFrom(stream);
		this.lstPotentialNewOwnersID.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			gid: this.gid,
			lstPotentialNewOwnersID: this.lstPotentialNewOwnersID
		};
	}
}

export class Response {
	public static Name = 'MigrateGatheringOwnershipV1';

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
