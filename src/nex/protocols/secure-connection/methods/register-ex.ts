import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import StationURL from '@/nex/types/station-url';
import AnyDataHolder from '@/nex/types/any-data-holder';
import QResult from '@/nex/types/qresult';
import UInt32 from '@/nex/types/uint32';
import type RMCMessage from '@/nex/rmc-message';
import type * as RMCs from '@/types/nex/rmcs/secure-connection/register-ex';

export class Request {
	public static Name = 'RegisterEx';

	private vecMyURLs = new List(new StationURL());
	private hCustomData = new AnyDataHolder();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.vecMyURLs.extractFrom(stream);
		this.hCustomData.extractFrom(stream);
	}

	public toJSON(): RMCs.Request {
		return {
			vecMyURLs: this.vecMyURLs,
			hCustomData: this.hCustomData
		};
	}
}

export class Response {
	public static Name = 'RegisterEx';

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
