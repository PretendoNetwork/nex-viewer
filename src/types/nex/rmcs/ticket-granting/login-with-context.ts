import type AnyDataHolder from '@/nex/types/any-data-holder';
import type QResult from '@/nex/types/qresult';
import type PID from '@/nex/types/pid';
import type RVBuffer from '@/nex/types/buffer';
import type RVConnectionData from '@/nex/types/rv-connection-data';

export type Request = {
	loginData: AnyDataHolder;
};

export type Response = {
	retval: QResult;
	pidPrincipal: PID;
	pbufResponse: RVBuffer;
	pConnectionData: RVConnectionData;
};
