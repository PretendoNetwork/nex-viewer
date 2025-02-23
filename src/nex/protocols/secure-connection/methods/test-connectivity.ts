import type * as RMCs from '@/types/nex/rmcs/secure-connection/test-connectivity';

// * No request data
export class Request {
	public static Name = 'TestConnectivity';

	constructor() {}

	public toJSON(): RMCs.Request {
		return {};
	}
}

// * No response data
export class Response {
	public static Name = 'TestConnectivity';

	constructor() {}

	public toJSON(): RMCs.Response {
		return {};
	}
}
