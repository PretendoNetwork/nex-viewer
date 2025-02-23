import type NEXByteStream from '@/nex/byte-stream';

export default class QBuffer {
	public readonly typeName = 'QBuffer';

	private value: Buffer;

	public extractFrom(stream: NEXByteStream): void {
		const length = stream.readUInt16LE();

		this.value = stream.read(length);
	}

	public new(): QBuffer {
		return new QBuffer();
	}

	public toJSON(): Record<string, any> {
		return {
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__value: [...this.value.values()]
		};
	}
}
