import { ready, removeAllChildNodes } from '@/renderers/main/assets/js/util';
import {
	packetsListSection,
	connectionsListSection,
	packetDetailsSection,
	addPacketToList,
	addConnectionToList
} from '@/renderers/main/assets/js/main';

ready(() => {
	window.electron.ready();
});

window.electron.onClearSections(() => {
	removeAllChildNodes(packetsListSection);
	removeAllChildNodes(connectionsListSection);
	removeAllChildNodes(packetDetailsSection);
});

window.electron.onPacket(addPacketToList);

window.electron.onConnections((connections) => {
	for (const connection of connections) {
		addConnectionToList(connection);
	}
});
