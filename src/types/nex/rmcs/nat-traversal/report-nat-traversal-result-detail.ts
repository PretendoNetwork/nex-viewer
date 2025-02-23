import type UInt32 from '@/nex/types/uint32';
import type Bool from '@/nex/types/bool';
import type Int32 from '@/nex/types/int32';

export type Request = {
	cid: UInt32;
	result: Bool;
	detail: Int32;
	rtt: UInt32; // * ReportNATTraversalResult does not send this on the 3DS, is that true here too?
};

export type Response = object; // * No response data
