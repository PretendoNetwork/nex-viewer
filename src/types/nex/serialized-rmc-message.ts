type SerializedRMCMessage = {
	type: 0 | 1;
	protocol_id: number;
	protocol_name: string;
	method_id: number;
	method_name: string;
	call_id: number;
	parameters?: any;
	error?: {
		code: number;
		name: string;
	};
};

export default SerializedRMCMessage;
