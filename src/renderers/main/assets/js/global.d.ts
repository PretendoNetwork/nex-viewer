import type SerializedPacket from '@/types/nex/serialized-packet';
import type Connection from '@/nex/connection';

declare global {
	interface Window {
		electron: {
			ready: () => void;
			onClearSections: (callback: () => void) => void;
			onPacket: (callback: (packet: SerializedPacket) => void) => void;
			onConnections: (callback: (connections: Connection[]) => void) => void;
		};
	}
}
