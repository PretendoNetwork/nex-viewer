import type List from '@/nex/types/list';
import type UInt32 from '@/nex/types/uint32';
import type ActivePlayerSubscriptionData from '@/nex/protocols/subscription/types/active-player-subscription-data';

export type Request = {
	uiUnk1: UInt32;
	uiUnk2: UInt32;
	uiUnk3: UInt32;
};

export type Response = {
	subscriptionDatas: List<ActivePlayerSubscriptionData>;
};
