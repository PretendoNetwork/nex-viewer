import type List from '@/nex/types/list';
import type StationURL from '@/nex/types/station-url';

export type Request = {
	urlTargetList: List<StationURL>;
	urlStationToProbe: StationURL;
};

export type Response = object; // * No response data
