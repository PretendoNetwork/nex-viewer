const { ipcRenderer } = require('electron');
import { ready, removeAllChildNodes } from './util.js';
import {
	populateConnectionsList,
	addPacketToList,
	connectionsListSection,
	packetDetailsSection,
	packetsTableBodySection,
	hidePingPackets,
	showPingPackets
} from './renderer.js';

ipcRenderer.on('clear-sections', () => {
	removeAllChildNodes(packetsTableBodySection);
	removeAllChildNodes(packetDetailsSection);
	removeAllChildNodes(connectionsListSection);
});

ipcRenderer.on('packet', (event, packet) => {
	addPacketToList(JSON.parse(packet));
});

ipcRenderer.on('connections', (event, connections) => {
	populateConnectionsList(JSON.parse(connections));
});

ipcRenderer.on('hide-ping-packets', hidePingPackets);

ipcRenderer.on('show-ping-packets', showPingPackets);

ready(() => {
	ipcRenderer.send('renderer-ready');
});