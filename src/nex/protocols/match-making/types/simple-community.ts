import Structure from '@/nex/types/structure';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

export default class SimpleCommunity extends Structure {
	public readonly typeName = 'SimpleCommunity';

	private m_GatheringID = new UInt32();
	private m_MatchmakeSessionCount = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.m_GatheringID.extractFrom(stream);
		this.m_MatchmakeSessionCount.extractFrom(stream);
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
				m_GatheringID: this.m_GatheringID,
				m_MatchmakeSessionCount: this.m_MatchmakeSessionCount
			}
		};
	}
}
