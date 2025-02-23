import type RVType from '@/nex/types/rv-type';
import type NEXByteStream from '@/nex/byte-stream';

// * Real name is Map, but this conflicts with JavaScript
export default class RVMap<K extends RVType, V extends RVType> {
	public readonly typeName = 'Map';

	private keys: K[] = [];
	private values: V[] = [];

	constructor(private keyType: K, private valueType: V) {}

	public extractFrom(stream: NEXByteStream): void {
		const length = stream.readUInt32LE();

		for (let i = 0; i < length; i++) {
			const key = this.keyType.new();
			const value = this.valueType.new();

			key.extractFrom(stream);
			value.extractFrom(stream);

			this.keys.push(key);
			this.values.push(value);
		}
	}

	public new(): RVMap<K, V> {
		return new RVMap(this.keyType.new(), this.valueType.new());
	}

	private displayTypeName(): string {
		return `Map<${this.keyType.typeName}, ${this.valueType.typeName}>`;
	}

	public toJSON(): Record<string, any> {
		return {
			__displayTypeName: this.displayTypeName(),
			__typeName: this.typeName,
			__value: this.keys.map((key, i) => {
				return {
					key: key,
					value: this.values[i]
				};
			})
		};
	}
}
