import { URL } from 'node:url';
import { ObjectInputStream } from '@pretendonetwork/java.io';
import ByteStream from '@/byte-stream';
import type {
	JavaObject,
	JavaClassDesc
} from '@pretendonetwork/java.io';

export default class CharlesParser {
	private buffer: Buffer;
	private stream: ByteStream;
	private _transactions: CharlesHTTPTransaction[] = [];

	constructor(buffer: Buffer) {
		this.buffer = buffer;
		this.stream = new ByteStream(this.buffer);

		this.parse();
	}

	private parse(): void {
		const ois = new ObjectInputStream(this.stream);
		const objects = ois.readAll();
		const session = objects[0];
		const transactionJSONs = this.getTransactionJSONs(session);

		for (const transactionJSON of transactionJSONs) {
			const transaction = new CharlesHTTPTransaction(transactionJSON);
			this._transactions.push(transaction);
		}
	}

	// * Extract all "com.xk72.charles.model.Transaction" objects from the session.
	// * "com.xk72.charles.model.Transaction" is what stores the true request details.
	private getTransactionJSONs(session: JavaObject): JavaObject[] {
		const transactions: JavaObject[] = [];
		const modelNode = session.description!.info.superClass!; // * These will always exist in this case.
		const childrenArrayList = modelNode.classData.values.children.description;
		const hosts = childrenArrayList.classData.annotation.splice(1); // * Index 0 is the capacity of the array as a buffer.

		// * Charles "com.xk72.charles.model.ModelNode" classes store the minimal number of
		// * children possible. The children of "com.xk72.charles.model.Session" are all
		// * "com.xk72.charles.model.Host" classes. If a new host is being requested then
		// * a new "com.xk72.charles.model.Host" class instance is created. Otherwise an
		// * existing instance is used. This means even if 100 requests were made, but only
		// * to the same 2 hosts, only 2 "com.xk72.charles.model.Host" objects will exist here.
		// * This also means request data is stored wildly out of order.
		for (const host of hosts) {
			const path = host.description.info.superClass; // * "com.xk72.charles.model.Host" extends "com.xk72.charles.model.Path".
			transactions.push(...this.parsePath(path));
		}

		return transactions.sort((a, b) => {
			// * Since transactions are stored out of order, need to reorder them.
			const startTime1 = a.description!.classData.values.startTime.description.classData.annotation[0].data.readBigInt64BE();
			const startTime2 = b.description!.classData.values.startTime.description.classData.annotation[0].data.readBigInt64BE();

			return Number(startTime1) - Number(startTime2);
		});
	}

	// * Recursively parse "com.xk72.charles.model.Path" objects to find their transactions.
	private parsePath(path: JavaClassDesc): JavaObject[] {
		// * A "com.xk72.charles.model.Path" object has 2 points of interest:
		// *   - It's path value
		// *   - It's children array
		// * Every "com.xk72.charles.model.Path" will hold one portion of the request path along with
		// * a "java.util.ArrayList" of child objects. Each child may be either a "com.xk72.charles.model.Path"
		// * object or a "com.xk72.charles.model.Transaction" object. If a child is a "com.xk72.charles.model.Transaction"
		// * object then that child holds the full request details for a given path. If a child is a
		// * "com.xk72.charles.model.Path" object then that child holds another portion of a different request path.
		// *
		// * For example if there was a request to both "https://account.nintendo.net/v1/api/people/@me/profile" and
		// * "https://account.nintendo.net/v1/api/people/@me" then the session structure would look like:
		// *
		// * com.xk72.charles.model.Session
		// * └── children
		// * 	└── com.xk72.charles.model.Host (extends com.xk72.charles.model.Path)
		// * 		└── children
		// * 			└── com.xk72.charles.model.Path
		// * 				├── value: "v1"
		// * 				└── children
		// * 					└── com.xk72.charles.model.Path
		// * 						├── value: "api"
		// * 						└── children
		// * 							└── com.xk72.charles.model.Path
		// * 								├── value: "people"
		// * 								└── children
		// * 									└── com.xk72.charles.model.Path
		// * 										├── value: "@me"
		// * 										└── children
		// * 											├── com.xk72.charles.model.Path
		// * 											│   ├── value: "profile"
		// * 											│   └── children
		// * 											│       └── com.xk72.charles.model.Transaction
		// * 											│           └── request data for "/v1/api/people/@me/profile"
		// * 											└── com.xk72.charles.model.Transaction
		// * 												└── request data for "/v1/api/people/@me"

		const transactions: JavaObject[] = [];
		const modelNode = path.info.superClass!; // * This will always exist in this case.
		const childrenArrayList = modelNode.classData.values.children.description;
		const children = childrenArrayList.classData.annotation.splice(1); // * Index 0 is the capacity of the array as a buffer.

		for (const child of children) {
			const className = child.description.className.value;

			if (className === 'com.xk72.charles.model.Path') {
				transactions.push(...this.parsePath(child.description));
			} else {
				transactions.push(child);
			}
		}

		return transactions;
	}

	public *transactions(): Generator<CharlesHTTPTransaction> {
		for (const transaction of this._transactions) {
			yield transaction;
		}
	}
}

export class CharlesWebSocketMessage {
	private _source: 'CLIENT' | 'SERVER';
	private _type: 'BINARY';
	private _data: Buffer;

	// * Public getters
	public get source(): 'CLIENT' | 'SERVER' {
		return this._source;
	}

	public get type(): 'BINARY' {
		return this._type;
	}

	public get data(): Buffer {
		return this._data;
	}

	constructor(messageJSON: JavaObject) {
		if (!messageJSON.description) {
			return; // * This will never happen in this case.
		}

		this._source = messageJSON.description.classData.values.source.constant.value;
		this._type = messageJSON.description.classData.values.type.constant.value;
		this._data = Buffer.from(messageJSON.description.classData.values.content.values);
	}
}

export class CharlesHTTPRequest {
	private _method: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE';
	private _headers: { key: string; value: string }[] = [];
	private _body?: Buffer;

	// * Public getters
	public get method(): 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' {
		return this._method;
	}

	public get headers(): { key: string; value: string }[] {
		return this._headers;
	}

	public get body(): Buffer | undefined {
		return this._body;
	}

	constructor(transactionJSON: JavaObject) {
		if (!transactionJSON.description) {
			return; // * This will never happen in this case.
		}

		this._method = transactionJSON.description.classData.values.scheme.value;

		for (let i = 1; i < transactionJSON.description.classData.values.requestHeader.description.classData.values.firstLine.description.classData.annotation.length; i++) {
			const key = transactionJSON.description.classData.values.requestHeader.description.classData.values.firstLine.description.classData.annotation[i].value;
			const value = transactionJSON.description.classData.values.requestHeader.description.classData.annotation[0].description.classData.annotation[i].value;

			this._headers.push({ key, value });
		}

		if (transactionJSON.description.classData.values.requestBody) {
			this._body = Buffer.from(transactionJSON.description.classData.values.requestBody.values);
		}
	}
}

export class CharlesHTTPResponse {
	private _status: number;
	private _headers: { key: string; value: string }[] = [];
	private _body?: Buffer;

	// * Public getters
	public get status(): number {
		return this._status;
	}

	public get headers(): { key: string; value: string }[] {
		return this._headers;
	}

	public get body(): Buffer | undefined {
		return this._body;
	}

	constructor(transactionJSON: JavaObject) {
		if (!transactionJSON.description) {
			return; // * This will never happen in this case.
		}

		this._status = Number(transactionJSON.description.classData.values.responseHeader.description.classData.annotation[1].value.split(' ')[1]);

		for (let i = 1; i < transactionJSON.description.classData.values.responseHeader.description.classData.values.firstLine.description.classData.annotation.length; i++) {
			const key = transactionJSON.description.classData.values.responseHeader.description.classData.values.firstLine.description.classData.annotation[i].value;
			const value = transactionJSON.description.classData.values.responseHeader.description.classData.annotation[0].description.classData.annotation[i].value;

			this._headers.push({ key, value });
		}

		if (transactionJSON.description.classData.values.responseBody) {
			this._body = Buffer.from(transactionJSON.description.classData.values.responseBody.values);
		}
	}
}

export class CharlesHTTPTransaction {
	private _url: URL;
	private _clientLocalPort: number;
	private _clientProxyPort: number;
	private _serverLocalPort: number;
	private _serverRemotePort: number;
	private _request: CharlesHTTPRequest;
	private _response: CharlesHTTPResponse;
	private _websocketMessages: CharlesWebSocketMessage[] = [];

	// * Public getters
	public get url(): URL {
		return this._url;
	}

	public get clientLocalPort(): number {
		return this._clientLocalPort;
	}

	public get clientProxyPort(): number {
		return this._clientProxyPort;
	}

	public get serverLocalPort(): number {
		return this._serverLocalPort;
	}

	public get serverRemotePort(): number {
		return this._serverRemotePort;
	}

	public get request(): CharlesHTTPRequest {
		return this._request;
	}

	public get response(): CharlesHTTPResponse {
		return this._response;
	}

	public get websocketMessages(): CharlesWebSocketMessage[] {
		return this._websocketMessages;
	}

	constructor(transactionJSON: JavaObject) {
		if (!transactionJSON.description) {
			return; // * This will never happen in this case.
		}

		const protocol = transactionJSON.description.classData.values.protocol.value;
		const host = transactionJSON.description.classData.values.host.value;
		let path = '';

		// * If the transaction has an error, this doesn't exist
		// TODO - Track these errors
		if (transactionJSON.description.classData.values.file) {
			// * `file` contains the query string too
			path = transactionJSON.description.classData.values.file.value;
		}

		this._url = new URL(`${protocol}://${host}${path}`);
		this._clientLocalPort = transactionJSON.description.classData.values.clientPort;
		this._clientProxyPort = transactionJSON.description.classData.values.clientLocalPort;
		this._serverLocalPort = transactionJSON.description.classData.values.remoteLocalPort;
		this._serverRemotePort = transactionJSON.description.classData.values.actualPort;
		this._request = new CharlesHTTPRequest(transactionJSON);
		this._response = new CharlesHTTPResponse(transactionJSON);

		if (transactionJSON.description.classData.values.messages) {
			for (const messageJSON of transactionJSON.description.classData.values.messages.description.classData.annotation.splice(1)) {
				const message = new CharlesWebSocketMessage(messageJSON);
				this._websocketMessages.push(message);
			}
		}
	}
}
