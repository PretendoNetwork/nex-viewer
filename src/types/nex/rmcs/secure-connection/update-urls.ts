import type List from '@/nex/types/list';
import type StationURL from '@/nex/types/station-url';

export type Request = {
	vecMyURLs: List<StationURL>;
};

export type Response = object; // * No response data
