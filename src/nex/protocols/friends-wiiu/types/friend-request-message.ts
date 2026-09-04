import Data from '@/nex/types/data';
import UInt64 from '@/nex/types/uint64';
import UInt8 from '@/nex/types/uint8';
import RVString from '@/nex/types/string';
import GameKey from '@/nex/protocols/friends-wiiu/types/game-key';
import DateTime from '@/nex/types/datetime';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'FriendRequestMessage';

export default class FriendRequestMessage extends Data {
	public get typeName(): string {
		return className;
	}

	private friendRequestID = new UInt64();
	private hasRecieved = new UInt8();
	private unknown1 = new UInt8();
	private message = new RVString();
	private unknown2 = new UInt8();
	private unknown3 = new RVString();
	private gameKey = new GameKey();
	private unknown4 = new DateTime();
	private expires = new DateTime();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.friendRequestID.extractFrom(stream);
		this.hasRecieved.extractFrom(stream);
		this.unknown1.extractFrom(stream);
		this.message.extractFrom(stream);
		this.unknown2.extractFrom(stream);
		this.unknown3.extractFrom(stream);
		this.gameKey.extractFrom(stream);
		this.unknown4.extractFrom(stream);
		this.expires.extractFrom(stream);
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
				friendRequestID: this.friendRequestID,
				hasRecieved: this.hasRecieved,
				unknown1: this.unknown1,
				message: this.message,
				unknown2: this.unknown2,
				unknown3: this.unknown3,
				gameKey: this.gameKey,
				unknown4: this.unknown4,
				expires: this.expires
			}
		};
	}
}

AnyDataHolder.Classes[className] = FriendRequestMessage;
