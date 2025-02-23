import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import MatchmakeSession from '@/nex/protocols/match-making/types/matchmake-session';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'FindMatchmakeSessionByGatheringIdDetail';

	private gid = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.gid.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			gid: this.gid
		};
	}
}

export class Response {
	public static Name = 'FindMatchmakeSessionByGatheringIdDetail';

	private matchmakeSession = new MatchmakeSession();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.matchmakeSession.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			matchmakeSession: this.matchmakeSession
		};
	}
}
