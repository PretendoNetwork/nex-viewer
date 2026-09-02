import { HTTPRequest, HTTPResponse } from '@/http-message';
import type { HTTPFormField } from '@/http-message';
import type { CharlesHTTPTransaction } from '@/charles-parser';
import type { HTTPFlow } from '@/flows-parser';
import type { HARHTTPTransaction } from '@/har-parser';
import type { SerializedMessage, SerializedField } from '@/types/serialized-message';

// * Rebuild the original HTTP message to reuse the existing HTTP message parser regardless
// * of how the transaction data was extracted from whatever dump format is being used.
// * NOTE: THIS ASSUMES THE DATA, SUCH AS HEADERS AND STARTLINE, ARE ACCURATE TO THE ORIGINAL MESSAGE
function buildMessage(startLine: string, headers: { key: string; value: string }[], body?: Buffer): Buffer {
	const lines = [startLine, ...headers.map(header => `${header.key}: ${header.value}`)];

	return Buffer.concat([
		Buffer.from(`${lines.join('\r\n')}\r\n\r\n`),
		body ?? Buffer.alloc(0)
	]);
}

function mimeType(message: HTTPRequest | HTTPResponse): string {
	return (message.header('content-type') ?? '').split(';')[0].trim().toLowerCase();
}

// * Picks the language Monaco highlights the body with
function bodyLanguage(mime: string): string {
	if (mime === 'application/json' || mime.endsWith('+json')) {
		return 'json';
	}

	if (mime === 'application/xml' || mime === 'text/xml' || mime.endsWith('+xml')) {
		return 'xml';
	}

	if (mime === 'text/html') {
		return 'html';
	}

	return 'plaintext';
}

function formField(field: HTTPFormField): SerializedField {
	if (field.contentType === undefined) {
		return {
			__displayTypeName: 'String',
			__saveable: true,
			__bytes: [...field.value.values()],
			__filename: field.filename ?? field.name,
			__value: field.value.toString()
		};
	}

	return {
		__displayTypeName: 'File',
		__fields: {
			...(field.filename !== undefined
				? {
						filename: {
							__displayTypeName: 'String',
							__value: field.filename
						}
					}
				: {}),
			content_type: {
				__displayTypeName: 'String',
				__value: field.contentType
			},
			size: {
				__displayTypeName: 'Int32',
				__value: field.value.length
			},
			data: {
				__displayTypeName: 'Buffer',
				__typeName: 'Buffer',
				__saveable: true,
				__filename: field.filename ?? field.name,
				__value: [...field.value.values()]
			}
		}
	};
}

export default class HTTPTransaction {
	public id = -1; // * Unique ID for the UI layer

	public uri!: string;
	public clientAddress!: string;
	public clientPort?: number; // * Not every dump format has this
	public elapsedTime = 0;
	public request!: HTTPRequest;
	public response?: HTTPResponse;

	public static fromCharlesTransaction(charlesTransaction: CharlesHTTPTransaction): HTTPTransaction {
		const transaction = new HTTPTransaction();

		transaction.uri = charlesTransaction.url.toString();
		transaction.clientAddress = charlesTransaction.clientAddress;
		transaction.clientPort = charlesTransaction.clientLocalPort;
		transaction.request = new HTTPRequest(buildMessage(
			charlesTransaction.request.startLine,
			charlesTransaction.request.headers,
			charlesTransaction.request.body
		));

		// * Transactions with errors have no status
		if (Number.isFinite(charlesTransaction.response.status)) {
			transaction.response = new HTTPResponse(buildMessage(
				charlesTransaction.response.startLine,
				charlesTransaction.response.headers,
				charlesTransaction.response.body
			));
		}

		return transaction;
	}

	public static fromMitmproxyFlow(flow: HTTPFlow): HTTPTransaction {
		const transaction = new HTTPTransaction();
		const request = flow.request;
		const headers = request.headers.map(([key, value]) => ({ key, value }));
		const httpVersion = request.http_version.toString();
		const method = request.method.toString();
		const authority = request.authority.toString();

		// * This info is scattered between several places depending on different contexts
		const hostHeader = headers.find(header => header.key.toLowerCase() === 'host')?.value;
		const host = (httpVersion === 'HTTP/2.0' || httpVersion === 'HTTP/3' ? authority || hostHeader : hostHeader) || request.host;
		const isConnect = method === 'CONNECT';
		const target = isConnect ? authority || `${request.host}:${request.port}` : request.path.toString();

		transaction.uri = `${request.scheme.toString()}://${host}${isConnect || target === '*' ? '' : target}`;
		transaction.clientAddress = flow.client_conn.peername.ip;
		transaction.clientPort = flow.client_conn.peername.port;

		transaction.request = new HTTPRequest(buildMessage(
			`${method} ${target} ${httpVersion}`,
			headers,
			request.content ?? undefined
		));

		if (flow.response) {
			transaction.response = new HTTPResponse(buildMessage(
				// * mitmproxy specifically uses ISO-8859-1 here, so copying that just to be safe
				`${flow.response.http_version.toString()} ${flow.response.status_code} ${flow.response.reason.toString('latin1')}`.trim(),
				flow.response.headers.map(([key, value]) => ({ key, value })),
				flow.response.content ?? undefined
			));
		}

		return transaction;
	}

	public static fromHARTransaction(harTransaction: HARHTTPTransaction): HTTPTransaction {
		const transaction = new HTTPTransaction();

		transaction.uri = harTransaction.url.toString();

		// * HAR dumps don't seem to store the client info
		transaction.clientAddress = 'CLIENT';
		transaction.request = new HTTPRequest(buildMessage(
			harTransaction.request.startLine,
			harTransaction.request.headers,
			harTransaction.request.body
		));

		// * The HAR spec doesn't seem to define a way to say "this request failed and/or has no reply"?
		// TODO - Figure this out
		transaction.response = new HTTPResponse(buildMessage(
			harTransaction.response.startLine,
			harTransaction.response.headers,
			harTransaction.response.body
		));

		return transaction;
	}

	public toJSON(): SerializedMessage {
		const url = new URL(this.uri);
		const requestMime = mimeType(this.request);
		const responseMime = this.response ? mimeType(this.response) : '';

		return {
			id: this.id,
			elapsed_time: this.elapsedTime,
			transport: 'HTTP',
			source: this.clientPort === undefined ? this.clientAddress : `${this.clientAddress}:${this.clientPort}`,
			destination: `${url.protocol}//${url.hostname}`,
			destination_path: url.pathname,
			method: this.request.method,
			status: this.response?.statusCode,
			overview_sections: [
				{
					title: 'General',
					columns: 2,
					fields: [
						{
							name: 'Elapsed Time',
							value: this.elapsedTime.toFixed(6)
						},
						{
							name: 'URL',
							value: this.uri
						},
						{
							name: 'HTTP Version',
							value: this.request.protocol
						},
						...(this.response !== undefined
							? [{
									name: 'Status',
									value: `${this.response.statusCode} ${this.response.reasonPhrase}`.trim()
								}]
							: [])
					]
				}
			],
			hex_views: [
				{
					title: 'Request Body',
					bytes: [...this.request.body.values()]
				},
				...(this.response !== undefined
					? [{
							title: 'Response Body',
							bytes: [...this.response.body.values()]
						}]
					: [])
			],
			serialized_tabs: [
				{
					title: 'Request',
					fields: [
						{
							name: 'Headers',
							data: {
								__displayTypeName: 'HTTP Headers',
								__fields: Object.fromEntries(
									this.request.headers.map(([name, value]) => [
										name,
										{
											__displayTypeName: 'String',
											__value: value
										}
									])
								)
							}
						},
						...(this.request.form.length !== 0
							? [{
									name: 'Form',
									data: {
										__displayTypeName: 'Form Data',
										__fields: Object.fromEntries(this.request.form.map(field => [field.name, formField(field)]))
									}
								}]
							: []),
						...(this.request.body.length !== 0
							? [{
									name: 'Body',
									bytes: [...this.request.body.values()],
									...(requestMime.startsWith('image/')
										? { image: requestMime }
										: { language: bodyLanguage(requestMime) }),
									data: {
										__value: this.request.text()
									}
								}]
							: [])
					]
				},
				...(this.response !== undefined
					? [{
							title: 'Response',
							fields: [
								{
									name: 'Headers',
									data: {
										__displayTypeName: 'HTTP Headers',
										__fields: Object.fromEntries(
											this.response.headers.map(([name, value]) => [
												name,
												{
													__displayTypeName: 'String',
													__value: value
												}
											])
										)
									}
								},
								...(this.response.form.length !== 0
									? [{
											name: 'Form',
											data: {
												__displayTypeName: 'Form Data',
												__fields: Object.fromEntries(this.response.form.map(field => [field.name, formField(field)]))
											}
										}]
									: []),
								...(this.response.body.length !== 0
									? [{
											name: 'Body',
											bytes: [...this.response.body.values()],
											...(responseMime.startsWith('image/')
												? { image: responseMime }
												: { language: bodyLanguage(responseMime) }),
											data: {
												__value: this.response.text()
											}
										}]
									: [])
							]
						}]
					: [])
			]
		};
	}
}
