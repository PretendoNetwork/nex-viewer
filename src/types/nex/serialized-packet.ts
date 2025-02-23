import type SerializedRMCMessage from '@/types/nex/serialized-rmc-message';

export type SerializedPRUDPPacket = {
	time?: number;
	version: number;
	source_address: string;
	source_port: number;
	destination_address: string;
	destination_port: number;
	source_stream_id: number;
	source_stream_type: string;
	destination_stream_id: number;
	destination_stream_type: string;
	type: string;
	flags: string[];
	session_id: number;
	signature: number[];
	sequence_id: number;
	connection_signature?: number[];
	fragment_id?: number;
	payload?: number[];
	decrypted_payload?: number[];
	defragmented_payload?: number[];
	message?: SerializedRMCMessage;
	stack_trace?: string;
};

export type SerializedPRUDPV0Packet = SerializedPRUDPPacket & {
	version: 0;
	checksum: number;
};

export type SerializedPRUDPV1Packet = SerializedPRUDPPacket & {
	version: 1;
	substream_id: number;
	supported_functions?: number[];
	initial_unreliable_sequence_id?: number;
	maximum_substream_id?: number;
};

export type SerializedPRUDPLitePacket = SerializedPRUDPPacket & {
	version: 2;
	substream_id: number;
	supported_functions?: number[];
	lite_signature?: number[];
};

type SerializedPacket = SerializedPRUDPPacket | SerializedPRUDPV0Packet | SerializedPRUDPV1Packet | SerializedPRUDPLitePacket;

export default SerializedPacket;
