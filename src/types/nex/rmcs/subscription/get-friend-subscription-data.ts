import type List from '@/nex/types/list';
import type SubscriptionData from '@/nex/protocols/subscription/types/subscription-data';

export type Request = object; // * No request data

export type Response = {
	subscriptionData: List<SubscriptionData>;
};
