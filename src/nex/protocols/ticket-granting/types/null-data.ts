import Data from '@/nex/types/data';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type NEXByteStream from '@/nex/byte-stream';

// TODO - Is this used in places outside of TicketGranting? If so, we need to move it
// * NullData represents an empty object, intended to have no fields
export default class NullData extends Data {
	public get typeName(): string {
		return 'NullData';
	}

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): Record<string, any> {
		return {
			__parent: super.toJSON(),
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {}
		};
	}
}

AnyDataHolder.Classes['NullData'] = NullData;
