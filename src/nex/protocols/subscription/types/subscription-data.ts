import Data from '@/nex/types/data';
import PID from '@/nex/types/pid';
import QBuffer from '@/nex/types/qbuffer';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'SubscriptionData';

export default class SubscriptionData extends Data {
	public get typeName(): string {
		return className;
	}

	private pid = new PID();
	private unknownQBuffer = new QBuffer();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.pid.extractFrom(stream);
		this.unknownQBuffer.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): Record<string, any> {
		return {
			__parent: super.toJSON(),
			__version: this.revision,
			__displayTypeName: className,
			__typeName: className,
			__fields: {
				pid: this.pid,
				unknownQBuffer: this.unknownQBuffer
			}
		};
	}
}

AnyDataHolder.Classes[className] = SubscriptionData;
