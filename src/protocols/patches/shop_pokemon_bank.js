const Packet = require('../../packet'); // eslint-disable-line no-unused-vars
const PacketV0 = require('../../packetv0'); // eslint-disable-line no-unused-vars
const PacketV1 = require('../../packetv1'); // eslint-disable-line no-unused-vars
const RMCMessage = require('../../rmc'); // eslint-disable-line no-unused-vars
const Stream = require('../../stream');

const Requests = require('../requests/shop_pokemon_bank');
const Responses = require('../responses/shop_pokemon_bank');

class ShopPokemonBank {
	static ProtocolID = 0xC8;

	static ProtocolName = 'Shop (Pokémon Bank)';

	static Methods = {
		GetItems: 0x1,
		GetChallengeBlob: 0x2,
		GetRivToken: 0x3,
		GetRivTokenByItemId: 0x4,
		GetItemRights: 0x5,
		VerifyAndRegisterTicket: 0x6,
		DebugSetExpireTime: 0x7,
		PrincipalIDToSupportNumber: 0x8,
		SupportNumberToPrincipalID: 0x9,
		GetGameServerTime: 0xa,
	};

	static MethodNames = Object.entries(ShopPokemonBank.Methods).reduce((namesObject, entry) => {
		const [key, value] = entry;
		namesObject[value] = key;
		return namesObject;
	}, {});

	static Handlers = {
		0x1: ShopPokemonBank.GetItems,
		0x2: ShopPokemonBank.GetChallengeBlob,
		0x3: ShopPokemonBank.GetRivToken,
		0x4: ShopPokemonBank.GetRivTokenByItemId,
		0x5: ShopPokemonBank.GetItemRights,
		0x6: ShopPokemonBank.VerifyAndRegisterTicket,
		0x7: ShopPokemonBank.DebugSetExpireTime,
		0x8: ShopPokemonBank.PrincipalIDToSupportNumber,
		0x9: ShopPokemonBank.SupportNumberToPrincipalID,
		0xa: ShopPokemonBank.GetGameServerTime,
	};

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet PRUDP packet
	 */
	static handlePacket(packet) {
		const methodId = packet.rmcMessage.methodId;

		const handler = ShopPokemonBank.Handlers[methodId];

		if (!handler) {
			console.log(`Unknown Shop (Pokémon Bank) method ID ${methodId} (0x${methodId?.toString(16)}) (${ShopPokemonBank.MethodNames[methodId]})`);
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
	static GetItems(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetItemsRequest(stream);
		} else {
			return new Responses.GetItemsResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetChallengeBlob(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetChallengeBlobRequest(stream);
		} else {
			return new Responses.GetChallengeBlobResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetRivToken(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetRivTokenRequest(stream);
		} else {
			return new Responses.GetRivTokenResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetRivTokenByItemId(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetRivTokenByItemIdRequest(stream);
		} else {
			return new Responses.GetRivTokenByItemIdResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetItemRights(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetItemRightsRequest(stream);
		} else {
			return new Responses.GetItemRightsResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static VerifyAndRegisterTicket(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.VerifyAndRegisterTicketRequest(stream);
		} else {
			return new Responses.VerifyAndRegisterTicketResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static DebugSetExpireTime(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.DebugSetExpireTimeRequest(stream);
		} else {
			return new Responses.DebugSetExpireTimeResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static PrincipalIDToSupportNumber(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.PrincipalIDToSupportNumberRequest(stream);
		} else {
			return new Responses.PrincipalIDToSupportNumberResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static SupportNumberToPrincipalID(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.SupportNumberToPrincipalIDRequest(stream);
		} else {
			return new Responses.SupportNumberToPrincipalIDResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetGameServerTime(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetGameServerTimeRequest(stream);
		} else {
			return new Responses.GetGameServerTimeResponse(stream);
		}
	}
}

module.exports = ShopPokemonBank;
