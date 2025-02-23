import * as semver from 'compare-versions';
import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import Bool from '@/nex/types/bool';
import UInt16 from '@/nex/types/uint16';
import RVBuffer from '@/nex/types/buffer';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'JoinMatchmakeSessionEx';

	private gid = new UInt32();
	private strMessage = new RVString();
	private dontCareMyBlackList = new Bool();
	private participationCount: UInt16;

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.gid.extractFrom(stream);
		this.strMessage.extractFrom(stream);
		this.dontCareMyBlackList.extractFrom(stream);

		if (semver.satisfies(stream.title.libraryVersions.match_making, '>=3.4.0')) {
			this.participationCount = new UInt16();
			this.participationCount.extractFrom(stream);
		}
	}

	public toJSON(): any {
		const json: Record<string, any> = {
			gid: this.gid,
			strMessage: this.strMessage,
			dontCareMyBlackList: this.dontCareMyBlackList
		};

		if (this.participationCount !== undefined) {
			json.participationCount = this.participationCount;
		}

		return json;
	}
}

export class Response {
	public static Name = 'JoinMatchmakeSessionEx';

	private sessionKey = new RVBuffer();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.sessionKey.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			sessionKey: this.sessionKey
		};
	}
}
