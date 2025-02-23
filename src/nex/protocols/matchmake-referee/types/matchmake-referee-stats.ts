import Structure from '@/nex/types/structure';
import UInt64 from '@/nex/types/uint64';
import UInt32 from '@/nex/types/uint32';
import PID from '@/nex/types/pid';
import type NEXByteStream from '@/nex/byte-stream';

export default class MatchmakeRefereeStats extends Structure {
	public readonly typeName = 'MatchmakeRefereeStats';

	private uniqueId = new UInt64();
	private category = new UInt32();
	private pid = new PID();
	private recentDisconnection = new UInt32();
	private recentViolation = new UInt32();
	private recentMismatch = new UInt32();
	private recentWin = new UInt32();
	private recentLoss = new UInt32();
	private recentDraw = new UInt32();
	private totalDisconnect = new UInt32();
	private totalViolation = new UInt32();
	private totalMismatch = new UInt32();
	private totalWin = new UInt32();
	private totalLoss = new UInt32();
	private totalDraw = new UInt32();
	private ratingValue = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.uniqueId.extractFrom(stream);
		this.category.extractFrom(stream);
		this.pid.extractFrom(stream);
		this.recentDisconnection.extractFrom(stream);
		this.recentViolation.extractFrom(stream);
		this.recentMismatch.extractFrom(stream);
		this.recentWin.extractFrom(stream);
		this.recentLoss.extractFrom(stream);
		this.recentDraw.extractFrom(stream);
		this.totalDisconnect.extractFrom(stream);
		this.totalViolation.extractFrom(stream);
		this.totalMismatch.extractFrom(stream);
		this.totalWin.extractFrom(stream);
		this.totalLoss.extractFrom(stream);
		this.totalDraw.extractFrom(stream);
		this.ratingValue.extractFrom(stream);
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
				uniqueId: this.uniqueId,
				category: this.category,
				pid: this.pid,
				recentDisconnection: this.recentDisconnection,
				recentViolation: this.recentViolation,
				recentMismatch: this.recentMismatch,
				recentWin: this.recentWin,
				recentLoss: this.recentLoss,
				recentDraw: this.recentDraw,
				totalDisconnect: this.totalDisconnect,
				totalViolation: this.totalViolation,
				totalMismatch: this.totalMismatch,
				totalWin: this.totalWin,
				totalLoss: this.totalLoss,
				totalDraw: this.totalDraw,
				ratingValue: this.ratingValue
			}
		};
	}
}
