const EventEmitter = require('node:events');
const fs = require('fs');
const PCAPNGParser = require('pcap-ng-parser');
const isPrivateIP = require('private-ip');
const PacketV0 = require('./packetv0');
const PacketV1 = require('./packetv1');
const Connection = require('./connection');
const Stream = require('./stream');

// ! NOTE -
// ! PRUDPv0 does not have magics
// ! Nintendo uses standardized source/destinations with NEX
// ! Checking the source/destination can tell us if it's v0
const MAGIC_V0_SERVERBOUND = Buffer.from([0xAF, 0xA1]);
const MAGIC_V0_CLIENTBOUND = Buffer.from([0xA1, 0xAF]);
const MAGIC_V1 = Buffer.from([0xEA, 0xD0]);

class NEXParser extends EventEmitter {
	constructor() {
		super();

		this.connections = [];
	}

	/**
	 *
	 * @param {String} capturePath
	 */
	parse(capturePath) {
		const pcapNgParser = new PCAPNGParser();

		const captureStream = fs.createReadStream(capturePath);

		captureStream.pipe(pcapNgParser)
			.on('data', this.handlePacket.bind(this));
	}

	/**
	 *
	 * @param {Object} data
	 */
	handlePacket({ data: frame }) {
		const udpPacket = this.parseUDPPacket(frame);

		if (!udpPacket) {
			return;
		}

		let discriminator;
		if (isPrivateIP(udpPacket.source)) {
			// * client->server packet
			discriminator = `${udpPacket.destination}:${udpPacket.destinationPort}`;
		} else {
			// * server->client packet
			discriminator = `${udpPacket.source}:${udpPacket.sourcePort}`;
		}

		let connection = this.connections.find(connection => connection.discriminator === discriminator);

		if (!connection) {
			connection = new Connection(discriminator);
			this.connections.push(connection);
		}

		let packet;
		const stream = new Stream(udpPacket.payload);

		const magic = stream.readBytes(0x2);

		if (magic.equals(MAGIC_V1)) {
			packet = new PacketV1(connection, udpPacket.payload);
		} else if (magic.equals(MAGIC_V0_SERVERBOUND) || magic.equals(MAGIC_V0_CLIENTBOUND)) {
			packet = new PacketV0(connection, udpPacket.payload);
		} else {
			// Not a NEX packet
			return;
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
				secureConnection.isSecureServer = true;

				this.connections.push(secureConnection);
			} else {
				// * Secure server is at the same address, just update key
				connection.isSecureServer = true;
				connection.setRC4Key(connection.sessionKey);
			}

			connection.checkForSecureServer = false;
		}

		this.emit('packet', packet);
	}

	/**
	 *
	 * @param {Buffer} frame
	 * @returns Object
	 */
	parseUDPPacket(frame) {
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
	 * @param {Number} int
	 * @returns String
	 */
	int2ip(int) {
		return `${int >>> 24}.${int >> 16 & 255}.${int >> 8 & 255}.${int & 255}`;
	}
}


module.exports = NEXParser;