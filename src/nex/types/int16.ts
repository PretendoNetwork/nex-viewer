import type NEXByteStream from '@/nex/byte-stream';

export default class Int16 {
	public readonly typeName = 'Int16';

	public value: number;

	public extractFrom(stream: NEXByteStream): void {
		this.value = stream.readInt16LE();
	}

	public new(): Int16 {
		return new Int16();
	}

	public toJSON(): Record<string, any> {
		return {
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__value: this.value
		};
	}
}
