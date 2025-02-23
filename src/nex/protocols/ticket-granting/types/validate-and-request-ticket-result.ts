import Structure from '@/nex/types/structure';
import PID from '@/nex/types/pid';
import RVBuffer from '@/nex/types/buffer';
import StationURL from '@/nex/types/station-url';
import DateTime from '@/nex/types/datetime';
import RVString from '@/nex/types/string';
import type NEXByteStream from '@/nex/byte-stream';

export default class ValidateAndRequestTicketResult extends Structure {
	public readonly typeName = 'ValidateAndRequestTicketResult';

	private sourcePid = new PID();
	private bufResponse = new RVBuffer();
	private serviceNodeUrl = new StationURL();
	private currentUtcTime = new DateTime();
	private returnMsg = new RVString();
	private sourceKey = new RVString();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.sourcePid.extractFrom(stream);
		this.bufResponse.extractFrom(stream);
		this.serviceNodeUrl.extractFrom(stream);
		this.currentUtcTime.extractFrom(stream);
		this.returnMsg.extractFrom(stream);
		this.sourceKey.extractFrom(stream);
	}

	public new(): ValidateAndRequestTicketResult {
		return new ValidateAndRequestTicketResult();
	}

	public toJSON(): Record<string, any> {
		return {
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {
				sourcePid: this.sourcePid,
				bufResponse: this.bufResponse,
				serviceNodeUrl: this.serviceNodeUrl,
				currentUtcTime: this.currentUtcTime,
				returnMsg: this.returnMsg,
				sourceKey: this.sourceKey
			}
		};
	}
}
