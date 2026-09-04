import Data from '@/nex/types/data';
import UInt64 from '@/nex/types/uint64';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'PersistentNotification';

export default class PersistentNotification extends Data {
	public get typeName(): string {
		return className;
	}

	private unknown1 = new UInt64();
	private unknown2 = new UInt32();
	private unknown3 = new UInt32();
	private unknown4 = new UInt32();
	private unknown5 = new RVString();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.unknown1.extractFrom(stream);
		this.unknown2.extractFrom(stream);
		this.unknown3.extractFrom(stream);
		this.unknown4.extractFrom(stream);
		this.unknown5.extractFrom(stream);
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
				unknown4: this.unknown4,
				unknown5: this.unknown5
			}
		};
	}
}

AnyDataHolder.Classes[className] = PersistentNotification;
