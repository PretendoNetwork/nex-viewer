import type RVString from '@/nex/types/string';
import type PID from '@/nex/types/pid';

export type Request = {
	strUserName: RVString;
};

export type Response = {
	retval: PID;
};
