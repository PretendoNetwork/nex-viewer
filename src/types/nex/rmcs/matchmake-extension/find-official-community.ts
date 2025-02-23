import type Bool from '@/nex/types/bool';
import type ResultRange from '@/nex/types/result-range';
import type List from '@/nex/types/list';
import type PersistentGathering from '@/nex/protocols/match-making/types/persistent-gathering';

export type Request = {
	isAvailableOnly: Bool;
	resultRange: ResultRange;
};

export type Response = {
	lstCommunity: List<PersistentGathering>;
};
