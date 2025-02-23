import NEXByteStream from '@/nex/byte-stream';
import PID from '@/nex/types/pid';
import UInt32 from '@/nex/types/uint32';
import UInt64 from '@/nex/types/uint64';
import RVString from '@/nex/types/string';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'DebugNotifyEvent';

	private pid = new PID();
	private mainType = new UInt32();
	private subType = new UInt32();
	private param1 = new UInt64();
	private param2 = new UInt64();
	private stringParam = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.pid.extractFrom(stream);
		this.mainType.extractFrom(stream);
		this.subType.extractFrom(stream);
		this.param1.extractFrom(stream);
		this.param2.extractFrom(stream);
		this.stringParam.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pid: this.pid,
			mainType: this.mainType,
			subType: this.subType,
			param1: this.param1,
			param2: this.param2,
			stringParam: this.stringParam
		};
	}
}

// * No response data
export class Response {
	public static Name = 'DebugNotifyEvent';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
