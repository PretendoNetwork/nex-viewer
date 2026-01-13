import * as semver from 'compare-versions';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import PID from '@/nex/types/pid';
import DateTime from '@/nex/types/datetime';
import AnyDataHolder from '@/nex/types/any-data-holder';
import Data from '@/nex/types/data';
import MessageRecipient from './message-recipient';
import type NEXByteStream from '@/nex/byte-stream';

export default class UserMessage extends Data {
	public get typeName(): string {
		return 'UserMessage';
	}

	private m_uiID = new UInt32();
	private m_idRecipient: UInt32; // * Pre NEX 4.0
	private m_uiRecipientType: UInt32; // * Pre NEX 4.0
	private m_uiParentID = new UInt32();
	private m_pidSender = new PID();
	private m_receptiontime = new DateTime();
	private m_uiLifeTime = new UInt32();
	private m_uiFlags = new UInt32();
	private m_strSubject = new RVString();
	private m_strSender = new RVString();
	private m_messageRecipient: MessageRecipient; // * NEX 4.0

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.m_uiID.extractFrom(stream);

		if (semver.satisfies(stream.title.libraryVersions.main, '<4.0.0')) {
			this.m_idRecipient = new UInt32();
			this.m_idRecipient.extractFrom(stream);

			this.m_uiRecipientType = new UInt32();
			this.m_uiRecipientType.extractFrom(stream);
		}

		this.m_uiParentID.extractFrom(stream);
		this.m_pidSender.extractFrom(stream);
		this.m_receptiontime.extractFrom(stream);
		this.m_uiLifeTime.extractFrom(stream);
		this.m_uiFlags.extractFrom(stream);
		this.m_strSubject.extractFrom(stream);
		this.m_strSender.extractFrom(stream);

		if (semver.satisfies(stream.title.libraryVersions.main, '>=4.0.0')) {
			this.m_messageRecipient = new MessageRecipient();
			this.m_messageRecipient.extractFrom(stream);
		}
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
				m_uiID: this.m_uiID,
				m_uiParentID: this.m_uiParentID,
				m_pidSender: this.m_pidSender,
				m_receptiontime: this.m_receptiontime,
				m_uiLifeTime: this.m_uiLifeTime,
				m_uiFlags: this.m_uiFlags,
				m_strSubject: this.m_strSubject,
				m_strSender: this.m_strSender
			}
		};

		if (this.m_idRecipient !== undefined) {
			json.__fields.m_idRecipient = this.m_idRecipient;
		}

		if (this.m_uiRecipientType !== undefined) {
			json.__fields.m_uiRecipientType = this.m_uiRecipientType;
		}

		if (this.m_messageRecipient !== undefined) {
			json.__fields.m_messageRecipient = this.m_messageRecipient;
		}

		return json;
	}
}

AnyDataHolder.Classes['UserMessage'] = UserMessage;
