import type NEXByteStream from '@/nex/byte-stream';

// * Real name is Buffer, but this conflicts with JavaScript
export default class RVBuffer {
	public readonly typeName = 'Buffer';

	public value: Buffer;

	public extractFrom(stream: NEXByteStream): void {
		const length = stream.readUInt32LE();

		this.value = stream.read(length);
	}

	public new(): RVBuffer {
		return new RVBuffer();
	}

	public toJSON(): Record<string, any> {
		return {
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__value: [...this.value.values()]
		};
	}
}
