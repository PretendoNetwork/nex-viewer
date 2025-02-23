import type RVString from '@/nex/types/string';
import type QResult from '@/nex/types/qresult';
import type PID from '@/nex/types/pid';
import type RVBuffer from '@/nex/types/buffer';
import type RVConnectionData from '@/nex/types/rv-connection-data';

export type Request = {
	strUserName: RVString;
};

export type Response = {
	retval: QResult;
	pidPrincipal: PID;
	pbufResponse: RVBuffer;
	pConnectionData: RVConnectionData;
	strReturnMsg: RVString;
};
