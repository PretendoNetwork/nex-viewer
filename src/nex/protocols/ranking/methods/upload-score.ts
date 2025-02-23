import NEXByteStream from '@/nex/byte-stream';
import RankingScoreData from '@/nex/protocols/ranking/types/ranking-score-data';
import UInt64 from '@/nex/types/uint64';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UploadScore';

	private scoreData = new RankingScoreData();
	private uniqueId = new UInt64();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.scoreData.extractFrom(stream);
		this.uniqueId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			scoreData: this.scoreData,
			uniqueId: this.uniqueId
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UploadScore';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
