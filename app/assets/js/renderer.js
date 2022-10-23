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
	const type = document.createElement('td');
	const protocol = document.createElement('td');
	const method = document.createElement('td');

	let typeString = packet.type;

	if (packet.type === 'DATA') {
		typeString += `, FRAGMENT=${packet.fragmentId}`;
	}

	if (packet.flags.includes('ACK')) {
		typeString += ', ACK';
	}

	if (packet.flags.includes('MULTI_ACK')) {
		typeString += ', MULTI_ACK';
	}

	const sourceContent = document.createTextNode(packet.sourceAddress);
	const destinationContent = document.createTextNode(packet.destinationAddress);
	const versionContent = document.createTextNode(`v${packet.version}`);
	const typeContent = document.createTextNode(typeString);
	const protocolContent = document.createTextNode(packet.rmc.protocolId);
	const methodContent = document.createTextNode(packet.rmc.methodId);

	source.appendChild(sourceContent);
	destination.appendChild(destinationContent);
	version.appendChild(versionContent);
	type.appendChild(typeContent);
	protocol.appendChild(protocolContent);
	method.appendChild(methodContent);

	tr.appendChild(source);
	tr.appendChild(destination);
	tr.appendChild(version);
	tr.appendChild(type);
	tr.appendChild(protocol);
	tr.appendChild(method);

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

	const rootSummaryContent = document.createTextNode('Packet');
	const rootElementSourceNameContent = document.createTextNode('Source:');
	const rootElementSourceValueContent = document.createTextNode(packet.source);
	const rootElementDestinationNameContent = document.createTextNode('Destination:');
	const rootElementDestinationValueContent = document.createTextNode(packet.destination);
	const rootElementFlagsNameContent = document.createTextNode('Flags:');
	const rootElementFlagsValueContent = document.createTextNode(JSON.stringify(packet.flags));
	const rootElementTypeNameContent = document.createTextNode('Type:');
	const rootElementTypeValueContent = document.createTextNode(packet.type);
	const rootElementSessionIdNameContent = document.createTextNode('SessionId:');
	const rootElementSessionIdValueContent = document.createTextNode(packet.sessionId);
	const rootElementSignatureNameContent = document.createTextNode('Signature:');
	const rootElementSignatureValueContent = document.createTextNode(packet.signature);
	const rootElementSequenceIdNameContent = document.createTextNode('SequenceId:');
	const rootElementSequenceIdValueContent = document.createTextNode(packet.sequenceId);
	const rootElementFragmentIdNameContent = document.createTextNode('FragmentId:');
	const rootElementFragmentIdValueContent = document.createTextNode(packet.fragmentId);
	const rootElementChecksumNameContent = document.createTextNode('Checksum:');
	const rootElementChecksumValueContent = document.createTextNode(packet.checksum);

	rootElementSourceName.appendChild(rootElementSourceNameContent);
	rootElementSourceValue.appendChild(rootElementSourceValueContent);
	rootElementDestinationName.appendChild(rootElementDestinationNameContent);
	rootElementDestinationValue.appendChild(rootElementDestinationValueContent);
	rootElementFlagsName.appendChild(rootElementFlagsNameContent);
	rootElementFlagsValue.appendChild(rootElementFlagsValueContent);
	rootElementTypeName.appendChild(rootElementTypeNameContent);
	rootElementTypeValue.appendChild(rootElementTypeValueContent);
	rootElementSessionIdName.appendChild(rootElementSessionIdNameContent);
	rootElementSessionIdValue.appendChild(rootElementSessionIdValueContent);
	rootElementSignatureName.appendChild(rootElementSignatureNameContent);
	rootElementSignatureValue.appendChild(rootElementSignatureValueContent);
	rootElementSequenceIdName.appendChild(rootElementSequenceIdNameContent);
	rootElementSequenceIdValue.appendChild(rootElementSequenceIdValueContent);
	rootElementFragmentIdName.appendChild(rootElementFragmentIdNameContent);
	rootElementFragmentIdValue.appendChild(rootElementFragmentIdValueContent);
	rootElementChecksumName.appendChild(rootElementChecksumNameContent);
	rootElementChecksumValue.appendChild(rootElementChecksumValueContent);

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

	rootSummary.appendChild(rootSummaryContent);

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

		const rmcRootDetailsProtcolIdNameContent = document.createTextNode('Protocol ID:');
		const rmcRootDetailsProtcolIdValueContent = document.createTextNode(packet.rmc.protocolId);
		const rmcRootDetailsMethodIdNameContent = document.createTextNode('Method ID:');
		const rmcRootDetailsMethodIdValueContent = document.createTextNode(packet.rmc.methodId);
		const rmcRootDetailsCallIdNameContent = document.createTextNode('Call ID:');
		const rmcRootDetailsCallIdValueContent = document.createTextNode(packet.rmc.callId);
		const rmcRootDetailsErrorCodeNameContent = document.createTextNode('Error Code:');
		const rmcRootDetailsErrorCodeValueContent = document.createTextNode(packet.rmc.errorCode);

		rmcRootDetailsProtcolIdName.appendChild(rmcRootDetailsProtcolIdNameContent);
		rmcRootDetailsProtcolIdValue.appendChild(rmcRootDetailsProtcolIdValueContent);
		rmcRootDetailsMethodIdName.appendChild(rmcRootDetailsMethodIdNameContent);
		rmcRootDetailsMethodIdValue.appendChild(rmcRootDetailsMethodIdValueContent);
		rmcRootDetailsCallIdName.appendChild(rmcRootDetailsCallIdNameContent);
		rmcRootDetailsCallIdValue.appendChild(rmcRootDetailsCallIdValueContent);
		rmcRootDetailsErrorCodeName.appendChild(rmcRootDetailsErrorCodeNameContent);
		rmcRootDetailsErrorCodeValue.appendChild(rmcRootDetailsErrorCodeValueContent);

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
		rmcRootDetailsRoot.appendChild(rmcRootDetailsErrorCodeDiv);

		//const rmcBody = serializeRMCBody(packet.rmc.data);
		const rmcBody = document.createElement('div');
		rmcBody.appendChild(document.createTextNode('TODO - BODY'));

		rmcRootDetailsRoot.appendChild(rmcBody);

		const rmcRootSummaryContent = document.createTextNode('RMC');

		rmcRootSummary.appendChild(rmcRootSummaryContent);
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
	console.log(rmcData);
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