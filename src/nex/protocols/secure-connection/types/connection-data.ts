import Structure from '@/nex/types/structure';
import StationURL from '@/nex/types/station-url';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

export default class ConnectionData extends Structure {
	public readonly typeName = 'ConnectionData';

	private m_StationUrl = new StationURL();
	private m_ConnectionID = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.m_StationUrl.extractFrom(stream);
		this.m_ConnectionID.extractFrom(stream);
	}

	public new(): ConnectionData {
		return new ConnectionData();
	}

	public toJSON(): Record<string, any> {
		return {
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {
				m_StationUrl: this.m_StationUrl,
				m_ConnectionID: this.m_ConnectionID
			}
		};
	}
}
