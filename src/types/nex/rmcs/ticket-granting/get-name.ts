import type RVString from '@/nex/types/string';
import type PID from '@/nex/types/pid';

export type Request = {
	id: PID;
};

export type Response = {
	retval: RVString;
};
