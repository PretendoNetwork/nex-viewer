import type ValidateAndRequestTicketParam from '@/nex/protocols/ticket-granting/types/validate-and-request-ticket-param';
import type ValidateAndRequestTicketResult from '@/nex/protocols/ticket-granting/types/validate-and-request-ticket-result';

export type Request = {
	param: ValidateAndRequestTicketParam;
};

export type Response = {
	result: ValidateAndRequestTicketResult;
};
