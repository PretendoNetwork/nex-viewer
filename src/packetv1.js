const crypto = require('crypto');
const Connection = require('./connection'); // eslint-disable-line no-unused-vars
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
	 * @param {Buffer} data Packet data
	 */
	constructor(connection, data) {
		super(connection, data);

		this.version = 1;

		this.substreamId;
		this.prudpProtocolMinorVersion;
		this.supportedFunctions;
		this.initialSequenceId;
		this.maximumSubstreamId;
		this.packetSpecificData;
	}

	decode() {
		const stream = new Stream(this.data);

		stream.skip(0x2); // Skip the magic

		// Start of packet header
		stream.skip(0x1); // Skip the PRUDP version, always 1

		const packetSpecificDataLength = stream.readUInt8();
		const payloadSize = stream.readUInt16LE();

		this.source = stream.readUInt8();
		this.destination = stream.readUInt8();

		const typeAndFlags = stream.readUInt16LE();

		this.flags = typeAndFlags >> 4;
		this.type = typeAndFlags & 0xF;

		this.sessionId = stream.readUInt8();
		this.substreamId = stream.readUInt8();
		this.sequenceId = stream.readUInt16LE();
		// End packet header

		this.signature = stream.readBytes(0x10);
		this.packetSpecificData = stream.readBytes(packetSpecificDataLength);

		this.parsePacketSpecificData();

		this.payload = stream.readBytes(payloadSize);

		if (this.connection.accessKey) {
			// Found access key, can now check packet signatures
			const calculatedSignature = this.calculateSignature();
			if (!calculatedSignature.equals(this.signature)) {
				console.log(this);
				throw new Error('Failed to validate v1 signature');
			}
		}
	}

	parsePacketSpecificData() {
		const stream = new Stream(this.packetSpecificData);

		while (stream.hasDataLeft()) {
			const optionId = stream.readUInt8();
			const optionSize = stream.readUInt8();

			switch (optionId) {
			case OPTION_SUPPORTED_FUNCTIONS: {
				const optionData = stream.readUInt32LE();
				this.prudpProtocolMinorVersion = optionData & 0xFF;
				this.supportedFunctions = optionData >> 8;
				break;
			}
			case OPTION_CONNECTION_SIGNATURE:
				this.connectionSignature = stream.readBytes(optionSize);
				break;
			case OPTION_FRAGMENT_ID:
				this.fragmentId = stream.readUInt8();
				break;
			case OPTION_INITIAL_SEQUENCE_ID:
				this.initialSequenceId = stream.readUInt16LE();
				break;
			case OPTION_MAX_SUBSTREAM_ID:
				this.maximumSubstreamId = stream.readUInt8();
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

		hmac.update(this.data.subarray(6, 14)); // Bytes 0x4 - 0xC of the packet header
		hmac.update(sessionKey);
		hmac.update(accessKeySum);
		hmac.update(connectionSignature);
		hmac.update(this.packetSpecificData);
		hmac.update(this.payload);

		return hmac.digest();
	}
}

module.exports = PacketV1;
