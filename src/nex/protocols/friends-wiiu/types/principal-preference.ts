import Data from '@/nex/types/data';
import Bool from '@/nex/types/bool';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'PrincipalPreference';

export default class PrincipalPreference extends Data {
	public get typeName(): string {
		return className;
	}

	private showOnlinePresence = new Bool();
	private showCurrentlyPlayingTitle = new Bool();
	private blockFriendRequests = new Bool();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.showOnlinePresence.extractFrom(stream);
		this.showCurrentlyPlayingTitle.extractFrom(stream);
		this.blockFriendRequests.extractFrom(stream);
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
				showOnlinePresence: this.showOnlinePresence,
				showCurrentlyPlayingTitle: this.showCurrentlyPlayingTitle,
				blockFriendRequests: this.blockFriendRequests
			}
		};
	}
}

AnyDataHolder.Classes[className] = PrincipalPreference;
