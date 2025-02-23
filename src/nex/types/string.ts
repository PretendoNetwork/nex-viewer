import type NEXByteStream from '@/nex/byte-stream';

// * Real name is String, but this conflicts with JavaScript
export default class RVString {
	public readonly typeName = 'String';

	public value: string;

	public extractFrom(stream: NEXByteStream): void {
		let length = 0;

		if (stream.title.settings.string_length_size === 4) {
			length = stream.readUInt32LE();
		} else {
			length = stream.readUInt16LE();
		}

		this.value = stream.readBytes(length).toString().slice(0, -1);
	}

	public new(): RVString {
		return new RVString();
	}

	public toJSON(): Record<string, any> {
		return {
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__value: this.value
		};
	}
}
