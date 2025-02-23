import type NEXByteStream from '@/nex/byte-stream';

export default class UInt16 {
	public readonly typeName = 'UInt16';

	public value: number;

	public extractFrom(stream: NEXByteStream): void {
		this.value = stream.readUInt16LE();
	}

	public new(): UInt16 {
		return new UInt16();
	}

	public toJSON(): Record<string, any> {
		return {
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__value: this.value
		};
	}
}
