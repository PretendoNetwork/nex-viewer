import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import PID from '@/nex/types/pid';
import Bool from '@/nex/types/bool';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'MigrateGatheringOwnership';

	private gid = new UInt32();
	private lstPotentialNewOwnersID = new List(new PID());
	private participantsOnly = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.gid.extractFrom(stream);
		this.lstPotentialNewOwnersID.extractFrom(stream);
		this.participantsOnly.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			gid: this.gid,
			lstPotentialNewOwnersID: this.lstPotentialNewOwnersID,
			participantsOnly: this.participantsOnly
		};
	}
}

// * No response data
export class Response {
	public static Name = 'MigrateGatheringOwnership';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
