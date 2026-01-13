import Structure from '@/nex/types/structure';
import UInt32 from '@/nex/types/uint32';
import PID from '@/nex/types/pid';
import type NEXByteStream from '@/nex/byte-stream';

export default class MessageRecipient extends Structure {
	public readonly typeName = 'MessageRecipient';

	private m_uiRecipientType = new UInt32();
	private m_principalId = new PID();
	private m_gatheringId = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.m_uiRecipientType.extractFrom(stream);
		this.m_principalId.extractFrom(stream);
		this.m_gatheringId.extractFrom(stream);
	}

	public new(): MessageRecipient {
		return new MessageRecipient();
	}

	public toJSON(): Record<string, any> {
		const json: Record<string, any> = {
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {
				m_uiRecipientType: this.m_uiRecipientType,
				m_principalId: this.m_principalId,
				m_gatheringId: this.m_gatheringId
			}
		};

		return json;
	}
}
