import type UInt32 from '@/nex/types/uint32';
import type Bool from '@/nex/types/bool';
import type List from '@/nex/types/list';
import type StationURL from '@/nex/types/station-url';

export type Request = {
	cidTarget: UInt32;
	pidTarget: UInt32;
};

export type Response = {
	retval: Bool;
	plstURLs: List<StationURL>;
};
