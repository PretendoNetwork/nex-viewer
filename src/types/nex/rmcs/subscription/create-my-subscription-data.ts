import type Bool from '@/nex/types/bool';
import type SubscriptionData from '@/nex/protocols/subscription/types/subscription-data';
import type UInt32 from '@/nex/types/uint32';

export type Request = {
	unk: UInt32;
	param: SubscriptionData;
	bUnk: Bool;
};

export type Response = object; // * No response data
