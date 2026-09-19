import type { ElectronAPI } from '@electron-toolkit/preload';
import type { SerializedMessage } from '@/types/serialized-message';
import type { ConfigurableSettings } from '@/types/settings';

declare global {
	interface Window {
		electron: ElectronAPI;
		api: {
			ready: () => void;
			saveSettings: (newSettings: string) => void;
			onClearSections: (callback: () => void) => void;
			onSetDumpLoadingstate: (callback: (isLoading: boolean) => void) => void;
			onSerializedMessageList: (callback: (serializedMessages: SerializedMessage[]) => void) => void;
			onSerializedMessage: (callback: (serializedMessage: SerializedMessage) => void) => void;
			onSerializedMessageUpdated: (callback: (id: number, serializedMessage: SerializedMessage) => void) => void;
			onOpenSettings: (callback: () => void) => void;
			onSettings: (callback: (newSettings: ConfigurableSettings) => void) => void;
			copyToClipboard: (text: string) => void; // TODO - Should this go on the electron global instead?
			openSelectSession: () => void;
			openSession: (path: string) => void;
			exportSession: (packets: SerializedMessage[]) => void;
			saveBytes: (name: string, bytes: Uint8Array) => void;
			getPathForFile: (file: File) => string;
		};
	}
}
