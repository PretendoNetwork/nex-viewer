import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import UInt32 from '@/nex/types/uint32';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'FindByID';

	private lstID = new List(new UInt32());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.lstID.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			lstID: this.lstID
		};
	}
}

export class Response {
	public static Name = 'FindByID';

	private lstGathering = new List(new AnyDataHolder());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.lstGathering.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			lstGathering: this.lstGathering
		};
	}
}
