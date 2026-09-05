import Data from '@/nex/types/data';
import RVString from '@/nex/types/string';
import UInt8 from '@/nex/types/uint8';
import RVBuffer from '@/nex/types/buffer';
import DateTime from '@/nex/types/datetime';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'MiiV2';

export default class MiiV2 extends Data {
	public get typeName(): string {
		return className;
	}

	private name = new RVString();
	private unknown1 = new UInt8();
	private unknown2 = new UInt8();
	private data = new RVBuffer();
	private unknown3 = new DateTime();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.name.extractFrom(stream);
		this.unknown1.extractFrom(stream);
		this.unknown2.extractFrom(stream);
		this.data.extractFrom(stream);
		this.unknown3.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): any {
		return {
			__parent: super.toJSON(),
			__version: this.revision,
			__displayTypeName: className,
			__typeName: className,
			__fields: {
				name: this.name,
				unknown1: this.unknown1,
				unknown2: this.unknown2,
				data: this.data,
				unknown3: this.unknown3
			}
		};
	}
}

AnyDataHolder.Classes[className] = MiiV2;
