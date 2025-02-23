import Structure from '@/nex/types/structure';
import type NEXByteStream from '@/nex/byte-stream';

// * Data has no fields itself.
// * This is the parent class for all types which are allowed in AnyDataHolder
export default class Data extends Structure {
	// * Make this a getter so it can be overridden by child classes
	public get typeName(): string {
		return 'Data';
	}

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): Record<string, any> {
		return {
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName
		};
	}
}
