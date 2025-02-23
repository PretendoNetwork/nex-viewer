import Structure from '@/nex/types/structure';
import AnyDataHolder from '@/nex/types/any-data-holder';
import UInt8 from '@/nex/types/uint8';
import RVString from '@/nex/types/string';
import DateTime from '@/nex/types/datetime';
import RVBuffer from '@/nex/types/buffer';
import type NEXByteStream from '@/nex/byte-stream';

export default class MiiV2 extends Structure {
	public readonly typeName = 'MiiV2';

	private m_name = new RVString();
	private m_unk1 = new UInt8();
	private m_unk2 = new UInt8();
	private m_miiData = new RVBuffer();
	private m_unk3 = new DateTime();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.m_name.extractFrom(stream);
		this.m_unk1.extractFrom(stream);
		this.m_unk2.extractFrom(stream);
		this.m_miiData.extractFrom(stream);
		this.m_unk3.extractFrom(stream);
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
				m_name: this.m_name,
				m_unk1: this.m_unk1,
				m_unk2: this.m_unk2,
				m_miiData: this.m_miiData,
				m_unk3: this.m_unk3
			}
		};

		return json;
	}
}

AnyDataHolder.Classes['MiiV2'] = MiiV2;
