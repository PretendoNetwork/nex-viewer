import Data from '@/nex/types/data';
import PID from '@/nex/types/pid';
import NintendoPresence from '@/nex/protocols/friends-3ds/types/nintendo-presence';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'FriendPresence';

export default class FriendPresence extends Data {
	public get typeName(): string {
		return className;
	}

	private pid = new PID();
	private nintendoPresence = new NintendoPresence();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.pid.extractFrom(stream);
		this.nintendoPresence.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): any {
		return {
			__parent: super.toJSON(),
			__version: this.revision,
			__displayTypeName: className,
			__typeName: className,
			__fields: {
				pid: this.pid,
				nintendoPresence: this.nintendoPresence
			}
		};
	}
}

AnyDataHolder.Classes[className] = FriendPresence;
