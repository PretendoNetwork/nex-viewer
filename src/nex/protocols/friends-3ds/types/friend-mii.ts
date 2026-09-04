import Data from '@/nex/types/data';
import PID from '@/nex/types/pid';
import Mii from '@/nex/protocols/friends-3ds/types/mii';
import DateTime from '@/nex/types/datetime';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'FriendMii';

export default class FriendMii extends Data {
	public get typeName(): string {
		return className;
	}

	private pid = new PID();
	private mii = new Mii();
	private modified = new DateTime();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.pid.extractFrom(stream);
		this.mii.extractFrom(stream);
		this.modified.extractFrom(stream);
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
				pid: this.pid,
				mii: this.mii,
				modified: this.modified
			}
		};
	}
}

AnyDataHolder.Classes[className] = FriendMii;
