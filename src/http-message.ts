import zlib from 'node:zlib';

export enum HTTPMessageDirection {
	REQUEST,
	RESPONSE
}

type HTTPMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH' | 'QUERY';

// * `FormData` holds its values as Blobs, which use an async-based API. We do everything sync
export interface HTTPFormField {
	name: string;
	value: Buffer;
	filename?: string; // * Only set when the part is a file
	contentType?: string; // * The parts own content type, when it declared one
}
type ContentEncoding = 'gzip' | 'x-gzip' | 'compress' | 'x-compress' | 'deflate' | 'br' | 'zstd' | 'dcb' | 'dcz';

// TODO - Add more convenience methods to the classes

abstract class HTTPMessageBase {
	abstract readonly direction: HTTPMessageDirection;
	public readonly headers: string[][];
	public readonly body: Buffer = Buffer.alloc(0);
	public readonly bodyRaw: Buffer = Buffer.alloc(0);
	public readonly form: HTTPFormField[] = [];

	protected readonly startLine: string;

	constructor(data: Buffer) {
		const metadata = readMessageMetadata(data);
		this.startLine = metadata.lines[0];
		this.headers = linesToHeaders(metadata.lines.slice(1));

		if (metadata.bodyStart !== -1) {
			this.body = data.subarray(metadata.bodyStart);
			this.bodyRaw = this.body;

			const contentEncodingsHeaders = this.header('content-encoding', true);

			if (contentEncodingsHeaders) {
				// * Bodies can be compressed multiple times, and the header defines the order in which they were applied so reverse the list
				// TODO - Remove this "as"
				const encodings = contentEncodingsHeaders.split(',').map(encoding => encoding.trim().toLowerCase()).filter(encoding => encoding).reverse() as ContentEncoding[];
				let decompressed = this.body;

				try {
					for (const encoding of encodings) {
						switch (encoding) {
							case 'gzip':
							case 'x-gzip': // * Legacy name
								decompressed = zlib.gunzipSync(decompressed);
								break;
							case 'compress':
							case 'x-compress': // * Legacy name
								// TODO - I couldn't find a web server that gave a sample of this to verify if it worked
								console.warn('HTTP message using the compress/x-compress content encoding. This encoding format is not yet supported');
								break;
							case 'deflate':
								// TODO - I couldn't find a web server that gave a sample of this to verify if it worked
								console.warn('HTTP message using the deflate content encoding. This encoding format is not yet supported');
								break;
							case 'br':
								decompressed = zlib.brotliDecompressSync(decompressed);
								break;
							case 'zstd':
								decompressed = zlib.zstdDecompressSync(decompressed);
								break;
							case 'dcb':
								// TODO - This requires knowledge of an external dictionary, and this class is stateless so it doesn't have access to that. Maybe add this later
								console.warn('HTTP message using the dcb content encoding. This encoding format is not yet supported');
								break;
							case 'dcz':
								// TODO - This requires knowledge of an external dictionary, and this class is stateless so it doesn't have access to that. Maybe add this later
								console.warn('HTTP message using the dcz content encoding. This encoding format is not yet supported');
								break;
						}
					}

					this.body = decompressed;
				} catch {
					// * Sanity check. Some dump formats like Fiddler modify the request/response bodies
					// * so fallback to the raw bytes if anything goes wrong
					this.body = this.bodyRaw;
				}
			}

			const contentType = this.header('content-type');

			if (contentType === 'application/x-www-form-urlencoded') {
				for (const [name, value] of new URLSearchParams(this.text())) {
					this.form.push({
						name: name,
						value: Buffer.from(value)
					});
				}
			}

			// * I couldn't find any other multipart form parser than ran synchronously. They
			// * all either were async, like `new Response(data).formData()` or used an event
			// * system with an API like `.on()`, neither of which fit here. This is the most
			// * basic form of a parser I could manage, it's not battle-tested but it does
			// * decode HPP bodies correctly. So I'm calling that good enough for our usecase
			if (contentType && contentType.startsWith('multipart/form-data')) {
				const parts = contentType.split(';');
				let boundary = '';

				for (const part of parts) {
					if (part.trim().startsWith('boundary=')) {
						boundary = '--' + part.split('=')[1];
					}
				}

				const boundaryOffsets: number[] = [];
				let offset = this.body.indexOf(boundary);

				while (offset !== -1) {
					boundaryOffsets.push(offset);
					offset = this.body.indexOf(boundary, offset + boundary.length);
				}

				for (let i = 0; i < boundaryOffsets.length - 1; i++) {
					const offset1 = boundaryOffsets[i];
					const offset2 = boundaryOffsets[i + 1];
					const chunk = this.body.subarray(offset1 + boundary.length + 2, offset2 - 2); // * +2 to account for the CRLF at the end of the boundary, and -2 for the CRLF at the end of each body

					const metadata = readMessageMetadata(chunk);

					if (metadata.bodyStart === -1) {
						continue;
					}

					const headers = new Map<string, string>();

					for (const [name, value] of linesToHeaders(metadata.lines)) {
						headers.set(name.toLowerCase(), value);
					}

					const disposition = headers.get('content-disposition');

					if (!disposition || disposition.split(';')[0].trim().toLowerCase() !== 'form-data') {
						continue;
					}

					const dispositionValues = new Map<string, string>();
					const dispositionParts = disposition.split(';').slice(1).map((part: string) => {
						const trimmed = part.trim();
						const parts = trimmed.split('=');
						const name = parts[0];
						const value = parts.slice(1).join('=').slice(1, -1); // * Remove the start/end quotes

						return [name, value];
					});

					for (const [name, value] of dispositionParts) {
						dispositionValues.set(name.toLowerCase(), value);
					}

					const name = dispositionValues.get('name');

					if (name === undefined) {
						continue;
					}

					this.form.push({
						name: name,
						value: chunk.subarray(metadata.bodyStart),
						filename: dispositionValues.get('filename'),
						contentType: headers.get('content-type')
					});
				}
			}
		}
	}

	public header(key: string, combined: boolean = false): string | undefined {
		const values: string[] = [];

		for (const [name, value] of this.headers) {
			if (key.toLowerCase() === name.toLowerCase()) {
				if (combined) {
					values.push(value);
				} else {
					return value;
				}
			}
		}

		if (combined && values.length !== 0) {
			return values.join(', ');
		}

		return undefined;
	}

	public text(): string {
		return this.body.toString();
	}

	public json<T>(): T {
		return JSON.parse(this.text());
	}
}

export class HTTPRequest extends HTTPMessageBase {
	public readonly direction = HTTPMessageDirection.REQUEST;
	public readonly method: HTTPMethod;
	public readonly requestTarget: string;
	public readonly protocol: string;
	public readonly hostname?: string;
	public readonly path: string;
	public readonly query: URLSearchParams = new URLSearchParams();

	constructor(data: Buffer) {
		super(data);

		const [method, requestTarget, protocol] = this.startLine.split(' ');

		this.method = method as HTTPMethod; // TODO - Validate this
		this.requestTarget = requestTarget;
		this.protocol = protocol;
		this.hostname = this.header('host');

		// * Only the first "?" separates the path from the query, any others are part of the query itself
		const [path, ...query] = this.requestTarget.split('?');

		this.path = path;
		this.query = new URLSearchParams(query.join('?'));
	}
}

export class HTTPResponse extends HTTPMessageBase {
	public readonly direction = HTTPMessageDirection.RESPONSE;
	public readonly protocol: string;
	public readonly statusCode: number;
	public readonly reasonPhrase: string;

	constructor(data: Buffer) {
		super(data);

		// * The reason phrase is optional and may contain spaces, so just assume it's everything after the status code
		const [protocol, statusCode, ...reasonPhrase] = this.startLine.split(' ');

		this.protocol = protocol;
		this.statusCode = Number(statusCode);
		this.reasonPhrase = reasonPhrase.join(' ');
	}
}

export type HTTPMessage = HTTPRequest | HTTPResponse;

export default function parseHTTPMessage(data: Buffer): HTTPMessage {
	if (data.subarray(0x0, 0x4).toString() === 'HTTP') {
		return new HTTPResponse(data);
	} else {
		return new HTTPRequest(data);
	}
}

function readMessageMetadata(data: Buffer): { lines: string[]; bodyStart: number } {
	const lines: string[] = [];
	let cursor = 0;

	// * Kinda ugly, but works. Spec says lines end with \r\n but parsers
	// * are encouraged to also support \n, with the metadata ending with
	// * double line-ends (\r\n\r\n, or \n\n). This is kind of a hacky way
	// * way to support both, scanning each line until \n then trimming any
	// * extra \r off the end if it exists. The message body comes directly
	// * after the metadata ending double line-ends, so return that too
	const CR = 0x0D; // * \r
	const LF = 0x0A; // * \n

	while (cursor < data.length) {
		let end = cursor;

		while (end < data.length && data[end] !== LF) {
			end++;
		}

		if (end === data.length) {
			return {
				lines,
				bodyStart: -1
			};
		}

		const lineEnd = end > cursor && data[end - 1] === CR ? end - 1 : end;

		if (lineEnd === cursor) {
			return {
				lines,
				bodyStart: end + 1
			};
		}

		lines.push(data.toString('utf8', cursor, lineEnd));
		cursor = end + 1;
	}

	return {
		lines,
		bodyStart: -1
	};
}

function linesToHeaders(lines: string[]): string[][] {
	return lines.map((line) => {
		const parts = line.split(': ');
		const name = parts[0];
		const value = parts.slice(1).join(': ');

		return [name, value];
	});
}
