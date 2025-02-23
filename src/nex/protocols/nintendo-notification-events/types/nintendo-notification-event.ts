import Structure from '@/nex/types/structure';
import UInt32 from '@/nex/types/uint32';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type NEXByteStream from '@/nex/byte-stream';

export default class NintendoNotificationEvent extends Structure {
	public readonly typeName = 'NintendoNotificationEvent';

	private m_uiType = new UInt32();
	private m_pidSender = new UInt32();
	private m_dataHolder = new AnyDataHolder();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.m_uiType.extractFrom(stream);
		this.m_pidSender.extractFrom(stream);
		this.m_dataHolder.extractFrom(stream);
	}

	public new(): NintendoNotificationEvent {
		return new NintendoNotificationEvent();
	}

	public toJSON(): Record<string, any> {
		const json: Record<string, any> = {
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {
				m_uiType: this.m_uiType,
				m_pidSender: this.m_pidSender,
				m_dataHolder: this.m_dataHolder
			}
		};

		return json;
	}
}
