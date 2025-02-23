import Structure from '@/nex/types/structure';
import List from '@/nex/types/list';
import RankingRankData from '@/nex/protocols/ranking/types/ranking-rank-data';
import UInt32 from '@/nex/types/uint32';
import DateTime from '@/nex/types/datetime';
import type NEXByteStream from '@/nex/byte-stream';

export default class RankingResult extends Structure {
	public get typeName(): string {
		return 'RankingResult';
	}

	private rankDataList = new List(new RankingRankData());
	private totalCount = new UInt32();
	private sinceTime = new DateTime();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.rankDataList.extractFrom(stream);
		this.totalCount.extractFrom(stream);
		this.sinceTime.extractFrom(stream);
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
				rankDataList: this.rankDataList,
				totalCount: this.totalCount,
				sinceTime: this.sinceTime
			}
		};
	}
}
