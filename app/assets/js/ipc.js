const { ipcRenderer } = require('electron');
import { ready } from './util.js';
import { addPacketToList } from './renderer.js';

ipcRenderer.on('packet', (event, packet) => {
	addPacketToList(JSON.parse(packet));
});

ready(() => {
	ipcRenderer.send('renderer-ready');
});