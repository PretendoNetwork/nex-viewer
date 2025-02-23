import NEXByteStream from '@/nex/byte-stream';
import PID from '@/nex/types/pid';
import QResult from '@/nex/types/qresult';
import RVBuffer from '@/nex/types/buffer';
import RVString from '@/nex/types/string';
import type RMCMessage from '@/nex/rmc-message';
import type * as RMCs from '@/types/nex/rmcs/ticket-granting/request-ticket';

export class Request {
	public static Name = 'RequestTicket';

	private idSource = new PID();
	private idTarget = new PID();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.idSource.extractFrom(stream);
		this.idTarget.extractFrom(stream);
	}

	public toJSON(): RMCs.Request {
		return {
			idSource: this.idSource,
			idTarget: this.idTarget
		};
	}
}

export class Response {
	public static Name = 'RequestTicket';

	private retval = new QResult();
	private bufResponse = new RVBuffer();
	private pSourceKey: RVString;

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.retval.extractFrom(stream);

		// * Wiki states:
		// * "If the source or target pid is invalid, the %retval% field is set to Core::AccessDenied and the ticket is empty."
		// TODO - Is this handled correctly?
		if (this.retval.isSuccess()) {
			this.bufResponse.extractFrom(stream);

			// * Only on the Switch
			// TODO - Is this a good enough check?
			if (stream.hasDataLeft()) {
				this.pSourceKey = new RVString();
				this.pSourceKey.extractFrom(stream);
			}
		}
	}

	public toJSON(): RMCs.Response {
		const json: RMCs.Response = {
			retval: this.retval,
			bufResponse: this.bufResponse
		};

		if (this.pSourceKey !== undefined) {
			json.pSourceKey = this.pSourceKey;
		}

		return json;
	}
}
