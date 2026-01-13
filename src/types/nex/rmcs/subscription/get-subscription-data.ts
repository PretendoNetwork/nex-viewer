import type List from '@/nex/types/list';
import type PID from '@/nex/types/pid';
import type SubscriptionData from '@/nex/protocols/subscription/types/subscription-data';

export type Request = {
	targetPids: List<PID>;
};

export type Response = {
	subscriptionData: List<SubscriptionData>;
};
