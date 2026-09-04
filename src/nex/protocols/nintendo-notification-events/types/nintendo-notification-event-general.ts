import Data from '@/nex/types/data';
import UInt32 from '@/nex/types/uint32';
import UInt64 from '@/nex/types/uint64';
import RVString from '@/nex/types/string';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'NintendoNotificationEventGeneral';

export default class NintendoNotificationEventGeneral extends Data {
	public get typeName(): string {
		return className;
	}

	private m_u32Param = new UInt32();
	private m_u64Param1 = new UInt64();
	private m_u64Param2 = new UInt64();
	private m_strParam = new RVString();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

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
		return {
			__parent: super.toJSON(),
			__version: this.revision,
			__displayTypeName: className,
			__typeName: className,
			__fields: {
				m_u32Param: this.m_u32Param,
				m_u64Param1: this.m_u64Param1,
				m_u64Param2: this.m_u64Param2,
				m_strParam: this.m_strParam
			}
		};
	}
}

AnyDataHolder.Classes[className] = NintendoNotificationEventGeneral;
