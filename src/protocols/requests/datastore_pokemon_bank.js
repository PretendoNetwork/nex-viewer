const Stream = require('../../stream');

const DataStoreTypes = require('../types/datastore');
const DataStorePokemonBankTypes = require('../types/datastore_pokemon_bank');

class PrepareUploadPokemonRequest {
	// * Requests nothing
	toJSON() {
		return {};
	}
}

class UploadPokemonRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStorePokemonBankTypes.GlobalTradeStationUploadPokemonParam);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'GlobalTradeStationUploadPokemonParam',
				__typeValue: this.param
			}
		};
	}
}

class SearchPokemonRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStorePokemonBankTypes.GlobalTradeStationSearchPokemonParam);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'GlobalTradeStationSearchPokemonParam',
				__typeValue: this.param
			}
		};
	}
}

class PrepareTradePokemonRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStorePokemonBankTypes.GlobalTradeStationPrepareTradePokemonParam);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'GlobalTradeStationPrepareTradePokemonParam',
				__typeValue: this.param
			}
		};
	}
}

class TradePokemonRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStorePokemonBankTypes.GlobalTradeStationTradePokemonParam);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'GlobalTradeStationTradePokemonParam',
				__typeValue: this.param
			}
		};
	}
}

class DownloadOtherPokemonRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStorePokemonBankTypes.GlobalTradeStationDownloadOtherPokemonParam);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'GlobalTradeStationDownloadOtherPokemonParam',
				__typeValue: this.param
			}
		};
	}
}

class DownloadMyPokemonRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStorePokemonBankTypes.GlobalTradeStationDownloadMyPokemonParam);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'GlobalTradeStationDownloadMyPokemonParam',
				__typeValue: this.param
			}
		};
	}
}

class DeletePokemonRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStorePokemonBankTypes.GlobalTradeStationDeletePokemonParam);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'GlobalTradeStationDeletePokemonParam',
				__typeValue: this.param
			}
		};
	}
}

class GetTransactionParamRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.slotId = stream.readUInt16LE();
	}

	toJSON() {
		return {
			slotId: {
				__typeName: 'uint16',
				__typeValue: this.slotId
			}
		};
	}
}

class PreparePostBankObjectRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.slotId = stream.readUInt16LE();
		this.size = stream.readUInt32LE();
	}

	toJSON() {
		return {
			slotId: {
				__typeName: 'uint16',
				__typeValue: this.slotId
			},
			size: {
				__typeName: 'uint32',
				__typeValue: this.size
			}
		};
	}
}

class CompletePostBankObjectRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreTypes.DataStoreCompletePostParam);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStoreCompletePostParam',
				__typeValue: this.param
			}
		};
	}
}

class PrepareGetBankObjectRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.slotId = stream.readUInt16LE();
		this.applicationId = stream.readUInt16LE();
	}

	toJSON() {
		return {
			slotId: {
				__typeName: 'uint16',
				__typeValue: this.slotId
			},
			applicationId: {
				__typeName: 'uint16',
				__typeValue: this.applicationId
			}
		};
	}
}

class PrepareUpdateBankObjectRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.transactionParam = stream.readNEXStructure(DataStorePokemonBankTypes.BankTransactionParam);
	}

	toJSON() {
		return {
			transactionParam: {
				__typeName: 'BankTransactionParam',
				__typeValue: this.transactionParam
			}
		};
	}
}

class CompleteUpdateBankObjectRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.slotId = stream.readUInt16LE();
		this.transactionParam = stream.readNEXStructure(DataStorePokemonBankTypes.BankTransactionParam);
		this.isForce = stream.readBoolean();
	}

	toJSON() {
		return {
			slotId: {
				__typeName: 'uint16',
				__typeValue: this.slotId
			},
			transactionParam: {
				__typeName: 'BankTransactionParam',
				__typeValue: this.transactionParam
			},
			isForce: {
				__typeName: 'boolean',
				__typeValue: this.isForce
			}
		};
	}
}

class RollbackBankObjectRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.slotId = stream.readUInt16LE();
		this.transactionParam = stream.readNEXStructure(DataStorePokemonBankTypes.BankTransactionParam);
		this.isForce = stream.readBoolean();
	}

	toJSON() {
		return {
			slotId: {
				__typeName: 'uint16',
				__typeValue: this.slotId
			},
			transactionParam: {
				__typeName: 'BankTransactionParam',
				__typeValue: this.transactionParam
			},
			isForce: {
				__typeName: 'boolean',
				__typeValue: this.isForce
			}
		};
	}
}

class GetUnlockKeyRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.challengeValue = stream.readUInt32LE();
	}

	toJSON() {
		return {
			challengeValue: {
				__typeName: 'uint32',
				__typeValue: this.challengeValue
			}
		};
	}
}

class RequestMigrationRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.oneTimePassword = stream.readNEXString();
		this.boxes = stream.readNEXList(stream.readUInt32LE);
	}

	toJSON() {
		return {
			oneTimePassword: {
				__typeName: 'String',
				__typeValue: this.oneTimePassword
			},
			boxes: {
				__typeName: 'List<uint32>',
				__typeValue: this.boxes
			}
		};
	}
}

class GetMigrationStatusRequest {
	// * Requests nothing
	toJSON() {
		return {};
	}
}

module.exports = {
	PrepareUploadPokemonRequest,
	UploadPokemonRequest,
	SearchPokemonRequest,
	PrepareTradePokemonRequest,
	TradePokemonRequest,
	DownloadOtherPokemonRequest,
	DownloadMyPokemonRequest,
	DeletePokemonRequest,
	GetTransactionParamRequest,
	PreparePostBankObjectRequest,
	CompletePostBankObjectRequest,
	PrepareGetBankObjectRequest,
	PrepareUpdateBankObjectRequest,
	CompleteUpdateBankObjectRequest,
	RollbackBankObjectRequest,
	GetUnlockKeyRequest,
	RequestMigrationRequest,
	GetMigrationStatusRequest
};
