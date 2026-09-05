import Data from '@/nex/types/data';
import PID from '@/nex/types/pid';
import UInt64 from '@/nex/types/uint64';
import UInt8 from '@/nex/types/uint8';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'FriendRelationship';

export default class FriendRelationship extends Data {
	public get typeName(): string {
		return className;
	}

	private pid = new PID();
	private localFriendCode = new UInt64();
	private relationshipType = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.pid.extractFrom(stream);
		this.localFriendCode.extractFrom(stream);
		this.relationshipType.extractFrom(stream);
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
				localFriendCode: this.localFriendCode,
				relationshipType: this.relationshipType
			}
		};
	}
}

AnyDataHolder.Classes[className] = FriendRelationship;
