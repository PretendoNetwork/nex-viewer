import type AutoMatchmakeParam from '@/nex/protocols/match-making/types/auto-matchmake-param';
import type MatchmakeSession from '@/nex/protocols/match-making/types/matchmake-session';

export type Request = {
	autoMatchmakeParam: AutoMatchmakeParam;
};

export type Response = {
	joinedMatchmakeSession: MatchmakeSession;
};
