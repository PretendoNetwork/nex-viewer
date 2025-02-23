import Structure from '@/nex/types/structure';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

export default class ResultRange extends Structure {
	public readonly typeName = 'ResultRange';

	private m_uiOffset = new UInt32();
	private m_uiSize = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.m_uiOffset.extractFrom(stream);
		this.m_uiSize.extractFrom(stream);
	}

	public new(): ResultRange {
		return new ResultRange();
	}

	public toJSON(): Record<string, any> {
		return {
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {
				m_uiOffset: this.m_uiOffset,
				m_uiSize: this.m_uiSize
			}
		};
	}
}
