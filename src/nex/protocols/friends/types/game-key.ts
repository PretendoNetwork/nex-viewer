import Structure from '@/nex/types/structure';
import AnyDataHolder from '@/nex/types/any-data-holder';
import UInt64 from '@/nex/types/uint64';
import UInt16 from '@/nex/types/uint16';
import type NEXByteStream from '@/nex/byte-stream';

export default class GameKey extends Structure {
	public readonly typeName = 'GameKey';

	private m_titleId = new UInt64();
	private m_titleVersion = new UInt16();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.m_titleId.extractFrom(stream);
		this.m_titleVersion.extractFrom(stream);
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
				m_titleId: this.m_titleId,
				m_titleVersion: this.m_titleVersion
			}
		};

		return json;
	}
}

AnyDataHolder.Classes['GameKey'] = GameKey;
