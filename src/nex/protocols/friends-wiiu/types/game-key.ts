import Data from '@/nex/types/data';
import UInt64 from '@/nex/types/uint64';
import UInt16 from '@/nex/types/uint16';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'GameKey';

export default class GameKey extends Data {
	public get typeName(): string {
		return className;
	}

	private titleID = new UInt64();
	private titleVersion = new UInt16();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.titleID.extractFrom(stream);
		this.titleVersion.extractFrom(stream);
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
				titleID: this.titleID,
				titleVersion: this.titleVersion
			}
		};
	}
}

AnyDataHolder.Classes[className] = GameKey;
