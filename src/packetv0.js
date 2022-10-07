const Connection = require('./connection'); // eslint-disable-line no-unused-vars
const Packet = require('./packet');
const Stream = require('./stream');

class PacketV0 extends Packet {
	/**
	 *
	 * @param {Connection} connection NEX connection
	 * @param {Buffer} data Packet data
	 */
	constructor(connection, data) {
		super(connection, data);

		this.version = 0;

		this.checksum;
	}

	decode() {
		const stream = new Stream(this.data);

		this.source = stream.readUInt8();
		this.destination = stream.readUInt8();

		const typeAndFlags = stream.readUInt16LE();

		this.flags = typeAndFlags >> 4;
		this.type = typeAndFlags & 0xF;
		this.sessionId = stream.readUInt8();
		this.signature = stream.readBytes(0x4);
		this.sequenceId = stream.readUInt16LE();

		if (this.isSyn() || this.isConnect()) {
			this.connectionSignature = stream.readBytes(0x4);
		}

		if (this.isData()) {
			this.fragmentId = stream.readUInt8();
		}

		let payloadSize = 0;

		if (this.hasFlagHasSize()) {
			payloadSize = stream.readUInt16LE();
		} else {
			payloadSize = stream.remaining() - 1;
		}

		this.payload = stream.readBytes(payloadSize);
		this.checksum = stream.readUInt8();

		// TODO - Verify checksum

		if (this.connection.accessKey) {
			// Found access key, can now check packet signatures
			const calculatedChecksum = this.calculateChecksum();
			if (calculatedChecksum !== this.checksum) {
				console.log(this);
				throw new Error('Failed to validate v0 checksum');
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

		const data = this.data.subarray(0, this.data.length - 1);

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
