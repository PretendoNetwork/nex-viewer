import type RVString from '@/nex/types/string';
import type UInt32 from '@/nex/types/uint32';

export type Request = {
	unk1: UInt32;
	unk2: UInt32;
	strParam: RVString;
};

export type Response = object; // * No response data
