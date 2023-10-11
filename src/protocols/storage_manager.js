/**
 * @typedef {import('../packet')} Packet
 * @typedef {import('../packetv0')} PacketV0
 * @typedef {import('../packetv1')} PacketV1
 * @typedef {import('../rmc')} RMCMessage
 */

const Stream = require('../stream');

const Requests = require('./requests/storage_manager');
const Responses = require('./responses/storage_manager');

// * This is the predecessor of the current Utility protocol.
// * It has been replaced on NEX 3.0.0 with Utility
class StorageManager {
	static ProtocolID = 0x6e;

	static ProtocolName = 'Storage Manager';

	static Methods = {
		AcquireCardId: 0x4,
		ActivateWithCardId: 0x5
	};

	static MethodNames = Object.entries(StorageManager.Methods).reduce((namesObject, entry) => {
		const [key, value] = entry;
		namesObject[value] = key;
		return namesObject;
	}, {});

	static Handlers = {
		0x4: StorageManager.AcquireCardId,
		0x5: StorageManager.ActivateWithCardId
	};

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet PRUDP packet
	 */
	static handlePacket(packet) {
		const methodId = packet.rmcMessage.methodId;

		const handler = StorageManager.Handlers[methodId];

		if (!handler) {
			console.log(`Unknown Storage Manager method ID ${methodId} (0x${methodId?.toString(16)}) (${StorageManager.MethodNames[methodId]})`);
			return;
		}

		const { rmcMessage } = packet;
		const stream = new Stream(rmcMessage.body, packet.connection);

		packet.rmcData = {
			protocolName: this.ProtocolName,
			methodName: this.MethodNames[methodId],
			body: handler(rmcMessage, stream)
		};
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static AcquireCardId(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.AcquireCardIdRequest(stream);
		} else {
			return new Responses.AcquireCardIdResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static ActivateWithCardId(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.ActivateWithCardIdRequest(stream);
		} else {
			return new Responses.ActivateWithCardIdResponse(stream);
		}
	}
}

module.exports = StorageManager;
