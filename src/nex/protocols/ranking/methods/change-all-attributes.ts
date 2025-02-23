import NEXByteStream from '@/nex/byte-stream';
import RankingChangeAttributesParam from '@/nex/protocols/ranking/types/ranking-change-attributes-param';
import UInt64 from '@/nex/types/uint64';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'ChangeAllAttributes';

	private changeParam = new RankingChangeAttributesParam();
	private uniqueId = new UInt64();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.changeParam.extractFrom(stream);
		this.uniqueId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			changeParam: this.changeParam,
			uniqueId: this.uniqueId
		};
	}
}

// * No response data
export class Response {
	public static Name = 'ChangeAllAttributes';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
