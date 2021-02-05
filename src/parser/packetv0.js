const NEXSmartBuffer = require('./nex_smart_buffer');
const Packet = require('./packet');
const Types = require('./types');
const Flags = require('./flags');

class PacketV0 extends Packet {
	constructor(buffer) {
		super();

		this.setVersion(0);

		this._checksum; // Only in v0

		this._buffer = buffer;
		this._sbuffer = NEXSmartBuffer.fromBuffer(this._buffer);

		this.parse();
	}

	setChecksum(checksum) {
		this._checksum = checksum;
	}

	getChecksum() {
		return this._checksum;
	}

	calculateChecksum(key) {
		function sum(buffer) {
			return buffer.reduce((sum, byte) => sum + byte, 0);
		}

		const data = this._buffer.subarray(0, this._buffer.length-1);
		const base = sum(Buffer.from(key));

		const words = Math.floor(data.length / 4);
		let temp = 0;

		for (let i = 0; i < words; i++) {
			temp += data.readUInt32LE(i * 4);
		}

		(temp &= 0xFFFFFFFF) >>> 0;

		const buffer = Buffer.alloc(4);
		buffer.writeUInt32LE(temp);

		const checksum = base + sum(data.subarray(data.length & ~3)) + sum(buffer);

		return checksum & 0xFF;
	}

	parse() {
		this.setSource(this._sbuffer.readUInt8());
		this.setDestination(this._sbuffer.readUInt8());

		const typeFlags = this._sbuffer.readUInt16LE();

		this.setType(typeFlags & 0xF);
		this.setFlags(typeFlags >> 4);
		this.setSessionID(this._sbuffer.readUInt8());
		this.setSignature(this._sbuffer.readBuffer(0x4));
		this.setSequenceID(this._sbuffer.readUInt16LE());

		if ([Types.Syn, Types.Connect].includes(this.getType())) {
			this.setConnectionSignature(this._sbuffer.readBuffer(0x4));
		}

		if (this.getType() === Types.Data) {
			this.setFragmentID(this._sbuffer.readUInt8());
		}

		let payloadLength = 0;

		if (this.hasFlag(Flags.HasSize)) {
			payloadLength = this._sbuffer.readUInt16LE();
		} else if (this._sbuffer.remaining() > 1) {
			payloadLength = this._sbuffer.remaining() - 1;
		}

		this.setPayload(this._sbuffer.readBuffer(payloadLength));
		this.setChecksum(this._sbuffer.readUInt8());
	}
}

module.exports = PacketV0;