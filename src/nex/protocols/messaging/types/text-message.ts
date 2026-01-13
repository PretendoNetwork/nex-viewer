import RVString from '@/nex/types/string';
import AnyDataHolder from '@/nex/types/any-data-holder';
import UserMessage from './user-message';
import type NEXByteStream from '@/nex/byte-stream';

export default class TextMessage extends UserMessage {
	public get typeName(): string {
		return 'TextMessage';
	}

	private m_strTextBody = new RVString();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.m_strTextBody.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): Record<string, any> {
		const json: Record<string, any> = {
			__parent: super.toJSON(),
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {
				m_strTextBody: this.m_strTextBody
			}
		};

		return json;
	}
}

AnyDataHolder.Classes['TextMessage'] = TextMessage;
