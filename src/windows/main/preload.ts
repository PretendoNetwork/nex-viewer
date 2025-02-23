import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
	ready: () => ipcRenderer.send('renderer-ready'),
	onClearSections: (callback: () => void) => ipcRenderer.on('clear-sections', _event => callback()),
	onPacket: (callback: (packet: any) => void) => ipcRenderer.on('packet', (_event, packet) => callback(JSON.parse(packet))),
	onConnections: (callback: (connections: any) => void) => ipcRenderer.on('connections', (_event, connections) => callback(JSON.parse(connections)))
});
