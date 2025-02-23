import Structure from '@/nex/types/structure';
import StationURL from '@/nex/types/station-url';
import List from '@/nex/types/list';
import UInt8 from '@/nex/types/uint8';
import DateTime from '@/nex/types/datetime';
import type NEXByteStream from '@/nex/byte-stream';

export default class RVConnectionData extends Structure {
	public readonly typeName = 'RVConnectionData';

	private m_urlRegularProtocols = new StationURL();
	private m_lstSpecialProtocols = new List(new UInt8());
	private m_urlSpecialProtocols = new StationURL();
	private m_currentUTCTime: DateTime;

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.m_urlRegularProtocols.extractFrom(stream);
		this.m_lstSpecialProtocols.extractFrom(stream);
		this.m_urlSpecialProtocols.extractFrom(stream);

		if (this.structureVersion <= 1) {
			this.m_currentUTCTime = new DateTime();
			this.m_currentUTCTime.extractFrom(stream);
		}
	}

	public new(): RVConnectionData {
		return new RVConnectionData();
	}

	public toJSON(): Record<string, any> {
		const json: Record<string, any> = {
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {
				m_urlRegularProtocols: this.m_urlRegularProtocols,
				m_lstSpecialProtocols: this.m_lstSpecialProtocols,
				m_urlSpecialProtocols: this.m_urlSpecialProtocols
			}
		};

		if (this.m_currentUTCTime) {
			json.__fields.m_currentUTCTime = this.m_currentUTCTime;
		}

		return json;
	}
}
