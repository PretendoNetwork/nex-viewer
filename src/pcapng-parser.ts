import ByteStream from '@/byte-stream';
import type {
	SectionHeaderBlock,
	InterfaceDescriptionBlock,
	EnhancedPacketBlock,
	SimplePacketBlock,
	EthernetInterface
} from '@/types/pcapng-parser';

const BLOCK_TYPE_SECTION_HEADER = 0x0A0D0D0A;
const BLOCK_TYPE_INTERFACE_DESCRIPTION = 0x00000001;
const BLOCK_TYPE_ENHANCED_PACKET = 0x00000006;
const BLOCK_TYPE_SIMPLE_PACKET = 0x00000003;
const BLOCK_TYPE_NAME_RESOLUTION = 0x00000004;
const BLOCK_TYPE_INTERFACE_STATISTICS = 0x00000005;
const BLOCK_TYPE_CUSTOM_1 = 0x00000BAD;
const BLOCK_TYPE_CUSTOM_2 = 0x40000BAD;

const LINKTYPE_ETHERNET = 0x0001;

export default class PCAPNGParser {
	private buffer: Buffer;
	private stream: ByteStream;
	private currentSection: SectionHeaderBlock;

	constructor(buffer: Buffer) {
		this.buffer = buffer;
		this.stream = new ByteStream(this.buffer);
	}

	private readUInt16(): number {
		if (!this.currentSection || !this.currentSection.be) {
			return this.stream.readUInt16LE();
		} else {
			return this.stream.readUInt16BE();
		}
	}

	private readUInt32(): number {
		if (!this.currentSection || !this.currentSection.be) {
			return this.stream.readUInt32LE();
		} else {
			return this.stream.readUInt32BE();
		}
	}

	private parseOptionalData(optionsLength: number): Map<number, Buffer> {
		const options = new Map<number, Buffer>();
		const optionsEnd = this.stream.pos() + optionsLength;

		while (this.stream.pos() != optionsEnd) {
			const optionCode = this.readUInt16();
			const optionLength = this.readUInt16();
			const padding = (4 - (optionLength % 4)) % 4;
			const optionData = this.stream.readBytes(optionLength);

			this.stream.skip(padding);

			options.set(optionCode, optionData);
		}

		return options;
	}

	// * BLOCK PARSERS

	private parseSectionHeaderBlock(): SectionHeaderBlock {
		const blockStart = this.stream.pos();
		const magic = this.readUInt32();

		if (magic !== BLOCK_TYPE_SECTION_HEADER) {
			const expected = BLOCK_TYPE_SECTION_HEADER.toString(16).toLocaleUpperCase();
			const magicHex = magic.toString(16).toLocaleUpperCase();
			throw new Error(`Invalid PCAP magic. Expected 0x${expected}, got 0x${magicHex}`);
		}

		const blockLength = this.readUInt32();
		const bom = this.readUInt32();

		if (bom !== 0x1A2B3C4D && bom !== 0x4D3C2B1A) {
			const bomHex = magic.toString(16).toLocaleUpperCase();
			throw new Error(`Invalid SHB BOM. Expected either 0x1A2B3C4D or 0x4D3C2B1A, got 0x${bomHex}`);
		}

		const versionMajor = this.readUInt16();
		const versionMinor = this.readUInt16();

		this.stream.skip(8); // * Length of all the data (blocks) in this section, for skipping. We never skip whole sections

		const optionsLength = (blockStart + blockLength - 4) - this.stream.pos();

		const options = this.parseOptionalData(optionsLength);

		const blockLength2 = this.readUInt32();

		if (blockLength !== blockLength2) {
			throw new Error(`Invalid trailing block length. Expected ${blockLength}, got ${blockLength2}`);
		}

		return {
			be: bom === 0x4D3C2B1A,
			interfaces: [],
			versionMajor,
			versionMinor,
			options
		};
	}

	private parseInterfaceDescriptionBlock(): InterfaceDescriptionBlock {
		const blockStart = this.stream.pos();
		const magic = this.readUInt32();

		if (magic !== BLOCK_TYPE_INTERFACE_DESCRIPTION) {
			const expected = BLOCK_TYPE_INTERFACE_DESCRIPTION.toString(16).toLocaleUpperCase();
			const magicHex = magic.toString(16).toLocaleUpperCase();
			throw new Error(`Invalid PCAP magic. Expected 0x${expected}, got 0x${magicHex}`);
		}

		const blockLength = this.readUInt32();
		const linkLayerType = this.readUInt16();
		const reserved = this.readUInt16(); // * Unused
		const maxPacketLength = this.readUInt32();

		const optionsLength = (blockStart + blockLength - 4) - this.stream.pos();

		const options = this.parseOptionalData(optionsLength);

		const blockLength2 = this.readUInt32();

		if (blockLength !== blockLength2) {
			throw new Error(`Invalid trailing block length. Expected ${blockLength}, got ${blockLength2}`);
		}

		return {
			linkLayerType,
			reserved,
			maxPacketLength,
			options
		};
	}

	private parseEnhancedPacketBlock(): EnhancedPacketBlock {
		const blockStart = this.stream.pos();
		const magic = this.readUInt32();

		if (magic !== BLOCK_TYPE_ENHANCED_PACKET) {
			const expected = BLOCK_TYPE_ENHANCED_PACKET.toString(16).toLocaleUpperCase();
			const magicHex = magic.toString(16).toLocaleUpperCase();
			throw new Error(`Invalid PCAP magic. Expected 0x${expected}, got 0x${magicHex}`);
		}

		const blockLength = this.readUInt32();
		const interfaceID = this.readUInt32();
		const timestampHigh = this.readUInt32();
		const timestampLow = this.readUInt32();
		const storedLength = this.readUInt32();
		const realLength = this.readUInt32();

		const interfaceDescription = this.currentSection.interfaces[interfaceID];
		let interfaceDataLength = 0;
		let networkInterface;

		switch (interfaceDescription.linkLayerType) {
			case LINKTYPE_ETHERNET:
				networkInterface = this.parseInterfaceEthernet();
				interfaceDataLength = 14;
				break;

			default:
				throw new Error(`Unsupported interface type 0x${interfaceDescription.linkLayerType.toString(16).toLocaleUpperCase()}`);
		}

		const data = this.stream.readBytes(storedLength - interfaceDataLength);

		const timestampResolutionData = interfaceDescription.options.get(0x9);
		let timestampResolution = 6; // * Default if no if_tsresol option set in the interface

		if (timestampResolutionData) {
			timestampResolution = timestampResolutionData.readUInt8();
		}

		const timestamp = (BigInt(timestampHigh) << 32n) | BigInt(timestampLow);
		const isMSBSet = (timestampResolution & 0x80) !== 0;
		const resolutionBits = timestampResolution & 0x7F;

		const timestampSeconds = isMSBSet
			? Number(timestamp) * Math.pow(2, -resolutionBits)
			: Number(timestamp) * Math.pow(10, -resolutionBits);

		const padding = (4 - (storedLength % 4)) % 4;

		this.stream.skip(padding);

		const optionsLength = (blockStart + blockLength - 4) - this.stream.pos();
		const options = this.parseOptionalData(optionsLength);

		const blockLength2 = this.readUInt32();

		if (blockLength !== blockLength2) {
			throw new Error(`Invalid trailing block length. Expected ${blockLength}, got ${blockLength2}`);
		}

		return {
			interfaceID,
			timestamp: {
				high: timestampHigh,
				low: timestampLow,
				seconds: timestampSeconds
			},
			storedLength,
			realLength,
			interface: networkInterface,
			options,
			data
		};
	}

	private parseSimplePacketBlock(): SimplePacketBlock {
		const magic = this.readUInt32();

		if (magic !== BLOCK_TYPE_SIMPLE_PACKET) {
			const expected = BLOCK_TYPE_SIMPLE_PACKET.toString(16).toLocaleUpperCase();
			const magicHex = magic.toString(16).toLocaleUpperCase();
			throw new Error(`Invalid PCAP magic. Expected 0x${expected}, got 0x${magicHex}`);
		}

		const blockLength = this.readUInt32();
		const realLength = this.readUInt32();
		const storedLength = blockLength - 16;

		// * From the docs:
		// *
		// * The Simple Packet Block does not contain the Interface ID field.
		// * Therefore, it MUST be assumed that all the Simple Packet Blocks
		// * have been captured on the interface previously specified in the
		// * first Interface Description Block.
		const interfaceDescription = this.currentSection.interfaces[0];
		let interfaceDataLength = 0;
		let networkInterface;

		switch (interfaceDescription.linkLayerType) {
			case LINKTYPE_ETHERNET:
				networkInterface = this.parseInterfaceEthernet();
				interfaceDataLength = 14;
				break;

			default:
				throw new Error(`Unsupported interface type 0x${interfaceDescription.linkLayerType.toString(16).toLocaleUpperCase()}`);
		}

		const data = this.stream.readBytes(storedLength - interfaceDataLength);

		// * Block has no optional data

		const blockLength2 = this.readUInt32();

		if (blockLength !== blockLength2) {
			throw new Error(`Invalid trailing block length. Expected ${blockLength}, got ${blockLength2}`);
		}

		return {
			realLength,
			interface: networkInterface,
			data: data
		};
	}

	private parseNameResolutionBlock(): void {
		const blockStart = this.stream.pos();
		const magic = this.readUInt32();

		if (magic !== BLOCK_TYPE_NAME_RESOLUTION) {
			const expected = BLOCK_TYPE_NAME_RESOLUTION.toString(16).toLocaleUpperCase();
			const magicHex = magic.toString(16).toLocaleUpperCase();
			throw new Error(`Invalid PCAP magic. Expected 0x${expected}, got 0x${magicHex}`);
		}

		const blockLength = this.readUInt32();

		// * Skip this whole block. We don't need this data
		// * Only implemented to prevent a crash

		this.stream.seek((blockStart + blockLength) - 4);

		const blockLength2 = this.readUInt32();

		if (blockLength !== blockLength2) {
			throw new Error(`Invalid trailing block length. Expected ${blockLength}, got ${blockLength2}`);
		}
	}

	private parseInterfaceStatisticsBlock(): void {
		const blockStart = this.stream.pos();
		const magic = this.readUInt32();

		if (magic !== BLOCK_TYPE_INTERFACE_STATISTICS) {
			const expected = BLOCK_TYPE_INTERFACE_STATISTICS.toString(16).toLocaleUpperCase();
			const magicHex = magic.toString(16).toLocaleUpperCase();
			throw new Error(`Invalid PCAP magic. Expected 0x${expected}, got 0x${magicHex}`);
		}

		const blockLength = this.readUInt32();

		// * Skip this whole block. We don't need this data
		// * Only implemented to prevent a crash

		this.stream.seek((blockStart + blockLength) - 4);

		const blockLength2 = this.readUInt32();

		if (blockLength !== blockLength2) {
			throw new Error(`Invalid trailing block length. Expected ${blockLength}, got ${blockLength2}`);
		}
	}

	private parseCustomBlock(): void {
		const blockStart = this.stream.pos();
		const magic = this.readUInt32();

		if (magic !== BLOCK_TYPE_CUSTOM_1 && magic !== BLOCK_TYPE_CUSTOM_2) {
			const expected1 = BLOCK_TYPE_CUSTOM_1.toString(16).toLocaleUpperCase();
			const expected2 = BLOCK_TYPE_CUSTOM_2.toString(16).toLocaleUpperCase();
			const magicHex = magic.toString(16).toLocaleUpperCase();
			throw new Error(`Invalid PCAP magic. Expected either 0x${expected1} or 0x${expected2}, got 0x${magicHex}`);
		}

		const blockLength = this.readUInt32();

		// * Skip this whole block. We don't need this data
		// * Only implemented to prevent a crash

		this.stream.seek((blockStart + blockLength) - 4);

		const blockLength2 = this.readUInt32();

		if (blockLength !== blockLength2) {
			throw new Error(`Invalid trailing block length. Expected ${blockLength}, got ${blockLength2}`);
		}
	}

	// * INTERFACE PARSERS

	private parseInterfaceEthernet(): EthernetInterface {
		return {
			type: LINKTYPE_ETHERNET,
			data: {
				destinationMAC: this.stream.readBytes(6).toString('hex'),
				sourceMAC: this.stream.readBytes(6).toString('hex'),
				type: this.stream.readUInt8() * 256 + this.stream.readUInt8()
			}
		};
	}

	public *packets(): Generator<SimplePacketBlock | EnhancedPacketBlock> {
		this.stream.seek(0); // * Make sure we're always at the start

		while (this.stream.hasDataLeft()) {
			const magic = this.readUInt32();

			// * Skip back so the block parsers can have the right start position.
			// * Makes the block parsers follow the docs layout better rather than
			// * skipping the magic read
			this.stream.skip(-4);

			switch (magic) {
				case BLOCK_TYPE_SECTION_HEADER:
					this.currentSection = this.parseSectionHeaderBlock();
					break;

				case BLOCK_TYPE_INTERFACE_DESCRIPTION:
					this.currentSection.interfaces.push(this.parseInterfaceDescriptionBlock());
					break;

				case BLOCK_TYPE_ENHANCED_PACKET:
					yield this.parseEnhancedPacketBlock();
					break;

				case BLOCK_TYPE_SIMPLE_PACKET:
					yield this.parseSimplePacketBlock();
					break;

				case BLOCK_TYPE_NAME_RESOLUTION:
					this.parseNameResolutionBlock();
					break;

				case BLOCK_TYPE_INTERFACE_STATISTICS:
					this.parseInterfaceStatisticsBlock();
					break;

				case BLOCK_TYPE_CUSTOM_1:
				case BLOCK_TYPE_CUSTOM_2:
					this.parseCustomBlock();
					break;

				default:
					throw new Error(`Unsupported block type 0x${magic.toString(16).toLocaleUpperCase()}`);
			}
		}
	}
}
