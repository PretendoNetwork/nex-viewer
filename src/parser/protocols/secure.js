const NEXSmartBuffer = require('../nex_smart_buffer');
const { MODE_REQUEST, MODE_RESPONSE } = require('../rmc');
const NEXTypes = require('./nex_types');

const SecureMethodRegister = 0x1;
//const SecureMethodRequestConnectionData = 0x2;
//const SecureMethodRequestUrls = 0x3;
const SecureMethodRegisterEx = 0x4;
//const SecureMethodTestConnectivity = 0x5;
//const SecureMethodUpdateURLs = 0x6;
//const SecureMethodReplaceURL = 0x7;
//const SecureMethodSendReport = 0x8;

class NintendoLoginData extends NEXTypes.Structure {
	parse(buffer) {
		this.token = buffer.readNEXString();
	}
}
NEXTypes.AnyDataHolder.addType('NintendoLoginData', NintendoLoginData);
NEXTypes.AnyDataHolder.addType('AccountExtraInfo', NintendoLoginData); // Old name used on the 3DS?

function handlePacket(packet) {
	switch (packet.getRMCMessage().getMethodID()) {
		case SecureMethodRegister:
			Register(packet);
			break;
		case SecureMethodRegisterEx:
			RegisterEx(packet);
			break;
	
		default:
			throw new Error(`Unknown Secure method ID 0x${packet.getRMCMessage().getMethodID().toString(16)}`);
	}
}


function Register(packet) {
	const message = packet.getRMCMessage();
	const mode = message.getMode();

	if (mode === MODE_REQUEST) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getParameters());

		packet.rmcData = {
			urls: buffer.readNEXList(buffer.readNEXStationURL)
		};

		packet.connection.pid = Number(packet.rmcData.username);
	} else if (mode === MODE_RESPONSE) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getResponseData());

		packet.rmcData = {
			result: buffer.readUInt32LE(),
			connectionId: buffer.readUInt32LE(),
			publicUrl: buffer.readNEXStationURL()
		};
	}
}

function RegisterEx(packet) {
	const message = packet.getRMCMessage();
	const mode = message.getMode();

	if (mode === MODE_REQUEST) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getParameters());
		buffer.connection = packet.connection;

		packet.rmcData = {
			urls: buffer.readNEXList(buffer.readNEXStationURL),
			loginData: buffer.readNEXAnyDataHolder(), // NintendoLoginData or AccountExtraInfo
		};

		packet.connection.pid = Number(packet.rmcData.username);
	} else if (mode === MODE_RESPONSE) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getResponseData());

		packet.rmcData = {
			result: buffer.readUInt32LE(),
			connectionId: buffer.readUInt32LE(),
			publicUrl: buffer.readNEXStationURL()
		};
	}
}

module.exports = { handlePacket };