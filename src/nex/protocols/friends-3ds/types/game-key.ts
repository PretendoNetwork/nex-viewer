import Data from '@/nex/types/data';
import UInt64 from '@/nex/types/uint64';
import UInt16 from '@/nex/types/uint16';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'GameKey';

export default class GameKey extends Data {
	public get typeName(): string {
		return className;
	}

	private m_gameCode = new UInt64();
	private m_gameVersion = new UInt16();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.m_gameCode.extractFrom(stream);
		this.m_gameVersion.extractFrom(stream);
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
				m_gameCode: this.m_gameCode,
				m_gameVersion: this.m_gameVersion
			}
		};
	}
}

AnyDataHolder.Classes[className] = GameKey;
