import Data from '@/nex/types/data';
import PID from '@/nex/types/pid';
import UInt8 from '@/nex/types/uint8';
import GameKey from '@/nex/protocols/friends-3ds/types/game-key';
import RVString from '@/nex/types/string';
import DateTime from '@/nex/types/datetime';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'FriendPersistentInfo';

export default class FriendPersistentInfo extends Data {
	public get typeName(): string {
		return className;
	}

	private pid = new PID();
	private region = new UInt8();
	private country = new UInt8();
	private area = new UInt8();
	private language = new UInt8();
	private platform = new UInt8();
	private gameKey = new GameKey();
	private message = new RVString();
	private messageUpdatedAt = new DateTime();
	private miiModifiedAt = new DateTime();
	private lastOnline = new DateTime();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.pid.extractFrom(stream);
		this.region.extractFrom(stream);
		this.country.extractFrom(stream);
		this.area.extractFrom(stream);
		this.language.extractFrom(stream);
		this.platform.extractFrom(stream);
		this.gameKey.extractFrom(stream);
		this.message.extractFrom(stream);
		this.messageUpdatedAt.extractFrom(stream);
		this.miiModifiedAt.extractFrom(stream);
		this.lastOnline.extractFrom(stream);
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
				region: this.region,
				country: this.country,
				area: this.area,
				language: this.language,
				platform: this.platform,
				gameKey: this.gameKey,
				message: this.message,
				messageUpdatedAt: this.messageUpdatedAt,
				miiModifiedAt: this.miiModifiedAt,
				lastOnline: this.lastOnline
			}
		};
	}
}

AnyDataHolder.Classes[className] = FriendPersistentInfo;
