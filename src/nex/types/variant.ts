import UInt8 from '@/nex/types/uint8';
import Int64 from '@/nex/types/int64';
import Double from '@/nex/types/double';
import Bool from '@/nex/types/bool';
import RVString from '@/nex/types/string';
import DateTime from '@/nex/types/datetime';
import UInt64 from '@/nex/types/uint64';
import type NEXByteStream from '@/nex/byte-stream';
import type RVType from '@/nex/types/rv-type';

export default class Variant {
	public static Classes: Record<number, new () => RVType> = {
		1: Int64,
		2: Double,
		3: Bool,
		4: RVString,
		5: DateTime,
		6: UInt64
	};

	public readonly typeName = 'Variant';

	private typeID = new UInt8();
	private objectData: RVType;

	public extractFrom(stream: NEXByteStream): void {
		this.typeID.extractFrom(stream);

		if (this.typeID.value !== 0 && Variant.Classes[this.typeID.value]) {
			this.objectData = new Variant.Classes[this.typeID.value]();

			this.objectData.extractFrom(stream);
		}

		// TODO - Error if not found
	}

	public new(): Variant {
		return new Variant();
	}

	private displayTypeName(): string {
		return `Variant<${this.objectData.typeName}>`;
	}

	public toJSON(): Record<string, any> {
		return {
			__displayTypeName: this.displayTypeName(),
			__typeName: this.typeName,
			__value: this.objectData
		};
	}
}
