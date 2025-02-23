import NEXByteStream from '@/nex/byte-stream';
import RVString from '@/nex/types/string';
import ResultRange from '@/nex/types/result-range';
import List from '@/nex/types/list';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'FindByType';

	private strType = new RVString();
	private resultRange = new ResultRange();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.strType.extractFrom(stream);
		this.resultRange.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			strType: this.strType,
			resultRange: this.resultRange
		};
	}
}

export class Response {
	public static Name = 'FindByType';

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
