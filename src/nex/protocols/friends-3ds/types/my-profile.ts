import Data from '@/nex/types/data';
import UInt8 from '@/nex/types/uint8';
import UInt64 from '@/nex/types/uint64';
import RVString from '@/nex/types/string';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'MyProfile';

export default class MyProfile extends Data {
	public get typeName(): string {
		return className;
	}

	private region = new UInt8();
	private country = new UInt8();
	private area = new UInt8();
	private language = new UInt8();
	private platform = new UInt8();
	private localFriendCodeSeed = new UInt64();
	private consoleMACAddress = new RVString();
	private consoleSerialNumber = new RVString();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.region.extractFrom(stream);
		this.country.extractFrom(stream);
		this.area.extractFrom(stream);
		this.language.extractFrom(stream);
		this.platform.extractFrom(stream);
		this.localFriendCodeSeed.extractFrom(stream);
		this.consoleMACAddress.extractFrom(stream);
		this.consoleSerialNumber.extractFrom(stream);
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
				region: this.region,
				country: this.country,
				area: this.area,
				language: this.language,
				platform: this.platform,
				localFriendCodeSeed: this.localFriendCodeSeed,
				consoleMACAddress: this.consoleMACAddress,
				consoleSerialNumber: this.consoleSerialNumber
			}
		};
	}
}

AnyDataHolder.Classes[className] = MyProfile;
