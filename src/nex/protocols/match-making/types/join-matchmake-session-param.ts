import * as semver from 'compare-versions';
import Structure from '@/nex/types/structure';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import PID from '@/nex/types/pid';
import UInt8 from '@/nex/types/uint8';
import RVString from '@/nex/types/string';
import UInt16 from '@/nex/types/uint16';
import MatchmakeBlockListParam from '@/nex/protocols/match-making/types/matchmake-block-list-param';
import type NEXByteStream from '@/nex/byte-stream';

export default class JoinMatchmakeSessionParam extends Structure {
	public readonly typeName = 'JoinMatchmakeSessionParam';

	private gid = new UInt32();
	private additionalParticipants = new List(new PID());
	private gidForParticipationCheck = new UInt32();
	private joinMatchmakeSessionOption = new UInt32();
	private joinMatchmakeSessionBehavior = new UInt8();
	private strUserPassword = new RVString();
	private strSystemPassword = new RVString();
	private joinMessage = new RVString();
	private participationCount = new UInt16();
	private extraParticipants: UInt16; // * SV 1 / NEX 4.0
	private blockListParam: MatchmakeBlockListParam; // * NEX 4.0

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.gid.extractFrom(stream);
		this.additionalParticipants.extractFrom(stream);
		this.gidForParticipationCheck.extractFrom(stream);
		this.joinMatchmakeSessionOption.extractFrom(stream);
		this.joinMatchmakeSessionBehavior.extractFrom(stream);
		this.strUserPassword.extractFrom(stream);
		this.strSystemPassword.extractFrom(stream);
		this.joinMessage.extractFrom(stream);
		this.participationCount.extractFrom(stream);

		if (this.structureVersion >= 1 || semver.satisfies(stream.title.libraryVersions.match_making, '>=4.0.0')) {
			this.extraParticipants = new UInt16();
			this.extraParticipants.extractFrom(stream);
		}

		if (semver.satisfies(stream.title.libraryVersions.match_making, '>=4.0.0')) {
			this.blockListParam = new MatchmakeBlockListParam();
			this.blockListParam.extractFrom(stream);
		}
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
				gid: this.gid,
				additionalParticipants: this.additionalParticipants,
				gidForParticipationCheck: this.gidForParticipationCheck,
				joinMatchmakeSessionOption: this.joinMatchmakeSessionOption,
				joinMatchmakeSessionBehavior: this.joinMatchmakeSessionBehavior,
				strUserPassword: this.strUserPassword,
				strSystemPassword: this.strSystemPassword,
				joinMessage: this.joinMessage,
				participationCount: this.participationCount,
				extraParticipants: this.extraParticipants,
				blockListParam: this.blockListParam
			}
		};
	}
}
