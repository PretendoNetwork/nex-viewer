import Data from '@/nex/types/data';
import UInt8 from '@/nex/types/uint8';
import RVString from '@/nex/types/string';
import DateTime from '@/nex/types/datetime';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'Comment';

export default class Comment extends Data {
	public get typeName(): string {
		return className;
	}

	private unknown = new UInt8();
	private message = new RVString();
	private lastChanged = new DateTime();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.unknown.extractFrom(stream);
		this.message.extractFrom(stream);
		this.lastChanged.extractFrom(stream);
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
				unknown: this.unknown,
				message: this.message,
				lastChanged: this.lastChanged
			}
		};
	}
}

AnyDataHolder.Classes[className] = Comment;
