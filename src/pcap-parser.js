const Stream = require('./stream');

const LINKTYPE_ETHERNET = 0x0001;
const LINKTYPE_RAW = 0x0065;
class PCAPParser {
	#buffer;
	#stream;
	#be = false;
	#packetStartOffset;
	#linkLayerSize;

	versionMajor;
	versionMinor;
	thisZone;
	sigfigs;
	maxPacketLength;
	linkLayerType;

	constructor(buffer) {
		this.#buffer = buffer;
		this.#stream = new Stream(this.#buffer);

		this.#parseHeader();
	}

	#readUInt16() {
		if (!this.#be) {
			return this.#stream.readUInt16LE();
		} else {
			return this.#stream.readUInt16BE();
		}
	}

	#readUInt32() {
		if (!this.#be) {
			return this.#stream.readUInt32LE();
		} else {
			return this.#stream.readUInt32BE();
		}
	}

	#readInt32() {
		if (!this.#be) {
			return this.#stream.readInt32LE();
		} else {
			return this.#stream.readInt32BE();
		}
	}

	#parseHeader() {
		const magic = this.#readUInt32();

		if (magic !== 0xA1B2C3D4 && magic !== 0xD4C3B2A1) {
			const magicHex = magic.toString(16).toLocaleUpperCase();
			throw new Error(`Invalid PCAP magic. Expected either 0xA1B2C3D4 or 0xD4C3B2A1, got 0x${magicHex}`);
		}

		if (magic !== 0xA1B2C3D4) {
			this.#be = true;
		}

		this.versionMajor = this.#readUInt16();
		this.versionMinor = this.#readUInt16();
		this.thisZone = this.#readInt32();
		this.sigfigs = this.#readUInt32();
		this.maxPacketLength = this.#readUInt32();
		this.linkLayerType = this.#readUInt32();

		this.#packetStartOffset = this.#stream.pos();
		this.#linkLayerSize = this.#checkLinkLayerSize();
	}

	#checkLinkLayerSize() {
		switch (this.linkLayerType) {
		case LINKTYPE_ETHERNET:
			return 14;

		case LINKTYPE_RAW:
			return 0;

		default:
			console.log(`Unsupported link layer type ${this.linkLayerType}`);
			return 0;
		}
	}

	*packets() {
		this.#stream.seek(this.#packetStartOffset);

		while (this.#stream.hasDataLeft()) {
			const packet = {
				timestamp: {
					seconds: this.#readUInt32(),
					microseconds: this.#readUInt32()
				},
				storedLength: this.#readUInt32(),
				realLength: this.#readUInt32()
			};

			this.#stream.skip(this.#linkLayerSize);

			packet.data = this.#stream.readBytes(packet.storedLength - this.#linkLayerSize);

			yield packet;
		}
	}
}

module.exports = PCAPParser;