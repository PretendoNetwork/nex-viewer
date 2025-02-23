import type MatchmakeSessionSearchCriteria from '@/nex/protocols/match-making/types/matchmake-session-search-criteria';
import type AnyDataHolder from '@/nex/types/any-data-holder';
import type List from '@/nex/types/list';
import type RVString from '@/nex/types/string';

export type Request = {
	criteria: List<MatchmakeSessionSearchCriteria>;
	gathering: AnyDataHolder;
	message: RVString;
};

export type Response = {
	joinedMatchmakeSession: AnyDataHolder;
};
