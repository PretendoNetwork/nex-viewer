import * as semver from 'compare-versions';
import Data from '@/nex/types/data';
import UInt32 from '@/nex/types/uint32';
import PID from '@/nex/types/pid';
import DateTime from '@/nex/types/datetime';
import RVString from '@/nex/types/string';
import MessageRecipient from '@/nex/protocols/messaging/types/message-recipient';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'UserMessage';

export default class UserMessage extends Data {
	public get typeName(): string {
		return className;
	}

	private libraryVersion?: string;
	private m_uiID = new UInt32();
	private m_idRecipient = new UInt32();
	private m_uiRecipientType = new UInt32();
	private m_uiParentID = new UInt32();
	private m_pidSender = new PID();
	private m_receptiontime = new DateTime();
	private m_uiLifeTime = new UInt32();
	private m_uiFlags = new UInt32();
	private m_strSubject = new RVString();
	private m_strSender = new RVString();
	private m_messageRecipient = new MessageRecipient();

	public extractFrom(stream: NEXByteStream): void {
		this.libraryVersion = stream.title.libraryVersions.messaging;
		this.extractHeaderFrom(stream);

		this.m_uiID.extractFrom(stream);

		if (semver.satisfies(this.libraryVersion, '<4.0.0')) {
			this.m_idRecipient.extractFrom(stream);
			this.m_uiRecipientType.extractFrom(stream);
		}

		this.m_uiParentID.extractFrom(stream);
		this.m_pidSender.extractFrom(stream);
		this.m_receptiontime.extractFrom(stream);
		this.m_uiLifeTime.extractFrom(stream);
		this.m_uiFlags.extractFrom(stream);
		this.m_strSubject.extractFrom(stream);
		this.m_strSender.extractFrom(stream);

		if (semver.satisfies(this.libraryVersion, '>=4.0.0')) {
			this.m_messageRecipient.extractFrom(stream);
		}
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): Record<string, any> {
		const json: Record<string, any> = {
			__parent: super.toJSON(),
			__version: this.revision,
			__displayTypeName: className,
			__typeName: className,
			__fields: {
				m_uiID: this.m_uiID
			}
		};

		if (this.libraryVersion && semver.satisfies(this.libraryVersion, '<4.0.0')) {
			json.__fields['m_idRecipient'] = this.m_idRecipient;
			json.__fields['m_uiRecipientType'] = this.m_uiRecipientType;
		}

		json.__fields['m_uiParentID'] = this.m_uiParentID;
		json.__fields['m_pidSender'] = this.m_pidSender;
		json.__fields['m_receptiontime'] = this.m_receptiontime;
		json.__fields['m_uiLifeTime'] = this.m_uiLifeTime;
		json.__fields['m_uiFlags'] = this.m_uiFlags;
		json.__fields['m_strSubject'] = this.m_strSubject;
		json.__fields['m_strSender'] = this.m_strSender;

		if (this.libraryVersion && semver.satisfies(this.libraryVersion, '>=4.0.0')) {
			json.__fields['m_messageRecipient'] = this.m_messageRecipient;
		}

		return json;
	}
}

AnyDataHolder.Classes['UserMessage'] = UserMessage;
