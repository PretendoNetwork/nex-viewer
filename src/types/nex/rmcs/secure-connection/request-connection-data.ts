import type UInt32 from '@/nex/types/uint32';
import type Bool from '@/nex/types/bool';
import type List from '@/nex/types/list';
import type ConnectionData from '@/nex/protocols/secure-connection/types/connection-data';

export type Request = {
	cidTarget: UInt32;
	pidTarget: UInt32;
};

export type Response = {
	retval: Bool;
	pvecConnectionsData: List<ConnectionData>;
};
