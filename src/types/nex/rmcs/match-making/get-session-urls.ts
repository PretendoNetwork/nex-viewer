import type UInt32 from '@/nex/types/uint32';
import type List from '@/nex/types/list';
import type StationURL from '@/nex/types/station-url';

export type Request = {
	gid: UInt32;
};

export type Response = {
	lstURLs: List<StationURL>;
};
