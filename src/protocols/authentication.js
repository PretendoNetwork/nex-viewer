const Packet = require('../packet');
const PacketV0 = require('../packetv0');
const PacketV1 = require('../packetv1');
const Stream = require('../stream');
const NEXTypes = require('../types');

class AuthenticationInfo extends NEXTypes.Data {
	parse(stream) {
		this.m_authToken = stream.readNEXString();
		this.m_ngsVersion = stream.readUInt32LE();

		if (this.m_ngsVersion > 2) {
			this.m_authTokenType = stream.readUInt8();
			this.m_serverVersion = stream.readUInt32LE();
		}
	}
}
NEXTypes.AnyDataHolder.addType('AuthenticationInfo', AuthenticationInfo);

class Authentication {
	static ProtocolID = 0xA;

	static Methods = {
		Login: 0x1,
		LoginEx: 0x2,
		RequestTicket: 0x3,
		GetPID: 0x4,
		GetName: 0x5,
		LoginWithContext: 0x6
	}

	static Handlers = {
		0x1: Authentication.Login,
		0x2: Authentication.LoginEx,
		0x3: Authentication.RequestTicket
	}

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet
	 */
	static handlePacket(packet) {
		const handler = Authentication.Handlers[packet.rmcMessage.methodId];

		if (!handler) {
			console.log(`Unknown Authentication method ID ${packet.rmcMessage.methodId} (0x${packet.rmcMessage.methodId.toString(16)})`);
			return;
		}

		packet.rmcData = handler(packet);
	}

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet
	 */
	static Login(packet) {
		const { rmcMessage } = packet;
		const stream = new Stream(rmcMessage.body, packet.connection);

		if (rmcMessage.isRequest()) {
			return {
				strUserName: stream.readNEXString()
			}
		} else {
			return {
				retval: stream.readUInt32LE(),
				pidPrincipal: stream.readUInt32LE(),
				pbufResponse: stream.readNEXBuffer(),
				pConnectionData: stream.readNEXStructure(NEXTypes.RVConnectionData),
				strReturnMsg: stream.readNEXString()
			}
		}
	}

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet
	 */
	static LoginEx(packet) {
		const { rmcMessage } = packet;
		const stream = new Stream(rmcMessage.body, packet.connection);

		if (rmcMessage.isRequest()) {
			return {
				strUserName: stream.readNEXString(),
				oExtraData: stream.readNEXAnyDataHolder()
			}
		} else {
			return {
				retval: stream.readUInt32LE(),
				pidPrincipal: stream.readUInt32LE(),
				pbufResponse: stream.readNEXBuffer(),
				pConnectionData: stream.readNEXStructure(NEXTypes.RVConnectionData),
				strReturnMsg: stream.readNEXString()
			}
		}
	}

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet
	 */
	static RequestTicket(packet) {
		const { rmcMessage } = packet;
		const stream = new Stream(rmcMessage.body, packet.connection);

		if (rmcMessage.isRequest()) {
			return {
				idSource: stream.readUInt32LE(),
				idTarget: stream.readUInt32LE()
			}
		} else {
			return {
				retval: stream.readUInt32LE(),
				bufResponse: stream.readNEXBuffer()
			}
		}
	}
}


module.exports = Authentication;