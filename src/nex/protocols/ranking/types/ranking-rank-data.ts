import Structure from '@/nex/types/structure';
import PID from '@/nex/types/pid';
import UInt64 from '@/nex/types/uint64';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import UInt8 from '@/nex/types/uint8';
import RVBuffer from '@/nex/types/buffer';
import type NEXByteStream from '@/nex/byte-stream';

export default class RankingRankData extends Structure {
	public readonly typeName = 'RankingRankData';

	private principalId = new PID();
	private uniqueId = new UInt64();
	private order = new UInt32();
	private category = new UInt32();
	private score = new UInt32();
	private groups = new List(new UInt8());
	private param = new UInt64();
	private commonData = new RVBuffer();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.principalId.extractFrom(stream);
		this.uniqueId.extractFrom(stream);
		this.order.extractFrom(stream);
		this.category.extractFrom(stream);
		this.score.extractFrom(stream);
		this.groups.extractFrom(stream);
		this.param.extractFrom(stream);
		this.commonData.extractFrom(stream);
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
				principalId: this.principalId,
				uniqueId: this.uniqueId,
				order: this.order,
				category: this.category,
				score: this.score,
				groups: this.groups,
				param: this.param,
				commonData: this.commonData
			}
		};
	}
}
