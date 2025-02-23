import * as semver from 'compare-versions';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import Bool from '@/nex/types/bool';
import RVBuffer from '@/nex/types/buffer';
import UInt8 from '@/nex/types/uint8';
import DateTime from '@/nex/types/datetime';
import RVString from '@/nex/types/string';
import AnyDataHolder from '@/nex/types/any-data-holder';
import Gathering from '@/nex/protocols/match-making/types/gathering';
import MatchmakeParam from '@/nex/protocols/match-making/types/matchmake-param';
import type NEXByteStream from '@/nex/byte-stream';

export default class MatchmakeSession extends Gathering {
	public get typeName(): string {
		return 'MatchmakeSession';
	}

	private m_GameMode = new UInt32();
	private m_Attribs = new List(new UInt32());
	private m_OpenParticipation = new Bool();
	private m_MatchmakeSystemType = new UInt32();
	private m_ApplicationBuffer = new RVBuffer();
	private m_ParticipationCount = new UInt32();
	private m_ProgressScore: UInt8; // * NEX 3.4
	private m_SessionKey: RVBuffer; // * NEX 3.0
	private m_Option0: UInt32; // * NEX 3.5
	private m_MatchmakeParam: MatchmakeParam; // * NEX 3.6 & revision 1
	private m_StartedTime: DateTime; // * NEX 3.6 & revision 1
	private m_UserPassword: RVString; // * NEX 3.7 & revision 2
	private m_ReferGid: UInt32; // * NEX 3.8 & revision 3
	private m_UserPasswordEnabled: Bool; // * NEX 3.8 & revision 3
	private m_SystemPasswordEnabled: Bool; // * NEX 3.8 & revision 3
	private m_Codeword: RVString; // * NEX 4.0

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.m_GameMode.extractFrom(stream);
		this.m_Attribs.extractFrom(stream);
		this.m_OpenParticipation.extractFrom(stream);
		this.m_MatchmakeSystemType.extractFrom(stream);
		this.m_ApplicationBuffer.extractFrom(stream);
		this.m_ParticipationCount.extractFrom(stream);

		if (semver.satisfies(stream.title.libraryVersions.match_making, '>=3.4.0')) {
			this.m_ProgressScore = new UInt8();
			this.m_ProgressScore.extractFrom(stream);
		}

		if (semver.satisfies(stream.title.libraryVersions.match_making, '>=3.0.0')) {
			this.m_SessionKey = new RVBuffer();
			this.m_SessionKey.extractFrom(stream);
		}

		if (semver.satisfies(stream.title.libraryVersions.match_making, '>=3.5.0')) {
			this.m_Option0 = new UInt32();
			this.m_Option0.extractFrom(stream);
		}

		if (semver.satisfies(stream.title.libraryVersions.match_making, '>=3.6.0')) {
			this.m_MatchmakeParam = new MatchmakeParam();
			this.m_StartedTime = new DateTime();

			this.m_MatchmakeParam.extractFrom(stream);
			this.m_StartedTime.extractFrom(stream);
		}

		if (semver.satisfies(stream.title.libraryVersions.match_making, '>=3.7.0')) {
			this.m_UserPassword = new RVString();
			this.m_UserPassword.extractFrom(stream);
		}

		if (semver.satisfies(stream.title.libraryVersions.match_making, '>=3.8.0')) {
			this.m_ReferGid = new UInt32();
			this.m_UserPasswordEnabled = new Bool();
			this.m_SystemPasswordEnabled = new Bool();

			this.m_ReferGid.extractFrom(stream);
			this.m_UserPasswordEnabled.extractFrom(stream);
			this.m_SystemPasswordEnabled.extractFrom(stream);
		}

		if (semver.satisfies(stream.title.libraryVersions.match_making, '>=4.0.0')) {
			this.m_Codeword = new RVString();
			this.m_Codeword.extractFrom(stream);
		}
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): Record<string, any> {
		const json: Record<string, any> = {
			__parent: super.toJSON(),
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {
				m_GameMode: this.m_GameMode,
				m_Attribs: this.m_Attribs,
				m_OpenParticipation: this.m_OpenParticipation,
				m_MatchmakeSystemType: this.m_MatchmakeSystemType,
				m_ApplicationBuffer: this.m_ApplicationBuffer,
				m_ParticipationCount: this.m_ParticipationCount
			}
		};

		if (this.m_ProgressScore !== undefined) {
			json.__fields.m_ProgressScore = this.m_ProgressScore;
		}

		if (this.m_SessionKey !== undefined) {
			json.__fields.m_SessionKey = this.m_SessionKey;
		}

		if (this.m_Option0 !== undefined) {
			json.__fields.m_Option0 = this.m_Option0;
		}

		if (this.m_MatchmakeParam !== undefined) {
			json.__fields.m_MatchmakeParam = this.m_MatchmakeParam;
		}

		if (this.m_StartedTime !== undefined) {
			json.__fields.m_StartedTime = this.m_StartedTime;
		}

		if (this.m_UserPassword !== undefined) {
			json.__fields.m_UserPassword = this.m_UserPassword;
		}

		if (this.m_ReferGid !== undefined) {
			json.__fields.m_ReferGid = this.m_ReferGid;
		}

		if (this.m_UserPasswordEnabled !== undefined) {
			json.__fields.m_UserPasswordEnabled = this.m_UserPasswordEnabled;
		}

		if (this.m_SystemPasswordEnabled !== undefined) {
			json.__fields.m_SystemPasswordEnabled = this.m_SystemPasswordEnabled;
		}

		if (this.m_Codeword !== undefined) {
			json.__fields.m_Codeword = this.m_Codeword;
		}

		return json;
	}
}

AnyDataHolder.Classes['MatchmakeSession'] = MatchmakeSession;
