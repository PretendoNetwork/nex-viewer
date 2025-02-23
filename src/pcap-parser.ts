import ByteStream from '@/byte-stream';
import type { Packet } from '@/types/pcap-parser';

const LINKTYPE_ETHERNET = 0x0001;
const LINKTYPE_RAW = 0x0065;

const LINKTYPE_HOKAKUCTR = 0x0093;

export default class PCAPParser {
	private buffer: Buffer;
	private stream: ByteStream;
	private be = false;
	private packetStartOffset: number;
	private linkLayerSize: number;

	public versionMajor: number;
	public versionMinor: number;
	public thisZone: number;
	public sigfigs: number;
	public maxPacketLength: number;
	public linkLayerType: number;

	constructor(buffer: Buffer) {
		this.buffer = buffer;
		this.stream = new ByteStream(this.buffer);

		this.parseHeader();
	}

	private readUInt16(): number {
		if (!this.be) {
			return this.stream.readUInt16LE();
		} else {
			return this.stream.readUInt16BE();
		}
	}

	private readUInt32(): number {
		if (!this.be) {
			return this.stream.readUInt32LE();
		} else {
			return this.stream.readUInt32BE();
		}
	}

	public readInt32(): number {
		if (!this.be) {
			return this.stream.readInt32LE();
		} else {
			return this.stream.readInt32BE();
		}
	}

	private parseHeader(): void {
		const magic = this.readUInt32();

		if (magic !== 0xA1B2C3D4 && magic !== 0xD4C3B2A1) {
			const magicHex = magic.toString(16).toLocaleUpperCase();
			throw new Error(`Invalid PCAP magic. Expected either 0xA1B2C3D4 or 0xD4C3B2A1, got 0x${magicHex}`);
		}

		if (magic !== 0xA1B2C3D4) {
			this.be = true;
		}

		this.versionMajor = this.readUInt16();
		this.versionMinor = this.readUInt16();
		this.thisZone = this.readInt32();
		this.sigfigs = this.readUInt32();
		this.maxPacketLength = this.readUInt32();
		this.linkLayerType = this.readUInt32();

		this.packetStartOffset = this.stream.pos();
		this.linkLayerSize = this.checkLinkLayerSize();
	}

	private checkLinkLayerSize(): number {
		switch (this.linkLayerType) {
			case LINKTYPE_ETHERNET:
				return 14;

			case LINKTYPE_RAW:
			case LINKTYPE_HOKAKUCTR:
				return 0;

			default:
				console.log(`Unsupported link layer type ${this.linkLayerType}`);
				return 0;
		}
	}

	public *packets(): Generator<Packet> {
		this.stream.seek(this.packetStartOffset);

		while (this.stream.hasDataLeft()) {
			const timestampSeconds = this.readUInt32();
			const timestampMicroseconds = this.readUInt32();
			const storedLength = this.readUInt32();
			const realLength = this.readUInt32();

			this.stream.skip(this.linkLayerSize);

			const data = this.stream.readBytes(storedLength - this.linkLayerSize);

			yield {
				timestamp: {
					seconds: timestampSeconds,
					microseconds: timestampMicroseconds
				},
				storedLength,
				realLength,
				data
			};
		}
	}
}
