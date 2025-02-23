import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import StationURL from '@/nex/types/station-url';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetParticipantsURLs';

	private idGathering = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.idGathering.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			idGathering: this.idGathering
		};
	}
}

export class Response {
	public static Name = 'GetParticipantsURLs';

	private lstStationURL = new List(new StationURL());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.lstStationURL.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			lstStationURL: this.lstStationURL
		};
	}
}
