import Structure from '@/nex/types/structure';
import PID from '@/nex/types/pid';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type NEXByteStream from '@/nex/byte-stream';

export default class PlayingSession extends Structure {
	public readonly typeName = 'PlayingSession';

	private m_PrincipalId = new PID();
	private m_Gathering = new AnyDataHolder();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.m_PrincipalId.extractFrom(stream);
		this.m_Gathering.extractFrom(stream);
	}

	public new(): PlayingSession {
		return new PlayingSession();
	}

	public toJSON(): Record<string, any> {
		return {
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {
				m_PrincipalId: this.m_PrincipalId,
				m_Gathering: this.m_Gathering
			}
		};
	}
}
