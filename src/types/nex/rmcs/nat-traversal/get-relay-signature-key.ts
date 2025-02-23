import type Int32 from '@/nex/types/int32';
import type DateTime from '@/nex/types/datetime';
import type RVString from '@/nex/types/string';
import type UInt16 from '@/nex/types/uint16';
import type UInt32 from '@/nex/types/uint32';

export type Request = object; // * No request data

export type Response = {
	relayMode: Int32;
	currentUTCTime: DateTime;
	address: RVString;
	port: UInt16;
	relayAddressType: Int32;
	gameServerID: UInt32;
};
