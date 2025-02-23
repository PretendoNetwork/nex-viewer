import Structure from '@/nex/types/structure';
import UInt64 from '@/nex/types/uint64';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import MatchmakeRefereePersonalRoundResult from '@/nex/protocols/matchmake-referee/types/matchmake-referee-personal-round-result';
import type NEXByteStream from '@/nex/byte-stream';

export default class MatchmakeRefereeRound extends Structure {
	public readonly typeName = 'MatchmakeRefereeRound';

	private roundId = new UInt64();
	private gid = new UInt32();
	private state = new UInt32();
	private personalDataCategory = new UInt32();
	private normalizedPersonalRoundResults = new List(new MatchmakeRefereePersonalRoundResult());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.roundId.extractFrom(stream);
		this.gid.extractFrom(stream);
		this.state.extractFrom(stream);
		this.personalDataCategory.extractFrom(stream);
		this.normalizedPersonalRoundResults.extractFrom(stream);
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
				roundId: this.roundId,
				gid: this.gid,
				state: this.state,
				personalDataCategory: this.personalDataCategory,
				normalizedPersonalRoundResults: this.normalizedPersonalRoundResults
			}
		};
	}
}
