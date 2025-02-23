import type NEXByteStream from '@/nex/byte-stream';

export default class UInt8 {
	public readonly typeName = 'UInt8';

	public value: number;

	public extractFrom(stream: NEXByteStream): void {
		this.value = stream.readUInt8();
	}

	public new(): UInt8 {
		return new UInt8();
	}

	public toJSON(): Record<string, any> {
		return {
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__value: this.value
		};
	}
}
