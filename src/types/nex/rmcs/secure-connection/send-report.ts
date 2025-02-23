import type UInt32 from '@/nex/types/uint32';
import type QBuffer from '@/nex/types/qbuffer';

export type Request = {
	reportId: UInt32;
	reportData: QBuffer;
};

export type Response = object; // * No response data
