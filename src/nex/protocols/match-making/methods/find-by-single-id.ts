import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import Bool from '@/nex/types/bool';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'FindBySingleID';

	private id = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.id.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			id: this.id
		};
	}
}

export class Response {
	public static Name = 'FindBySingleID';

	private bResult = new Bool();
	private pGathering = new AnyDataHolder();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.bResult.extractFrom(stream);
		this.pGathering.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			bResult: this.bResult,
			pGathering: this.pGathering
		};
	}
}
