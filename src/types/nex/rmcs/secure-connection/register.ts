import type List from '@/nex/types/list';
import type StationURL from '@/nex/types/station-url';
import type QResult from '@/nex/types/qresult';
import type UInt32 from '@/nex/types/uint32';

export type Request = {
	vecMyURLs: List<StationURL>;
};

export type Response = {
	retval: QResult;
	pidConnectionID: UInt32;
	urlPublic: StationURL;
};
