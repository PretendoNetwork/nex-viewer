import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import ResultRange from '@/nex/types/result-range';
import Bool from '@/nex/types/bool';
import List from '@/nex/types/list';
import DeletionEntry from '@/nex/protocols/match-making/types/deletion-entry';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetPendingDeletions';

	private uiReason = new UInt32();
	private resultRange = new ResultRange();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.uiReason.extractFrom(stream);
		this.resultRange.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			uiReason: this.uiReason,
			resultRange: this.resultRange
		};
	}
}

export class Response {
	public static Name = 'GetPendingDeletions';

	private retval = new Bool();
	private lstDeletions = new List(new DeletionEntry());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.retval.extractFrom(stream);
		this.lstDeletions.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			retval: this.retval,
			lstDeletions: this.lstDeletions
		};
	}
}
