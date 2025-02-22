import Structure from '@/nex/types/structure';
import type NEXByteStream from '@/nex/byte-stream';
import AnyDataHolder from '@/nex/types/any-data-holder';
import UInt8 from '@/nex/types/uint8';
import PrincipalBasicInfo from './principal-basic-info';

export default class NNAInfo extends Structure {
	public readonly typeName = 'NNAInfo';

	private m_principalBasicInfo = new PrincipalBasicInfo();
	private m_unk1 = new UInt8();
	private m_unk2 = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.m_principalBasicInfo.extractFrom(stream);
		this.m_unk1.extractFrom(stream);
		this.m_unk2.extractFrom(stream);
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
				m_principalBasicInfo: this.m_principalBasicInfo,
				m_unk1: this.m_unk1,
				m_unk2: this.m_unk2
			}
		};

		return json;
	}
}

AnyDataHolder.Classes['NNAInfo'] = NNAInfo;