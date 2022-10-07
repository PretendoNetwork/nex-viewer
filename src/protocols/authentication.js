const Packet = require('../packet'); // eslint-disable-line no-unused-vars
const PacketV0 = require('../packetv0'); // eslint-disable-line no-unused-vars
const PacketV1 = require('../packetv1'); // eslint-disable-line no-unused-vars
const RMCMessage = require('../rmc'); // eslint-disable-line no-unused-vars
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
	};

	static MethodNames = Object.entries(Authentication.Methods).reduce((namesObject, entry) => {
		const [key, value] = entry;
		namesObject[value] = key;
		return namesObject;
	}, {});

	static Handlers = {
		0x1: Authentication.Login,
		0x2: Authentication.LoginEx,
		0x3: Authentication.RequestTicket
	};

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet PRUDP packet
	 */
	static handlePacket(packet) {
		const methodId = packet.rmcMessage.methodId;

		const handler = Authentication.Handlers[methodId];

		if (!handler) {
			console.log(`Unknown Authentication method ID ${methodId} (0x${methodId.toString(16)}) (${Authentication.MethodNames[methodId]})`);
			return;
		}

		const { rmcMessage } = packet;
		const stream = new Stream(rmcMessage.body, packet.connection);
		packet.rmcData = handler(rmcMessage, stream);
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static Login(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				strUserName: stream.readNEXString()
			};
		} else {
			return {
				retval: stream.readUInt32LE(),
				pidPrincipal: stream.readUInt32LE(),
				pbufResponse: stream.readNEXBuffer(),
				pConnectionData: stream.readNEXStructure(NEXTypes.RVConnectionData),
				strReturnMsg: stream.readNEXString()
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static LoginEx(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				strUserName: stream.readNEXString(),
				oExtraData: stream.readNEXAnyDataHolder()
			};
		} else {
			return {
				retval: stream.readUInt32LE(),
				pidPrincipal: stream.readUInt32LE(),
				pbufResponse: stream.readNEXBuffer(),
				pConnectionData: stream.readNEXStructure(NEXTypes.RVConnectionData),
				strReturnMsg: stream.readNEXString()
			};
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static RequestTicket(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return {
				idSource: stream.readUInt32LE(),
				idTarget: stream.readUInt32LE()
			};
		} else {
			return {
				retval: stream.readUInt32LE(),
				bufResponse: stream.readNEXBuffer()
			};
		}
	}
}


module.exports = Authentication;