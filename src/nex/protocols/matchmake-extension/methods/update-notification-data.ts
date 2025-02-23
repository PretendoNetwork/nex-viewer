import * as semver from 'compare-versions';
import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import UInt64 from '@/nex/types/uint64';
import RVString from '@/nex/types/string';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'UpdateNotificationData';

	private uiType = new UInt32();
	private uiParam1: UInt32 | UInt64;
	private uiParam2: UInt32 | UInt64;
	private strParam = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		if (semver.satisfies(stream.title.libraryVersions.match_making, '>=4.0.0')) {
			this.uiParam1 = new UInt64();
			this.uiParam2 = new UInt64();
		} else {
			this.uiParam1 = new UInt32();
			this.uiParam2 = new UInt32();
		}

		this.uiType.extractFrom(stream);
		this.uiParam1.extractFrom(stream);
		this.uiParam2.extractFrom(stream);
		this.strParam.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			uiType: this.uiType,
			uiParam1: this.uiParam1,
			uiParam2: this.uiParam2,
			strParam: this.strParam
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UpdateNotificationData';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
