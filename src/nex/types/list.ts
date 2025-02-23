import type RVType from '@/nex/types/rv-type';
import type NEXByteStream from '@/nex/byte-stream';

export default class List<T extends RVType> {
	private readonly typeName = 'List';

	private list: T[] = [];

	constructor(private type: T) {}

	public extractFrom(stream: NEXByteStream): void {
		const length = stream.readUInt32LE();

		for (let i = 0; i < length; i++) {
			const element = this.type.new();

			element.extractFrom(stream);

			this.list.push(element);
		}
	}

	public new(): List<T> {
		return new List(this.type.new());
	}

	private displayTypeName(): string {
		return `List<${this.type.typeName}>`;
	}

	public toJSON(): Record<string, any> {
		return {
			__displayTypeName: this.displayTypeName(),
			__typeName: this.typeName,
			__value: this.list
		};
	}
}
