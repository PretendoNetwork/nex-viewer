import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import GatheringStats from '@/nex/protocols/match-making/types/gathering-stats';
import Bool from '@/nex/types/bool';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'ReportStats';

	private idGathering = new UInt32();
	private lstStats = new List(new GatheringStats());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.idGathering.extractFrom(stream);
		this.lstStats.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			idGathering: this.idGathering,
			lstStats: this.lstStats
		};
	}
}

export class Response {
	public static Name = 'ReportStats';

	private retval = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.retval.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			retval: this.retval
		};
	}
}
