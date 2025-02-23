export type Packet = {
	timestamp: {
		seconds: number;
		microseconds: number;
	};
	storedLength: number;
	realLength: number;
	data: Buffer;
};
