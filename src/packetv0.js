const Connection = require('./connection');
const Packet = require('./packet');
const Stream = require('./stream');

class PacketV0 extends Packet {
	/**
	 *
	 * @param {Connection} connection
	 * @param {Buffer} data
	 */
	constructor(connection, data) {
		super(connection, data);

		this.version = 0;
	}

	decode() {
		const stream = new Stream(this.data);

		this.source = stream.readUInt8();
		this.destination = stream.readUInt8();
	}
}

module.exports = PacketV0;
