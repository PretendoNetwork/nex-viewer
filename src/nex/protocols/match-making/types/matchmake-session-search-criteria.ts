import * as semver from 'compare-versions';
import Structure from '@/nex/types/structure';
import List from '@/nex/types/list';
import RVString from '@/nex/types/string';
import Bool from '@/nex/types/bool';
import UInt32 from '@/nex/types/uint32';
import UInt16 from '@/nex/types/uint16';
import ResultRange from '@/nex/types/result-range';
import MatchmakeParam from '@/nex/protocols/match-making/types/matchmake-param';
import type NEXByteStream from '@/nex/byte-stream';

export default class MatchmakeSessionSearchCriteria extends Structure {
	public readonly typeName = 'MatchmakeSessionSearchCriteria';

	private m_Attribs = new List(new RVString());
	private m_GameMode = new RVString();
	private m_MinParticipants: RVString; // * NEX 2.0
	private m_MaxParticipants: RVString; // * NEX 2.0
	private m_MatchmakeSystemType = new RVString();
	private m_VacantOnly = new Bool();
	private m_ExcludeLocked = new Bool();
	private m_ExcludeNonHostPid = new Bool();
	private m_SelectionMethod: UInt32; // * NEX 3.0
	private m_VacantParticipants: UInt16; // * NEX 3.4
	private m_MatchmakeParam: MatchmakeParam; // * NEX 3.6 & revision 1
	private m_ExcludeUserPasswordSet: Bool; // * NEX 3.7 & revision 2
	private m_ExcludeSystemPasswordSet: Bool; // * NEX 3.7 & revision 2
	private m_ReferGid: UInt32; // * NEX 3.8 & revision 3
	private m_Codeword: RVString; // * NEX 4.0
	private m_ResultRange: ResultRange; // * NEX 4.0

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.m_Attribs.extractFrom(stream);
		this.m_GameMode.extractFrom(stream);

		if (semver.satisfies(stream.title.libraryVersions.match_making, '>=2.0.0')) {
			this.m_MinParticipants = new RVString();
			this.m_MaxParticipants = new RVString();

			this.m_MinParticipants.extractFrom(stream);
			this.m_MaxParticipants.extractFrom(stream);
		}

		this.m_MatchmakeSystemType.extractFrom(stream);
		this.m_VacantOnly.extractFrom(stream);
		this.m_ExcludeLocked.extractFrom(stream);
		this.m_ExcludeNonHostPid.extractFrom(stream);

		if (semver.satisfies(stream.title.libraryVersions.match_making, '>=3.0.0')) {
			this.m_SelectionMethod = new UInt32();
			this.m_SelectionMethod.extractFrom(stream);
		}

		if (semver.satisfies(stream.title.libraryVersions.match_making, '>=3.4.0')) {
			this.m_VacantParticipants = new UInt16();
			this.m_VacantParticipants.extractFrom(stream);
		}

		if (semver.satisfies(stream.title.libraryVersions.match_making, '>=3.6.0')) {
			this.m_MatchmakeParam = new MatchmakeParam();
			this.m_MatchmakeParam.extractFrom(stream);
		}

		if (semver.satisfies(stream.title.libraryVersions.match_making, '>=3.7.0')) {
			this.m_ExcludeUserPasswordSet = new Bool();
			this.m_ExcludeSystemPasswordSet = new Bool();

			this.m_ExcludeUserPasswordSet.extractFrom(stream);
			this.m_ExcludeSystemPasswordSet.extractFrom(stream);
		}

		if (semver.satisfies(stream.title.libraryVersions.match_making, '>=3.8.0')) {
			this.m_ReferGid = new UInt32();
			this.m_ReferGid.extractFrom(stream);
		}

		if (semver.satisfies(stream.title.libraryVersions.match_making, '>=4.0.0')) {
			this.m_Codeword = new RVString();
			this.m_ResultRange = new ResultRange();

			this.m_Codeword.extractFrom(stream);
			this.m_ResultRange.extractFrom(stream);
		}
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
				m_Attribs: this.m_Attribs,
				m_GameMode: this.m_GameMode
			}
		};

		if (this.m_MinParticipants !== undefined) {
			json.__fields.m_MinParticipants = this.m_MinParticipants;
		}

		if (this.m_MaxParticipants !== undefined) {
			json.__fields.m_MaxParticipants = this.m_MaxParticipants;
		}

		json.__fields.m_MatchmakeSystemType = this.m_MatchmakeSystemType;
		json.__fields.m_VacantOnly = this.m_VacantOnly;
		json.__fields.m_ExcludeLocked = this.m_ExcludeLocked;
		json.__fields.m_ExcludeNonHostPid = this.m_ExcludeNonHostPid;

		if (this.m_SelectionMethod !== undefined) {
			json.__fields.m_SelectionMethod = this.m_SelectionMethod;
		}

		if (this.m_VacantParticipants !== undefined) {
			json.__fields.m_VacantParticipants = this.m_VacantParticipants;
		}

		if (this.m_MatchmakeParam !== undefined) {
			json.__fields.m_MatchmakeParam = this.m_MatchmakeParam;
		}

		if (this.m_ExcludeUserPasswordSet !== undefined) {
			json.__fields.m_ExcludeUserPasswordSet = this.m_ExcludeUserPasswordSet;
		}

		if (this.m_ExcludeSystemPasswordSet !== undefined) {
			json.__fields.m_ExcludeSystemPasswordSet = this.m_ExcludeSystemPasswordSet;
		}

		if (this.m_ReferGid !== undefined) {
			json.__fields.m_ReferGid = this.m_ReferGid;
		}

		if (this.m_Codeword !== undefined) {
			json.__fields.m_Codeword = this.m_Codeword;
		}

		if (this.m_ResultRange !== undefined) {
			json.__fields.m_ResultRange = this.m_ResultRange;
		}

		return json;
	}
}
