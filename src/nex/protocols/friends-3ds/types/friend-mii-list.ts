import Data from '@/nex/types/data';
import UInt32 from '@/nex/types/uint32';
import MiiList from '@/nex/protocols/friends-3ds/types/mii-list';
import DateTime from '@/nex/types/datetime';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'FriendMiiList';

export default class FriendMiiList extends Data {
	public get typeName(): string {
		return className;
	}

	private unknown1 = new UInt32();
	private miiList = new MiiList();
	private unknown2 = new DateTime();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.unknown1.extractFrom(stream);
		this.miiList.extractFrom(stream);
		this.unknown2.extractFrom(stream);
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
				miiList: this.miiList,
				unknown2: this.unknown2
			}
		};
	}
}

AnyDataHolder.Classes[className] = FriendMiiList;
