import Data from '@/nex/types/data';
import PrincipalBasicInfo from '@/nex/protocols/friends-wiiu/types/principal-basic-info';
import GameKey from '@/nex/protocols/friends-wiiu/types/game-key';
import DateTime from '@/nex/types/datetime';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'BlacklistedPrincipal';

export default class BlacklistedPrincipal extends Data {
	public get typeName(): string {
		return className;
	}

	private principalBasicInfo = new PrincipalBasicInfo();
	private gameKey = new GameKey();
	private blacklistedSince = new DateTime();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.principalBasicInfo.extractFrom(stream);
		this.gameKey.extractFrom(stream);
		this.blacklistedSince.extractFrom(stream);
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
				principalBasicInfo: this.principalBasicInfo,
				gameKey: this.gameKey,
				blacklistedSince: this.blacklistedSince
			}
		};
	}
}

AnyDataHolder.Classes[className] = BlacklistedPrincipal;
