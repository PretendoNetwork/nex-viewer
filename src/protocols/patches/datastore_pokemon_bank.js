/**
 * @typedef {import('../../packet')} Packet
 * @typedef {import('../../packetv0')} PacketV0
 * @typedef {import('../../packetv1')} PacketV1
 * @typedef {import('../../rmc')} RMCMessage
 */

const Stream = require('../../stream');

const Requests = require('../requests/datastore_pokemon_bank');
const Responses = require('../responses/datastore_pokemon_bank');

class DataStorePokemonBank {
	static ProtocolID = 0x73;

	static ProtocolName = 'DataStore (Pokémon Bank)';

	static Methods = {
		PrepareUploadPokemon: 0x28,
		UploadPokemon: 0x29,
		SearchPokemon: 0x2a,
		PrepareTradePokemon: 0x2b,
		TradePokemon: 0x2c,
		DownloadOtherPokemon: 0x2d,
		DownloadMyPokemon: 0x2e,
		DeletePokemon: 0x2f,
		GetTransactionParam: 0x30,
		PreparePostBankObject: 0x31,
		CompletePostBankObject: 0x32,
		PrepareGetBankObject: 0x33,
		PrepareUpdateBankObject: 0x34,
		CompleteUpdateBankObject: 0x35,
		RollbackBankObject: 0x36,
		GetUnlockKey: 0x37,
		RequestMigration: 0x38,
		GetMigrationStatus: 0x39,
	};

	static MethodNames = Object.entries(DataStorePokemonBank.Methods).reduce((namesObject, entry) => {
		const [key, value] = entry;
		namesObject[value] = key;
		return namesObject;
	}, {});

	static Handlers = {
		0x28: DataStorePokemonBank.PrepareUploadPokemon,
		0x29: DataStorePokemonBank.UploadPokemon,
		0x2a: DataStorePokemonBank.SearchPokemon,
		0x2b: DataStorePokemonBank.PrepareTradePokemon,
		0x2c: DataStorePokemonBank.TradePokemon,
		0x2d: DataStorePokemonBank.DownloadOtherPokemon,
		0x2e: DataStorePokemonBank.DownloadMyPokemon,
		0x2f: DataStorePokemonBank.DeletePokemon,
		0x30: DataStorePokemonBank.GetTransactionParam,
		0x31: DataStorePokemonBank.PreparePostBankObject,
		0x32: DataStorePokemonBank.CompletePostBankObject,
		0x33: DataStorePokemonBank.PrepareGetBankObject,
		0x34: DataStorePokemonBank.PrepareUpdateBankObject,
		0x35: DataStorePokemonBank.CompleteUpdateBankObject,
		0x36: DataStorePokemonBank.RollbackBankObject,
		0x37: DataStorePokemonBank.GetUnlockKey,
		0x38: DataStorePokemonBank.RequestMigration,
		0x39: DataStorePokemonBank.GetMigrationStatus,
	};

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet PRUDP packet
	 */
	static handlePacket(packet) {
		const methodId = packet.rmcMessage.methodId;

		const handler = DataStorePokemonBank.Handlers[methodId];

		if (!handler) {
			console.log(`Unknown DataStore (Pokémon Bank) method ID ${methodId} (0x${methodId.toString(16)}) (${DataStorePokemonBank.MethodNames[methodId]})`);
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
	static PrepareUploadPokemon(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.PrepareUploadPokemonRequest(stream);
		} else {
			return new Responses.PrepareUploadPokemonResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static UploadPokemon(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.UploadPokemonRequest(stream);
		} else {
			return new Responses.UploadPokemonResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static SearchPokemon(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.SearchPokemonRequest(stream);
		} else {
			return new Responses.SearchPokemonResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static PrepareTradePokemon(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.PrepareTradePokemonRequest(stream);
		} else {
			return new Responses.PrepareTradePokemonResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static TradePokemon(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.TradePokemonRequest(stream);
		} else {
			return new Responses.TradePokemonResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static DownloadOtherPokemon(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.DownloadOtherPokemonRequest(stream);
		} else {
			return new Responses.DownloadOtherPokemonResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static DownloadMyPokemon(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.DownloadMyPokemonRequest(stream);
		} else {
			return new Responses.DownloadMyPokemonResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static DeletePokemon(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.DeletePokemonRequest(stream);
		} else {
			return new Responses.DeletePokemonResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetTransactionParam(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetTransactionParamRequest(stream);
		} else {
			return new Responses.GetTransactionParamResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static PreparePostBankObject(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.PreparePostBankObjectRequest(stream);
		} else {
			return new Responses.PreparePostBankObjectResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static CompletePostBankObject(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.CompletePostBankObjectRequest(stream);
		} else {
			return new Responses.CompletePostBankObjectResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static PrepareGetBankObject(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.PrepareGetBankObjectRequest(stream);
		} else {
			return new Responses.PrepareGetBankObjectResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static PrepareUpdateBankObject(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.PrepareUpdateBankObjectRequest(stream);
		} else {
			return new Responses.PrepareUpdateBankObjectResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static CompleteUpdateBankObject(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.CompleteUpdateBankObjectRequest(stream);
		} else {
			return new Responses.CompleteUpdateBankObjectResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static RollbackBankObject(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.RollbackBankObjectRequest(stream);
		} else {
			return new Responses.RollbackBankObjectResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetUnlockKey(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetUnlockKeyRequest(stream);
		} else {
			return new Responses.GetUnlockKeyResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static RequestMigration(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.RequestMigrationRequest(stream);
		} else {
			return new Responses.RequestMigrationResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetMigrationStatus(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetMigrationStatusRequest(stream);
		} else {
			return new Responses.GetMigrationStatusResponse(stream);
		}
	}
}

module.exports = DataStorePokemonBank;
