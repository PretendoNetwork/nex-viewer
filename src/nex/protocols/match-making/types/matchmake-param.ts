import Structure from '@/nex/types/structure';
import RVMap from '@/nex/types/map';
import RVString from '@/nex/types/string';
import Variant from '@/nex/types/variant';
import type NEXByteStream from '@/nex/byte-stream';

export default class MatchmakeParam extends Structure {
	public readonly typeName = 'MatchmakeParam';

	private m_Params = new RVMap(new RVString(), new Variant());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.m_Params.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): Record<string, any> {
		return {
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {
				m_Params: this.m_Params
			}
		};
	}
}
