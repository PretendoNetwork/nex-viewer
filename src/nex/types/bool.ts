import type NEXByteStream from '@/nex/byte-stream';

export default class Bool {
	public readonly typeName = 'Bool';

	public value: boolean;

	public extractFrom(stream: NEXByteStream): void {
		this.value = stream.readBoolean();
	}

	public new(): Bool {
		return new Bool();
	}

	public toJSON(): Record<string, any> {
		return {
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__value: this.value
		};
	}
}
