import Structure from '@/nex/types/structure';
import type NEXByteStream from '@/nex/byte-stream';

export default class RankingStats extends Structure {
	public readonly typeName = 'RankingStats';

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);
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
			}
		};
	}
}
