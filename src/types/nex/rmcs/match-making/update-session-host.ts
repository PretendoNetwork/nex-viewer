import type UInt32 from '@/nex/types/uint32';
import type Bool from '@/nex/types/bool';

export type Request = {
	gid: UInt32;
	isMigrateOwner: Bool;
};

export type Response = object; // * No response data
