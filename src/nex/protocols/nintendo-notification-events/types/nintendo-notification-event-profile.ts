import Structure from '@/nex/types/structure';
import AnyDataHolder from '@/nex/types/any-data-holder';
import UInt8 from '@/nex/types/uint8';
import type NEXByteStream from '@/nex/byte-stream';

export default class NintendoNotificationEventProfile extends Structure {
	public readonly typeName = 'NintendoNotificationEventProfile';

	private m_region = new UInt8();
	private m_country = new UInt8();
	private m_area = new UInt8();
	private m_language = new UInt8();
	private m_platform = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
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
		const json: Record<string, any> = {
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {
				m_region: this.m_region,
				m_country: this.m_country,
				m_area: this.m_area,
				m_language: this.m_language,
				m_platform: this.m_platform
			}
		};

		return json;
	}
}

AnyDataHolder.Classes['NintendoNotificationEventProfile'] = NintendoNotificationEventProfile;
