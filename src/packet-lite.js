/**
 * @typedef {import('./connection')} Connection
 */

const Packet = require('./packet');
const Stream = require('./stream');

const OPTION_SUPPORTED_FUNCTIONS = 0;
const OPTION_CONNECTION_SIGNATURE = 1;
const OPTION_FRAGMENT_ID = 2;
const OPTION_INITIAL_SEQUENCE_ID = 3;
const OPTION_MAX_SUBSTREAM_ID = 4;
const OPTION_LITE_SIGNATURE = 0x80;

class PacketLite extends Packet {
	/**
	 *
	 * @param {Connection} connection NEX connection
	 * @param {Stream} stream Packet data stream
	 */
	constructor(connection, stream) {
		super(connection, stream);

		this.version = 'lite';
		this.source = '';
		this.destination = '';
		this.sourceStreamType;
		this.destinationStreamType;
		this.sourcePort;
		this.destinationPort;
		this.fragmentId;
		this.flags;
		this.type;
		this.sequenceId;
		this.packetSpecificData;
		this.payload;

		this.prudpProtocolMinorVersion;
		this.supportedFunctions;
		this.initialSequenceId;
		this.maximumSubstreamId;
		this.liteSignature;
	}

	decode() {
		const magic = this.stream.readUInt8();

		if (magic !== 0x80) {
			throw new Error(`Invalid PRUDPLite magic ${magic.toString('16')}`);
		}

		const packetSpecificDataLength = this.stream.readUInt8();
		const payloadSize = this.stream.readUInt16LE();
		const streamTypes = this.stream.readUInt8();
		this.sourceStreamType = (streamTypes & 0xF0) >> 4;
		this.destinationStreamType = streamTypes & 0x0F;
		this.sourcePort = this.stream.readUInt8();
		this.destinationPort = this.stream.readUInt8();
		this.fragmentId = this.stream.readUInt8();
		const typeAndFlags = this.stream.readUInt16LE();
		this.flags = typeAndFlags >> 4;
		this.type = typeAndFlags & 0xF;
		this.sequenceId = this.stream.readUInt16LE();
		this.packetSpecificData = this.stream.readBytes(packetSpecificDataLength);

		this.parsePacketSpecificData();

		this.payload = this.stream.readBytes(payloadSize);
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
			case OPTION_LITE_SIGNATURE:
				this.liteSignature = packetSpecificDataStream.readBytes(optionSize);
				break;
			}
		}
	}

	isToClient() {
		return this.source === 'server';
	}

	isToServer() {
		return this.source === 'client';
	}
}

module.exports = PacketLite;
