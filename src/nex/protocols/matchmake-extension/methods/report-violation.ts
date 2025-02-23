import NEXByteStream from '@/nex/byte-stream';
import PID from '@/nex/types/pid';
import RVString from '@/nex/types/string';
import UInt32 from '@/nex/types/uint32';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'ReportViolation';

	private pid = new PID();
	private userName = new RVString();
	private violationCode = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.pid.extractFrom(stream);
		this.userName.extractFrom(stream);
		this.violationCode.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pid: this.pid,
			userName: this.userName,
			violationCode: this.violationCode
		};
	}
}

// * No response data
export class Response {
	public static Name = 'ReportViolation';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
