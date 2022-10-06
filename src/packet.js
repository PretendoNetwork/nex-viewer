const Connection = require('./connection');

class Packet {
	static FLAGS = {
		ACK:       0x001,
		RELIABLE:  0x002,
		NEED_ACK:  0x004,
		HAS_SIZE:  0x008,
		MULTI_ACK: 0x200,
	};

	static TYPES = {
		SYN:        0,
		CONNECT:    1,
		DATA:       2,
		DISCONNECT: 3,
		PING:       4,
		USER:       5,
	};

	/**
	 *
	 * @param {Connection} connection
	 * @param {Buffer} data
	 */
	constructor(connection, data) {
		this.connection = connection;
		this.data = data;

		this.version;
		this.source;
		this.destination;
		this.flags;
		this.sessionId;
		this.signature;
		this.sequenceId;
		this.connectionSignature;
		this.fragmentId;
		this.rmcMessage;
		this.rmcData; // * Decoded RMC body

		this.decode();
	}

	/**
	 *
	 * @param {Number} type
	 * @returns Boolean
	 */
	isType(type) {
		return this.type === type;
	}

	/**
	 *
	 * @param {Number} flag
	 * @returns Boolean
	 */
	hasFlag(flag) {
		return (this.flags & flag) !== 0;
	}

	/**
	 *
	 * @returns Boolean
	 */
	isSyn() {
		return this.isType(Packet.TYPES.SYN);
	}

	/**
	 *
	 * @returns Boolean
	 */
	isConnect() {
		return this.isType(Packet.TYPES.CONNECT);
	}

	/**
	 *
	 * @returns Boolean
	 */
	isData() {
		return this.isType(Packet.TYPES.DATA);
	}

	/**
	 *
	 * @returns Boolean
	 */
	isDisconnect() {
		return this.isType(Packet.TYPES.DISCONNECT);
	}

	/**
	 *
	 * @returns Boolean
	 */
	isPing() {
		return this.isType(Packet.TYPES.PING);
	}

	/**
	 *
	 * @returns Boolean
	 */
	isUser() {
		return this.isType(Packet.TYPES.USER);
	}

	/**
	 *
	 * @returns Boolean
	 */
	hasFlagAck() {
		return this.hasFlag(Packet.FLAGS.ACK);
	}

	/**
	 *
	 * @returns Boolean
	 */
	hasFlagReliable() {
		return this.hasFlag(Packet.FLAGS.RELIABLE);
	}

	/**
	 *
	 * @returns Boolean
	 */
	hasFlagNeedAck() {
		return this.hasFlag(Packet.FLAGS.NEED_ACK);
	}

	/**
	 *
	 * @returns Boolean
	 */
	hasFlagHasSize() {
		return this.hasFlag(Packet.FLAGS.HAS_SIZE);
	}

	/**
	 *
	 * @returns Boolean
	 */
	hasFlagMultiAck() {
		return this.hasFlag(Packet.FLAGS.MULTI_ACK);
	}

	/**
	 *
	 * @returns Boolean
	 */
	isToClient() {
		return this.source === 0xA1;
	}

	/**
	 *
	 * @returns Boolean
	 */
	isToServer() {
		return this.source === 0xAF;
	}

	/**
	 *
	 * @returns Boolean
	 */
	hasFragments() {
		return this.fragmentId !== 0;
	}
}

module.exports = Packet;
