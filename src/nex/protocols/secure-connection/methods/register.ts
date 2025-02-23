import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import StationURL from '@/nex/types/station-url';
import QResult from '@/nex/types/qresult';
import UInt32 from '@/nex/types/uint32';
import type RMCMessage from '@/nex/rmc-message';
import type * as RMCs from '@/types/nex/rmcs/secure-connection/register';

export class Request {
	public static Name = 'Register';

	private vecMyURLs = new List(new StationURL());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.vecMyURLs.extractFrom(stream);
	}

	public toJSON(): RMCs.Request {
		return {
			vecMyURLs: this.vecMyURLs
		};
	}
}

export class Response {
	public static Name = 'Register';

	private retval = new QResult();
	private pidConnectionID = new UInt32();
	private urlPublic = new StationURL();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.retval.extractFrom(stream);

		// TODO - Is this handled correctly?
		if (this.retval.isSuccess()) {
			this.pidConnectionID.extractFrom(stream);
			this.urlPublic.extractFrom(stream);
		}
	}

	public toJSON(): RMCs.Response {
		return {
			retval: this.retval,
			pidConnectionID: this.pidConnectionID,
			urlPublic: this.urlPublic
		};
	}
}
