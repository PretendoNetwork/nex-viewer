import type NEXByteStream from '@/nex/byte-stream';

export default class UInt32 {
	public readonly typeName = 'UInt32';

	public value: number;

	public extractFrom(stream: NEXByteStream): void {
		this.value = stream.readUInt32LE();
	}

	public new(): UInt32 {
		return new UInt32();
	}

	public toJSON(): Record<string, any> {
		return {
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__value: this.value
		};
	}
}
