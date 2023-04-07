const Stream = require('../../stream'); // eslint-disable-line no-unused-vars

const ShopPokemonBankTypes = require('../types/shop_pokemon_bank');

class GetItemsResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pItems = stream.readNEXList(ShopPokemonBankTypes.ShopItem);
	}

	toJSON() {
		return {
			pItems: {
				__typeName: 'List<ShopItem>',
				__typeValue: this.pItems
			}
		};
	}
}

class GetChallengeBlobResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pChallengeBlob = stream.readNEXBuffer();
	}

	toJSON() {
		return {
			pChallengeBlob: {
				__typeName: 'Buffer',
				__typeValue: this.pChallengeBlob
			}
		};
	}
}

class GetRivTokenResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pRivToken = stream.readNEXString();
	}

	toJSON() {
		return {
			pRivToken: {
				__typeName: 'String',
				__typeValue: this.pRivToken
			}
		};
	}
}

class GetRivTokenByItemIdResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pRivToken = stream.readNEXString();
	}

	toJSON() {
		return {
			pRivToken: {
				__typeName: 'String',
				__typeValue: this.pRivToken
			}
		};
	}
}

class GetItemRightsResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pItemRights = stream.readNEXList(ShopPokemonBankTypes.ShopItemRights);
	}

	toJSON() {
		return {
			pItemRights: {
				__typeName: 'List<ShopItemRights>',
				__typeValue: this.pItemRights
			}
		};
	}
}

class VerifyAndRegisterTicketResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.expireTime = stream.readNEXDateTime();
	}

	toJSON() {
		return {
			expireTime: {
				__typeName: 'DateTime',
				__typeValue: this.expireTime
			}
		};
	}
}

class DebugSetExpireTimeResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class PrincipalIDToSupportNumberResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.supportNumber = stream.readNEXString();
	}

	toJSON() {
		return {
			supportNumber: {
				__typeName: 'String',
				__typeValue: this.supportNumber
			}
		};
	}
}

class SupportNumberToPrincipalIDResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pid = stream.readPID();
	}

	toJSON() {
		return {
			pid: {
				__typeName: 'PID',
				__typeValue: this.pid
			}
		};
	}
}

class GetGameServerTimeResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pServerTime = stream.readNEXDateTime();
	}

	toJSON() {
		return {
			pServerTime: {
				__typeName: 'DateTime',
				__typeValue: this.pServerTime
			}
		};
	}
}

module.exports = {
	GetItemsResponse,
	GetChallengeBlobResponse,
	GetRivTokenResponse,
	GetRivTokenByItemIdResponse,
	GetItemRightsResponse,
	VerifyAndRegisterTicketResponse,
	DebugSetExpireTimeResponse,
	PrincipalIDToSupportNumberResponse,
	SupportNumberToPrincipalIDResponse,
	GetGameServerTimeResponse
};
