/* eslint-env browser */
const { ipcRenderer } = require('electron');

ipcRenderer.on('packet', (event, packet) => {
	addPacketToList(JSON.parse(packet));
});

ready(() => {
	ipcRenderer.send('renderer-ready');
});