import Structure from '@/nex/types/structure';
import UInt8 from '@/nex/types/uint8';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

export default class RankingOrderParam extends Structure {
	public readonly typeName = 'RankingOrderParam';

	private orderCalculation = new UInt8();
	private groupIndex = new UInt8();
	private groupNum = new UInt8();
	private timeScope = new UInt8();
	private offset = new UInt32();
	private length = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.orderCalculation.extractFrom(stream);
		this.groupIndex.extractFrom(stream);
		this.groupNum.extractFrom(stream);
		this.timeScope.extractFrom(stream);
		this.offset.extractFrom(stream);
		this.length.extractFrom(stream);
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
				orderCalculation: this.orderCalculation,
				groupIndex: this.groupIndex,
				groupNum: this.groupNum,
				timeScope: this.timeScope,
				offset: this.offset,
				length: this.length
			}
		};
	}
}
