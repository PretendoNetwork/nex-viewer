/**
 * @typedef {import('./connection')} Connection
 * @typedef {import('./stream')} Stream
 */

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
	 * @param {Connection} connection NEX connection
	 * @param {Stream} stream Packet data stream
	 */
	constructor(connection, stream) {
		this.connection = connection;
		this.stream = stream;
		this.isRawRMC = false;

		this.version;
		this.source;
		this.destination;
		this.flags;
		this.sessionId;
		this.signature;
		this.sequenceId;
		this.connectionSignature;
		this.fragmentId;
		this.rmcMessage = {
			isRequest() {
				// * Stub for broken packets
				return undefined;
			},
			isSuccess() {
				// * Stub for broken packets
				return undefined;
			}
		};
		this.rmcData = {}; // * Decoded RMC body
		this.stackTrace; // * Contains possible decoding errors
		this.date = 0;

		if (this.decode && this.stream) {
			this.decode();
		}
	}

	/**
	 * @returns {object} JSON serialized data
	 */
	toJSON() {
		const serialized = {
			rawRMC: this.isRawRMC,
			flags: [],
			rmc: {
				protocolName: this.rmcData.protocolName,
				methodName: this.rmcData.methodName,
				protocolId: this.rmcMessage.protocolId,
				customId: this.rmcMessage.customId,
				methodId: this.rmcMessage.methodId,
				callId: this.rmcMessage.callId,
				errorCode: this.rmcMessage.errorCode,
				body: this.rmcData.body
			},
			stackTrace: this.stackTrace
		};

		if (this.isRawRMC) {
			serialized.server = this.connection.isSecureServer ? 'secure' : 'authentication';
			serialized.type = 'DATA';
			serialized.fragmentId = 0;

			serialized.rmc.isRequest = this.rmcMessage.isRequest();

			if (serialized.rmc.isRequest === false) {
				serialized.rmc.isSuccess = this.rmcMessage.isSuccess();
			}
		} else {
			serialized.version = this.version;
			serialized.source = this.source;
			serialized.destination = this.destination;
			serialized.sessionId = this.sessionId;
			serialized.signature = this.signature?.toString('hex') || '';
			serialized.sequenceId = this.sequenceId;
			serialized.fragmentId = this.fragmentId;
			serialized.checksum = this.checksum;
			serialized.date = this.date;

			if (this.isToClient()) {
				serialized.sourceAddress = this.connection.serverAddress;
				serialized.destinationAddress = this.connection.clientAddress;
			} else {
				serialized.sourceAddress = this.connection.clientAddress;
				serialized.destinationAddress = this.connection.serverAddress;
			}

			if (this.isSyn()) {
				serialized.type = 'SYN';
			}

			if (this.isConnect()) {
				serialized.type = 'CONNECT';
			}

			if (this.isData()) {
				serialized.type = 'DATA';
				serialized.fragmentId = this.fragmentId;

				serialized.rmc.isRequest = this.rmcMessage.isRequest();

				if (serialized.fragmentId === 0 && serialized.rmc.isRequest === false) {
					serialized.rmc.isSuccess = this.rmcMessage.isSuccess();
				}
			}

			if (this.isDisconnect()) {
				serialized.type = 'DISCONNECT';
			}

			if (this.isPing()) {
				serialized.type = 'PING';
			}

			if (this.isUser()) {
				serialized.type = 'USER';
			}

			if (this.hasFlagAck()) {
				serialized.flags.push('ACK');
			}

			if (this.hasFlagReliable()) {
				serialized.flags.push('RELIABLE');
			}

			if (this.hasFlagNeedAck()) {
				serialized.flags.push('NEED_ACK');
			}

			if (this.hasFlagHasSize()) {
				serialized.flags.push('HAS_SIZE');
			}

			if (this.hasFlagMultiAck()) {
				serialized.flags.push('MULTI_ACK');
			}
		}

		return serialized;
	}

	/**
	 *
	 * @param {number} type NEX packet type
	 * @returns {boolean} True if is type
	 */
	isType(type) {
		return this.type === type;
	}

	/**
	 *
	 * @param {number} flag NEX packet flag
	 * @returns {boolean} True if has flag
	 */
	hasFlag(flag) {
		return (this.flags & flag) !== 0;
	}

	/**
	 *
	 * @returns {boolean} True if is type
	 */
	isSyn() {
		return this.isType(Packet.TYPES.SYN);
	}

	/**
	 *
	 * @returns {boolean} True if is type
	 */
	isConnect() {
		return this.isType(Packet.TYPES.CONNECT);
	}

	/**
	 *
	 * @returns {boolean} True if is type
	 */
	isData() {
		return this.isType(Packet.TYPES.DATA);
	}

	/**
	 *
	 * @returns {boolean} True if is type
	 */
	isDisconnect() {
		return this.isType(Packet.TYPES.DISCONNECT);
	}

	/**
	 *
	 * @returns {boolean} True if is type
	 */
	isPing() {
		return this.isType(Packet.TYPES.PING);
	}

	/**
	 *
	 * @returns {boolean} True if is type
	 */
	isUser() {
		return this.isType(Packet.TYPES.USER);
	}

	/**
	 *
	 * @returns {boolean} True if has flag
	 */
	hasFlagAck() {
		return this.hasFlag(Packet.FLAGS.ACK);
	}

	/**
	 *
	 * @returns {boolean} True if has flag
	 */
	hasFlagReliable() {
		return this.hasFlag(Packet.FLAGS.RELIABLE);
	}

	/**
	 *
	 * @returns {boolean} True if has flag
	 */
	hasFlagNeedAck() {
		return this.hasFlag(Packet.FLAGS.NEED_ACK);
	}

	/**
	 *
	 * @returns {boolean} True if has flag
	 */
	hasFlagHasSize() {
		return this.hasFlag(Packet.FLAGS.HAS_SIZE);
	}

	/**
	 *
	 * @returns {boolean} True if has flag
	 */
	hasFlagMultiAck() {
		return this.hasFlag(Packet.FLAGS.MULTI_ACK);
	}

	/**
	 *
	 * @returns {boolean} True if has flag
	 */
	isToClient() {
		return (this.source & 0xF) === 0x1;
	}

	/**
	 *
	 * @returns {boolean} True if has flag
	 */
	isToServer() {
		return (this.source & 0xF) === 0xF;
	}

	/**
	 *
	 * @returns {boolean} True if has flag
	 */
	hasFragments() {
		return this.fragmentId !== 0;
	}
}

module.exports = Packet;
