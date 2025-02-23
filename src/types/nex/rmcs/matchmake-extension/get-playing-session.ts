import type List from '@/nex/types/list';
import type PID from '@/nex/types/pid';
import type PlayingSession from '@/nex/protocols/match-making/types/playing-session';

export type Request = {
	lstPid: List<PID>;
};

export type Response = {
	lstPlayingSession: List<PlayingSession>;
};
