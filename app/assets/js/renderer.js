/* eslint-env browser */

const mainElement = document.querySelector('main');
const packetsSection = document.getElementById('packets');
const packetDetailsSection = document.getElementById('packet-details');
const packetHexSection = document.getElementById('packet-hex');
const packetsTableBodySection = packetsSection.querySelector('tbody');

function resizePacketsSection() {
	// * Hack to get the exact height of the element to match the grid
	// * while being set to `display: block` for overflow
	const mainElement = document.querySelector('main');
	const gridTemplateRows = getComputedStyle(mainElement).getPropertyValue('grid-template-rows');
	const height = gridTemplateRows.split(' ')[0];

	// Sometimes doesn't visually update?
	packetsSection.style.height = height;
	packetDetailsSection.style.height = height;
	packetHexSection.style.height = height;
}

const mainElementResizeObserver = new ResizeObserver(() => {
	resizePacketsSection();
});

mainElementResizeObserver.observe(mainElement);

function addPacketToList(packet) {
	const tr = document.createElement('tr');

	const source = document.createElement('td');
	const destination = document.createElement('td');
	const version = document.createElement('td');
	const info = document.createElement('td');

	let infoString = packet.type;
	let isAck = false;

	if (packet.type === 'DATA') {
		infoString += `, FRAGMENT=${packet.fragmentId}`;
	}

	if (packet.flags.includes('ACK')) {
		infoString += ', ACK';
		isAck = true;
	}

	if (packet.flags.includes('MULTI_ACK')) {
		infoString += ', MULTI_ACK';
		isAck = true;
	}

	if (packet.type === 'DATA' && packet.fragmentId === 0 && !isAck) {
		infoString += `, ${packet.rmc.protocolName}->${packet.rmc.methodName}`;

		if (packet.rmc.isRequest === true) {
			infoString += ', REQUEST';
		} else if (packet.rmc.isRequest === false) {
			infoString += ', RESPONSE';

			if (packet.rmc.isSuccess === true) {
				infoString += ', SUCCESS';
			} else if (packet.rmc.isSuccess === false) {
				infoString += ', FAILURE';

				if (packet.rmc.errorCode) {
					infoString += `, ERROR CODE=0x${packet.rmc.errorCode.toString(16)}`;
				}
			}
		}
	}

	source.appendChild(document.createTextNode(packet.sourceAddress));
	destination.appendChild(document.createTextNode(packet.destinationAddress));
	version.appendChild(document.createTextNode(`v${packet.version}`));
	info.appendChild(document.createTextNode(infoString));

	tr.appendChild(source);
	tr.appendChild(destination);
	tr.appendChild(version);
	tr.appendChild(info);

	tr.dataset.serialized = JSON.stringify(packet);

	packetsTableBodySection.appendChild(tr);
}

function setSelectedPacketRow(tr) {
	document.querySelector('tr.selected')?.classList.toggle('selected');
	tr.classList.toggle('selected');

	updatePacketDetails(JSON.parse(tr.dataset.serialized));
}

function updatePacketDetails(packet) {
	const root = document.createElement('details');
	const rootSummary = document.createElement('summary');
	const rootDiv = document.createElement('div');

	const rootElementSourceDiv = document.createElement('div');
	const rootElementSourceName = document.createElement('span');
	const rootElementSourceValue = document.createElement('span');
	rootElementSourceName.classList.add('name');
	rootElementSourceValue.classList.add('value');

	const rootElementDestinationDiv = document.createElement('div');
	const rootElementDestinationName = document.createElement('span');
	const rootElementDestinationValue = document.createElement('span');
	rootElementDestinationName.classList.add('name');
	rootElementDestinationValue.classList.add('value');

	const rootElementFlagsDiv = document.createElement('div');
	const rootElementFlagsName = document.createElement('span');
	const rootElementFlagsValue = document.createElement('span');
	rootElementFlagsName.classList.add('name');
	rootElementFlagsValue.classList.add('value');

	const rootElementTypeDiv = document.createElement('div');
	const rootElementTypeName = document.createElement('span');
	const rootElementTypeValue = document.createElement('span');
	rootElementTypeName.classList.add('name');
	rootElementTypeValue.classList.add('value');

	const rootElementSessionIdDiv = document.createElement('div');
	const rootElementSessionIdName = document.createElement('span');
	const rootElementSessionIdValue = document.createElement('span');
	rootElementSessionIdName.classList.add('name');
	rootElementSessionIdValue.classList.add('value');

	const rootElementSignatureDiv = document.createElement('div');
	const rootElementSignatureName = document.createElement('span');
	const rootElementSignatureValue = document.createElement('span');
	rootElementSignatureName.classList.add('name');
	rootElementSignatureValue.classList.add('value');

	const rootElementSequenceIdDiv = document.createElement('div');
	const rootElementSequenceIdName = document.createElement('span');
	const rootElementSequenceIdValue = document.createElement('span');
	rootElementSequenceIdName.classList.add('name');
	rootElementSequenceIdValue.classList.add('value');

	const rootElementFragmentIdDiv = document.createElement('div');
	const rootElementFragmentIdName = document.createElement('span');
	const rootElementFragmentIdValue = document.createElement('span');
	rootElementFragmentIdName.classList.add('name');
	rootElementFragmentIdValue.classList.add('value');

	const rootElementChecksumDiv = document.createElement('div');
	const rootElementChecksumName = document.createElement('span');
	const rootElementChecksumValue = document.createElement('span');
	rootElementChecksumName.classList.add('name');
	rootElementChecksumValue.classList.add('value');

	rootElementSourceName.appendChild(document.createTextNode('Source:'));
	rootElementSourceValue.appendChild(document.createTextNode(packet.source));
	rootElementDestinationName.appendChild(document.createTextNode('Destination:'));
	rootElementDestinationValue.appendChild(document.createTextNode(packet.destination));
	rootElementFlagsName.appendChild(document.createTextNode('Flags:'));
	rootElementFlagsValue.appendChild(document.createTextNode(JSON.stringify(packet.flags)));
	rootElementTypeName.appendChild(document.createTextNode('Type:'));
	rootElementTypeValue.appendChild(document.createTextNode(packet.type));
	rootElementSessionIdName.appendChild(document.createTextNode('SessionId:'));
	rootElementSessionIdValue.appendChild(document.createTextNode(packet.sessionId));
	rootElementSignatureName.appendChild(document.createTextNode('Signature:'));
	rootElementSignatureValue.appendChild(document.createTextNode(packet.signature));
	rootElementSequenceIdName.appendChild(document.createTextNode('SequenceId:'));
	rootElementSequenceIdValue.appendChild(document.createTextNode(packet.sequenceId));
	rootElementFragmentIdName.appendChild(document.createTextNode('FragmentId:'));
	rootElementFragmentIdValue.appendChild(document.createTextNode(packet.fragmentId));
	rootElementChecksumName.appendChild(document.createTextNode('Checksum:'));
	rootElementChecksumValue.appendChild(document.createTextNode(packet.checksum));

	rootElementSourceDiv.appendChild(rootElementSourceName);
	rootElementSourceDiv.appendChild(rootElementSourceValue);
	rootElementDestinationDiv.appendChild(rootElementDestinationName);
	rootElementDestinationDiv.appendChild(rootElementDestinationValue);
	rootElementFlagsDiv.appendChild(rootElementFlagsName);
	rootElementFlagsDiv.appendChild(rootElementFlagsValue);
	rootElementTypeDiv.appendChild(rootElementTypeName);
	rootElementTypeDiv.appendChild(rootElementTypeValue);
	rootElementSessionIdDiv.appendChild(rootElementSessionIdName);
	rootElementSessionIdDiv.appendChild(rootElementSessionIdValue);
	rootElementSignatureDiv.appendChild(rootElementSignatureName);
	rootElementSignatureDiv.appendChild(rootElementSignatureValue);
	rootElementSequenceIdDiv.appendChild(rootElementSequenceIdName);
	rootElementSequenceIdDiv.appendChild(rootElementSequenceIdValue);
	rootElementFragmentIdDiv.appendChild(rootElementFragmentIdName);
	rootElementFragmentIdDiv.appendChild(rootElementFragmentIdValue);
	rootElementChecksumDiv.appendChild(rootElementChecksumName);
	rootElementChecksumDiv.appendChild(rootElementChecksumValue);

	rootSummary.appendChild(document.createTextNode('Packet'));

	rootDiv.appendChild(rootElementSourceDiv);
	rootDiv.appendChild(rootElementDestinationDiv);
	rootDiv.appendChild(rootElementFlagsDiv);
	rootDiv.appendChild(rootElementTypeDiv);
	rootDiv.appendChild(rootElementSessionIdDiv);
	rootDiv.appendChild(rootElementSignatureDiv);
	rootDiv.appendChild(rootElementSequenceIdDiv);

	if (packet.type === 'DATA') {
		rootDiv.appendChild(rootElementFragmentIdDiv);
	}

	if (packet.version === 0) {
		rootDiv.appendChild(rootElementChecksumDiv);
	}

	if (packet.type === 'DATA' && !packet.flags.includes('ACK') && !packet.flags.includes('MULIT_ACK')) {
		const rmcRoot = document.createElement('div');
		const rmcRootDetails = document.createElement('details');
		const rmcRootSummary = document.createElement('summary');
		const rmcRootDetailsRoot = document.createElement('div');

		const rmcRootDetailsProtcolIdDiv = document.createElement('div');
		const rmcRootDetailsProtcolIdName = document.createElement('span');
		const rmcRootDetailsProtcolIdValue = document.createElement('span');
		rmcRootDetailsProtcolIdName.classList.add('name');
		rmcRootDetailsProtcolIdValue.classList.add('value');

		const rmcRootDetailsMethodIdDiv = document.createElement('div');
		const rmcRootDetailsMethodIdName = document.createElement('span');
		const rmcRootDetailsMethodIdValue = document.createElement('span');
		rmcRootDetailsMethodIdName.classList.add('name');
		rmcRootDetailsMethodIdValue.classList.add('value');

		const rmcRootDetailsCallIdDiv = document.createElement('div');
		const rmcRootDetailsCallIdName = document.createElement('span');
		const rmcRootDetailsCallIdValue = document.createElement('span');
		rmcRootDetailsCallIdName.classList.add('name');
		rmcRootDetailsCallIdValue.classList.add('value');

		const rmcRootDetailsErrorCodeDiv = document.createElement('div');
		const rmcRootDetailsErrorCodeName = document.createElement('span');
		const rmcRootDetailsErrorCodeValue = document.createElement('span');
		rmcRootDetailsErrorCodeName.classList.add('name');
		rmcRootDetailsErrorCodeValue.classList.add('value');

		rmcRootDetailsProtcolIdName.appendChild(document.createTextNode('Protocol ID:'));
		rmcRootDetailsProtcolIdValue.appendChild(document.createTextNode(packet.rmc.protocolId));
		rmcRootDetailsMethodIdName.appendChild(document.createTextNode('Method ID:'));
		rmcRootDetailsMethodIdValue.appendChild(document.createTextNode(packet.rmc.methodId));
		rmcRootDetailsCallIdName.appendChild(document.createTextNode('Call ID:'));
		rmcRootDetailsCallIdValue.appendChild(document.createTextNode(packet.rmc.callId));
		rmcRootDetailsErrorCodeName.appendChild(document.createTextNode('Error Code:'));
		rmcRootDetailsErrorCodeValue.appendChild(document.createTextNode(packet.rmc.errorCode));

		rmcRootDetailsProtcolIdDiv.appendChild(rmcRootDetailsProtcolIdName);
		rmcRootDetailsProtcolIdDiv.appendChild(rmcRootDetailsProtcolIdValue);
		rmcRootDetailsMethodIdDiv.appendChild(rmcRootDetailsMethodIdName);
		rmcRootDetailsMethodIdDiv.appendChild(rmcRootDetailsMethodIdValue);
		rmcRootDetailsCallIdDiv.appendChild(rmcRootDetailsCallIdName);
		rmcRootDetailsCallIdDiv.appendChild(rmcRootDetailsCallIdValue);
		rmcRootDetailsErrorCodeDiv.appendChild(rmcRootDetailsErrorCodeName);
		rmcRootDetailsErrorCodeDiv.appendChild(rmcRootDetailsErrorCodeValue);

		rmcRootDetailsRoot.appendChild(rmcRootDetailsProtcolIdDiv);
		rmcRootDetailsRoot.appendChild(rmcRootDetailsMethodIdDiv);
		rmcRootDetailsRoot.appendChild(rmcRootDetailsCallIdDiv);

		if (packet.rmc.isRequest === true || packet.rmc.isSuccess === true) {
			const serializedRMCBodyDetails = document.createElement('details');
			const serializedRMCBodySummary = document.createElement('summary');
			const serializedRMCBodyDiv = serializeRMCBody(packet.rmc.body);

			serializedRMCBodySummary.appendChild(document.createTextNode('Body'));

			serializedRMCBodyDetails.appendChild(serializedRMCBodySummary);
			serializedRMCBodyDetails.appendChild(serializedRMCBodyDiv);

			const rmcBody = document.createElement('div');
			rmcBody.appendChild(serializedRMCBodyDetails);

			rmcRootDetailsRoot.appendChild(rmcBody);
		} else if (packet.rmc.isRequest === false && packet.rmc.isSuccess === false) {
			// * Error codes only exist on responses
			rmcRootDetailsRoot.appendChild(rmcRootDetailsErrorCodeDiv);
		}

		rmcRootSummary.appendChild(document.createTextNode('RMC'));
		rmcRootDetails.appendChild(rmcRootSummary);
		rmcRootDetails.appendChild(rmcRootDetailsRoot);
		rmcRoot.appendChild(rmcRootDetails);
		rootDiv.appendChild(rmcRoot);
	}

	root.appendChild(rootSummary);
	root.appendChild(rootDiv);
	root.open = true;

	removeAllChildNodes(packetDetailsSection);

	packetDetailsSection.appendChild(root);
}

function serializeRMCBody(rmcData) {
	const serializedRMCDataDiv = document.createElement('div');

	for (const key in rmcData) {
		if (Object.hasOwnProperty.call(rmcData, key)) {
			const value = rmcData[key];
			const typeName = value.__typeName;
			let typeValue = value.__typeValue;

			if (typeName === 'Buffer' || typeName === 'qBuffer') {
				typeValue = toHexString(typeValue.data); // * typeValue is a NodeJS Buffer object
			}

			if (key === '__typeInherits') {
				for (const inheritedType of value) {
					const inheritedTypeName = inheritedType.__typeName;
					const inheritedTypeValue = inheritedType.__typeValue;

					const serializedRMCDataDetails = document.createElement('details');
					const serializedRMCDataSummary = document.createElement('summary');
					const serializedRMCDataDiv2 = serializeRMCBody(inheritedTypeValue);

					serializedRMCDataSummary.appendChild(document.createTextNode(`Inherits from ${inheritedTypeName}`));

					serializedRMCDataDetails.appendChild(serializedRMCDataSummary);
					serializedRMCDataDetails.appendChild(serializedRMCDataDiv2);

					serializedRMCDataDiv.appendChild(serializedRMCDataDetails);
				}
				console.log(value)
			} else {
				if (isObject(typeValue)) {
					const serializedRMCDataDetails = document.createElement('details');
					const serializedRMCDataSummary = document.createElement('summary');
					const serializedRMCDataDiv2 = serializeRMCBody(typeValue);

					serializedRMCDataSummary.appendChild(document.createTextNode(`${key} (${typeName})`));

					serializedRMCDataDetails.appendChild(serializedRMCDataSummary);
					serializedRMCDataDetails.appendChild(serializedRMCDataDiv2);

					serializedRMCDataDiv.appendChild(serializedRMCDataDetails);
				} else {
					const rmcValueElementDiv = document.createElement('div');
					const rmcValueElementName = document.createElement('span');
					const rmcValueElementValue = document.createElement('span');
					rmcValueElementName.classList.add('name');
					rmcValueElementValue.classList.add('value');

					rmcValueElementName.appendChild(document.createTextNode(`${key} (${typeName}):`));
					rmcValueElementValue.appendChild(document.createTextNode(typeValue));

					rmcValueElementDiv.appendChild(rmcValueElementName);
					rmcValueElementDiv.appendChild(rmcValueElementValue);

					serializedRMCDataDiv.appendChild(rmcValueElementDiv);
				}
			}
		}
	}

	return serializedRMCDataDiv;
}

document.addEventListener('click', event => {
	event.stopPropagation();

	if (event.target.tagName.toLowerCase() === 'td') {
		setSelectedPacketRow(event.target.parentElement);
	}

	if (event.target.tagName.toLowerCase() === 'tr') {
		setSelectedPacketRow(event.target);
	}
});