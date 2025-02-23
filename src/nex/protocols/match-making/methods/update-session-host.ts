import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import Bool from '@/nex/types/bool';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdateSessionHost';

	private gid = new UInt32();
	private isMigrateOwner = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.gid.extractFrom(stream);
		this.isMigrateOwner.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			gid: this.gid,
			isMigrateOwner: this.isMigrateOwner
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UpdateSessionHost';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
