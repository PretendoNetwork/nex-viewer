import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import List from '@/nex/types/list';
import RVBuffer from '@/nex/types/buffer';
import DateTime from '@/nex/types/datetime';
import AnyDataHolder from '@/nex/types/any-data-holder';
import Gathering from '@/nex/protocols/match-making/types/gathering';
import type NEXByteStream from '@/nex/byte-stream';

export default class PersistentGathering extends Gathering {
	public get typeName(): string {
		return 'PersistentGathering';
	}

	private m_CommunityType = new UInt32();
	private m_Password = new RVString();
	private m_Attribs = new List(new UInt32());
	private m_ApplicationBuffer = new RVBuffer();
	private m_ParticipationStartDate = new DateTime();
	private m_ParticipationEndDate = new DateTime();
	private m_MatchmakeSessionCount = new UInt32();
	private m_ParticipationCount = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.m_CommunityType.extractFrom(stream);
		this.m_Password.extractFrom(stream);
		this.m_Attribs.extractFrom(stream);
		this.m_ApplicationBuffer.extractFrom(stream);
		this.m_ParticipationStartDate.extractFrom(stream);
		this.m_ParticipationEndDate.extractFrom(stream);
		this.m_MatchmakeSessionCount.extractFrom(stream);
		this.m_ParticipationCount.extractFrom(stream);
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
				m_CommunityType: this.m_CommunityType,
				m_Password: this.m_Password,
				m_Attribs: this.m_Attribs,
				m_ApplicationBuffer: this.m_ApplicationBuffer,
				m_ParticipationStartDate: this.m_ParticipationStartDate,
				m_ParticipationEndDate: this.m_ParticipationEndDate,
				m_MatchmakeSessionCount: this.m_MatchmakeSessionCount,
				m_ParticipationCount: this.m_ParticipationCount
			}
		};
	}
}

AnyDataHolder.Classes['PersistentGathering'] = PersistentGathering;
