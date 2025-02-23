import Structure from '@/nex/types/structure';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import PID from '@/nex/types/pid';
import type NEXByteStream from '@/nex/byte-stream';

export default class MatchmakeRefereeStartRoundParam extends Structure {
	public readonly typeName = 'MatchmakeRefereeStartRoundParam';

	private personalDataCategory = new UInt32();
	private gid = new UInt32();
	private pids = new List(new PID());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.personalDataCategory.extractFrom(stream);
		this.gid.extractFrom(stream);
		this.pids.extractFrom(stream);
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
				personalDataCategory: this.personalDataCategory,
				gid: this.gid,
				pids: this.pids
			}
		};
	}
}
