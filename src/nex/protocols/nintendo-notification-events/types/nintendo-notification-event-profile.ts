import Data from '@/nex/types/data';
import UInt8 from '@/nex/types/uint8';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'NintendoNotificationEventProfile';

export default class NintendoNotificationEventProfile extends Data {
	public get typeName(): string {
		return className;
	}

	private m_region = new UInt8();
	private m_country = new UInt8();
	private m_area = new UInt8();
	private m_language = new UInt8();
	private m_platform = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.m_region.extractFrom(stream);
		this.m_country.extractFrom(stream);
		this.m_area.extractFrom(stream);
		this.m_language.extractFrom(stream);
		this.m_platform.extractFrom(stream);
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
				m_region: this.m_region,
				m_country: this.m_country,
				m_area: this.m_area,
				m_language: this.m_language,
				m_platform: this.m_platform
			}
		};
	}
}

AnyDataHolder.Classes[className] = NintendoNotificationEventProfile;
