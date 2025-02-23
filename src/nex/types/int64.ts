import type NEXByteStream from '@/nex/byte-stream';

export default class Int64 {
	public readonly typeName = 'Int64';

	public value: bigint;

	public extractFrom(stream: NEXByteStream): void {
		this.value = stream.readInt64LE();
	}

	public new(): Int64 {
		return new Int64();
	}

	public toJSON(): Record<string, any> {
		return {
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__value: this.value
		};
	}
}
