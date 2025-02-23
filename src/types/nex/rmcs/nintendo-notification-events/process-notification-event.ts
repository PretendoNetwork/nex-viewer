import type NintendoNotificationEvent from '@/nex/protocols/nintendo-notification-events/types/nintendo-notification-event';

export type Request = {
	oEvent: NintendoNotificationEvent;
};

export type Response = object; // * No response data
