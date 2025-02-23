export default class ByteStream {
	private buffer: Buffer;
	private offset: number;

	constructor(buffer: Buffer) {
		this.buffer = buffer;
		this.offset = 0;
	}

	public pos(): number {
		return this.offset;
	}

	public hasDataLeft(): boolean {
		return this.pos() < this.buffer.length;
	}

	public remaining(): number {
		return this.buffer.length - this.pos();
	}

	public skip(value: number): void {
		this.offset += value;
	}

	public seek(offset: number): void {
		this.offset = offset;
	}

	public peek(): number {
		return this.buffer[this.pos()];
	}

	public read(len: number): Buffer {
		const read = this.buffer.subarray(this.pos(), this.pos() + len);
		this.offset += len;

		return read;
	}

	public readBytes(len: number): Buffer {
		return this.read(len);
	}

	public readRest(): Buffer {
		return this.readBytes(this.remaining());
	}

	public readUInt8(): number {
		return this.readBytes(1).readUInt8();
	}

	public readInt8(): number {
		return this.readBytes(1).readInt8();
	}

	public readUInt16BE(): number {
		return this.readBytes(2).readUInt16BE();
	}

	public readUInt16LE(): number {
		return this.readBytes(2).readUInt16LE();
	}

	public readInt16BE(): number {
		return this.readBytes(2).readInt16BE();
	}

	public readInt16LE(): number {
		return this.readBytes(2).readInt16LE();
	}

	public readUInt32BE(): number {
		return this.readBytes(4).readUInt32BE();
	}

	public readUInt32LE(): number {
		return this.readBytes(4).readUInt32LE();
	}

	public readInt32BE(): number {
		return this.readBytes(4).readInt32BE();
	}

	public readInt32LE(): number {
		return this.readBytes(4).readInt32LE();
	}

	public readUInt64BE(): bigint {
		return this.readBytes(8).readBigUInt64BE();
	}

	public readUInt64LE(): bigint {
		return this.readBytes(8).readBigUInt64LE();
	}

	public readInt64BE(): bigint {
		return this.readBytes(8).readBigInt64BE();
	}

	public readInt64LE(): bigint {
		return this.readBytes(8).readBigInt64LE();
	}

	public readDoubleBE(): number {
		return this.readBytes(8).readDoubleBE();
	}

	public readDoubleLE(): number {
		return this.readBytes(8).readDoubleLE();
	}

	public readFloatBE(): number {
		return this.readBytes(4).readFloatBE();
	}

	public readFloatLE(): number {
		return this.readBytes(4).readFloatLE();
	}

	public readBoolean(): boolean {
		return Boolean(this.readUInt8());
	}
}
