import type NEXByteStream from '@/nex/byte-stream';

export default class UInt64 {
	public readonly typeName = 'UInt64';

	public value: bigint;

	public extractFrom(stream: NEXByteStream): void {
		this.value = stream.readUInt64LE();
	}

	public new(): UInt64 {
		return new UInt64();
	}

	public toJSON(): Record<string, any> {
		return {
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__value: this.value
		};
	}
}
