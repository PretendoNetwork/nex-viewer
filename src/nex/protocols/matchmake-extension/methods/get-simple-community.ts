import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import UInt32 from '@/nex/types/uint32';
import SimpleCommunity from '@/nex/protocols/match-making/types/simple-community';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetSimpleCommunity';

	private gatheringIdList = new List(new UInt32());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.gatheringIdList.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			gatheringIdList: this.gatheringIdList
		};
	}
}

export class Response {
	public static Name = 'GetSimpleCommunity';

	private lstSimpleCommunityList = new List(new SimpleCommunity());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.lstSimpleCommunityList.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			lstSimpleCommunityList: this.lstSimpleCommunityList
		};
	}
}
