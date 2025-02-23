import type UInt32 from '@/nex/types/uint32';

export type Request = {
	natmapping: UInt32;
	natfiltering: UInt32;
	rtt: UInt32;
};

export type Response = object; // * No response data
