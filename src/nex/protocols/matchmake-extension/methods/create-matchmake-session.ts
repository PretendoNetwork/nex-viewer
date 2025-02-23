import * as semver from 'compare-versions';
import NEXByteStream from '@/nex/byte-stream';
import AnyDataHolder from '@/nex/types/any-data-holder';
import RVString from '@/nex/types/string';
import UInt16 from '@/nex/types/uint16';
import UInt32 from '@/nex/types/uint32';
import RVBuffer from '@/nex/types/buffer';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'CreateMatchmakeSession';

	private anyGathering = new AnyDataHolder();
	private strMessage = new RVString();
	private participationCount: UInt16;

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.anyGathering.extractFrom(stream);
		this.strMessage.extractFrom(stream);

		if (semver.satisfies(stream.title.libraryVersions.match_making, '>=3.4.0')) {
			this.participationCount = new UInt16();
			this.participationCount.extractFrom(stream);
		}
	}

	public toJSON(): any {
		const json: Record<string, any> = {
			anyGathering: this.anyGathering,
			strMessage: this.strMessage
		};

		if (this.participationCount !== undefined) {
			json.participationCount = this.participationCount;
		}

		return json;
	}
}

export class Response {
	public static Name = 'CreateMatchmakeSession';

	private gid = new UInt32();
	private sessionKey: RVBuffer;

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.gid.extractFrom(stream);

		if (semver.satisfies(stream.title.libraryVersions.match_making, '>=3.0.0')) {
			this.sessionKey = new RVBuffer();
			this.sessionKey.extractFrom(stream);
		}
	}

	public toJSON(): any {
		const json: Record<string, any> = {
			gid: this.gid
		};

		if (this.sessionKey !== undefined) {
			json.sessionKey = this.sessionKey;
		}

		return json;
	}
}
