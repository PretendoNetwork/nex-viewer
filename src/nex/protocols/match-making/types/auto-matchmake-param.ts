import * as semver from 'compare-versions';
import Structure from '@/nex/types/structure';
import List from '@/nex/types/list';
import PID from '@/nex/types/pid';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import UInt16 from '@/nex/types/uint16';
import MatchmakeSession from '@/nex/protocols/match-making/types/matchmake-session';
import MatchmakeSessionSearchCriteria from '@/nex/protocols/match-making/types/matchmake-session-search-criteria';
import MatchmakeBlockListParam from '@/nex/protocols/match-making/types/matchmake-block-list-param';
import type NEXByteStream from '@/nex/byte-stream';

export default class AutoMatchmakeParam extends Structure {
	public readonly typeName = 'AutoMatchmakeParam';

	private sourceMatchmakeSession = new MatchmakeSession();
	private additionalParticipants = new List(new PID());
	private gidForParticipationCheck = new UInt32();
	private autoMatchmakeOption = new UInt32();
	private joinMessage = new RVString();
	private participationCount = new UInt16();
	private lstSearchCriteria = new List(new MatchmakeSessionSearchCriteria());
	private targetGids = new List(new UInt32());
	private blockListParam: MatchmakeBlockListParam; // * NEX 4.0

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.sourceMatchmakeSession.extractFrom(stream);
		this.additionalParticipants.extractFrom(stream);
		this.gidForParticipationCheck.extractFrom(stream);
		this.autoMatchmakeOption.extractFrom(stream);
		this.joinMessage.extractFrom(stream);
		this.participationCount.extractFrom(stream);
		this.lstSearchCriteria.extractFrom(stream);
		this.targetGids.extractFrom(stream);

		if (semver.satisfies(stream.title.libraryVersions.match_making, '>=4.0.0')) {
			this.blockListParam = new MatchmakeBlockListParam();
			this.blockListParam.extractFrom(stream);
		}
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): Record<string, any> {
		const json: Record<string, any> = {
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {
				sourceMatchmakeSession: this.sourceMatchmakeSession,
				additionalParticipants: this.additionalParticipants,
				gidForParticipationCheck: this.gidForParticipationCheck,
				autoMatchmakeOption: this.autoMatchmakeOption,
				joinMessage: this.joinMessage,
				participationCount: this.participationCount,
				lstSearchCriteria: this.lstSearchCriteria,
				targetGids: this.targetGids
			}
		};

		if (this.blockListParam !== undefined) {
			json.__fields.blockListParam = this.blockListParam;
		}

		return json;
	}
}
