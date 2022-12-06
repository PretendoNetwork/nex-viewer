const { ipcRenderer } = require('electron');
import { ready, removeAllChildNodes } from './util.js';
import { addPacketToList, packetsTableBodySection } from './renderer.js';

ipcRenderer.on('clear-packet-list', () => {
	removeAllChildNodes(packetsTableBodySection);
});

ipcRenderer.on('packet', (event, packet) => {
	addPacketToList(JSON.parse(packet));
});

ready(() => {
	ipcRenderer.send('renderer-ready');
});