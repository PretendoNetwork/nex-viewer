import Structure from '@/nex/types/structure';
import AnyDataHolder from '@/nex/types/any-data-holder';
import RVString from '@/nex/types/string';
import DateTime from '@/nex/types/datetime';
import UInt8 from '@/nex/types/uint8';
import type NEXByteStream from '@/nex/byte-stream';

export default class Comment extends Structure {
	public readonly typeName = 'Comment';

	private m_unk = new UInt8();
	private m_statusMessage = new RVString();
	private m_lastChangedTime = new DateTime();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.m_unk.extractFrom(stream);
		this.m_statusMessage.extractFrom(stream);
		this.m_lastChangedTime.extractFrom(stream);
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
				m_unk: this.m_unk,
				m_statusMessage: this.m_statusMessage,
				m_lastChangedTime: this.m_lastChangedTime
			}
		};

		return json;
	}
}

AnyDataHolder.Classes['Comment'] = Comment;
