import Data from '@/nex/types/data';
import UInt32 from '@/nex/types/uint32';
import Bool from '@/nex/types/bool';
import GameKey from '@/nex/protocols/friends-wiiu/types/game-key';
import UInt8 from '@/nex/types/uint8';
import RVString from '@/nex/types/string';
import PID from '@/nex/types/pid';
import RVBuffer from '@/nex/types/buffer';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'NintendoPresenceV2';

export default class NintendoPresenceV2 extends Data {
	public get typeName(): string {
		return className;
	}

	private changedFlags = new UInt32();
	private online = new Bool();
	private gameKey = new GameKey();
	private unknown1 = new UInt8();
	private message = new RVString();
	private unknown2 = new UInt32();
	private unknown3 = new UInt8();
	private gameServerID = new UInt32();
	private unknown4 = new UInt32();
	private pid = new PID();
	private gatheringID = new UInt32();
	private applicationData = new RVBuffer();
	private unknown5 = new UInt8();
	private unknown6 = new UInt8();
	private unknown7 = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.changedFlags.extractFrom(stream);
		this.online.extractFrom(stream);
		this.gameKey.extractFrom(stream);
		this.unknown1.extractFrom(stream);
		this.message.extractFrom(stream);
		this.unknown2.extractFrom(stream);
		this.unknown3.extractFrom(stream);
		this.gameServerID.extractFrom(stream);
		this.unknown4.extractFrom(stream);
		this.pid.extractFrom(stream);
		this.gatheringID.extractFrom(stream);
		this.applicationData.extractFrom(stream);
		this.unknown5.extractFrom(stream);
		this.unknown6.extractFrom(stream);
		this.unknown7.extractFrom(stream);
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
				changedFlags: this.changedFlags,
				online: this.online,
				gameKey: this.gameKey,
				unknown1: this.unknown1,
				message: this.message,
				unknown2: this.unknown2,
				unknown3: this.unknown3,
				gameServerID: this.gameServerID,
				unknown4: this.unknown4,
				pid: this.pid,
				gatheringID: this.gatheringID,
				applicationData: this.applicationData,
				unknown5: this.unknown5,
				unknown6: this.unknown6,
				unknown7: this.unknown7
			}
		};
	}
}

AnyDataHolder.Classes[className] = NintendoPresenceV2;
