import Data from '@/nex/types/data';
import PrincipalBasicInfo from '@/nex/protocols/friends-wiiu/types/principal-basic-info';
import UInt8 from '@/nex/types/uint8';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'NNAInfo';

export default class NNAInfo extends Data {
	public get typeName(): string {
		return className;
	}

	private principalBasicInfo = new PrincipalBasicInfo();
	private unknown1 = new UInt8();
	private unknown2 = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.principalBasicInfo.extractFrom(stream);
		this.unknown1.extractFrom(stream);
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
				principalBasicInfo: this.principalBasicInfo,
				unknown1: this.unknown1,
				unknown2: this.unknown2
			}
		};
	}
}

AnyDataHolder.Classes[className] = NNAInfo;
