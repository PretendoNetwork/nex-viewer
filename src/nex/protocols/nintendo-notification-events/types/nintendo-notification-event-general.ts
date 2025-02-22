import Structure from '@/nex/types/structure';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';
import AnyDataHolder from '@/nex/types/any-data-holder';
import UInt64 from '@/nex/types/uint64';
import RVString from '@/nex/types/string';

export default class NintendoNotificationEventGeneral extends Structure {
	public readonly typeName = 'NintendoNotificationEventGeneral';

	private m_u32Param = new UInt32();
	private m_u64Param1 = new UInt64();
	private m_u64Param2 = new UInt64();
	private m_strParam = new RVString();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.m_u32Param.extractFrom(stream);
		this.m_u64Param1.extractFrom(stream);
		this.m_u64Param2.extractFrom(stream);
		this.m_strParam.extractFrom(stream);
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
				m_u32Param: this.m_u32Param,
				m_u64Param1: this.m_u64Param1,
				m_u64Param2: this.m_u64Param2,
				m_strParam: this.m_strParam
			}
		};

		return json;
	}
}

AnyDataHolder.Classes['NintendoNotificationEventGeneral'] = NintendoNotificationEventGeneral;