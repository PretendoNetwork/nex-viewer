import UInt32 from '@/nex/types/uint32';
import AnyDataHolder from '@/nex/types/any-data-holder';
import Data from '@/nex/types/data';
import QBuffer from '@/nex/types/qbuffer';
import type NEXByteStream from '@/nex/byte-stream';

export default class SubscriptionData extends Data {
	public get typeName(): string {
		return 'SubscriptionData';
	}

	private ownerPid = new UInt32();
	private dataBuffer = new QBuffer();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.ownerPid.extractFrom(stream);
		this.dataBuffer.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): Record<string, any> {
		const json: Record<string, any> = {
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {
				ownerPid: this.ownerPid,
				dataBuffer: this.dataBuffer
			}
		};

		return json;
	}
}

AnyDataHolder.Classes['SubscriptionData'] = SubscriptionData;
