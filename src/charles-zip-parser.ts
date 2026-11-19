import { URL } from 'node:url';
import AdmZip from 'adm-zip';

export default class CharlesZipParser {
	private buffer: Buffer;
	private _transactions: any[] = [];

	constructor(buffer: Buffer) {
		this.buffer = buffer;

		this.parse();
	}

	private parse(): void {
		const zip = new AdmZip(this.buffer);
		const files = zip.getEntries();
		const groups: Record<number, Record<string, unknown>> = {};

		for (const file of files) {
			const match = file.entryName.match(/^(\d+)-(meta|req|res)\.(\w+)$/);
			if (!match) {
				continue;
			}

			const id = parseInt(match[1]);
			const role = match[2];

			if (!groups[id]) {
				groups[id] = {};
			}

			if (role === 'meta') {
				groups[id].metadata = JSON.parse(file.getData().toString());
			}

			if (role === 'req') {
				groups[id].requestBody = file.getData();
			}

			if (role === 'res') {
				groups[id].responseBody = file.getData();
			}
		}

		for (const [requestID, group] of Object.entries(groups)) {
			const transaction = new CharlesHTTPTransaction(group);

			this._transactions.push({
				id: requestID,
				transaction: transaction
			});
		}

		this._transactions = this._transactions.sort((a, b) => a.id - b.id);
	}

	public* transactions(): Generator<any> {
		for (const { transaction } of this._transactions) {
			yield transaction;
		}
	}
}

// TODO - Make this more generic so it can be shared with CharlesParser?
export class CharlesWebSocketMessage {
	private _source!: 'CLIENT' | 'SERVER';
	private _type!: 'BINARY';
	private _data!: Buffer;
	private _startTime!: string;
	private _endTime!: string;

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

	public get startTime(): string {
		return this._startTime;
	}

	public get endTime(): string {
		return this._endTime;
	}

	constructor(messageJSON: any) {
		this._source = messageJSON.source;
		this._type = messageJSON.type;
		this._data = Buffer.from(messageJSON.content, 'base64');
		this._startTime = messageJSON.start;
		this._endTime = messageJSON.end;
	}
}

// TODO - Make this more generic so it can be shared with CharlesParser?
export class CharlesHTTPRequest {
	private _startLine!: string;
	private _method!: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE';
	private _headers: { key: string; value: string }[] = [];
	private _body?: Buffer;

	// * Public getters
	public get startLine(): string {
		return this._startLine;
	}

	public get method(): 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' {
		return this._method;
	}

	public get headers(): { key: string; value: string }[] {
		return this._headers;
	}

	public get body(): Buffer | undefined {
		return this._body;
	}

	constructor(group: any) {
		this._startLine = group.metadata.request.header.firstLine;
		this._method = group.metadata.method;

		for (const header of group.metadata.request.header.headers) {
			this._headers.push({
				key: header.name,
				value: header.value
			});
		}

		if (group.requestBody) {
			this._body = group.requestBody;
		}
	}
}

// TODO - Make this more generic so it can be shared with CharlesParser?
export class CharlesHTTPResponse {
	private _startLine!: string;
	private _status!: number;
	private _headers: { key: string; value: string }[] = [];
	private _body?: Buffer;

	// * Public getters
	public get startLine(): string {
		return this._startLine;
	}

	public get status(): number {
		return this._status;
	}

	public get headers(): { key: string; value: string }[] {
		return this._headers;
	}

	public get body(): Buffer | undefined {
		return this._body;
	}

	constructor(group: any) {
		this._startLine = group.metadata.response.header.firstLine;
		this._status = Number(group.metadata.response.status);

		for (const header of group.metadata.response.header.headers) {
			this._headers.push({
				key: header.name,
				value: header.value
			});
		}

		if (group.responseBody) {
			this._body = group.responseBody;
		}
	}
}

export class CharlesHTTPTransaction {
	private _url!: URL;
	private _protocolVersion = 'HTTP/1.1';
	private _clientAddress = 'unknown';
	private _clientLocalPort!: number;
	private _clientProxyPort!: number;
	private _serverLocalPort!: number;
	private _serverRemotePort!: number;
	private _request!: CharlesHTTPRequest;
	private _response!: CharlesHTTPResponse;
	private _websocketMessages: CharlesWebSocketMessage[] = [];

	// * Public getters
	public get url(): URL {
		return this._url;
	}

	public get protocolVersion(): string {
		return this._protocolVersion;
	}

	public get clientAddress(): string {
		return this._clientAddress;
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

	constructor(group: any) {
		this._protocolVersion = group.metadata.protocolVersion;
		this._clientAddress = group.metadata.clientAddress.split('/').pop() || 'unknown';

		const query = group.metadata.query ? `?${group.metadata.query}` : '';

		this._url = new URL(`${group.metadata.scheme}://${group.metadata.host}${group.metadata.path}${query}`);
		this._clientLocalPort = group.metadata.clientPort;
		this._clientProxyPort = group.metadata.clientLocalPort;
		this._serverLocalPort = group.metadata.remoteLocalPort;
		this._serverRemotePort = group.metadata.actualPort;
		this._request = new CharlesHTTPRequest(group);
		this._response = new CharlesHTTPResponse(group);

		if (group.metadata.webSocket) {
			for (const messageJSON of group.metadata.webSocket.messages) {
				const message = new CharlesWebSocketMessage(messageJSON);
				this._websocketMessages.push(message);
			}
		}
	}
}
