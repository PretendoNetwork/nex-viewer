import UserMessage from '@/nex/protocols/messaging/types/user-message';
import QBuffer from '@/nex/types/qbuffer';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'BinaryMessage';

export default class BinaryMessage extends UserMessage {
	public get typeName(): string {
		return className;
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
		return {
			__parent: super.toJSON(),
			__version: this.revision,
			__displayTypeName: className,
			__typeName: className,
			__fields: {
				m_binaryBody: this.m_binaryBody
			}
		};
	}
}
