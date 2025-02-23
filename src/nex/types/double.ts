import type NEXByteStream from '@/nex/byte-stream';

export default class Double {
	public readonly typeName = 'Double';

	public value: number;

	public extractFrom(stream: NEXByteStream): void {
		this.value = stream.readDoubleLE();
	}

	public new(): Double {
		return new Double();
	}

	public toJSON(): Record<string, any> {
		return {
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__value: this.value
		};
	}
}
