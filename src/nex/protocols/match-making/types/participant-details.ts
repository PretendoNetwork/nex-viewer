import Structure from '@/nex/types/structure';
import PID from '@/nex/types/pid';
import RVString from '@/nex/types/string';
import UInt16 from '@/nex/types/uint16';
import type NEXByteStream from '@/nex/byte-stream';

export default class ParticipantDetails extends Structure {
	public readonly typeName = 'ParticipantDetails';

	private m_idParticipant = new PID();
	private m_strName = new RVString();
	private m_strMessage = new RVString();
	private m_uiParticipants = new UInt16();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.m_idParticipant.extractFrom(stream);
		this.m_strName.extractFrom(stream);
		this.m_strMessage.extractFrom(stream);
		this.m_uiParticipants.extractFrom(stream);
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
				m_idParticipant: this.m_idParticipant,
				m_strName: this.m_strName,
				m_strMessage: this.m_strMessage,
				m_uiParticipants: this.m_uiParticipants
			}
		};
	}
}
