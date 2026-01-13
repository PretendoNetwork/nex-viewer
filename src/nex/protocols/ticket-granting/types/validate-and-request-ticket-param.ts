import Structure from '@/nex/types/structure';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import AnyDataHolder from '@/nex/types/any-data-holder';
import Bool from '@/nex/types/bool';
import type NEXByteStream from '@/nex/byte-stream';
import UInt8 from '@/nex/types/uint8';

export default class ValidateAndRequestTicketParam extends Structure {
	public readonly typeName = 'ValidateAndRequestTicketParam';

	private platformType = new UInt32();
	private userName = new RVString();
	private extraData = new AnyDataHolder();
	private ignoreApiVersionCheck = new Bool();
	private apiVersionGeneral = new UInt32();
	private apiVersionCustom = new UInt32();
	private platformTypeForPlatformPid = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.platformType.extractFrom(stream);
		this.userName.extractFrom(stream);
		this.extraData.extractFrom(stream);
		this.ignoreApiVersionCheck.extractFrom(stream);
		this.apiVersionGeneral.extractFrom(stream);
		this.apiVersionCustom.extractFrom(stream);

		if (stream.title.settings.use_crossplay) {
			this.platformTypeForPlatformPid.extractFrom(stream);
		}
	}

	public new(): ValidateAndRequestTicketParam {
		return new ValidateAndRequestTicketParam();
	}

	public toJSON(): Record<string, any> {
		const json: Record<string, any> = {
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {
				platformType: this.platformType,
				userName: this.userName,
				extraData: this.extraData,
				ignoreApiVersionCheck: this.ignoreApiVersionCheck,
				apiVersionGeneral: this.apiVersionGeneral,
				apiVersionCustom: this.apiVersionCustom,
				platformTypeForPlatformPid: this.platformTypeForPlatformPid
			}
		};

		return json;
	}
}
