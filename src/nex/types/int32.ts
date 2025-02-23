import type NEXByteStream from '@/nex/byte-stream';

export default class Int32 {
	public readonly typeName = 'Int32';

	public value: number;

	public extractFrom(stream: NEXByteStream): void {
		this.value = stream.readInt32LE();
	}

	public new(): Int32 {
		return new Int32();
	}

	public toJSON(): Record<string, any> {
		return {
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__value: this.value
		};
	}
}
