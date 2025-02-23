import type RVString from '@/nex/types/string';
import type QResult from '@/nex/types/qresult';
import type PID from '@/nex/types/pid';
import type RVBuffer from '@/nex/types/buffer';

export type Request = {
	idSource: PID;
	idTarget: PID;
};

export type Response = {
	retval: QResult;
	bufResponse: RVBuffer;
	pSourceKey?: RVString; // * Only on the Switch
};
