import Structure from '@/nex/types/structure';
import UInt32 from '@/nex/types/uint32';
import PID from '@/nex/types/pid';
import UInt16 from '@/nex/types/uint16';
import RVString from '@/nex/types/string';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type NEXByteStream from '@/nex/byte-stream';

export default class Gathering extends Structure {
	public get typeName(): string {
		return 'Gathering';
	}

	private m_idMyself = new UInt32();
	private m_pidOwner = new PID();
	private m_pidHost = new PID();
	private m_uiMinParticipants = new UInt16();
	private m_uiMaxParticipants = new UInt16();
	private m_uiParticipationPolicy = new UInt32();
	private m_uiPolicyArgument = new UInt32();
	private m_uiFlags = new UInt32();
	private m_uiState = new UInt32();
	private m_strDescription = new RVString();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.m_idMyself.extractFrom(stream);
		this.m_pidOwner.extractFrom(stream);
		this.m_pidHost.extractFrom(stream);
		this.m_uiMinParticipants.extractFrom(stream);
		this.m_uiMaxParticipants.extractFrom(stream);
		this.m_uiParticipationPolicy.extractFrom(stream);
		this.m_uiPolicyArgument.extractFrom(stream);
		this.m_uiFlags.extractFrom(stream);
		this.m_uiState.extractFrom(stream);
		this.m_strDescription.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): Record<string, any> {
		return {
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {
				m_idMyself: this.m_idMyself,
				m_pidOwner: this.m_pidOwner,
				m_pidHost: this.m_pidHost,
				m_uiMinParticipants: this.m_uiMinParticipants,
				m_uiMaxParticipants: this.m_uiMaxParticipants,
				m_uiParticipationPolicy: this.m_uiParticipationPolicy,
				m_uiPolicyArgument: this.m_uiPolicyArgument,
				m_uiFlags: this.m_uiFlags,
				m_uiState: this.m_uiState,
				m_strDescription: this.m_strDescription
			}
		};
	}
}

AnyDataHolder.Classes['Gathering'] = Gathering;
