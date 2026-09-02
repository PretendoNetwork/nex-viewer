import TNetStringParser from '@/tnetstring-parser';
import type { TNetStringNode, TNetStringDictionaryNode } from '@/tnetstring-parser';

// TODO - Move these types to the `@/types` folder like the rest of the types once well-defined
// * This is not actually accurate, mitmproxy defines this
// * as `Address = tuple[str, int]` but that reads bad
type Address = {
	ip: string;
	port: number;
};
type Cert = Buffer;
type FlowMessageData = {
	http_version: Buffer;
	headers: string[][]; // * Encoded as a tuple of `(key, value)`
	content: Buffer | null;
	trailers: Record<string, string> | null; // * Not accurate, this is encoded as a tuple of `(key, value)`
	timestamp_start: number;
	timestamp_end: number | null;
};

// * This is not actually accurate, mitmproxy extends Request
// * with the Message class, but when serialized the Message
// * class only returns the data from the MessageData class.
// * No reason to define both.
// *
// * Similarly, Request stores it's fields in the RequestData
// * class, but there's no reason to define both.
interface FlowRequest extends FlowMessageData {
	host: string;
	port: number;
	method: Buffer;
	scheme: Buffer;
	authority: Buffer;
	path: Buffer;
}

// * This is not actually accurate, mitmproxy extends Response
// * with the Message class, but when serialized the Message
// * class only returns the data from the MessageData class.
// * No reason to define both
// *
// * Similarly, Response stores it's fields in the ResponseData
// * class, but there's no reason to define both.
interface FlowResponse extends FlowMessageData {
	status_code: number;
	reason: Buffer;
}
type FlowConnection = {
	peername: Address | null;
	sockname: Address | null;
	id: string;
	transport_protocol: 'tcp' | 'udp';
	error: string | null;
	tls: boolean;
	certificate_list: Cert[];
	alpn: Buffer | null;
	alpn_offers: Buffer[];
	cipher: string | null;
	cipher_list: string[];
	tls_version: 'SSLv3' | 'TLSv1' | 'TLSv1.1' | 'TLSv1.2' | 'TLSv1.3' | 'DTLSv0.9' | 'DTLSv1' | 'DTLSv1.2' | 'QUICv1' | null;
	sni: string | null;
	timestamp_start: number | null;
	timestamp_end: number | null;
	timestamp_tls_setup: number | null;
};
interface FlowClientConnection extends FlowConnection {
	peername: Address;
	sockname: Address;
	mitmcert: Cert | null;
	proxy_mode: string; // TODO - is this an enum?
	timestamp_start: number;
}
interface FlowServerConnection extends FlowConnection {
	address: Address | null;
	peername: Address | null;
	sockname: Address | null;
	timestamp_start: number | null;
	timestamp_tcp_setup: number | null;
	via: {
		// * This is not actually accurate, mitmproxy defines this
		// * as `ServerSpec = tuple[Literal["http", "https", "http3", "tls", "dtls", "tcp", "udp", "dns", "quic"], tuple[str, int]]`
		// * but that reads bad
		protocol: 'http' | 'https' | 'http3' | 'tls' | 'dtls' | 'tcp' | 'udp' | 'dns' | 'quic';
		address: Address;
	} | null;
}
enum WebSocketOpcode {
	CONTINUATION = 0x0,
	TEXT = 0x1,
	BINARY = 0x2,
	CLOSE = 0x8,
	PING = 0x9,
	PONG = 0xA
}
type FlowWebSocket = {
	messages: {
		// * This is not actually accurate, mitmproxy defines this
		// * as `tuple(type, from_client, content, timestamp, dropped, injected)`
		// * but that reads bad
		type: WebSocketOpcode;
		from_client: boolean;
		content: Buffer;
		timestamp: number;
		dropped: boolean;
		injected: boolean;
	}[];
	closed_by_client: boolean | null;
	close_code: number | null;
	close_reason: string | null;
	timestamp_end: number | null;
};

type _Flow = {
	version: number;
	type: 'http' | 'tcp' | 'udp' | 'dns';
	id: string;
	error: {
		msg: string;
		timestamp: number;
		KILLED_MESSAGE: string;
	} | null;
	client_conn: FlowClientConnection;
	server_conn: FlowServerConnection;
	intercepted: boolean;
	is_replay: string | null;
	marked: string;
	metadata: Record<string, any>;
	comment: string;
	timestamp_created: number;
	backup: _Flow | null;
};

export interface HTTPFlow extends _Flow {
	type: 'http';
	request: FlowRequest;
	response: FlowResponse | null;
	websocket: FlowWebSocket | null;
}
interface TCPFlow extends _Flow {
	type: 'tcp';
	// TODO - fill this in
}
interface UDPFlow extends _Flow {
	type: 'udp';
	// TODO - fill this in
}
interface DNSFlow extends _Flow {
	type: 'dns';
	// TODO - fill this in
}

type Flow = HTTPFlow | TCPFlow | UDPFlow | DNSFlow;

export default class FlowsParser {
	private buffer: Buffer;

	constructor(buffer: Buffer) {
		this.buffer = buffer;
	}

	private isTNetStringDictionary(value: TNetStringNode): value is TNetStringDictionaryNode {
		return typeof value === 'object' &&
			value !== null &&
			!Array.isArray(value) &&
			!(value instanceof Buffer);
	}

	private constructFlow(tnetstring: TNetStringNode): Flow {
		// TODO - Fuck it, we ball. Sanity checks later, ship it. This whole function sucks

		if (!this.isTNetStringDictionary(tnetstring)) {
			throw new Error('Expected dictionary node');
		}

		if (tnetstring.type !== 'http') {
			throw new Error('Expected http flow');
		}

		const flowData = tnetstring as Record<string, any>;
		const flow = tnetstring as any as Flow;

		// * Ensure these are updated to the new format since it changed
		if (flowData.client_conn.peername) {
			flow.client_conn.peername = {
				ip: flowData.client_conn.peername[0],
				port: flowData.client_conn.peername[1]
			};
		}

		if (flowData.client_conn.sockname) {
			flow.client_conn.sockname = {
				ip: flowData.client_conn.sockname[0],
				port: flowData.client_conn.sockname[1]
			};
		}

		if (flowData.server_conn.via) {
			flow.server_conn.via = {
				protocol: flowData.server_conn.via[0],
				address: {
					ip: flowData.server_conn.via[1][0],
					port: flowData.server_conn.via[1][1]
				}
			};
		}

		if (flowData.server_conn.address) {
			flow.server_conn.address = {
				ip: flowData.server_conn.address[0],
				port: flowData.server_conn.address[1]
			};
		}

		if (flowData.server_conn.peername) {
			flow.server_conn.peername = {
				ip: flowData.server_conn.peername[0],
				port: flowData.server_conn.peername[1]
			};
		}

		if (flowData.server_conn.sockname) {
			flow.server_conn.sockname = {
				ip: flowData.server_conn.sockname[0],
				port: flowData.server_conn.sockname[1]
			};
		}

		if (flow.type === 'http') {
			flow.request.headers = flowData.request.headers.map(([key, value]: any[]) => [key.toString(), value.toString()]);

			if (flowData.request.trailers) {
				flow.request.trailers = Object.fromEntries(flowData.request.trailers.map(([key, value]: any[]) => [key.toString(), value.toString()]));
			}

			if (flowData.response) {
				flow.response!.headers = flowData.response.headers.map(([key, value]: any[]) => [key.toString(), value.toString()]);

				if (flowData.response.trailers) {
					flow.response!.trailers = Object.fromEntries(flowData.response.trailers.map(([key, value]: any[]) => [key.toString(), value.toString()]));
				}
			}

			if (flowData.websocket) {
				flow.websocket!.messages = flowData.websocket.messages.map((message: any[]) => ({
					type: message[0],
					from_client: message[1],
					content: message[2],
					timestamp: message[3],
					dropped: message[4],
					injected: message[5]
				}));
			}
		}

		return flow;
	}

	public* flows(): Generator<Flow> {
		const tnetstring = new TNetStringParser(this.buffer);

		while (tnetstring.hasDataLeft()) {
			yield this.constructFlow(tnetstring.parseNode());
		}
	}
}
