import type List from '@/nex/types/list';
import type PID from '@/nex/types/pid';
import type Bool from '@/nex/types/bool';
import type SimplePlayingSession from '@/nex/protocols/match-making/types/simple-playing-session';

export type Request = {
	lstPrincipalId: List<PID>;
	includeLoginUser: Bool;
};

export type Response = {
	lstSimplePlayingSession: List<SimplePlayingSession>;
};
