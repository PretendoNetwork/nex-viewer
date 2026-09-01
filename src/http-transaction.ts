import { HTTPRequest, HTTPResponse } from '@/http-message';
import type { CharlesHTTPTransaction } from '@/charles-parser';
import type { SerializedMessage } from '@/types/serialized-message';

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

// * Picks the language Monaco highlights the body with
function bodyLanguage(message: HTTPRequest | HTTPResponse): string {
	const mime = (message.header('content-type') ?? '').split(';')[0].trim().toLowerCase();

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

export default class HTTPTransaction {
	public id = -1; // * Unique ID for the UI layer

	public uri!: string;
	public clientAddress!: string;
	public clientPort!: number;
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

	public toJSON(): SerializedMessage {
		const url = new URL(this.uri);

		return {
			id: this.id,
			elapsed_time: this.elapsedTime,
			transport: 'HTTP',
			source: `${this.clientAddress}:${this.clientPort}`,
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
						...(this.request.body.length !== 0
							? [{
									name: 'Body',
									language: bodyLanguage(this.request),
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
								...(this.response.body.length !== 0
									? [{
											name: 'Body',
											language: bodyLanguage(this.response),
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
