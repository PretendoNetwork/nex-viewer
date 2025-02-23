import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import UInt32 from '@/nex/types/uint32';
import MatchmakeSession from '@/nex/protocols/match-making/types/matchmake-session';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'FindMatchmakeSessionByGatheringId';

	private lstGid = new List(new UInt32());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.lstGid.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			lstGid: this.lstGid
		};
	}
}

export class Response {
	public static Name = 'FindMatchmakeSessionByGatheringId';

	private lstMatchmakeSession = new List(new MatchmakeSession());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.lstMatchmakeSession.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			lstMatchmakeSession: this.lstMatchmakeSession
		};
	}
}
