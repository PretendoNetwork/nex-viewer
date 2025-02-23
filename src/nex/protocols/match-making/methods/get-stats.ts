import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import PID from '@/nex/types/pid';
import UInt8 from '@/nex/types/uint8';
import Bool from '@/nex/types/bool';
import GatheringStats from '@/nex/protocols/match-making/types/gathering-stats';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetStats';

	private idGathering = new UInt32();
	private lstParticipants = new List(new PID());
	private lstColumns = new List(new UInt8());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.idGathering.extractFrom(stream);
		this.lstParticipants.extractFrom(stream);
		this.lstColumns.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			idGathering: this.idGathering,
			lstParticipants: this.lstParticipants,
			lstColumns: this.lstColumns
		};
	}
}

export class Response {
	public static Name = 'GetStats';

	private retval = new Bool();
	private plstStats = new List(new GatheringStats());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.retval.extractFrom(stream);
		this.plstStats.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			retval: this.retval,
			plstStats: this.plstStats
		};
	}
}
