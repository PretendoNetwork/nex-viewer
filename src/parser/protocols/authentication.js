const NEXSmartBuffer = require('../nex_smart_buffer');
const { MODE_REQUEST, MODE_RESPONSE } = require('../rmc');
const NEXTypes = require('./nex_types');

const AuthenticationMethodLogin = 0x1;
const AuthenticationMethodLoginEx = 0x2;
const AuthenticationMethodRequestTicket = 0x3;
//const AuthenticationMethodGetPID = 0x4;
//const AuthenticationMethodGetName = 0x5;
//const AuthenticationMethodLoginWithParam = 0x6;

class AuthenticationInfo extends NEXTypes.Data {
	parse(buffer) {
		this.token = buffer.readNEXString();
		this.ngsVersion = buffer.readUInt32LE();

		if (this.ngsVersion > 2) {
			this.tokenType = buffer.readUInt8();
			this.serverVersion = buffer.readUInt32LE();
		}
	}
}
NEXTypes.AnyDataHolder.addType('AuthenticationInfo', AuthenticationInfo);

function handlePacket(packet) {
	switch (packet.getRMCMessage().getMethodID()) {
		case AuthenticationMethodLogin:
			Login(packet);
			break;
		case AuthenticationMethodLoginEx:
			LoginEx(packet);
			break;
		case AuthenticationMethodRequestTicket:
			RequestTicket(packet);
			break;
	
		default:
			throw new Error(`Unknown Authentication method ID 0x${packet.getRMCMessage().getMethodID().toString(16)}`);
	}
}

function Login(packet) {
	const message = packet.getRMCMessage();
	const mode = message.getMode();

	if (mode === MODE_REQUEST) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getParameters());
		buffer.connection = packet.connection;

		packet.rmcData = {
			username: buffer.readNEXString()
		};
	} else if (mode === MODE_RESPONSE) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getResponseData());
		buffer.connection = packet.connection;

		packet.rmcData = {
			result: buffer.readUInt32LE(),
			pid: buffer.readUInt32LE(),
			kerberosTicket: buffer.readNEXBuffer(),
			connectionData: buffer.readNEXStructure(NEXTypes.RVConnectionData),
			serverBuildName: buffer.readNEXString()
		};
	}
}

function LoginEx(packet) {
	const message = packet.getRMCMessage();
	const mode = message.getMode();

	if (mode === MODE_REQUEST) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getParameters());
		buffer.connection = packet.connection;

		packet.rmcData = {
			username: buffer.readNEXString(),
			authenticationInfo: buffer.readNEXAnyDataHolder(), // AuthenticationInfo
		};
	} else if (mode === MODE_RESPONSE) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getResponseData());
		buffer.connection = packet.connection;

		packet.rmcData = {
			result: buffer.readUInt32LE(),
			pid: buffer.readUInt32LE(),
			kerberosTicket: buffer.readNEXBuffer(),
			connectionData: buffer.readNEXStructure(NEXTypes.RVConnectionData),
			serverBuildName: buffer.readNEXString()
		};
	}
}

function RequestTicket(packet) {
	const message = packet.getRMCMessage();
	const mode = message.getMode();

	if (mode === MODE_REQUEST) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getParameters());

		packet.rmcData = {
			source: buffer.readUInt32LE(),
			target: buffer.readUInt32LE()
		};
	} else if (mode === MODE_RESPONSE) {
		const buffer = NEXSmartBuffer.fromBuffer(message.getResponseData());

		packet.rmcData = {
			result: buffer.readUInt32LE(),
			kerberosTicket: buffer.readNEXBuffer()
		};
	}
}

module.exports = { handlePacket };