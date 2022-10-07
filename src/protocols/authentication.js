const Packet = require('../packet');
const PacketV0 = require('../packetv0');
const PacketV1 = require('../packetv1');
const RMCMessage = require('../rmc');
const Stream = require('../stream');
const NEXTypes = require('../types');

require('./types/authentication');

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

		const { rmcMessage } = packet;
		const stream = new Stream(rmcMessage.body, packet.connection);
		packet.rmcData = handler(rmcMessage, stream);
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage
	 * @param {Stream} stream
	 * @returns Object
	 */
	static Login(rmcMessage, stream) {
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
	 * @param {RMCMessage} rmcMessage
	 * @param {Stream} stream
	 * @returns Object
	 */
	static LoginEx(rmcMessage, stream) {
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
	 * @param {RMCMessage} rmcMessage
	 * @param {Stream} stream
	 * @returns Object
	 */
	static RequestTicket(rmcMessage, stream) {
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