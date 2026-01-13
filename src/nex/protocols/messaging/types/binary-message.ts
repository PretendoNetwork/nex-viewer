import AnyDataHolder from '@/nex/types/any-data-holder';
import QBuffer from '@/nex/types/qbuffer';
import UserMessage from './user-message';
import type NEXByteStream from '@/nex/byte-stream';

export default class BinaryMessage extends UserMessage {
	public get typeName(): string {
		return 'BinaryMessage';
	}

	private m_binaryBody = new QBuffer();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.m_binaryBody.extractFrom(stream);
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
				m_binaryBody: this.m_binaryBody
			}
		};

		return json;
	}
}

AnyDataHolder.Classes['BinaryMessage'] = BinaryMessage;
