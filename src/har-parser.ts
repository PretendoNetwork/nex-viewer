// TODO - Move these types to the `@/types` folder like the rest of the types once well-defined
// * Using http://www.softwareishard.com/blog/har-12-spec/ as the spec since
// * https://w3c.github.io/web-performance/specs/HAR/Overview.html says to not be used? The
// * softwareishard source comes from https://en.wikipedia.org/wiki/HAR_(file_format)

export interface HARCreator {
	name: string;
	version: string;
	comment?: string;
}

export interface HARBrowser {
	name: string;
	version: string;
	comment?: string;
}

export interface HARPageTimings {
	onContentLoad?: number;
	onLoad?: number;
	comment?: string;
}

export interface HARPage {
	startedDateTime: string;
	id: string;
	title: string;
	pageTimings: HARPageTimings;
	comment?: string;
}

export interface HARCookie {
	name: string;
	value: string;
	path?: string;
	domain?: string;
	expires?: string;
	httpOnly?: boolean;
	secure?: boolean;
	comment?: string;
}

export interface HARHeader {
	name: string;
	value: string;
	comment?: string;
}

export interface HARQueryStringParam {
	name: string;
	value: string;
	comment?: string;
}

export interface HARParam {
	name: string;
	value?: string;
	fileName?: string;
	contentType?: string;
	comment?: string;
}

export interface HARPostData {
	mimeType: string;
	params?: HARParam[]; // * `text` and `params` are mutually exclusive
	text?: string; // * `text` and `params` are mutually exclusive
	comment?: string;
}

export interface HARContent {
	size: number;
	compression?: number;
	mimeType: string;
	text?: string;
	encoding?: string; // * Encoding used for response text field e.g "base64". Leave out this field if the text field is HTTP decoded (decompressed & unchunked), than trans-coded from its original character set into UTF-8
	comment?: string;
}

export interface HARRequest {
	method: string;
	url: string;
	httpVersion: string;
	cookies: HARCookie[];
	headers: HARHeader[];
	queryString: HARQueryStringParam[];
	postData?: HARPostData;
	headersSize: number; // * -1 when not available
	bodySize: number; // * -1 when not available
	comment?: string;
}

export interface HARResponse {
	status: number;
	statusText: string;
	httpVersion: string;
	cookies: HARCookie[];
	headers: HARHeader[];
	content: HARContent;
	redirectURL: string;
	headersSize: number; // * -1 when not available
	bodySize: number; // * 0 for cached responses, -1 when not available
	comment?: string;
}

export interface HARCacheEntry {
	expires?: string;
	lastAccess: string;
	eTag: string;
	hitCount: number;
	comment?: string;
}

export interface HARCache {
	beforeRequest?: HARCacheEntry | null;
	afterRequest?: HARCacheEntry | null;
	comment?: string;
}

// * Fields have a value of -1 when the timing doesn't apply
export interface HARTimings {
	blocked?: number;
	dns?: number;
	connect?: number;
	send: number;
	wait: number;
	receive: number;
	ssl?: number; // * Same as `connect` for 1.1 compatibility
	comment?: string;
}

export interface HAREntry {
	pageref?: string;
	startedDateTime: string; // * ISO 8601
	time: number; // * Milliseconds
	request: HARRequest;
	response: HARResponse;
	cache: HARCache;
	timings: HARTimings;
	serverIPAddress?: string;
	connection?: string;
	comment?: string;
}

export interface HARLog {
	version: string; // * "1.1" is assumed when empty
	creator: HARCreator;
	browser?: HARBrowser;
	pages?: HARPage[];
	entries: HAREntry[];
	comment?: string;
}

export interface HARFile {
	log: HARLog;
}

function headersToPairs(headers: HARHeader[]): { key: string; value: string }[] {
	return headers.map(header => ({
		key: header.name,
		value: header.value
	}));
}

export default class HARParser {
	private buffer: Buffer;
	private _log!: HARLog;

	constructor(buffer: Buffer) {
		this.buffer = buffer;

		this.parse();
	}

	private parse(): void {
		const har: HARFile = JSON.parse(this.buffer.toString());

		if (!har.log || !Array.isArray(har.log.entries)) {
			throw new Error('Invalid HAR file. Expected a log with entries');
		}

		this._log = har.log;
	}

	public* transactions(): Generator<HARHTTPTransaction> {
		for (const entry of this._log.entries) {
			yield new HARHTTPTransaction(entry);
		}
	}
}

export class HARHTTPRequest {
	private _startLine!: string;
	private _method!: string;
	private _headers: { key: string; value: string }[] = [];
	private _cookies: HARCookie[] = [];
	private _queryString: HARQueryStringParam[] = [];
	private _params: HARParam[] = [];
	private _body?: Buffer;

	// * Public getters
	public get startLine(): string {
		return this._startLine;
	}

	public get method(): string {
		return this._method;
	}

	public get headers(): { key: string; value: string }[] {
		return this._headers;
	}

	public get cookies(): HARCookie[] {
		return this._cookies;
	}

	public get queryString(): HARQueryStringParam[] {
		return this._queryString;
	}

	public get params(): HARParam[] {
		return this._params;
	}

	public get body(): Buffer | undefined {
		return this._body;
	}

	constructor(entry: HAREntry) {
		const request = entry.request;

		this._method = request.method;
		this._headers = headersToPairs(request.headers);
		this._cookies = request.cookies ?? [];
		this._queryString = request.queryString ?? [];
		this._params = request.postData?.params ?? [];

		// * When a body was posted as `params` rather than `text` there are no original bytes to hand back
		// TODO - Figure this out
		if (request.postData?.text !== undefined) {
			this._body = Buffer.from(request.postData.text);
		}

		const url = new URL(request.url);

		this._startLine = `${request.method} ${url.pathname}${url.search} ${request.httpVersion}`;
	}
}

export class HARHTTPResponse {
	private _startLine!: string;
	private _status!: number;
	private _statusText!: string;
	private _headers: { key: string; value: string }[] = [];
	private _cookies: HARCookie[] = [];
	private _body?: Buffer;

	// * Public getters
	public get startLine(): string {
		return this._startLine;
	}

	public get status(): number {
		return this._status;
	}

	public get statusText(): string {
		return this._statusText;
	}

	public get headers(): { key: string; value: string }[] {
		return this._headers;
	}

	public get cookies(): HARCookie[] {
		return this._cookies;
	}

	public get body(): Buffer | undefined {
		return this._body;
	}

	constructor(entry: HAREntry) {
		const response = entry.response;
		const content = response.content;

		this._status = response.status;
		this._statusText = response.statusText;
		this._headers = headersToPairs(response.headers);
		this._cookies = response.cookies ?? [];

		// TODO - Support other encodings if they exist
		if (content?.text !== undefined) {
			this._body = content.encoding === 'base64' ? Buffer.from(content.text, 'base64') : Buffer.from(content.text);
		}

		this._startLine = `${response.httpVersion} ${response.status} ${response.statusText}`.trim();
	}
}

export class HARHTTPTransaction {
	private _url!: URL;
	private _serverAddress?: string;
	private _connection?: string;
	private _startTime!: number;
	private _duration!: number;
	private _request!: HARHTTPRequest;
	private _response!: HARHTTPResponse;

	// * Public getters
	public get url(): URL {
		return this._url;
	}

	public get serverAddress(): string | undefined {
		return this._serverAddress;
	}

	public get connection(): string | undefined {
		return this._connection;
	}

	// * Converted to seconds already
	public get startTime(): number {
		return this._startTime;
	}

	public get duration(): number {
		return this._duration;
	}

	public get request(): HARHTTPRequest {
		return this._request;
	}

	public get response(): HARHTTPResponse {
		return this._response;
	}

	constructor(entry: HAREntry) {
		this._url = new URL(entry.request.url);
		this._serverAddress = entry.serverIPAddress;
		this._connection = entry.connection;
		this._startTime = Date.parse(entry.startedDateTime) / 1000;
		this._duration = entry.time / 1000;
		this._request = new HARHTTPRequest(entry);
		this._response = new HARHTTPResponse(entry);
	}
}
