import type NEXByteStream from '@/nex/byte-stream';

export default class Float {
	public readonly typeName = 'Float';

	public value: number;

	public extractFrom(stream: NEXByteStream): void {
		this.value = stream.readFloatLE();
	}

	public new(): Float {
		return new Float();
	}

	public toJSON(): Record<string, any> {
		return {
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__value: this.value
		};
	}
}
