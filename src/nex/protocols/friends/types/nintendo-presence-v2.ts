import Structure from '@/nex/types/structure';
import type NEXByteStream from '@/nex/byte-stream';
import AnyDataHolder from '@/nex/types/any-data-holder';
import UInt32 from '@/nex/types/uint32';
import Bool from '@/nex/types/bool';
import UInt8 from '@/nex/types/uint8';
import RVString from '@/nex/types/string';
import RVBuffer from '@/nex/types/buffer';
import PID from '@/nex/types/pid';
import GameKey from './game-key';

export default class NintendoPresenceV2 extends Structure {
	public readonly typeName = 'NintendoPresenceV2';

	private m_changedFlags = new UInt32();
	private m_isOnline = new Bool();
	private m_gameKey = new GameKey();
	private m_unk1 = new UInt8();
	private m_message = new RVString();
	private m_unk2 = new UInt32();
	private m_unk3 = new UInt8();
	private m_gameServerId = new UInt32();
	private m_unk4 = new UInt32();
	private m_pid = new PID();
	private m_gatheringId = new UInt32();
	private m_applicationData = new RVBuffer();
	private m_unk5 = new UInt8();
	private m_unk6 = new UInt8();
	private m_unk7 = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.m_changedFlags.extractFrom(stream);
		this.m_isOnline.extractFrom(stream);
		this.m_gameKey.extractFrom(stream);
		this.m_unk1.extractFrom(stream);
		this.m_message.extractFrom(stream);
		this.m_unk2.extractFrom(stream);
		this.m_unk3.extractFrom(stream);
		this.m_gameServerId.extractFrom(stream);
		this.m_unk4.extractFrom(stream);
		this.m_pid.extractFrom(stream);
		this.m_gatheringId.extractFrom(stream);
		this.m_applicationData.extractFrom(stream);
		this.m_unk5.extractFrom(stream);
		this.m_unk6.extractFrom(stream);
		this.m_unk7.extractFrom(stream);
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
				m_changedFlags: this.m_changedFlags,
				m_isOnline: this.m_isOnline,
				m_gameKey: this.m_gameKey,
				m_unk1: this.m_unk1,
				m_message: this.m_message,
				m_unk2: this.m_unk2,
				m_unk3: this.m_unk3,
				m_gameServerId: this.m_gameServerId,
				m_unk4: this.m_unk4,
				m_pid: this.m_pid,
				m_gatheringId: this.m_gatheringId,
				m_applicationData: this.m_applicationData,
				m_unk5: this.m_unk5,
				m_unk6: this.m_unk6,
				m_unk7: this.m_unk7
			}
		};

		return json;
	}
}

AnyDataHolder.Classes['NintendoPresenceV2'] = NintendoPresenceV2;