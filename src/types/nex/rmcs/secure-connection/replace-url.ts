import type StationURL from '@/nex/types/station-url';

export type Request = {
	target: StationURL;
	url: StationURL;
};

export type Response = object; // * No response data
