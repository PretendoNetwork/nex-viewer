import Structure from '@/nex/types/structure';
import type NEXByteStream from '@/nex/byte-stream';
import AnyDataHolder from '@/nex/types/any-data-holder';
import UInt8 from '@/nex/types/uint8';
import PID from '@/nex/types/pid';
import RVString from '@/nex/types/string';
import MiiV2 from './mii-v2';

export default class PrincipalBasicInfo extends Structure {
	public readonly typeName = 'PrincipalBasicInfo';

	private m_pid = new PID();
	private m_nnid = new RVString();
	private m_mii = new MiiV2();
	private m_unk = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.m_pid.extractFrom(stream);
		this.m_nnid.extractFrom(stream);
		this.m_mii.extractFrom(stream);
		this.m_unk.extractFrom(stream);
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
				m_pid: this.m_pid,
				m_nnid: this.m_nnid,
				m_mii: this.m_mii,
				m_unk: this.m_unk
			}
		};

		return json;
	}
}

AnyDataHolder.Classes['PrincipalBasicInfo'] = PrincipalBasicInfo;