import EventEmitter from 'node:events';
import path from 'node:path';
import zlib from 'node:zlib';
import fs from 'fs-extra';
import ByteStream from '@/byte-stream';
import PCAPParser from '@/pcap-parser';
import PCAPNGParser from '@/pcapng-parser';
import CharlesParser from '@/charles-parser';
import CharlesZipParser from '@/charles-zip-parser';
import FlowsParser from '@/flows-parser';
import ProxideParser, { SessionEventType, RequestPart, Status } from '@/proxide-parser';
import PRUDPConnection from '@/nex/prudp-connection';
import PIAPacket from '@/nex/pia-packet';
import PRUDPPacketV0 from '@/nex/prudp-packetv0';
import PRUDPPacketV1 from '@/nex/prudp-packetv1';
import PRUDPPacketLite from '@/nex/prudp-packetLite';
import RawRMCPacket from '@/nex/raw-rmc-packet';
import NPLNTransaction from '@/npln/npln-transaction';
import PNSJSession from '@/pnsj-session';
import HTTPTransaction from '@/http-transaction';
import parseHTTPMessage, { HTTPMessageDirection } from '@/http-message';
import type { PCAPFrame } from '@/pcap-parser';
import type { SimplePacketBlock, EnhancedPacketBlock } from '@/pcapng-parser';
import type { ProxideTransaction } from '@/proxide-parser';
import type PRUDPPacket from '@/types/nex/prudp-packet';
import type { SerializedMessage } from '@/types/serialized-message';

type RawNetworkFrame = SimplePacketBlock | EnhancedPacketBlock | PCAPFrame;

const PIA_MAGIC = Buffer.from([0x32, 0xAB, 0x98, 0x64]);

function int2ip(int: number): string {
	return `${int >>> 24}.${int >> 16 & 255}.${int >> 8 & 255}.${int & 255}`;
}

export default class Session extends EventEmitter {
	private prudpConnections: PRUDPConnection[] = [];
	private rawRMCMode = false;
	private lastPacketTime = 0;
	private elapsedTime = 0;
	private messageID = 0;
	private serializedMessages: SerializedMessage[] = [];
	private websocketPCAPBuffer: Buffer = Buffer.alloc(0); // * WebSocket messages can be split between multiple TCP frames, so we have to buffer them
	private resolvedAddresses: Record<string, string> = {};

	constructor() {
		super();
	}

	public parse(capturePath: string): void {
		let captureData = fs.readFileSync(capturePath);
		let extension = path.extname(capturePath);

		if (extension === '.gz') {
			captureData = zlib.gunzipSync(captureData);
			extension = path.extname(capturePath.slice(0, -3));
		}

		switch (extension) {
			case '.pcapng':
			case '.pcap':
				this.parsePCAP(captureData); // TODO - Always assumes NEX connections. Make this more generic
				break;
			case '.chls':
				this.parseCharles(captureData); // TODO - Always assumes NEX connections. Make this more generic
				break;
			case '.chlz':
				this.parseCharlesZip(captureData); // TODO - Always assumes NEX connections. Make this more generic
				break;
			case '.flows':
			case '.flow':
				this.parseMitmproxyFlows(captureData); // TODO - Always assumes NEX connections. Make this more generic
				break;
			case '.bin': // TODO - Replace this with a `parseBin` function that supports other .bin formats
				this.parseProxideConnection(captureData); // TODO - Always assumes gRPC connections. Make this more generic?
				break;
			case '.pnsj':
				this.parsePNSJSession(captureData);
				break;
			default:
				throw new Error(`Invalid file type. Got ${extension}, expected .pcapng, .pcap or .chls`);
		}
	}

	private addSerializedMessage(message: SerializedMessage): void {
		message.id = this.messageID++;
		this.serializedMessages.push(message);
	}

	private emitSerializedMessageList(): void {
		this.emit('serializedMessageList', this.serializedMessages);
		this.serializedMessages = [];
	}

	private parsePCAP(captureData: Buffer): void {
		let parser: PCAPParser | PCAPNGParser;

		const magic = captureData.readUInt32LE();

		if (magic === 0xA1B2C3D4 || magic === 0xD4C3B2A1) {
			parser = new PCAPParser(captureData);
		} else if (magic === 0x0A0D0D0A) {
			parser = new PCAPNGParser(captureData);
		} else {
			throw new Error('Invalid capture');
		}

		for (const frame of parser.frames()) {
			let elapsedTime = 0;
			if ('timestamp' in frame) {
				const timestampSeconds = frame.timestamp.seconds + ('microseconds' in frame.timestamp ? frame.timestamp.microseconds : 0) / 1_000_000;

				if (this.lastPacketTime !== 0) {
					this.elapsedTime += timestampSeconds - this.lastPacketTime;
					elapsedTime = this.elapsedTime;
				}

				this.lastPacketTime = timestampSeconds;
			}

			this.handlePCAPFrame(frame, elapsedTime);
		}

		this.emitSerializedMessageList();
	}

	private parseCharles(captureData: Buffer): void {
		const parser = new CharlesParser(captureData);
		let elapsedTime = 0;

		for (const transaction of parser.transactions()) {
			this.addSerializedMessage(HTTPTransaction.fromCharlesTransaction(transaction).toJSON());

			for (const message of transaction.websocketMessages) {
				const timestampSeconds = Number(message.startTime) / 1000;

				if (this.lastPacketTime !== 0) {
					this.elapsedTime += timestampSeconds - this.lastPacketTime;
					elapsedTime = this.elapsedTime;
				}

				this.lastPacketTime = timestampSeconds;

				const stream = new ByteStream(message.data);
				const packet = new PRUDPPacketLite(stream);

				if (message.source === 'SERVER') {
					packet.sourceAddress = transaction.url.host;
					packet.sourcePort = transaction.serverLocalPort;
					packet.destinationAddress = 'CLIENT';
					packet.destinationPort = transaction.clientLocalPort;
				} else {
					packet.sourceAddress = 'CLIENT';
					packet.sourcePort = transaction.clientLocalPort;
					packet.destinationAddress = transaction.url.host;
					packet.destinationPort = transaction.serverLocalPort;
				}

				packet.elapsedTime = elapsedTime;

				this.processPRUDPPacket(packet);
				this.addSerializedMessage(packet.toJSON());
			}
		}

		this.emitSerializedMessageList();
	}

	private parseCharlesZip(captureData: Buffer): void {
		const parser = new CharlesZipParser(captureData);
		let elapsedTime = 0;

		for (const transaction of parser.transactions()) {
			this.addSerializedMessage(HTTPTransaction.fromCharlesTransaction(transaction).toJSON());

			for (const message of transaction.websocketMessages) {
				const timestampSeconds = new Date(message.startTime).getTime() / 1000;

				if (this.lastPacketTime !== 0) {
					this.elapsedTime += timestampSeconds - this.lastPacketTime;
					elapsedTime = this.elapsedTime;
				}

				this.lastPacketTime = timestampSeconds;

				const stream = new ByteStream(message.data);
				const packet = new PRUDPPacketLite(stream);

				if (message.source === 'SERVER') {
					packet.sourceAddress = transaction.url.host;
					packet.sourcePort = transaction.serverLocalPort;
					packet.destinationAddress = 'CLIENT';
					packet.destinationPort = transaction.clientLocalPort;
				} else {
					packet.sourceAddress = 'CLIENT';
					packet.sourcePort = transaction.clientLocalPort;
					packet.destinationAddress = transaction.url.host;
					packet.destinationPort = transaction.serverLocalPort;
				}

				packet.elapsedTime = elapsedTime;

				this.processPRUDPPacket(packet);
				this.addSerializedMessage(packet.toJSON());
			}
		}

		this.emitSerializedMessageList();
	}

	private parseMitmproxyFlows(captureData: Buffer): void {
		const parser = new FlowsParser(captureData);

		for (const flow of parser.flows()) {
			if (flow.type === 'http' && flow.websocket && flow.server_conn.address && flow.server_conn.sni) {
				for (const message of flow.websocket.messages) {
					const stream = new ByteStream(message.content);
					const packet = new PRUDPPacketLite(stream);

					if (message.from_client) {
						packet.sourceAddress = flow.client_conn.sockname.ip;
						packet.sourcePort = flow.client_conn.sockname.port;
						packet.destinationAddress = flow.server_conn.sni;
						packet.destinationPort = flow.server_conn.address.port;
					} else {
						packet.sourceAddress = flow.server_conn.sni;
						packet.sourcePort = flow.server_conn.address.port;
						packet.destinationAddress = flow.client_conn.sockname.ip;
						packet.destinationPort = flow.client_conn.sockname.port;
					}

					this.processPRUDPPacket(packet);
					this.addSerializedMessage(packet.toJSON());
				}
			}
		}

		this.emitSerializedMessageList();
	}

	private parseProxideConnection(captureData: Buffer): void {
		const parser = new ProxideParser(captureData);
		const partialTransactions = new Map<string, Partial<ProxideTransaction> & { requestChunks: Buffer[]; responseChunks: Buffer[] }>();
		const clientAddresses = new Map<string, string>(); // * Sort of a hack, but it works
		const transactions: ProxideTransaction[] = [];

		for (const event of parser.events()) {
			switch (event.type) {
				case SessionEventType.NewConnection:
					clientAddresses.set(event.uuid, event.clientAddress);
					break;
				case SessionEventType.NewRequest:
					partialTransactions.set(event.uuid, {
						uuid: event.uuid,
						connectionUUID: event.connectionUUID,
						clientAddress: clientAddresses.get(event.connectionUUID),
						uri: event.uri,
						method: event.method,
						requestHeaders: event.headers,
						startTime: event.timestamp,
						requestChunks: [],
						responseChunks: []
					});
					break;

				case SessionEventType.NewResponse: {
					const req = partialTransactions.get(event.requestUUID);
					if (req) {
						req.responseHeaders = event.headers;
					}
					break;
				}

				case SessionEventType.MessageData: {
					const req = partialTransactions.get(event.requestUUID);
					if (req) {
						if (event.part === RequestPart.Request) {
							req.requestChunks.push(event.data);
						} else {
							req.responseChunks.push(event.data);
						}
					}
					break;
				}

				case SessionEventType.RequestDone: {
					const req = partialTransactions.get(event.requestUUID);
					if (req) {
						req.status = event.status;
						req.endTime = event.timestamp;
					}
					break;
				}

				case SessionEventType.MessageDone: {
					const req = partialTransactions.get(event.requestUUID);
					if (req && event.part === RequestPart.Response) {
						req.trailers = event.trailers;
					}
					break;
				}
			}
		}

		for (const transaction of partialTransactions.values()) {
			transactions.push({
				uuid: transaction.uuid!,
				connectionUUID: transaction.connectionUUID!,
				clientAddress: transaction.clientAddress!,
				uri: transaction.uri!,
				method: transaction.method!,
				requestHeaders: transaction.requestHeaders ?? {},
				responseHeaders: transaction.responseHeaders ?? {},
				requestBody: Buffer.concat(transaction.requestChunks),
				responseBody: Buffer.concat(transaction.responseChunks),
				trailers: transaction.trailers ?? {},
				status: transaction.status ?? Status.InProgress,
				startTime: transaction.startTime!,
				endTime: transaction.endTime ?? transaction.startTime!
			});
		}

		for (const transaction of transactions) {
			const contentType = transaction.requestHeaders['content-type'] ?? transaction.responseHeaders['content-type'] ?? '';

			if (contentType.startsWith('application/grpc')) {
				this.addSerializedMessage(NPLNTransaction.parseFromProxideTransaction(transaction).toJSON());
			}
		}

		this.emitSerializedMessageList();
	}

	private parsePNSJSession(captureData: Buffer): void {
		const parser = new PNSJSession(captureData);

		for (const message of parser.messages()) {
			this.addSerializedMessage(message);
		}

		this.emitSerializedMessageList();
	}

	private handlePCAPFrame(frame: RawNetworkFrame, elapsedTime?: number): void {
		// * HokakuCTR produces dumps whose payloads are:
		// * - u8  Revision (1)
		// * - u64 Title ID
		// * By checking if the first byte is a supported
		// * revision and that the following u64 is a 3DS
		// * title we can be reasonably sure the dump is
		// * a HokakuCTR dump.
		// * We only need the first 3 bytes of the u64
		if (!this.rawRMCMode && frame.data[0] === 1 && (frame.data.readBigUInt64LE(1) & 0xFFFFFF0000000000n) === 0x0004000000000000n) {
			this.rawRMCMode = true;
		}

		try {
			if (this.rawRMCMode) {
				// * Raw RMC packets only include one packet per frame
				// TODO - Can this contain PIA/Net-Z data as well?
				const packet = new RawRMCPacket(new ByteStream(frame.data));

				this.processPRUDPPacket(packet);

				packet.elapsedTime = elapsedTime;

				this.addSerializedMessage(packet.toJSON());

				return;
			}

			const frameStream = new ByteStream(frame.data);

			const versionAndHeaderLength = frameStream.readUInt8();
			const version = (versionAndHeaderLength >> 4) & 0x0F;

			// * All packets we care about are
			// * assumed to be IPv4
			if (version !== 4) {
				return;
			}

			const headerLength = (versionAndHeaderLength & 0x0F) * 4;

			frameStream.skip(1); // * Service type
			const totalLength = frameStream.readUInt16BE();
			frameStream.skip(2); // * Identification
			frameStream.skip(2); // * Flags and fragment offset. Fragment offset is the last 13 bits (& 0x1FFF)
			frameStream.skip(1); // * Time to live
			const protocol = frameStream.readUInt8();
			frameStream.skip(2); // * Checksum

			let source = int2ip(frameStream.readUInt32BE());
			let destination = int2ip(frameStream.readUInt32BE());

			if (this.resolvedAddresses[source]) {
				source = this.resolvedAddresses[source];
			}

			if (this.resolvedAddresses[destination]) {
				destination = this.resolvedAddresses[destination];
			}

			// TODO - Add this back with the new offsets
			// if (frame.subarray(17, 20).equals(XID_MAGIC)) {
			//	return;
			// }

			let sourcePort: number;
			let destinationPort: number;
			const payloads: Buffer[] = [];

			if (protocol === 0x11) {
				// * UDP protocol
				const udpLength = totalLength - headerLength;
				const udpStream = new ByteStream(frameStream.readBytes(udpLength));

				// * Parse UDP header
				sourcePort = udpStream.readUInt16BE();
				destinationPort = udpStream.readUInt16BE();
				const udpPacketLength = udpStream.readUInt16BE();

				if (sourcePort === 53 || destinationPort === 53) {
					// * DNS packet
					return;
				}

				if (udpPacketLength !== udpLength) {
					throw new Error(`Got bad UDP packet length. Expected ${udpLength}, got ${udpPacketLength}`);
				}

				udpStream.skip(0x2); // * Checksum

				payloads.push(udpStream.readBytes(udpLength - 0x8));
			} else if (protocol === 0x06) {
				// * TCP protocol
				// TODO - This section is only being designed to work with PRUDPLite packets made via https://github.com/nookingtons/network_mitm.
				//        Any other TCP packets, including HTTP packets, are not supported. This section should be expanded to support more kinds of TCP
				const tcpLength = totalLength - headerLength;
				const tcpStream = new ByteStream(frameStream.readBytes(tcpLength));

				sourcePort = tcpStream.readUInt16BE();
				destinationPort = tcpStream.readUInt16BE();

				// * WebSocket packets in this case always either come from or go to port 80
				if (sourcePort !== 80 && destinationPort !== 80) {
					return;
				}

				tcpStream.skip(0x4); // * Sequence number
				tcpStream.skip(0x4); // * Acknowledgment number

				const offsetAndFlags = tcpStream.readUInt16BE();
				const tcpHeaderLength = (offsetAndFlags >> 12) * 4;

				if (tcpHeaderLength < 0x14 || tcpHeaderLength > tcpLength) {
					throw new Error(`Got bad TCP data offset. Got ${tcpHeaderLength}`);
				}

				tcpStream.skip(tcpHeaderLength - 0xE);

				// * Assume every packet here is a WebSocket packet
				// TODO - Track what connections are actually WebSocket connections by inspecting the HTTP packets better
				// TODO - This skips a LOT of WebSocket/TCP features like interleaved frames, TCP fragments, assuming always binary messages, etc. just to keep it simple for now
				const websocketStream = new ByteStream(tcpStream.readBytes(tcpLength - tcpHeaderLength));

				while (websocketStream.hasDataLeft()) {
					const maybeHTTPStartLine = websocketStream.readBytes(0x7).toString();

					websocketStream.skip(-0x7); // * Skip back to realign the stream position

					// * Filter out HTTP packets
					if (
						maybeHTTPStartLine.startsWith('HTTP') ||
						maybeHTTPStartLine.startsWith('GET') ||
						maybeHTTPStartLine.startsWith('HEAD') ||
						maybeHTTPStartLine.startsWith('POST') ||
						maybeHTTPStartLine.startsWith('PUT') ||
						maybeHTTPStartLine.startsWith('DELETE') ||
						maybeHTTPStartLine.startsWith('CONNECT') ||
						maybeHTTPStartLine.startsWith('OPTIONS') ||
						maybeHTTPStartLine.startsWith('TRACE') ||
						maybeHTTPStartLine.startsWith('PATCH') ||
						maybeHTTPStartLine.startsWith('QUERY')
					) {
						// * Hack to get the real hostname of the PRUDPLite connection.
						// * This is used to identify the game when the Lite Signature is not available
						const httpMessage = parseHTTPMessage(websocketStream.readRest());
						if (httpMessage.direction === HTTPMessageDirection.REQUEST) {
							const host = httpMessage.header('host');

							if (host) {
								this.resolvedAddresses[destination] = host;
							}
						}

						return;
					}

					const byte1 = websocketStream.readUInt8();
					const byte2 = websocketStream.readUInt8();

					const fin = (byte1 & 0x80) !== 0;
					// * const rsv1 = (byte1 & 0x40) !== 0;
					// * const rsv2 = (byte1 & 0x20) !== 0;
					// * const rsv3 = (byte1 & 0x10) !== 0;
					// * const opcode = byte1 & 0x0F;

					const masked = (byte2 & 0x80) !== 0;
					let length = byte2 & 0x7F;
					let maskKey: Buffer | undefined;

					if (length === 126) {
						length = websocketStream.readUInt16BE();
					} else if (length === 127) {
						// TODO - Swap this out with a BigInt everywhere?
						length = Number(websocketStream.readUInt64BE());
					}

					if (masked) {
						maskKey = websocketStream.readBytes(4);
					}

					let payload = websocketStream.readBytes(length);

					if (maskKey) {
						// TODO - Remove this "as" cast, uggo
						payload = payload.map((byte, i) => byte ^ maskKey[i % 4]) as Buffer;
					}

					this.websocketPCAPBuffer = Buffer.concat([
						this.websocketPCAPBuffer,
						payload
					]);

					if (fin) {
						payloads.push(this.websocketPCAPBuffer);
						this.websocketPCAPBuffer = Buffer.alloc(0);
					} else {
						// * Wait for more data in other frames
						return;
					}
				}
			} else {
				return;
			}

			for (const payload of payloads) {
				const stream = new ByteStream(payload!); // TODO - Remove "!"

				// * Some PRUDP packets are bundled together. Need to split them apart
				while (stream.hasDataLeft()) {
					// TODO - The "return" statements here will exit this loop, potentially losing valid bundled packets later in the stream. Fix this?
					const magic = stream.readBytes(0x4);

					stream.skip(-0x4); // * Skip back to realign the stream position

					if (magic.equals(PIA_MAGIC)) {
						// TODO - This does basically nothing. We need to track these packets first, determine which PRUDP connection they belong to,
						//        and then loop back through them with the PIA version determined by the PRUDP connections title. This is just a stubx
						const packet = new PIAPacket(stream);

						packet.sourceAddress = source;
						packet.sourcePort = sourcePort;
						packet.destinationAddress = destination;
						packet.destinationPort = destinationPort;

						this.addSerializedMessage(packet.toJSON());
						return; // * This assumes the whole frame is just one packet. This is likely not the case, we will need to work this out at some point
					} else {
						let packet: PRUDPPacket;
						// * Nasty hack to get both the PRUDPv1 and PRUDPLite magics
						// * without needing the jump backwards twice
						const maybeMagicLite = stream.readBytes(0x1);
						const maybeMagicV1 = Buffer.concat([
							maybeMagicLite,
							stream.readBytes(0x1)
						]);

						stream.skip(-0x2); // * Skip back to realign the stream position

						if (maybeMagicV1.equals(PRUDPPacketV1.Magic)) {
							packet = new PRUDPPacketV1(stream);
						} else if (maybeMagicLite.equals(PRUDPPacketLite.Magic)) {
							packet = new PRUDPPacketLite(stream);
						} else {
							// * Assume packet is v0 and just Try It
							// *
							// * THIS IS *EXPECTED* TO FAIL OFTEN!
							// * PRUDPv0 DOES NOT HAVE A MAGIC LIKE v1!
							// * OUR BEST OPTION IS TO JUST GUESS

							packet = new PRUDPPacketV0(stream);
						}

						if (!this.validatePRUDPPacket(packet)) {
							return;
						}

						packet.sourceAddress = source;
						packet.sourcePort = sourcePort;
						packet.destinationAddress = destination;
						packet.destinationPort = destinationPort;

						this.processPRUDPPacket(packet);

						packet.elapsedTime = elapsedTime;

						this.addSerializedMessage(packet.toJSON());
					}
				}
			}
		} catch {
			// * Eat errors
		}
	}

	private validatePRUDPPacket(packet: PRUDPPacket): boolean {
		if (packet.sourceStreamType !== packet.destinationStreamType) {
			// * Stream types don't match. This has not been seen in any packet
			return false;
		}

		if (packet.sourceStreamType === 0 || packet.destinationStreamType === 0) {
			// * Likely a Quazal Net-Z packet
			return false;
		}

		if (packet.sourceStreamID === 0 || packet.destinationStreamID === 0) {
			// * Likely a Quazal Net-Z packet
			return false;
		}

		// * General sanity checks
		if (packet.sourceStreamType > 11 || packet.destinationStreamType > 11) {
			// * Stream type out of range
			return false;
		}

		if (packet.sourceStreamType > 11 || packet.destinationStreamType > 11) {
			// * Stream type out of range
			return false;
		}

		if (packet.version === 2) {
			// * PRUDPLite

			if (packet.sourceStreamID > 0x1F || packet.destinationStreamID > 0x1F) {
				return false;
			}

			if (
				packet.sourceStreamID !== 1 && packet.sourceStreamID !== 2 &&
				packet.destinationStreamID !== 1 && packet.destinationStreamID !== 2
			) {
				return false;
			}
		} else {
			if (packet.sourceStreamID !== 1 && packet.destinationStreamID !== 1) {
				// * In NEX on the Wii U and 3DS the server stream ID is ALWAYS 1. IF NEITHER are 1, assume invalid
				// TODO - THIS IS UNTESTED ON QRV, AND PRUDPLITE USES MORE SERVER STREAM IDS THAN JUST 1
				return false;
			}
		}

		return true;
	}

	private processPRUDPPacket(packet: PRUDPPacket): void {
		let connection = this.findPRUDPConnection(packet);

		if (!connection) {
			if (packet.version !== -1 && !packet.isTypeSyn() && !packet.isStreamTypeNAT()) {
				// * If we find a new connection on a packet besides the SYN,
				// * assume only part of the connection is present and ignore.
				// * NAT packets don't do the SYN handshake, so allow them
				return;
			}

			if (packet.version !== -1 && packet.isTypeSyn() && packet.hasFlagAck()) {
				// * If the packet is a SYN but is the *ACK* of the SYN,
				// * assume only part of the connection is present and ignore
				return;
			}

			connection = new PRUDPConnection();

			connection.clientAddress = packet.sourceAddress;
			connection.clientPort = packet.sourcePort;
			connection.serverAddress = packet.destinationAddress;
			connection.serverPort = packet.destinationPort;

			connection.clientStreamType = packet.sourceStreamType;
			connection.clientStreamID = packet.sourceStreamID;
			connection.serverStreamType = packet.destinationStreamType;
			connection.serverStreamID = packet.destinationStreamID;

			// TODO - Link special secure station as well, not just the main secure station
			for (const otherConnection of this.prudpConnections) {
				if (otherConnection.mainSecureStation && otherConnection.mainSecureStationTicket) {
					const address = otherConnection.mainSecureStation.getParam('address');
					const port = Number(otherConnection.mainSecureStation.getParam('port'));
					const streamType = Number(otherConnection.mainSecureStation.getParam('stream'));
					const streamID = Number(otherConnection.mainSecureStation.getParam('sid'));

					if (isNaN(port)) {
						continue;
					}

					if (isNaN(streamType)) {
						continue;
					}

					if (isNaN(streamID)) {
						continue;
					}

					if (connection.serverAddress !== address) {
						continue;
					}

					if (connection.serverPort !== port) {
						continue;
					}

					if (connection.serverStreamType !== streamType) {
						continue;
					}

					if (connection.serverStreamID !== streamID) {
						continue;
					}

					connection.title = otherConnection.title;
					connection.cipherKey = otherConnection.mainSecureStationTicket.sessionKey;
					connection.sessionKey = otherConnection.mainSecureStationTicket.sessionKey;
				}
			}

			this.prudpConnections.push(connection);
		}

		packet.connection = connection;

		connection.processPacket(packet);
	}

	private findPRUDPConnection(packet: PRUDPPacket): PRUDPConnection | undefined {
		return this.prudpConnections.find((connection) => {
			if (
				connection.clientAddress === packet.sourceAddress &&
				connection.clientPort === packet.sourcePort &&
				connection.serverAddress === packet.destinationAddress &&
				connection.serverPort === packet.destinationPort &&
				connection.clientStreamType === packet.sourceStreamType &&
				connection.clientStreamID === packet.sourceStreamID &&
				connection.serverStreamType === packet.destinationStreamType &&
				connection.serverStreamID === packet.destinationStreamID
			) {
				packet.fromClientToServer = true;
				packet.fromServerToClient = false;

				return true;
			}

			if (
				connection.clientAddress === packet.destinationAddress &&
				connection.clientPort === packet.destinationPort &&
				connection.serverAddress === packet.sourceAddress &&
				connection.serverPort === packet.sourcePort &&
				connection.clientStreamType === packet.destinationStreamType &&
				connection.clientStreamID === packet.destinationStreamID &&
				connection.serverStreamType === packet.sourceStreamType &&
				connection.serverStreamID === packet.sourceStreamID
			) {
				packet.fromClientToServer = false;
				packet.fromServerToClient = true;

				return true;
			}

			return false;
		});
	}
}
