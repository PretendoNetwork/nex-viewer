import Structure from '@/nex/types/structure';
import AnyDataHolder from '@/nex/types/any-data-holder';
import UInt64 from '@/nex/types/uint64';
import DateTime from '@/nex/types/datetime';
import Comment from './comment';
import NNAInfo from './nna-info';
import NintendoPresenceV2 from './nintendo-presence-v2';
import type NEXByteStream from '@/nex/byte-stream';

export default class FriendInfo extends Structure {
	public readonly typeName = 'FriendInfo';

	private m_nnaInfo = new NNAInfo();
	private m_presence = new NintendoPresenceV2();
	private m_comment = new Comment();
	private m_friendAddedTime = new DateTime();
	private m_lastOnlineTime = new DateTime();
	private m_unk = new UInt64();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.m_nnaInfo.extractFrom(stream);
		this.m_presence.extractFrom(stream);
		this.m_comment.extractFrom(stream);
		this.m_friendAddedTime.extractFrom(stream);
		this.m_lastOnlineTime.extractFrom(stream);
		this.m_unk.extractFrom(stream);
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
				m_nnaInfo: this.m_nnaInfo,
				m_presence: this.m_presence,
				m_comment: this.m_comment,
				m_friendAddedTime: this.m_friendAddedTime,
				m_lastOnlineTime: this.m_lastOnlineTime,
				m_unk: this.m_unk
			}
		};

		return json;
	}
}

AnyDataHolder.Classes['FriendInfo'] = FriendInfo;
