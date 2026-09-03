import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'AccountExtraInfo';

export default class AccountExtraInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private localFriendCode = new UInt64();
	private moveCount = new UInt32();
	private token = new RVString();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.localFriendCode.extractFrom(stream);
		this.moveCount.extractFrom(stream);
		this.token.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): any {
		return {
			__version: this.revision,
			__displayTypeName: className,
			__typeName: className,
			__fields: {
				localFriendCode: this.localFriendCode,
				moveCount: this.moveCount,
				token: this.token
			}
		};
	}
}

AnyDataHolder.Classes[className] = AccountExtraInfo;
