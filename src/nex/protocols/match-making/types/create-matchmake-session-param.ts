import Structure from '@/nex/types/structure';
import List from '@/nex/types/list';
import PID from '@/nex/types/pid';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import UInt16 from '@/nex/types/uint16';
import MatchmakeSession from '@/nex/protocols/match-making/types/matchmake-session';
import type NEXByteStream from '@/nex/byte-stream';

export default class CreateMatchmakeSessionParam extends Structure {
	public readonly typeName = 'CreateMatchmakeSessionParam';

	private sourceMatchmakeSession = new MatchmakeSession();
	private additionalParticipants = new List(new PID());
	private gidForParticipationCheck = new UInt32();
	private createMatchmakeSessionOption = new UInt32();
	private joinMessage = new RVString();
	private participationCount = new UInt16();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.sourceMatchmakeSession.extractFrom(stream);
		this.additionalParticipants.extractFrom(stream);
		this.gidForParticipationCheck.extractFrom(stream);
		this.createMatchmakeSessionOption.extractFrom(stream);
		this.joinMessage.extractFrom(stream);
		this.participationCount.extractFrom(stream);
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
				sourceMatchmakeSession: this.sourceMatchmakeSession,
				additionalParticipants: this.additionalParticipants,
				gidForParticipationCheck: this.gidForParticipationCheck,
				createMatchmakeSessionOption: this.createMatchmakeSessionOption,
				joinMessage: this.joinMessage,
				participationCount: this.participationCount
			}
		};
	}
}
