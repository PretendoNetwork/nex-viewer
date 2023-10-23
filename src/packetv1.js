/**
 * @typedef {import('./connection')} Connection
 */

const crypto = require('crypto');
const Packet = require('./packet');
const Stream = require('./stream');
const { md5 } = require('./util');

const OPTION_SUPPORTED_FUNCTIONS = 0;
const OPTION_CONNECTION_SIGNATURE = 1;
const OPTION_FRAGMENT_ID = 2;
const OPTION_INITIAL_SEQUENCE_ID = 3;
const OPTION_MAX_SUBSTREAM_ID = 4;

class PacketV1 extends Packet {
	/**
	 *
	 * @param {Connection} connection NEX connection
	 * @param {Stream} stream Packet data stream
	 */
	constructor(connection, stream) {
		super(connection, stream);

		this.version = 1;
		this.headerStream; // * Used for easy signature generation
		this.substreamId;
		this.prudpProtocolMinorVersion;
		this.supportedFunctions;
		this.initialSequenceId;
		this.maximumSubstreamId;
		this.packetSpecificData;
	}

	decode() {
		this.stream.skip(0x2); // * Skip the magic

		this.headerStream = new Stream(this.stream.readBytes(0xC));

		this.headerStream.skip(0x1); // * Skip the PRUDP version, always 1

		const packetSpecificDataLength = this.headerStream.readUInt8();
		const payloadSize = this.headerStream.readUInt16LE();

		this.source = this.headerStream.readUInt8();
		this.destination = this.headerStream.readUInt8();

		// * Skip Quazal Net-Z packets
		if ((this.source & 0xF) === (this.destination & 0xF)) { // * The source and destination ports are the same
			throw new Error(`Source and destination ports are the same. Source ${this.source}, destination ${this.destination}`);
		}

		if ((this.source & 0xF0) === 0x10) { // * Source uses DO stream type
			throw new Error(`Source stream type is DO. Source ${this.source}`);
		}

		if ((this.source & 0xF0) === 0x50) { // * Source uses NAT stream type
			throw new Error(`Source stream type is NAT. Source ${this.source}`);
		}

		if ((this.destination & 0xF0) === 0x10) { // * Destination uses DO stream type
			throw new Error(`Destination stream type is DO. Destination ${this.destination}`);
		}

		if ((this.destination & 0xF0) === 0x50) { // * Destination uses NAT stream type
			throw new Error(`Destination stream type is DO. Destination ${this.destination}`);
		}

		const typeAndFlags = this.headerStream.readUInt16LE();

		this.flags = typeAndFlags >> 4;
		this.type = typeAndFlags & 0xF;

		this.sessionId = this.headerStream.readUInt8();
		this.substreamId = this.headerStream.readUInt8();
		this.sequenceId = this.headerStream.readUInt16LE();

		this.signature = this.stream.readBytes(0x10);
		this.packetSpecificData = this.stream.readBytes(packetSpecificDataLength);

		this.parsePacketSpecificData();

		this.payload = this.stream.readBytes(payloadSize);

		if (this.isSyn() && this.isToServer()) {
			if (!this.connection.isSecureServer) {
				this.connection.reset();
			} else {
				this.connection.serverConnectionSignature = Buffer.alloc(0);
				this.connection.clientConnectionSignature = Buffer.alloc(0);
			}
		}

		if (this.connection.accessKey) {
			// * Found access key, can now check packet signature
			const calculatedSignature = this.calculateSignature();
			if (!calculatedSignature.equals(this.signature)) {
				throw new Error(`Invalid PRUDPv1 packet signature. Expected ${this.signature}, got ${calculatedSignature}`);
			}
		}
	}

	parsePacketSpecificData() {
		const packetSpecificDataStream = new Stream(this.packetSpecificData);

		while (packetSpecificDataStream.hasDataLeft()) {
			const optionId = packetSpecificDataStream.readUInt8();
			const optionSize = packetSpecificDataStream.readUInt8();

			switch (optionId) {
			case OPTION_SUPPORTED_FUNCTIONS: {
				const optionData = packetSpecificDataStream.readUInt32LE();
				this.prudpProtocolMinorVersion = optionData & 0xFF;
				this.supportedFunctions = optionData >> 8;
				break;
			}
			case OPTION_CONNECTION_SIGNATURE:
				this.connectionSignature = packetSpecificDataStream.readBytes(optionSize);
				break;
			case OPTION_FRAGMENT_ID:
				this.fragmentId = packetSpecificDataStream.readUInt8();
				break;
			case OPTION_INITIAL_SEQUENCE_ID:
				this.initialSequenceId = packetSpecificDataStream.readUInt16LE();
				break;
			case OPTION_MAX_SUBSTREAM_ID:
				this.maximumSubstreamId = packetSpecificDataStream.readUInt8();
				break;
			}
		}
	}

	/**
	 *
	 * @param {string} [key] Optional access key
	 * @returns {Buffer} PRUDPv1 packet signature
	 */
	calculateSignature(key) {
		let signatureKey = this.connection.signatureKey;
		let accessKeySum = this.connection.accessKeySum;
		let sessionKey = this.connection.sessionKey;
		let connectionSignature;

		if (!this.connection.isSecureServer || this.isSyn() || this.isConnect()) {
			// * Assume authentication server
			// * Session key not used in auth server

			// * Also don't use if SYN or CONN packet,
			// * but this is not standard. It's a hack
			sessionKey = Buffer.alloc(0);
		}

		if (key) {
			// * If key is set, use that instead
			signatureKey = md5(key);
			accessKeySum = Buffer.alloc(4);

			const keyBuffer = Buffer.from(key);
			const accessKeySumInt = keyBuffer.reduce((sum, byte) => sum + byte, 0);
			accessKeySum.writeUInt32LE(accessKeySumInt);
		}

		if (this.isToServer()) {
			// * client->server packet
			// * Verify using the *SERVER* connection signature
			connectionSignature = this.connection.serverConnectionSignature;
		} else {
			// * server->client packet
			// * Verify using the *CLIENT* connection signature
			connectionSignature = this.connection.clientConnectionSignature;
		}

		const hmac = crypto.createHmac('md5', signatureKey);

		hmac.update(this.headerStream._buffer.subarray(0x4, 0xC));
		hmac.update(sessionKey);
		hmac.update(accessKeySum);
		hmac.update(connectionSignature);
		hmac.update(this.packetSpecificData);
		hmac.update(this.payload);

		return hmac.digest();
	}
}

module.exports = PacketV1;
