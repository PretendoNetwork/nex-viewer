import Data from '@/nex/types/data';
import UInt32 from '@/nex/types/uint32';
import GameKey from '@/nex/protocols/friends-3ds/types/game-key';
import RVString from '@/nex/types/string';
import UInt8 from '@/nex/types/uint8';
import PID from '@/nex/types/pid';
import RVBuffer from '@/nex/types/buffer';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'NintendoPresence';

export default class NintendoPresence extends Data {
	public get typeName(): string {
		return className;
	}

	private m_changedBitFlag = new UInt32();
	private m_gameKey = new GameKey();
	private m_gameModeDescription = new RVString();
	private m_joinAvailabilityFlag = new UInt32();
	private m_matchmakeSystemType = new UInt8();
	private m_joinGameID = new UInt32();
	private m_joinGameMode = new UInt32();
	private m_ownerPrincipalID = new PID();
	private m_joinGroupID = new UInt32();
	private m_applicationArg = new RVBuffer();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.m_changedBitFlag.extractFrom(stream);
		this.m_gameKey.extractFrom(stream);
		this.m_gameModeDescription.extractFrom(stream);
		this.m_joinAvailabilityFlag.extractFrom(stream);
		this.m_matchmakeSystemType.extractFrom(stream);
		this.m_joinGameID.extractFrom(stream);
		this.m_joinGameMode.extractFrom(stream);
		this.m_ownerPrincipalID.extractFrom(stream);
		this.m_joinGroupID.extractFrom(stream);
		this.m_applicationArg.extractFrom(stream);
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
				m_changedBitFlag: this.m_changedBitFlag,
				m_gameKey: this.m_gameKey,
				m_gameModeDescription: this.m_gameModeDescription,
				m_joinAvailabilityFlag: this.m_joinAvailabilityFlag,
				m_matchmakeSystemType: this.m_matchmakeSystemType,
				m_joinGameID: this.m_joinGameID,
				m_joinGameMode: this.m_joinGameMode,
				m_ownerPrincipalID: this.m_ownerPrincipalID,
				m_joinGroupID: this.m_joinGroupID,
				m_applicationArg: this.m_applicationArg
			}
		};
	}
}

AnyDataHolder.Classes[className] = NintendoPresence;
