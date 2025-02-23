import Structure from '@/nex/types/structure';
import PID from '@/nex/types/pid';
import UInt32 from '@/nex/types/uint32';
import Int32 from '@/nex/types/int32';
import QBuffer from '@/nex/types/qbuffer';
import type NEXByteStream from '@/nex/byte-stream';

export default class MatchmakeRefereePersonalRoundResult extends Structure {
	public readonly typeName = 'MatchmakeRefereePersonalRoundResult';

	private pid = new PID();
	private personalRoundResultFlag = new UInt32();
	private roundWinLoss = new UInt32();
	private ratingValueChange = new Int32();
	private buffer = new QBuffer();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.pid.extractFrom(stream);
		this.personalRoundResultFlag.extractFrom(stream);
		this.roundWinLoss.extractFrom(stream);
		this.ratingValueChange.extractFrom(stream);
		this.buffer.extractFrom(stream);
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
				personalRoundResultFlag: this.personalRoundResultFlag,
				roundWinLoss: this.roundWinLoss,
				ratingValueChange: this.ratingValueChange,
				buffer: this.buffer
			}
		};
	}
}
