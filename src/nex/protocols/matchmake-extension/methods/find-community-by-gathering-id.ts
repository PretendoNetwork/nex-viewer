import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import UInt32 from '@/nex/types/uint32';
import PersistentGathering from '@/nex/protocols/match-making/types/persistent-gathering';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'FindCommunityByGatheringId';

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
	public static Name = 'FindCommunityByGatheringId';

	private lstCommunity = new List(new PersistentGathering());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.lstCommunity.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			lstCommunity: this.lstCommunity
		};
	}
}
