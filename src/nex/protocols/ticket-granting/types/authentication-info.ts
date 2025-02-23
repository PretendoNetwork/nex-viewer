import Data from '@/nex/types/data';
import RVString from '@/nex/types/string';
import UInt32 from '@/nex/types/uint32';
import UInt8 from '@/nex/types/uint8';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type NEXByteStream from '@/nex/byte-stream';

export default class AuthenticationInfo extends Data {
	public get typeName(): string {
		return 'AuthenticationInfo';
	}

	private m_authToken = new RVString();
	private m_ngsVersion = new UInt32();
	private m_authTokenType = new UInt8();
	private m_serverVersion = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.m_authToken.extractFrom(stream);
		this.m_ngsVersion.extractFrom(stream);
		this.m_authTokenType.extractFrom(stream);
		this.m_serverVersion.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): Record<string, any> {
		return {
			__parent: super.toJSON(),
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {
				m_authToken: this.m_authToken,
				m_ngsVersion: this.m_ngsVersion,
				m_authTokenType: this.m_authTokenType,
				m_serverVersion: this.m_serverVersion
			}
		};
	}
}

AnyDataHolder.Classes['AuthenticationInfo'] = AuthenticationInfo;
