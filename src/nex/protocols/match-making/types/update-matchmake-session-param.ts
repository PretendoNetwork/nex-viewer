import Structure from '@/nex/types/structure';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import Bool from '@/nex/types/bool';
import RVBuffer from '@/nex/types/buffer';
import UInt8 from '@/nex/types/uint8';
import DateTime from '@/nex/types/datetime';
import RVString from '@/nex/types/string';
import UInt16 from '@/nex/types/uint16';
import MatchmakeParam from '@/nex/protocols/match-making/types/matchmake-param';
import type NEXByteStream from '@/nex/byte-stream';

export default class UpdateMatchmakeSessionParam extends Structure {
	public readonly typeName = 'UpdateMatchmakeSessionParam';

	private gid = new UInt32();
	private modificationFlag = new UInt32();
	private attributes = new List(new UInt32());
	private openParticipation = new Bool();
	private applicationBuffer = new RVBuffer();
	private progressScore = new UInt8();
	private matchmakeParam = new MatchmakeParam();
	private startedTime = new DateTime();
	private userPassword = new RVString();
	private gameMode = new UInt32();
	private description = new RVString();
	private minParticipants = new UInt16();
	private maxParticipants = new UInt16();
	private matchmakeSystemType = new UInt32();
	private participationPolicy = new UInt32();
	private policyArgument = new UInt32();
	private codeword = new RVString();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.gid.extractFrom(stream);
		this.modificationFlag.extractFrom(stream);
		this.attributes.extractFrom(stream);
		this.openParticipation.extractFrom(stream);
		this.applicationBuffer.extractFrom(stream);
		this.progressScore.extractFrom(stream);
		this.matchmakeParam.extractFrom(stream);
		this.startedTime.extractFrom(stream);
		this.userPassword.extractFrom(stream);
		this.gameMode.extractFrom(stream);
		this.description.extractFrom(stream);
		this.minParticipants.extractFrom(stream);
		this.maxParticipants.extractFrom(stream);
		this.matchmakeSystemType.extractFrom(stream);
		this.participationPolicy.extractFrom(stream);
		this.policyArgument.extractFrom(stream);
		this.codeword.extractFrom(stream);
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
				modificationFlag: this.modificationFlag,
				attributes: this.attributes,
				openParticipation: this.openParticipation,
				applicationBuffer: this.applicationBuffer,
				progressScore: this.progressScore,
				matchmakeParam: this.matchmakeParam,
				startedTime: this.startedTime,
				userPassword: this.userPassword,
				gameMode: this.gameMode,
				description: this.description,
				minParticipants: this.minParticipants,
				maxParticipants: this.maxParticipants,
				matchmakeSystemType: this.matchmakeSystemType,
				participationPolicy: this.participationPolicy,
				policyArgument: this.policyArgument,
				codeword: this.codeword
			}
		};
	}
}
