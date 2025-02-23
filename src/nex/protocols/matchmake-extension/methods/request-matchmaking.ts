import NEXByteStream from '@/nex/byte-stream';
import AutoMatchmakeParam from '@/nex/protocols/match-making/types/auto-matchmake-param';
import UInt64 from '@/nex/types/uint64';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'RequestMatchmaking';

	private autoMatchmakeParam = new AutoMatchmakeParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.autoMatchmakeParam.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			autoMatchmakeParam: this.autoMatchmakeParam
		};
	}
}

export class Response {
	public static Name = 'RequestMatchmaking';

	private requestId = new UInt64();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.requestId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			requestId: this.requestId
		};
	}
}
