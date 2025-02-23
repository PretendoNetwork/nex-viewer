import type UInt32 from '@/nex/types/uint32';
import type RVString from '@/nex/types/string';
import type Bool from '@/nex/types/bool';

export type Request = {
	idGathering: UInt32;
	strMessage: RVString;
};

export type Response = {
	retval: Bool;
};
