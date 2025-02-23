import NEXByteStream from '@/nex/byte-stream';
import Structure from '@/nex/types/structure';
import RVString from '@/nex/types/string';
import UInt32 from '@/nex/types/uint32';
import type RVType from '@/nex/types/rv-type';

export default class AnyDataHolder extends Structure {
	public static Classes: Record<string, new () => RVType> = {};

	public readonly typeName = 'AnyDataHolder';

	private name = new RVString();
	private length1 = new UInt32();
	private length2 = new UInt32();
	private objectData: RVType;

	public extractFrom(stream: NEXByteStream): void {
		this.name.extractFrom(stream);
		this.length1.extractFrom(stream);
		this.length2.extractFrom(stream);

		const objectStream = new NEXByteStream(stream.read(this.length2.value), stream.title);

		if (AnyDataHolder.Classes[this.name.value]) {
			this.objectData = new AnyDataHolder.Classes[this.name.value]();

			this.objectData.extractFrom(objectStream);
		}

		// TODO - Error if not found
	}

	public new(): AnyDataHolder {
		return new AnyDataHolder();
	}

	private displayTypeName(): string {
		return `AnyDataHolder<${this.name.value}>`;
	}

	public toJSON(): Record<string, any> {
		return {
			__displayTypeName: this.displayTypeName(),
			__typeName: this.typeName,
			__value: this.objectData
		};
	}
}
