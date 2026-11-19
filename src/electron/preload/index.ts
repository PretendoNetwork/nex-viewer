import { contextBridge, ipcRenderer, clipboard, webUtils } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import type { IpcRenderer } from 'electron';
import type { SerializedMessage } from '@/types/serialized-message';
import type { ConfigurableSettings } from '@/types/settings';

// * Custom APIs for renderer
const api = {
	ready: (): void => ipcRenderer.send('renderer-ready'),
	saveSettings: (newSettings: string): void => ipcRenderer.send('saveSettings', newSettings),
	onClearSections: (callback: () => void): IpcRenderer => ipcRenderer.on('clear-sections', _event => callback()),
	onSetDumpLoadingstate: (callback: (isLoading: boolean) => void): IpcRenderer => ipcRenderer.on('setDumpLoadingState', (_event, isLoading) => callback(isLoading)),
	onSerializedMessageList: (callback: (messages: SerializedMessage[]) => void): IpcRenderer => ipcRenderer.on('serializedMessageList', (_event, messages) => callback(JSON.parse(messages))),
	onSerializedMessage: (callback: (message: SerializedMessage) => void): IpcRenderer => ipcRenderer.on('serializedMessage', (_event, transaction) => callback(JSON.parse(transaction))),
	onSerializedMessageUpdated: (callback: (id: number, message: SerializedMessage) => void): IpcRenderer => ipcRenderer.on('serializedMessageUpdated', (_event, id, transaction) => callback(id, JSON.parse(transaction))),
	onOpenSettings: (callback: () => void): IpcRenderer => ipcRenderer.on('openSettings', _event => callback()),
	onSettings: (callback: (newSettings: ConfigurableSettings) => void): IpcRenderer => ipcRenderer.on('settings', (_event, settings) => callback(JSON.parse(settings))),
	copyToClipboard: (text: string): void => clipboard.writeText(text), // TODO - Should this go on the electron global instead?
	openSelectSession: (): void => ipcRenderer.send('openSelectSession'),
	openSession: (path: string): void => ipcRenderer.send('openSession', path),
	exportSession: (packets: SerializedMessage[]): void => ipcRenderer.send('exportSession', packets),
	saveBytes: (name: string, bytes: Uint8Array): void => ipcRenderer.send('saveBytes', name, bytes),
	getPathForFile: (file: File): string => webUtils.getPathForFile(file)
};

if (process.contextIsolated) {
	try {
		contextBridge.exposeInMainWorld('electron', electronAPI);
		contextBridge.exposeInMainWorld('api', api);
	} catch (error) {
		console.error(error);
	}
} else {
	// @ts-expect-error - Defined in dts
	window.electron = electronAPI;
	// @ts-expect-error - Defined in dts
	window.api = api;
}
