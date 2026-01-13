import { createElement } from '@pretendonetwork/yeah';
import RMCMessage from '@/nex/rmc-message';
import type SerializedPacket from '@/types/nex/serialized-packet';
import type SerializedConnection from '@/types/nex/serialized-connection';
import { removeAllChildNodes } from '@/renderers/main/assets/js/util';

export const packetsListSection = document.querySelector('#packet-list tbody')!;
export const connectionsListSection = document.querySelector('#connections')!;
export const packetDetailsSection = document.getElementById('packet-details')!;

let selectedPacket: HTMLElement;

document.querySelector('#header-search')!.addEventListener('keyup', event => {
	if (!event.target || !(event.target instanceof HTMLInputElement)) {
		return;
	}

	const filter = event.target.value;

	const packets = packetsListSection.querySelectorAll<HTMLTableRowElement>('tr[data-serialized]');

	for (const packet of packets) {
		if (packet.dataset.serialized?.toLowerCase().includes(filter.toLowerCase())) {
			packet.classList.remove('search-hidden');
		} else {
			packet.classList.add('search-hidden');
		}
	}

	if (filter.trim() === '') {
		if (selectedPacket) {
			selectedPacket.scrollIntoView({
				block: 'nearest',
				inline: 'nearest'
			});
		}
	}
});

export function addPacketToList(packet: SerializedPacket): void {
	const infoData: string[] = [];

	if (packet.version !== -1) { // * Raw RMC packet
		infoData.push(packet.type);

		if (packet.flags.includes('MULTI_ACK')) {
			infoData.push('MULTI_ACK');
		} else {
			infoData.push(`SEQ=${packet.sequence_id}`);

			if (packet.flags.includes('ACK')) {
				infoData.push('ACK');
			}
		}

		if (packet.type === 'DATA' && !packet.flags.includes('ACK') && !packet.flags.includes('MULTI_ACK')) {
			infoData.push(`FRAGMENT=${packet.fragment_id}`);
		}
	}

	if (packet.message) {
		infoData.push(`${packet.message.protocol_name}->${packet.message.method_name}`);

		if (packet.message.type === RMCMessage.REQUEST) {
			infoData.push('REQUEST');
		} else {
			infoData.push('RESPONSE');

			if (packet.message.error) {
				infoData.push('FAILURE');
				infoData.push(`ERROR ${packet.message.error.name} (0x${packet.message.error.code.toString(16)})`);
			} else {
				infoData.push('SUCCESS');
			}
		}
	}

	const timeString = packet.time !== undefined ? packet.time.toFixed(6) : '';
	const sourceString = packet.source_address;
	const destinationString = packet.destination_address;
	let versionString;
	switch (packet.version) {
		case -1:
			versionString = 'Raw RMC';
		default:
			versionString = `v${packet.version}`;
	}

	const infoString = infoData.join(', ');

	const row = (
		<tr
			data-serialized={JSON.stringify(packet)}
			data-packet-type={packet.type}
			className={packet.stack_trace ? 'error' : ''}
		>
			<td>{timeString}</td>
			<td>{sourceString}</td>
			<td>{destinationString}</td>
			<td>{versionString}</td>
			<td>{infoString}</td>
		</tr>
	);

	packetsListSection.appendChild(row as any);
}

export function addConnectionToList(connection: SerializedConnection): void {
	const row = (
		<div>
			<span>{connection.title.name}</span>
		</div>
	);

	connectionsListSection.appendChild(row as any);
}

function setSelectedPacketRow(tr: HTMLElement): void {
	document.querySelector('tr.selected')?.classList.toggle('selected');
	tr.classList.toggle('selected');

	selectedPacket = tr;

	updatePacketDetails(JSON.parse(tr.dataset.serialized!));
}

function updatePacketDetails(packet: SerializedPacket): void {
	const root = document.createElement('details');
	const pre = document.createElement('pre');

	pre.appendChild(document.createTextNode(JSON.stringify(packet, null, '\t')));
	root.appendChild(pre);

	removeAllChildNodes(packetDetailsSection);

	packetDetailsSection.appendChild(root);
}

document.addEventListener('click', event => {
	event.stopPropagation();

	if (!event.target || !(event.target instanceof HTMLElement)) {
		return;
	}

	if (event.target.tagName.toLowerCase() === 'td') {
		setSelectedPacketRow(event.target.parentElement!);
	}

	if (event.target.tagName.toLowerCase() === 'tr') {
		setSelectedPacketRow(event.target);
	}
});