import type NEXByteStream from '@/nex/byte-stream';

export default class Int8 {
	public readonly typeName = 'Int8';

	public value: number;

	public extractFrom(stream: NEXByteStream): void {
		this.value = stream.readInt8();
	}

	public new(): Int8 {
		return new Int8();
	}

	public toJSON(): Record<string, any> {
		return {
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__value: this.value
		};
	}
}
