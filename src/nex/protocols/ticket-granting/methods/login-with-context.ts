import NEXByteStream from '@/nex/byte-stream';
import AnyDataHolder from '@/nex/types/any-data-holder';
import QResult from '@/nex/types/qresult';
import PID from '@/nex/types/pid';
import RVBuffer from '@/nex/types/buffer';
import RVConnectionData from '@/nex/types/rv-connection-data';
import type RMCMessage from '@/nex/rmc-message';
import type * as RMCs from '@/types/nex/rmcs/ticket-granting/login-with-context';

export class Request {
	public static Name = 'LoginWithContext';

	private loginData = new AnyDataHolder();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.loginData.extractFrom(stream);
	}

	public toJSON(): RMCs.Request {
		return {
			loginData: this.loginData
		};
	}
}

export class Response {
	public static Name = 'LoginWithContext';

	private retval = new QResult();
	private pidPrincipal = new PID();
	private pbufResponse = new RVBuffer();
	private pConnectionData = new RVConnectionData();

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
		}
	}

	public toJSON(): RMCs.Response {
		return {
			retval: this.retval,
			pidPrincipal: this.pidPrincipal,
			pbufResponse: this.pbufResponse,
			pConnectionData: this.pConnectionData
		};
	}
}
