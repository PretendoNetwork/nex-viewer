import Data from '@/nex/types/data';
import NNAInfo from '@/nex/protocols/friends-wiiu/types/nna-info';
import NintendoPresenceV2 from '@/nex/protocols/friends-wiiu/types/nintendo-presence-v2';
import Comment from '@/nex/protocols/friends-wiiu/types/comment';
import DateTime from '@/nex/types/datetime';
import UInt64 from '@/nex/types/uint64';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'FriendInfo';

export default class FriendInfo extends Data {
	public get typeName(): string {
		return className;
	}

	private NNAInfo = new NNAInfo();
	private nintendoPresence = new NintendoPresenceV2();
	private comment = new Comment();
	private BecameFriend = new DateTime();
	private lastOnline = new DateTime();
	private unknown = new UInt64();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.NNAInfo.extractFrom(stream);
		this.nintendoPresence.extractFrom(stream);
		this.comment.extractFrom(stream);
		this.BecameFriend.extractFrom(stream);
		this.lastOnline.extractFrom(stream);
		this.unknown.extractFrom(stream);
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
				NNAInfo: this.NNAInfo,
				nintendoPresence: this.nintendoPresence,
				comment: this.comment,
				BecameFriend: this.BecameFriend,
				lastOnline: this.lastOnline,
				unknown: this.unknown
			}
		};
	}
}

AnyDataHolder.Classes[className] = FriendInfo;
