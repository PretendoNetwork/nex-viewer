import type NotificationEvent from '@/nex/protocols/notification-events/types/notification-event';

export type Request = {
	oEvent: NotificationEvent;
};

export type Response = object; // * No response data
