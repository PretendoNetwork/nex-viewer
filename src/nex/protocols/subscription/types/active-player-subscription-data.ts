import AnyDataHolder from '@/nex/types/any-data-holder';
import UInt8 from '@/nex/types/uint8';
import SubscriptionData from './subscription-data';
import type NEXByteStream from '@/nex/byte-stream';

export default class ActivePlayerSubscriptionData extends SubscriptionData {
	public get typeName(): string {
		return 'ActivePlayerSubscriptionData';
	}

	private bUnk = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.bUnk.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): Record<string, any> {
		const json: Record<string, any> = {
			__parent: super.toJSON(),
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {
				bUnk: this.bUnk
			}
		};

		return json;
	}
}

AnyDataHolder.Classes['ActivePlayerSubscriptionData'] = ActivePlayerSubscriptionData;
