import type Bool from '@/nex/types/bool';
import type RVString from '@/nex/types/string';
import type SubscriptionData from '@/nex/protocols/subscription/types/subscription-data';
import type UInt32 from '@/nex/types/uint32';

export type Request = {
	unk1: UInt32;
	param: SubscriptionData;
	bUnk: Bool;
	unk2: UInt32;
	unk3: UInt32;
	strParam: RVString;
};

export type Response = object; // * No response data
