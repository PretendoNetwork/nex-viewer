const Connection = require('./connection'); // eslint-disable-line no-unused-vars
const Packet = require('./packet');
const Stream = require('./stream');

class PacketV0 extends Packet {
	/**
	 *
	 * @param {Connection} connection NEX connection
	 * @param {Stream} stream Packet data stream
	 */
	constructor(connection, stream) {
		super(connection, stream);

		this.version = 0;

		this.checksum;
		this.packetData;  // * Used for easy checksum generation
	}

	decode() {
		const start = this.stream.pos();

		this.source = this.stream.readUInt8();
		this.destination = this.stream.readUInt8();

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

		const typeAndFlags = this.stream.readUInt16LE();

		this.flags = typeAndFlags >> 4;
		this.type = typeAndFlags & 0xF;

		if (this.type > 4) {
			throw new Error(`Invalid packet type. Expected 1-4, got ${this.type}`);
		}

		if (this.flags > 15) {
			throw new Error(`Invalid packet flags. Expected 0-15, got ${this.flags}`);
		}

		this.sessionId = this.stream.readUInt8();
		this.signature = this.stream.readBytes(0x4);
		this.sequenceId = this.stream.readUInt16LE();

		if (this.isSyn() || this.isConnect()) {
			this.connectionSignature = this.stream.readBytes(0x4);
		}

		if (this.isData()) {
			this.fragmentId = this.stream.readUInt8();
		}

		let payloadSize = 0;

		if (this.hasFlagHasSize()) {
			payloadSize = this.stream.readUInt16LE();
		} else {
			payloadSize = this.stream.remaining() - 1;
		}

		if (payloadSize > (this.stream.remaining() - 1)) {
			throw new Error(`Packet payload too large. Payload space left is ${this.stream.remaining() - 1}, got ${payloadSize}`);
		}

		this.payload = this.stream.readBytes(payloadSize);

		const end = this.stream.pos();

		// * Quick hack to be used in packet calculation
		// * so we don't have to build this buffer again
		this.packetData = this.stream._buffer.subarray(start, end);

		this.checksum = this.stream.readUInt8();

		if (this.connection.accessKey) {
			// * Found access key, can now check packet checksum
			const calculatedChecksum = this.calculateChecksum();
			if (calculatedChecksum !== this.checksum) {
				throw new Error(`Invalid PRUDPv0 packet checksum. Expected ${this.checksum}, got ${calculatedChecksum}`);
			}
		}
	}

	calculateChecksum(key) {
		/**
		 *
		 * @param {Buffer} buffer Buffer to sum
		 * @returns {number} sum
		 */
		function sum(buffer) {
			return buffer.reduce((sum, byte) => sum + byte, 0);
		}

		let base = this.connection.accessKeySum.readUint32LE();

		if (key) {
			// * If key is set, use that instead
			base = sum(Buffer.from(key));
		}

		const data = this.packetData;

		const numWords = Math.floor(data.length / 4);
		const words = [];

		for (let i = 0; i < numWords; i++) {
			words.push(data.readUInt32LE(i * 4));
		}

		const temp = sum(words) >>> 0; // Truncate to 32-bit integer

		const buffer = Buffer.alloc(4);
		buffer.writeUInt32LE(temp);

		const checksum = base + sum(data.subarray(data.length & ~3)) + sum(buffer);

		return checksum & 0xFF;
	}
}

module.exports = PacketV0;
