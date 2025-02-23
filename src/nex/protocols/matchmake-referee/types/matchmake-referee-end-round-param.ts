import Structure from '@/nex/types/structure';
import UInt64 from '@/nex/types/uint64';
import List from '@/nex/types/list';
import MatchmakeRefereePersonalRoundResult from '@/nex/protocols/matchmake-referee/types/matchmake-referee-personal-round-result';
import type NEXByteStream from '@/nex/byte-stream';

export default class MatchmakeRefereeEndRoundParam extends Structure {
	public readonly typeName = 'MatchmakeRefereeEndRoundParam';

	private roundId = new UInt64();
	private personalRoundResults = new List(new MatchmakeRefereePersonalRoundResult());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.roundId.extractFrom(stream);
		this.personalRoundResults.extractFrom(stream);
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
				personalRoundResults: this.personalRoundResults
			}
		};
	}
}
