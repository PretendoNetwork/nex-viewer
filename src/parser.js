const EventEmitter = require('node:events');
const path = require('node:path');
const fs = require('fs');
const PCAPNGParser = require('pcap-ng-parser');
const pcapp = require('pcap-parser');
const isPrivateIP = require('private-ip');
const PacketV0 = require('./packetv0');
const PacketV1 = require('./packetv1');
const Connection = require('./connection');
const Stream = require('./stream');

// ! NOTE -
// ! PRUDPv0 does not have magics
// ! Nintendo uses standardized source/destinations with NEX
// ! Checking the source/destination can tell us if it's v0
const PRUDP_V1_MAGIC = Buffer.from([0xEA, 0xD0]);

// * Magics to check for when parsing UDP packets
const XID_MAGIC = Buffer.from([0x81, 0x01, 0x0]);

class NEXParser extends EventEmitter {
	constructor() {
		super();

		this.connections = [];
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

		if (extension === '.pcapng') {
			const pcapNgParser = new PCAPNGParser();
			fs.createReadStream(capturePath)
				.pipe(pcapNgParser)
				.on('data', this.handlePacket.bind(this))
				.on('close', () => {
					this.emit('connections', this.connections);
				});
		} else {
			const parser = pcapp.parse(capturePath);
			parser.on('packet', this.handlePacket.bind(this));
			parser.on('end', () => {
				this.emit('connections', this.connections);
			});
		}
	}

	/**
	 *
	 * @param {object} raw Raw WireShark packet as parsed by `pcap-ng-parser`
	 */
	handlePacket(raw) {
		const { data: frame } = raw;
		const udpPacket = this.parseUDPPacket(frame);

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
			const timestamp = raw.header.timestampSeconds;
			packet.date = new Date(timestamp * 1000);

			this.emit('packet', packet);
		}
	}

	/**
	 *
	 * @param {Buffer} frame Raw packet bytes
	 * @returns {object} Carved out packet data or null if not valid UDP packet
	 */
	parseUDPPacket(frame) {
		if (frame.subarray(17, 20).equals(XID_MAGIC)) {
			return;
		}

		const stream = new Stream(frame);
		stream.skip(0xE);  // Skip the ethernet header

		// Parse IPv4 header
		// Assuming always IPv4

		stream.skip(0x9); // skip until protocol

		const protocol = stream.readUInt8();

		// Not a UDP packet
		if (protocol !== 0x11) {
			return;
		}

		stream.skip(0x2); // Skip header checksum

		const source = this.int2ip(stream.readUInt32BE());
		const destination = this.int2ip(stream.readUInt32BE());

		// Parse UDP header

		const sourcePort = stream.readUInt16BE();
		const destinationPort = stream.readUInt16BE();
		const udpPacketLength = stream.readUInt16BE();

		stream.skip(0x2); // skip header checksum

		const payload = stream.readBytes(udpPacketLength - 0x8); // UDP payload is length-8 long everytime

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
