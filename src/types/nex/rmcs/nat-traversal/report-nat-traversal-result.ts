import type UInt32 from '@/nex/types/uint32';
import type Bool from '@/nex/types/bool';

export type Request = {
	cid: UInt32;
	result: Bool;
	rtt?: UInt32; // * Not seen on the 3DS. NEX version difference?
};

export type Response = object; // * No response data
