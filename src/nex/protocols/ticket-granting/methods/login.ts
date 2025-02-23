import NEXByteStream from '@/nex/byte-stream';
import RVString from '@/nex/types/string';
import QResult from '@/nex/types/qresult';
import PID from '@/nex/types/pid';
import RVBuffer from '@/nex/types/buffer';
import RVConnectionData from '@/nex/types/rv-connection-data';
import type RMCMessage from '@/nex/rmc-message';
import type * as RMCs from '@/types/nex/rmcs/ticket-granting/login';

export class Request {
	public static Name = 'Login';

	private strUserName = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.strUserName.extractFrom(stream);
	}

	public toJSON(): RMCs.Request {
		return {
			strUserName: this.strUserName
		};
	}
}

export class Response {
	public static Name = 'Login';

	private retval = new QResult();
	private pidPrincipal = new PID();
	private pbufResponse = new RVBuffer();
	private pConnectionData = new RVConnectionData();
	private strReturnMsg = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.retval.extractFrom(stream);

		// * Wiki states:
		// * "If the username does not exist, the %retval% field is set to RendezVous::InvalidUsername and the other fields are left blank."
		// TODO - Is this handled correctly?
		if (this.retval.isSuccess()) {
			this.pidPrincipal.extractFrom(stream);
			this.pbufResponse.extractFrom(stream);
			this.pConnectionData.extractFrom(stream);
			this.strReturnMsg.extractFrom(stream);
		}
	}

	public toJSON(): RMCs.Response {
		return {
			retval: this.retval,
			pidPrincipal: this.pidPrincipal,
			pbufResponse: this.pbufResponse,
			pConnectionData: this.pConnectionData,
			strReturnMsg: this.strReturnMsg
		};
	}
}
