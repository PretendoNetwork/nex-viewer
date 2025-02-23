import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import UInt32 from '@/nex/types/uint32';
import AnyDataHolder from '@/nex/types/any-data-holder';
import RVString from '@/nex/types/string';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'AutoMatchmakeWithGatheringId_Postpone';

	private lstGid = new List(new UInt32());
	private anyGathering = new AnyDataHolder();
	private strMessage = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.lstGid.extractFrom(stream);
		this.anyGathering.extractFrom(stream);
		this.strMessage.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			lstGid: this.lstGid,
			anyGathering: this.anyGathering,
			strMessage: this.strMessage
		};
	}
}

export class Response {
	public static Name = 'AutoMatchmakeWithGatheringId_Postpone';

	private joinedGathering = new AnyDataHolder();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.joinedGathering.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			joinedGathering: this.joinedGathering
		};
	}
}
