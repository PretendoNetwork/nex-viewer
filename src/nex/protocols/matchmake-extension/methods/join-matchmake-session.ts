import * as semver from 'compare-versions';
import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import RVBuffer from '@/nex/types/buffer';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'JoinMatchmakeSession';

	private gid = new UInt32();
	private strMessage = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.gid.extractFrom(stream);
		this.strMessage.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			gid: this.gid,
			strMessage: this.strMessage
		};
	}
}

export class Response {
	public static Name = 'JoinMatchmakeSession';

	private sessionKey: RVBuffer;

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		if (semver.satisfies(stream.title.libraryVersions.match_making, '>=3.0.0')) {
			this.sessionKey = new RVBuffer();
			this.sessionKey.extractFrom(stream);
		}

		this.sessionKey.extractFrom(stream);
	}

	public toJSON(): any {
		const json: Record<string, any> = {};

		if (this.sessionKey !== undefined) {
			json.sessionKey = this.sessionKey;
		}

		return json;
	}
}
