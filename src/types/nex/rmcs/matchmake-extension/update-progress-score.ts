import type UInt32 from '@/nex/types/uint32';
import type UInt8 from '@/nex/types/uint8';

export type Request = {
	gid: UInt32;
	progressScore: UInt8;
};

export type Response = object; // * No response data
