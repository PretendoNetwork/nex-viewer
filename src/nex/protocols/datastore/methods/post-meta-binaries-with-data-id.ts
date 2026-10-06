import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import UInt64 from '@/nex/types/uint64';
import Bool from '@/nex/types/bool';
import QResult from '@/nex/types/qresult';
import DataStorePreparePostParam from '@/nex/protocols/datastore/types/datastore-prepare-post-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'PostMetaBinariesWithDataId';

	private dataIds = new List(new UInt64());
	private params = new List(new DataStorePreparePostParam());
	private transactional = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.dataIds.extractFrom(stream);
		this.params.extractFrom(stream);
		this.transactional.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			dataIds: this.dataIds,
			params: this.params,
			transactional: this.transactional
		};
	}
}

export class Response {
	public static Name = 'PostMetaBinariesWithDataId';

	private pResults = new List(new QResult());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pResults.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pResults: this.pResults
		};
	}
}
