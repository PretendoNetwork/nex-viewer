import Structure from '@/nex/types/structure';
import UInt32 from '@/nex/types/uint32';
import PID from '@/nex/types/pid';
import type NEXByteStream from '@/nex/byte-stream';

export default class DeletionEntry extends Structure {
	public readonly typeName = 'DeletionEntry';

	private m_idGathering = new UInt32();
	private m_pid = new PID();
	private m_uiReason = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.m_idGathering.extractFrom(stream);
		this.m_pid.extractFrom(stream);
		this.m_uiReason.extractFrom(stream);
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
				m_idGathering: this.m_idGathering,
				m_pid: this.m_pid,
				m_uiReason: this.m_uiReason
			}
		};
	}
}
