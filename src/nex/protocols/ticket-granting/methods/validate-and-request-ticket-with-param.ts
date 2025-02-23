import NEXByteStream from '@/nex/byte-stream';
import ValidateAndRequestTicketParam from '@/nex/protocols/ticket-granting/types/validate-and-request-ticket-param';
import ValidateAndRequestTicketResult from '@/nex/protocols/ticket-granting/types/validate-and-request-ticket-result';
import type RMCMessage from '@/nex/rmc-message';
import type * as RMCs from '@/types/nex/rmcs/ticket-granting/validate-and-request-ticket-with-param';

export class Request {
	public static Name = 'ValidateAndRequestTicket';

	private param = new ValidateAndRequestTicketParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.param.extractFrom(stream);
	}

	public toJSON(): RMCs.Request {
		return {
			param: this.param
		};
	}
}

export class Response {
	public static Name = 'ValidateAndRequestTicket';

	private result = new ValidateAndRequestTicketResult();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.result.extractFrom(stream);
	}

	public toJSON(): RMCs.Response {
		return {
			result: this.result
		};
	}
}
