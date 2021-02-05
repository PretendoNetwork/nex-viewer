const PCAPNGParser = require('pcap-ng-parser');
const { SmartBuffer } = require('smart-buffer');

const Connection = require('./connection');
const PacketV0 = require('./packetv0');
const PacketV1 = require('./packetv1');

const MAGIC_V0_SERVERBOUND = Buffer.from([0xAF, 0xA1]); // Not *really* a magic
const MAGIC_V0_CLIENTBOUND = Buffer.from([0xA1, 0xAF]); // Not *really* a magic
const MAGIC_V1 = Buffer.from([0xEA, 0xD0]);

class NEXParser extends PCAPNGParser {
	constructor() {
		super();

		this.connections = [];

		this.on('data', this._handlePacket);
	}

	_handlePacket({ data: frame }) {
		const udpPacket = parseUDPPacket(frame);

		if (!udpPacket) {
			return;
		}

		let packet;
		let discriminator;

		const packetBuffer = SmartBuffer.fromBuffer(udpPacket.payload);
		const magic = packetBuffer.readBuffer(0x2);

		if (magic.equals(MAGIC_V1)) {
			packet = new PacketV1(udpPacket.payload);

			if (packet.getSource() === 0xAF) {
				discriminator = `${udpPacket.src}-${udpPacket.dst}`;
			} else {
				discriminator = `${udpPacket.dst}-${udpPacket.src}`;
			}
		} else if (magic.equals(MAGIC_V0_SERVERBOUND) || magic.equals(MAGIC_V0_CLIENTBOUND)) {
			packet = new PacketV0(udpPacket.payload);

			if (magic.equals(MAGIC_V0_SERVERBOUND)) {
				discriminator = `${udpPacket.src}-${udpPacket.dst}`;
			} else {
				discriminator = `${udpPacket.dst}-${udpPacket.src}`;
			}
		} else {
			// Not a NEX packet
			return;
		}

		let connection = this.connections.find(connection => connection.getDiscriminator() === discriminator);

		if (!connection) {
			connection = new Connection(discriminator);
			this.connections.push(connection);
		}

		connection.handlePacket(packet);

		if (connection.secureServerStation && connection.secureKey) {
			const localIP = connection.getDiscriminator().split('-')[0];
			const secureIP = connection.secureServerStation.address;
			const secureDiscriminator = `${localIP}-${secureIP}`;

			if (connection.getDiscriminator() !== secureDiscriminator) {
				// Secure server on different address, make a new connection
				const secureConnection = new Connection(secureDiscriminator);
				secureConnection.setRC4Key(connection.secureKey);
				secureConnection.accessKey = connection.accessKey;
				this.connections.push(secureConnection);
			} else {
				connection.setRC4Key(connection.secureKey);
			}

			delete connection.secureKey;
		}

		this.emit('packet', packet);
	}
}

// https://gist.github.com/jppommet/5708697
function int2ip(ipInt) {
	return `${ipInt >>> 24}.${ipInt >> 16 & 255}.${ipInt >> 8 & 255}.${ipInt & 255}`;
}

// Parse a raw IP packet down to it's UDP parts
// Returns nothing if not a UDP packet
// This skips a bunch of stuff that we don't need
function parseUDPPacket(frame) {
	const buffer = SmartBuffer.fromBuffer(frame);

	buffer.readBuffer(0xE); // Skip the ethernet header

	// Parse IPv4 header
	// Assuming always IPv4

	buffer.readBuffer(0x9); // skip until protocol

	const protocol = buffer.readUInt8();

	buffer.readBuffer(0x2); // Skip header checksum

	const src = int2ip(buffer.readUInt32BE());
	const dst = int2ip(buffer.readUInt32BE());

	// Not a UDP packet
	if (protocol !== 0x11) {
		return null;
	}

	// Parse UDP header

	const srcPort = buffer.readUInt16BE();
	const dstPort = buffer.readUInt16BE();
	const udpPacketLength = buffer.readUInt16BE();

	buffer.readBuffer(0x2); // skip header checksum

	const payload = buffer.readBuffer(udpPacketLength - 0x8);

	return {
		src,
		dst,
		srcPort,
		dstPort,
		payload
	};
}

module.exports = NEXParser;