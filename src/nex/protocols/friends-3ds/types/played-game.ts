import Data from '@/nex/types/data';
import GameKey from '@/nex/protocols/friends-3ds/types/game-key';
import DateTime from '@/nex/types/datetime';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'PlayedGame';

export default class PlayedGame extends Data {
	public get typeName(): string {
		return className;
	}

	private gamekey = new GameKey();
	private unknown = new DateTime();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.gamekey.extractFrom(stream);
		this.unknown.extractFrom(stream);
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
				gamekey: this.gamekey,
				unknown: this.unknown
			}
		};
	}
}

AnyDataHolder.Classes[className] = PlayedGame;
