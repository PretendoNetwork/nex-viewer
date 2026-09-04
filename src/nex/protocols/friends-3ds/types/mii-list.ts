import Data from '@/nex/types/data';
import RVString from '@/nex/types/string';
import Bool from '@/nex/types/bool';
import UInt8 from '@/nex/types/uint8';
import List from '@/nex/types/list';
import RVBuffer from '@/nex/types/buffer';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'MiiList';

export default class MiiList extends Data {
	public get typeName(): string {
		return className;
	}

	private unknown1 = new RVString();
	private unknown2 = new Bool();
	private unknown3 = new UInt8();
	private miiDataList = new List(new RVBuffer());

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.unknown1.extractFrom(stream);
		this.unknown2.extractFrom(stream);
		this.unknown3.extractFrom(stream);
		this.miiDataList.extractFrom(stream);
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
				unknown1: this.unknown1,
				unknown2: this.unknown2,
				unknown3: this.unknown3,
				miiDataList: this.miiDataList
			}
		};
	}
}

AnyDataHolder.Classes[className] = MiiList;
