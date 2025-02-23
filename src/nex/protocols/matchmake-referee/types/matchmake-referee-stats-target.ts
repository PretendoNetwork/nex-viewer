import Structure from '@/nex/types/structure';
import PID from '@/nex/types/pid';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

export default class MatchmakeRefereeStatsTarget extends Structure {
	public readonly typeName = 'MatchmakeRefereeStatsTarget';

	private pid = new PID();
	private category = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.pid.extractFrom(stream);
		this.category.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): any {
		return {
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {
				pid: this.pid,
				category: this.category
			}
		};
	}
}
