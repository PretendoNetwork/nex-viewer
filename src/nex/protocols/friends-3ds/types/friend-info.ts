import Data from '@/nex/types/data';
import PID from '@/nex/types/pid';
import DateTime from '@/nex/types/datetime';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'FriendInfo';

export default class FriendInfo extends Data {
	public get typeName(): string {
		return className;
	}

	private Principalid = new PID();
	private Unknown = new DateTime();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.Principalid.extractFrom(stream);
		this.Unknown.extractFrom(stream);
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
				Principalid: this.Principalid,
				Unknown: this.Unknown
			}
		};
	}
}

AnyDataHolder.Classes[className] = FriendInfo;
