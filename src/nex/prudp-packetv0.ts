import PRUDPPacket from '@/nex/prudp-packet';
import type ByteStream from '@/byte-stream';
import type { SerializedPRUDPV0Packet } from '@/types/nex/serialized-packet';

export default class PRUDPPacketV0 extends PRUDPPacket {
	public readonly version = 0;

	private _checksum: number;
	private packetData: Buffer; // * Used for the checksum calculation

	public get checksum(): number {
		return this._checksum;
	}

	constructor(stream: ByteStream) {
		super(stream);

		this.substreamID = 0;
		this.parse();
	}

	private parse(): void {
		const start = this.stream.pos();

		const source = this.stream.readUInt8();
		const destination = this.stream.readUInt8();

		this.sourceStreamType = source >> 4;
		this.sourceStreamID = source & 0xF;
		this.destinationStreamType = destination >> 4;
		this.destinationStreamID = destination & 0xF;

		// TODO - Quazal encoding? How do we tell the decoder the size BEFORE decoding?
		const typeAndFlags = this.stream.readUInt16LE();

		this.flags = typeAndFlags >> 4;
		this.type = typeAndFlags & 0xF;
		this.sessionID = this.stream.readUInt8();
		this.signature = this.stream.readBytes(0x4);
		this.sequenceID = this.stream.readUInt16LE();

		if (this.isTypeSyn() || this.isTypeConnect()) {
			this.connectionSignature = this.stream.readBytes(0x4);
		}

		if (this.isTypeData()) {
			this.fragmentID = this.stream.readUInt8();
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

		this.stream.seek(start);
		this.packetData = this.stream.read(end - start);

		// TODO - Quazal encoding? How do we tell the decoder the size BEFORE decoding?
		// TODO - Validate this
		this._checksum = this.stream.readUInt8();
	}

	public calculateChecksum(key: string): number {
		let checksum = Buffer.from(key).reduce((sum, byte) => sum + byte, 0);

		const data = this.packetData;

		const numWords = Math.floor(data.length / 4);
		const words = [];

		for (let i = 0; i < numWords; i++) {
			words.push(data.readUInt32LE(i * 4));
		}

		const temp = words.reduce((sum, byte) => sum + byte, 0) >>> 0; // * Truncate to 32-bit integer

		const buffer = Buffer.alloc(4);
		buffer.writeUInt32LE(temp);

		checksum = checksum + data.subarray(data.length & ~3).reduce((sum, byte) => sum + byte, 0) + buffer.reduce((sum, byte) => sum + byte, 0);

		return checksum & 0xFF;
	}

	public toJSON(): SerializedPRUDPV0Packet {
		const serialized = this.serialize() as SerializedPRUDPV0Packet;

		serialized.checksum = this.checksum;

		return serialized;
	}
}
