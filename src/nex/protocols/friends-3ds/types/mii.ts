import Data from '@/nex/types/data';
import RVString from '@/nex/types/string';
import Bool from '@/nex/types/bool';
import UInt8 from '@/nex/types/uint8';
import RVBuffer from '@/nex/types/buffer';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'Mii';

export default class Mii extends Data {
	public get typeName(): string {
		return className;
	}

	private name = new RVString();
	private profanityFlag = new Bool();
	private characterSet = new UInt8();
	private data = new RVBuffer();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.name.extractFrom(stream);
		this.profanityFlag.extractFrom(stream);
		this.characterSet.extractFrom(stream);
		this.data.extractFrom(stream);
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
				profanityFlag: this.profanityFlag,
				characterSet: this.characterSet,
				data: this.data
			}
		};
	}
}

AnyDataHolder.Classes[className] = Mii;
