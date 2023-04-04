const Stream = require('../../stream');

const DataStoreTypes = require('../types/datastore');
const DataStorePokemonBankTypes = require('../types/datastore_pokemon_bank');

class PrepareUploadPokemonResponse {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pRecordKey = stream.readNEXStructure(DataStorePokemonBankTypes.GlobalTradeStationRecordKey);
	}

	toJSON() {
		return {
			pRecordKey: {
				__typeName: 'GlobalTradeStationRecordKey',
				__typeValue: this.pRecordKey
			}
		};
	}
}

class UploadPokemonResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class SearchPokemonResponse {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pResult = stream.readNEXStructure(DataStorePokemonBankTypes.GlobalTradeStationSearchPokemonResult);
	}

	toJSON() {
		return {
			pResult: {
				__typeName: 'GlobalTradeStationSearchPokemonResult',
				__typeValue: this.pResult
			}
		};
	}
}

class PrepareTradePokemonResponse {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pResult = stream.readNEXStructure(DataStorePokemonBankTypes.GlobalTradeStationPrepareTradePokemonResult);
	}

	toJSON() {
		return {
			pResult: {
				__typeName: 'GlobalTradeStationPrepareTradePokemonResult',
				__typeValue: this.pResult
			}
		};
	}
}

class TradePokemonResponse {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pResult = stream.readNEXStructure(DataStorePokemonBankTypes.GlobalTradeStationTradePokemonResult);
	}

	toJSON() {
		return {
			pResult: {
				__typeName: 'GlobalTradeStationTradePokemonResult',
				__typeValue: this.pResult
			}
		};
	}
}

class DownloadOtherPokemonResponse {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pResult = stream.readNEXStructure(DataStorePokemonBankTypes.GlobalTradeStationTradePokemonResult);
	}

	toJSON() {
		return {
			pResult: {
				__typeName: 'GlobalTradeStationTradePokemonResult',
				__typeValue: this.pResult
			}
		};
	}
}

class DownloadMyPokemonResponse {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pResult = stream.readNEXStructure(DataStorePokemonBankTypes.GlobalTradeStationDownloadMyPokemonResult);
	}

	toJSON() {
		return {
			pResult: {
				__typeName: 'GlobalTradeStationDownloadMyPokemonResult',
				__typeValue: this.pResult
			}
		};
	}
}

class DeletePokemonResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class GetTransactionParamResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pTransactionParam = stream.readNEXStructure(DataStorePokemonBankTypes.BankTransactionParam);
		this.pStatus = stream.readUInt32LE();
		this.pApplicationId = stream.readUInt16LE();
	}

	toJSON() {
		return {
			pTransactionParam: {
				__typeName: 'BankTransactionParam',
				__typeValue: this.pTransactionParam
			},
			pStatus: {
				__typeName: 'uint32',
				__typeValue: this.pStatus
			},
			pApplicationId: {
				__typeName: 'uint16',
				__typeValue: this.pApplicationId
			}
		};
	}
}

class PreparePostBankObjectResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pReqPostInfo = stream.readNEXStructure(DataStoreTypes.DataStoreReqPostInfo);
	}

	toJSON() {
		return {
			pReqPostInfo: {
				__typeName: 'DataStoreReqPostInfo',
				__typeValue: this.pReqPostInfo
			}
		};
	}
}

class CompletePostBankObjectResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class PrepareGetBankObjectResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pTransactionParam = stream.readNEXStructure(DataStorePokemonBankTypes.BankTransactionParam);

		// * Although the structure is labeled as DataStoreReqGetInfo,
		// * it actually has the contents of DataStoreReqGetInfoV1
		this.pReqGetInfo = stream.readNEXStructure(DataStoreTypes.DataStoreReqGetInfoV1);
	}

	toJSON() {
		return {
			pTransactionParam: {
				__typeName: 'BankTransactionParam',
				__typeValue: this.pTransactionParam
			},
			pReqGetInfo: {
				__typeName: 'DataStoreReqGetInfo',
				__typeValue: this.pReqGetInfo
			}
		};
	}
}

class PrepareUpdateBankObjectResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pTransactionParam = stream.readNEXStructure(DataStorePokemonBankTypes.BankTransactionParam);
		this.pReqUpdateInfo = stream.readNEXStructure(DataStoreTypes.DataStoreReqUpdateInfo);
	}

	toJSON() {
		return {
			pTransactionParam: {
				__typeName: 'BankTransactionParam',
				__typeValue: this.pTransactionParam
			},
			pReqUpdateInfo: {
				__typeName: 'DataStoreReqUpdateInfo',
				__typeValue: this.pReqUpdateInfo
			}
		};
	}
}

class CompleteUpdateBankObjectResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class RollbackBankObjectResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class GetUnlockKeyResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pUnlockKeyList = stream.readNEXList(stream.readUInt32LE);
	}

	toJSON() {
		return {
			pUnlockKeyList: {
				__typeName: 'List<uint32>',
				__typeValue: this.pUnlockKeyList
			}
		};
	}
}

class RequestMigrationResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.detailCode = stream.readUInt32LE();
	}

	toJSON() {
		return {
			detailCode: {
				__typeName: 'uint32',
				__typeValue: this.detailCode
			}
		};
	}
}

class GetMigrationStatusResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pInfo = stream.readNEXStructure(DataStorePokemonBankTypes.BankMigrationInfo);
		this.detailCode = stream.readUInt32LE();
	}

	toJSON() {
		return {
			pInfo: {
				__typeName: 'BankMigrationInfo',
				__typeValue: this.pInfo
			},
			detailCode: {
				__typeName: 'uint32',
				__typeValue: this.detailCode
			}
		};
	}
}

module.exports = {
	PrepareUploadPokemonResponse,
	UploadPokemonResponse,
	SearchPokemonResponse,
	PrepareTradePokemonResponse,
	TradePokemonResponse,
	DownloadOtherPokemonResponse,
	DownloadMyPokemonResponse,
	DeletePokemonResponse,
	GetTransactionParamResponse,
	PreparePostBankObjectResponse,
	CompletePostBankObjectResponse,
	PrepareGetBankObjectResponse,
	PrepareUpdateBankObjectResponse,
	CompleteUpdateBankObjectResponse,
	RollbackBankObjectResponse,
	GetUnlockKeyResponse,
	RequestMigrationResponse,
	GetMigrationStatusResponse
};
