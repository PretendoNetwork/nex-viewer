import Structure from '@/nex/types/structure';
import PID from '@/nex/types/pid';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

export default class SimplePlayingSession extends Structure {
	public readonly typeName = 'SimplePlayingSession';

	private m_PrincipalID = new PID();
	private m_GatheringID = new UInt32();
	private m_GameMode = new UInt32();
	private m_Attribute_0 = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.m_PrincipalID.extractFrom(stream);
		this.m_GatheringID.extractFrom(stream);
		this.m_GameMode.extractFrom(stream);
		this.m_Attribute_0.extractFrom(stream);
	}

	public new(): SimplePlayingSession {
		return new SimplePlayingSession();
	}

	public toJSON(): Record<string, any> {
		return {
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {
				m_PrincipalID: this.m_PrincipalID,
				m_GatheringID: this.m_GatheringID,
				m_GameMode: this.m_GameMode,
				m_Attribute_0: this.m_Attribute_0
			}
		};
	}
}
