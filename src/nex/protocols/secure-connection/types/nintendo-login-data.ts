import Data from '@/nex/types/data';
import String from '@/nex/types/string';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'NintendoLoginData';

export default class NintendoLoginData extends Data {
	public get typeName(): string {
		return className;
	}

	private token = new String();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.token.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): Record<string, any> {
		return {
			__parent: super.toJSON(),
			__version: this.revision,
			__displayTypeName: className,
			__typeName: className,
			__fields: {
				token: this.token
			}
		};
	}
}

AnyDataHolder.Classes[className] = NintendoLoginData;
