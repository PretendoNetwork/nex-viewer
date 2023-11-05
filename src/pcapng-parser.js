const Stream = require('./stream');

const BLOCK_TYPE_SECTION_HEADER = 0x0A0D0D0A;
const BLOCK_TYPE_INTERFACE_DESCRIPTION = 0x00000001;
const BLOCK_TYPE_ENHANCED_PACKET = 0x00000006;
const BLOCK_TYPE_SIMPLE_PACKET = 0x00000003;

const LINKTYPE_ETHERNET = 0x0001;

class PCAPNGParser {
	#buffer;
	#stream;
	#currentSection;

	constructor(buffer) {
		this.#buffer = buffer;
		this.#stream = new Stream(this.#buffer);
	}

	#readUInt16() {
		if (!this.#currentSection || !this.#currentSection.be) {
			return this.#stream.readUInt16LE();
		} else {
			return this.#stream.readUInt16BE();
		}
	}

	#readUInt32() {
		if (!this.#currentSection || !this.#currentSection.be) {
			return this.#stream.readUInt32LE();
		} else {
			return this.#stream.readUInt32BE();
		}
	}

	// * BLOCK PARSERS

	#parseSectionHeaderBlock() {
		const blockStart = this.#stream.pos();
		const magic = this.#readUInt32();

		if (magic !== BLOCK_TYPE_SECTION_HEADER) {
			const expected = BLOCK_TYPE_SECTION_HEADER.toString(16).toLocaleUpperCase();
			const magicHex = magic.toString(16).toLocaleUpperCase();
			throw new Error(`Invalid PCAP magic. Expected 0x${expected}, got 0x${magicHex}`);
		}

		const blockLength = this.#readUInt32();
		const bom = this.#readUInt32();

		if (bom !== 0x1A2B3C4D && bom !== 0x4D3C2B1A) {
			const bomHex = magic.toString(16).toLocaleUpperCase();
			throw new Error(`Invalid SHB BOM. Expected either 0x1A2B3C4D or 0x4D3C2B1A, got 0x${bomHex}`);
		}

		const section = {
			be: bom === 0x4D3C2B1A,
			opt: [], // * Optional data. Unused at the moment
			interfaces: [],
			versionMajor: this.#readUInt16(),
			versionMinor: this.#readUInt16()
		};

		this.#stream.skip(8); // * Length of all the data (blocks) in this section, for skipping. We never skip
		this.#stream.seek((blockStart + blockLength) - 4); // * Skip optional data

		const blockLength2 = this.#readUInt32();

		if (blockLength !== blockLength2) {
			throw new Error(`Invalid trailing block length. Expected ${blockLength}, got ${blockLength2}`);
		}

		return section;
	}

	#parseInterfaceDescriptionBlock() {
		const blockStart = this.#stream.pos();
		const magic = this.#readUInt32();

		if (magic !== BLOCK_TYPE_INTERFACE_DESCRIPTION) {
			const expected = BLOCK_TYPE_INTERFACE_DESCRIPTION.toString(16).toLocaleUpperCase();
			const magicHex = magic.toString(16).toLocaleUpperCase();
			throw new Error(`Invalid PCAP magic. Expected 0x${expected}, got 0x${magicHex}`);
		}

		const blockLength = this.#readUInt32();

		const interfaceDescription = {
			linkLayerType: this.#readUInt16(),
			reserved: this.#readUInt16(), // * Unused
			maxPacketLength: this.#readUInt32()
		};

		this.#stream.seek((blockStart + blockLength) - 4); // * Skip optional data

		const blockLength2 = this.#readUInt32();

		if (blockLength !== blockLength2) {
			throw new Error(`Invalid trailing block length. Expected ${blockLength}, got ${blockLength2}`);
		}

		return interfaceDescription;
	}

	#parseEnhancedPacketBlock() {
		const blockStart = this.#stream.pos();
		const magic = this.#readUInt32();

		if (magic !== BLOCK_TYPE_ENHANCED_PACKET) {
			const expected = BLOCK_TYPE_ENHANCED_PACKET.toString(16).toLocaleUpperCase();
			const magicHex = magic.toString(16).toLocaleUpperCase();
			throw new Error(`Invalid PCAP magic. Expected 0x${expected}, got 0x${magicHex}`);
		}

		const blockLength = this.#readUInt32();

		const enhancedPacket = {
			interfaceID: this.#readUInt32(),
			timestampHigh: this.#readUInt32(),
			timestampLow: this.#readUInt32(),
			storedLength: this.#readUInt32(),
			realLength: this.#readUInt32()
		};

		const interfaceDescription = this.#currentSection.interfaces[enhancedPacket.interfaceID];
		let interfaceDataLength = 0;

		switch (interfaceDescription.linkLayerType) {
		case LINKTYPE_ETHERNET:
			enhancedPacket.interface = this.#parseInterfaceEthernet();
			interfaceDataLength = 14;
			break;

		default:
			throw new Error(`Unsupported interface type 0x${interfaceDescription.linkLayerType.toString(16).toLocaleUpperCase()}`);
		}

		enhancedPacket.data = this.#stream.readBytes(enhancedPacket.storedLength - interfaceDataLength);

		// * There's padding here to align the data to a
		// * 32-bit boundary. However due to the way this
		// * skips the optional data, the padding doesn't
		// * need to be handled

		this.#stream.seek((blockStart + blockLength) - 4); // * Skip optional data

		const blockLength2 = this.#readUInt32();

		if (blockLength !== blockLength2) {
			throw new Error(`Invalid trailing block length. Expected ${blockLength}, got ${blockLength2}`);
		}

		return enhancedPacket;
	}

	#parseSimplePacketBlock() {
		const magic = this.#readUInt32();

		if (magic !== BLOCK_TYPE_SIMPLE_PACKET) {
			const expected = BLOCK_TYPE_SIMPLE_PACKET.toString(16).toLocaleUpperCase();
			const magicHex = magic.toString(16).toLocaleUpperCase();
			throw new Error(`Invalid PCAP magic. Expected 0x${expected}, got 0x${magicHex}`);
		}

		const blockLength = this.#readUInt32();

		const simplePacket = {
			timestampHigh: 0, // * Not present in SPBs
			timestampLow: 0,  // * Not present in SPBs
			storedLength: blockLength - 16, // * Derive from the block length minus the 4 u32 sections
			realLength: this.#readUInt32()
		};

		// * From the docs:
		// *
		// * The Simple Packet Block does not contain the Interface ID field.
		// * Therefore, it MUST be assumed that all the Simple Packet Blocks
		// * have been captured on the interface previously specified in the
		// * first Interface Description Block.
		const interfaceDescription = this.#currentSection.interfaces[0];
		let interfaceDataLength = 0;

		switch (interfaceDescription.linkLayerType) {
		case LINKTYPE_ETHERNET:
			simplePacket.interface = this.#parseInterfaceEthernet();
			interfaceDataLength = 14;
			break;

		default:
			throw new Error(`Unsupported interface type 0x${interfaceDescription.linkLayerType.toString(16).toLocaleUpperCase()}`);
		}

		simplePacket.data = this.#stream.readBytes(simplePacket.storedLength - interfaceDataLength);

		// * Block has no optional data

		const blockLength2 = this.#readUInt32();

		if (blockLength !== blockLength2) {
			throw new Error(`Invalid trailing block length. Expected ${blockLength}, got ${blockLength2}`);
		}

		return simplePacket;
	}

	// * INTERFACE PARSERS

	#parseInterfaceEthernet() {
		return {
			type: LINKTYPE_ETHERNET,
			data: {
				destinationMAC: this.#stream.readBytes(6).toString('hex'),
				sourceMAC: this.#stream.readBytes(6).toString('hex'),
				type: this.#stream.readUInt8() * 256 + this.#stream.readUInt8()
			}
		};
	}

	*packets() {
		this.#stream.seek(0); // * Make sure we're always at the start

		while (this.#stream.hasDataLeft()) {
			const magic = this.#readUInt32();

			// * Skip back so the block parsers can have the right start position.
			// * Makes the block parsers follow the docs layout better rather than
			// * skipping the magic read
			this.#stream.skip(-4);

			switch (magic) {
			case BLOCK_TYPE_SECTION_HEADER:
				this.#currentSection = this.#parseSectionHeaderBlock();
				break;

			case BLOCK_TYPE_INTERFACE_DESCRIPTION:
				this.#currentSection.interfaces.push(this.#parseInterfaceDescriptionBlock());
				break;

			case BLOCK_TYPE_ENHANCED_PACKET:
				yield this.#parseEnhancedPacketBlock();
				break;

			case BLOCK_TYPE_SIMPLE_PACKET:
				yield this.#parseSimplePacketBlock();
				break;

			default:
				throw new Error(`Unsupported block type 0x${magic.toString(16).toLocaleUpperCase()}`);
			}
		}
	}
}

module.exports = PCAPNGParser;