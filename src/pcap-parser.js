const Stream = require('./stream');

class PCAPParser {
	#buffer;
	#stream;
	#be = false;
	#packetStartOffset;

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

	#parseHeader() {
		const magic = this.#stream.readUInt32LE();

		if (magic !== 0xA1B2C3D4 && magic !== 0xD4C3B2A1) {
			const magicHex = magic.toString(16).toLocaleUpperCase();
			throw new Error(`Invalid PCAP magic. Expected either 0xA1B2C3D4 or 0xD4C3B2A1, got 0x${magicHex}`);
		}

		if (magic !== 0xA1B2C3D4) {
			this.#be = true;
		}

		if (this.#be) {
			this.versionMajor = this.#stream.readUInt16BE();
		} else {
			this.versionMajor = this.#stream.readUInt16LE();
		}

		if (this.#be) {
			this.versionMinor = this.#stream.readUInt16BE();
		} else {
			this.versionMinor = this.#stream.readUInt16LE();
		}

		if (this.#be) {
			this.thisZone = this.#stream.readInt32BE();
		} else {
			this.thisZone = this.#stream.readInt32LE();
		}

		if (this.#be) {
			this.sigfigs = this.#stream.readUInt32BE();
		} else {
			this.sigfigs = this.#stream.readUInt32LE();
		}

		if (this.#be) {
			this.maxPacketLength = this.#stream.readUInt32BE();
		} else {
			this.maxPacketLength = this.#stream.readUInt32LE();
		}

		if (this.#be) {
			this.linkLayerType = this.#stream.readUInt32BE();
		} else {
			this.linkLayerType = this.#stream.readUInt32LE();
		}

		this.#packetStartOffset = this.#stream.pos();
	}

	*packets() {
		this.#stream.seek(this.#packetStartOffset);

		while (this.#stream.hasDataLeft()) {
			const packet = {
				timestamp: {}
			};

			if (this.#be) {
				packet.timestamp.seconds = this.#stream.readUInt32BE();
			} else {
				packet.timestamp.seconds = this.#stream.readUInt32LE();
			}

			if (this.#be) {
				packet.timestamp.microseconds = this.#stream.readUInt32BE();
			} else {
				packet.timestamp.microseconds = this.#stream.readUInt32LE();
			}

			if (this.#be) {
				packet.storedLength = this.#stream.readUInt32BE();
			} else {
				packet.storedLength = this.#stream.readUInt32LE();
			}

			if (this.#be) {
				packet.realLength = this.#stream.readUInt32BE();
			} else {
				packet.realLength = this.#stream.readUInt32LE();
			}

			packet.data = this.#stream.readBytes(packet.storedLength);

			yield packet;
		}
	}
}

module.exports = PCAPParser;