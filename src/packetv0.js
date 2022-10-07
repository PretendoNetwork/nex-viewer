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
	}

	decode() {
		const stream = new Stream(this.data);

		this.source = stream.readUInt8();
		this.destination = stream.readUInt8();
	}
}

module.exports = PacketV0;
