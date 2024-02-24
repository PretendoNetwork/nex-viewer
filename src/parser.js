const EventEmitter = require('node:events');
const path = require('node:path');
const fs = require('fs-extra');
const isPrivateIP = require('private-ip');
const PCAPParser = require('./pcap-parser');
const PCAPNGParser = require('./pcapng-parser');
const PacketV0 = require('./packetv0');
const PacketV1 = require('./packetv1');
const PacketLite = require('./packet-lite');
const Connection = require('./connection');
const WebSocketConnection = require('./websocket-connection');
const Authentication = require('./protocols/authentication');
const Stream = require('./stream');

const SWITCH_DISCRIMINATOR_REGEX = /(g.*-lp1\.s\.n\.srv\.nintendo\.net)_\d*_(?:client|server)\.bin/;
const SWITCH_GAME_SERVER_ID_REGEX = /g(.*)-lp1\.s\.n\.srv\.nintendo\.net_\d*_(?:client|server)\.bin/;
const SWITCH_PACKET_SOURCE_REGEX = /g.*-lp1\.s\.n\.srv\.nintendo\.net_\d*_(client|server)\.bin/;

// ! NOTE -
// ! PRUDPv0 does not have magics
// ! Nintendo uses standardized source/destinations with NEX
// ! Checking the source/destination can tell us if it's v0
const PRUDP_V1_MAGIC = Buffer.from([0xEA, 0xD0]);

// * Magics to check for when parsing UDP packets
//const XID_MAGIC = Buffer.from([0x81, 0x01, 0x0]);

class NEXParser extends EventEmitter {
	constructor() {
		super();

		this.connections = [];
		this.rawRMCMode = false;
		this.rawRMCPackets = [];
		this.rawRMCDummyConnection = new Connection(); // * Used for creating fake packets
		this.rawRMCAuthenticationConnection = new Connection(); // * Used to store packets to the authentication server
		this.rawRMCAuthenticationConnection.discriminator = 'authentication';
		this.rawRMCSecureConnection = new Connection(); // * Used to store packets to the secure server
		this.rawRMCSecureConnection.isSecureServer = true;
		this.rawRMCSecureConnection.discriminator = 'secure';
		this.webSocketConnection = new WebSocketConnection();
	}

	setRawRMCMode(enabled) {
		this.rawRMCMode = enabled;
	}

	/**
	 *
	 * @param {string} capturePath Path to the PCAP(NG) capture file
	 */
	parse(capturePath) {
		const extension = path.extname(capturePath);

		if (extension !== '.pcapng' && extension !== '.pcap') {
			throw new Error(`Invalid file type. Got ${extension}, expected .pcapng or .pcap`);
		}

		const captureData = fs.readFileSync(capturePath);
		let parser;

		const magic = captureData.readUInt32LE();

		if (magic === 0xA1B2C3D4 || magic === 0xD4C3B2A1) {
			parser = new PCAPParser(captureData);
		} else if (magic === 0x0A0D0D0A) {
			parser = new PCAPNGParser(captureData);
		} else {
			throw new Error('Invalid capture');
		}

		for (const packet of parser.packets()) {
			this.handlePacket(packet);
		}

		this.parserEnd();
	}

	/**
	 *
	 * @param {string} capturePath Path to the Charles WebSocket BIN folder
	 */
	parseCharlesWebSocket(capturePath) {
		const files = fs.readdirSync(capturePath);
		const discriminator = files[0].match(SWITCH_DISCRIMINATOR_REGEX)[1];
		const gameServerID = files[0].match(SWITCH_GAME_SERVER_ID_REGEX)[1];

		this.webSocketConnection = new WebSocketConnection(discriminator);
		this.webSocketConnection.configure(gameServerID);

		for (const file of files) {
			const source = file.match(SWITCH_PACKET_SOURCE_REGEX)[1];
			const packetData = fs.readFileSync(`${capturePath}/${file}`);
			const stream = new Stream(packetData);
			const packet = new PacketLite(this.webSocketConnection, stream);
			packet.source = source;

			if (source === 'client') {
				packet.destination = 'server';
			} else {
				packet.destination = 'client';
			}

			this.webSocketConnection.handlePacket(packet);
			this.emit('packet', packet);
		}

		this.connections = [this.webSocketConnection];
		this.parserEnd();
	}

	/**
	 * Ran when the pcap(ng) parser is finished
	 */
	parserEnd() {
		if (this.rawRMCMode) {
			this.connections = [
				this.rawRMCAuthenticationConnection,
				this.rawRMCSecureConnection,
			];
		}

		this.emit('connections', this.connections);
	}

	/**
	 *
	 * @param {object} raw Raw network packet
	 */
	handlePacket(raw) {
		// * HokakuCTR produces dumps whose payloads are:
		// * - u8  Revision (1)
		// * - u64 Title ID
		// * By checking if the first byte is a supported
		// * revision and that the following u64 is a 3DS
		// * title we can be reasonably sure the dump is
		// * a HokakuCTR dump.
		// * We only need the first 3 bytes of the u64
		if (raw.data[0] === 1 && (raw.data.readBigUInt64LE(1) & 0xFFFFFF0000000000n) === 0x0004000000000000n) {
			this.setRawRMCMode(true);
			this.handleRawRMC(raw.data);
			return;
		}

		const udpPacket = this.parsePacketFrame(raw.data);

		if (!udpPacket) {
			return;
		}

		// TODO - ON RARE OCCASIONS UDP PACKETS WHICH ARE NOT NEX BUT HAVE THE SAME HEADERS GET THROUGH
		// ! FIND A WAY TO GET RID OF THESE
		// ? For example, the following packet is an XID broadcast packet
		// * 0000   ff ff ff ff ff ff fe e6 bf 25 b3 cd 00 06 00 01
		// * 0010   af 81 01 00 40 00 15 11 1e cd 34 26 51 eb c0 a8
		// * 0020   00 0d e9 fd f3 28 00 26 2e 52 ea d0 01 00 0f 16
		// * 0030   53 c0 88 42 e9 00 c2 00 1a 5c 1a 52
		// ? When decoded this packet has byte 24 set to 0x11 indicating a UDP packet
		// ? Bytes 42-45 are also set to ea:d0:01, which just so happens to be the PRUDPv1 magic
		// ? This packet gets treated as a PRUDPv1 packet as a result, even though it is not

		let discriminator;
		let clientAddress;
		let serverAddress;

		if (isPrivateIP(udpPacket.source)) {
			// * client->server packet
			discriminator = `${udpPacket.destination}:${udpPacket.destinationPort}`;
			clientAddress = `${udpPacket.source}:${udpPacket.sourcePort}`;
			serverAddress = discriminator;
		} else {
			// * server->client packet
			discriminator = `${udpPacket.source}:${udpPacket.sourcePort}`;
			clientAddress = `${udpPacket.destination}:${udpPacket.destinationPort}`;
			serverAddress = discriminator;
		}

		// * Find the latest connection to avoid broken packets
		// * when disconnecting and reconnecting to the same server.
		let connection = this.connections.findLast(connection => connection.discriminator === discriminator);
		let newConnection = false;

		if (!connection) {
			connection = new Connection(discriminator);
			connection.clientAddress = clientAddress;
			connection.serverAddress = serverAddress;

			newConnection = true;
		}

		const stream = new Stream(udpPacket.payload);

		// * PRUDP may send multiple packets in a single UDP packet, so we read the UDP payload recursively
		while (stream.hasDataLeft()) {
			let packet;

			const magic = stream.readBytes(0x2);
			stream.skip(-0x2);

			if (magic.equals(PRUDP_V1_MAGIC)) {
				try {
					packet = new PacketV1(connection, stream);
				} catch (error) {
					stream.readRest(); // * Dispose of the rest of the data in the stream
					return;
				}
			} else {
				// * Assume packet is v0 and just Try It
				try {
					// * THIS IS *EXPECTED* TO FAIL OFTEN!
					// * PRUDPv0 DOES NOT HAVE A MAGIC LIKE v1!
					// * OUR BEST OPTION IS TO GUESS
					packet = new PacketV0(connection, stream);
				} catch (error) {
					stream.readRest(); // * Dispose of the rest of the data in the stream
					return;
				}
			}

			if (packet.isSyn()) {
				if (packet.isToClient() && !connection.doneClientSyn) {
					// * SYN packet from the server without seeing one from the client yet
					return;
				}

				if (packet.isToServer()) {
					connection.doneClientSyn = true;
				}

				if (packet.isToClient()) {
					connection.doneServerSyn = true;
				}
			}

			if (packet.isConnect()) {
				if (!connection.doneClientSyn || !connection.doneServerSyn) {
					// * CONNECT packet without completing the SYN sequence
					return;
				}

				if (packet.isToServer()) {
					connection.doneClientConnect = true;
				}

				if (packet.isToClient()) {
					connection.doneServerConnect = true;
				}
			}

			if (packet.isData()) {
				if (!connection.doneClientConnect || !connection.doneServerConnect) {
					// * DATA packet without completing the CONNECT sequence
					return;
				}
			}

			// * Add conenctions after packet validation
			if (newConnection) {
				this.connections.push(connection);
				this.emit('connection', connection);
			}

			connection.handlePacket(packet);

			if (connection.secureServerStationURL && connection.checkForSecureServer) {
				const secureIP = connection.secureServerStationURL.address;
				const securePort = connection.secureServerStationURL.port;
				const secureDiscriminator = `${secureIP}:${securePort}`;

				if (connection.discriminator !== secureDiscriminator) {
					// * Secure server on different address, make a new connection
					const secureConnection = new Connection(secureDiscriminator);

					secureConnection.setRC4Key(connection.sessionKey);
					secureConnection.accessKey = connection.accessKey;
					secureConnection.accessKeySum = connection.accessKeySum;
					secureConnection.signatureKey = connection.signatureKey;
					secureConnection.sessionKey = connection.sessionKey;
					secureConnection.prudpVersion = connection.prudpVersion;
					secureConnection.title = connection.title;
					secureConnection.isSecureServer = true;

					secureConnection.clientAddress = connection.clientAddress;
					secureConnection.serverAddress = secureDiscriminator;

					this.connections.push(secureConnection);
				} else {
					// * Secure server is at the same address, just update key
					connection.isSecureServer = true;
					connection.setRC4Key(connection.sessionKey);
				}

				connection.checkForSecureServer = false;
			}

			packet.date = new Date(raw.timestamp.seconds * 1000);

			this.emit('packet', packet);
		}
	}

	/**
	 *
	 * @param {Buffer} data Raw RMC payload data from HokakuCTR
	 */
	handleRawRMC(data) {
		// * Gonna use some shitty heuristics here

		// * Handle the data once in the dummy connection
		this.rawRMCDummyConnection.handleRawRMC(data);

		let dummyPacket = this.rawRMCDummyConnection.packets[this.rawRMCDummyConnection.packets.length-1];
		let connection;

		// * Put the packet back into the right connection.
		// * The authentication server ONLY provides the
		// * Authentication protocol
		if (dummyPacket.rmcMessage.protocolId === Authentication.ProtocolID) {
			connection = this.rawRMCAuthenticationConnection;
		} else {
			connection = this.rawRMCSecureConnection;
		}

		connection.handleRawRMC(data);
		const packet = connection.packets[connection.packets.length-1];

		this.emit('packet', packet);
	}

	/**
	 *
	 * @param {Buffer} frame Raw packet bytes
	 * @returns {object} Carved out packet data or null if not valid UDP packet
	 */
	parsePacketFrame(frame) {
		const stream = new Stream(frame);

		const versionAndHeaderLength = stream.readUInt8();
		const version = (versionAndHeaderLength >> 4) & 0x0F;

		// * All packets we care about are
		// * assumed to be IPv4
		if (version !== 4) {
			return;
		}

		const headerLength = (versionAndHeaderLength & 0x0F) * 4;

		stream.skip(1); // * Service type
		const totalLength = stream.readUInt16BE();
		stream.skip(2); // * Identification
		stream.skip(2); // * Flags and fragment offset. Fragment offset is the last 13 bits (& 0x1FFF)
		stream.skip(1); // * Time to live
		const protocol = stream.readUInt8();
		stream.skip(2); // * Checksum

		const source = this.int2ip(stream.readUInt32BE());
		const destination = this.int2ip(stream.readUInt32BE());

		// TODO - Add this back with the new offsets
		//if (frame.subarray(17, 20).equals(XID_MAGIC)) {
		//	return;
		//}

		if (protocol !== 0x11) {
			return;
		}

		const udpLength = totalLength - headerLength;
		const udpStream = new Stream(stream.readBytes(udpLength));

		// * Parse UDP header
		const sourcePort = udpStream.readUInt16BE();
		const destinationPort = udpStream.readUInt16BE();
		const udpPacketLength = udpStream.readUInt16BE();

		if (udpPacketLength !== udpLength) {
			throw new Error(`Got bad UDP packet length. Expected ${udpLength}, got ${udpPacketLength}`);
		}

		udpStream.skip(0x2); // * Checksum

		const payload = udpStream.readBytes(udpLength - 0x8);

		return {
			source,
			destination,
			sourcePort,
			destinationPort,
			payload
		};
	}

	/**
	 *
	 * @param {number} int IP int
	 * @returns {string} IP string
	 */
	int2ip(int) {
		return `${int >>> 24}.${int >> 16 & 255}.${int >> 8 & 255}.${int & 255}`;
	}
}


module.exports = NEXParser;
