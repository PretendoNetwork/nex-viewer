const NEXSmartBuffer = require('../nex_smart_buffer');
const { MODE_REQUEST, MODE_RESPONSE } = require('../rmc');
const NEXTypes = require('./nex_types');

//const UtilityMethodAcquireNexUniqueId = 0x1;
//const UtilityMethodAcquireNexUniqueIdWithPassword = 0x2;
//const UtilityMethodAssociateNexUniqueIdWithMyPrincipalId = 0x3;
//const UtilityMethodAssociateNexUniqueIdsWithMyPrincipalId = 0x4;
const UtilityMethodGetAssociatedNexUniqueIdWithMyPrincipalId = 0x5;
//const UtilityMethodGetAssociatedNexUniqueIdsWithMyPrincipalId = 0x6;
//const UtilityMethodGetIntegerSettings = 0x7;
//const UtilityMethodGetStringSettings = 0x8;

class UniqueIdInfo extends NEXTypes.Structure {
	constructor(buffer) {
		super(buffer);

		this.raw = buffer.internalBuffer;

		// According to Kinnays wiki this is the data, but it doesn't always seem to be the case
		// MK7 sends just 5 bytes
		// So not going to bother parsing it for now
		//this.uniqueId = buffer.readBigUInt64LE();
		//this.uniqueIdPassword = buffer.readBigUInt64LE();
	}
}

function handlePacket(packet) {
	switch (packet.getRMCMessage().getMethodID()) {
		case UtilityMethodGetAssociatedNexUniqueIdWithMyPrincipalId:
			GetAssociatedNexUniqueIdWithMyPrincipalId(packet);
			break;

		default:
			throw new Error(`Unknown Utility method ID 0x${packet.getRMCMessage().getMethodID().toString(16)}`);
	}
}

function GetAssociatedNexUniqueIdWithMyPrincipalId(packet) {
	const message = packet.getRMCMessage();
	const mode = message.getMode();

	if (mode === MODE_REQUEST) {
		packet.rmcData = {}; // No params
	} else if (mode === MODE_RESPONSE) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getResponseData());
		buffer.connection = packet.connection;

		packet.rmcData = {
			uniqueIdInfo: new UniqueIdInfo(buffer)
		};
	}
}

module.exports = { handlePacket };