/**
 * @typedef {import('../../stream')} Stream
 */
const NEXTypes = require('../../types');

class GlobalTradeStationRecordKey extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt64LE();
		this.password = stream.readUInt64LE();
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			dataId: {
				__typeName: 'uint64',
				__typeValue: this.dataId
			},
			password: {
				__typeName: 'uint64',
				__typeValue: this.password
			}
		};
	}
}

class GlobalTradeStationUploadPokemonParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.prepareUploadKey = stream.readNEXStructure(GlobalTradeStationRecordKey);
		this.period = stream.readUInt16LE();
		this.indexData = stream.readNEXQBuffer();
		this.pokemonData = stream.readNEXQBuffer();
		this.signature = stream.readNEXQBuffer();
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			prepareUploadKey: {
				__typeName: 'GlobalTradeStationRecordKey',
				__typeValue: this.prepareUploadKey
			},
			period: {
				__typeName: 'uint16',
				__typeValue: this.period
			},
			indexData: {
				__typeName: 'qBuffer',
				__typeValue: this.indexData
			},
			pokemonData: {
				__typeName: 'qBuffer',
				__typeValue: this.pokemonData
			},
			signature: {
				__typeName: 'qBuffer',
				__typeValue: this.signature
			}
		};
	}
}

class GlobalTradeStationSearchPokemonParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.prepareUploadKey = stream.readNEXStructure(GlobalTradeStationRecordKey);
		this.conditions = stream.readNEXList(stream.readUInt32);
		this.resultOrderColumn = stream.readUInt8();
		this.resultOrder = stream.readUInt8();
		this.uploadedAfter = stream.readNEXDateTime();
		this.uploadedBefore = stream.readNEXDateTime();
		this.resultRange = stream.readNEXStructure(NEXTypes.ResultRange);
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			prepareUploadKey: {
				__typeName: 'GlobalTradeStationRecordKey',
				__typeValue: this.prepareUploadKey
			},
			conditions: {
				__typeName: 'List<uint32>',
				__typeValue: this.conditions
			},
			resultOrderColumn: {
				__typeName: 'uint8',
				__typeValue: this.resultOrderColumn
			},
			resultOrder: {
				__typeName: 'uint8',
				__typeValue: this.resultOrder
			},
			uploadedAfter: {
				__typeName: 'DateTime',
				__typeValue: this.uploadedAfter
			},
			uploadedBefore: {
				__typeName: 'DateTime',
				__typeValue: this.uploadedBefore
			},
			resultRange: {
				__typeName: 'ResultRange',
				__typeValue: this.resultRange
			}
		};
	}
}

class GlobalTradeStationTradeKey extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt64LE();
		this.version = stream.readUInt32LE();
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			dataId: {
				__typeName: 'uint64',
				__typeValue: this.dataId
			},
			version: {
				__typeName: 'uint32',
				__typeValue: this.version
			}
		};
	}
}

class GlobalTradeStationData extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt64LE();
		this.ownerId = stream.readPID();
		this.uploadedTime = stream.readNEXDateTime();
		this.indexData = stream.readNEXQBuffer();
		this.version = stream.readUInt32LE();
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			dataId: {
				__typeName: 'uint64',
				__typeValue: this.dataId
			},
			ownerId: {
				__typeName: 'PID',
				__typeValue: this.ownerId
			},
			uploadedTime: {
				__typeName: 'DateTime',
				__typeValue: this.uploadedTime
			},
			indexData: {
				__typeName: 'qBuffer',
				__typeValue: this.indexData
			},
			version: {
				__typeName: 'uint32',
				__typeValue: this.version
			}
		};
	}
}

class GlobalTradeStationSearchPokemonResult extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.totalCount = stream.readUInt32LE();
		this.result = stream.readNEXList(GlobalTradeStationData);
		this.totalCountType = stream.readUInt8();
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			totalCount: {
				__typeName: 'uint32',
				__typeValue: this.totalCount
			},
			result: {
				__typeName: 'List<GlobalTradeStationData>',
				__typeValue: this.result
			},
			totalCountType: {
				__typeName: 'uint8',
				__typeValue: this.totalCountType
			}
		};
	}
}

class GlobalTradeStationTradePokemonParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.tradeKey = stream.readNEXStructure(GlobalTradeStationTradeKey);
		this.prepareTradeKey = stream.readNEXStructure(GlobalTradeStationRecordKey);
		this.prepareUploadKey = stream.readNEXStructure(GlobalTradeStationRecordKey);
		this.period = stream.readUInt16LE();
		this.indexData = stream.readNEXQBuffer();
		this.pokemonData = stream.readNEXQBuffer();
		this.signature = stream.readNEXQBuffer();
		this.needData = stream.readBoolean();
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			tradeKey: {
				__typeName: 'GlobalTradeStationTradeKey',
				__typeValue: this.tradeKey
			},
			prepareTradeKey: {
				__typeName: 'GlobalTradeStationRecordKey',
				__typeValue: this.prepareTradeKey
			},
			prepareUploadKey: {
				__typeName: 'GlobalTradeStationRecordKey',
				__typeValue: this.prepareUploadKey
			},
			period: {
				__typeName: 'uint16',
				__typeValue: this.period
			},
			indexData: {
				__typeName: 'qBuffer',
				__typeValue: this.indexData
			},
			pokemonData: {
				__typeName: 'qBuffer',
				__typeValue: this.pokemonData
			},
			signature: {
				__typeName: 'qBuffer',
				__typeValue: this.signature
			},
			needData: {
				__typeName: 'boolean',
				__typeValue: this.needData
			}
		};
	}
}

class GlobalTradeStationDownloadOtherPokemonParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.prepareUploadKey = stream.readNEXStructure(GlobalTradeStationRecordKey);
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			prepareUploadKey: {
				__typeName: 'GlobalTradeStationRecordKey',
				__typeValue: this.prepareUploadKey
			}
		};
	}
}

class GlobalTradeStationDownloadMyPokemonParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.prepareUploadKey = stream.readNEXStructure(GlobalTradeStationRecordKey);
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			prepareUploadKey: {
				__typeName: 'GlobalTradeStationRecordKey',
				__typeValue: this.prepareUploadKey
			}
		};
	}
}

class GlobalTradeStationTradePokemonResult extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.result = stream.readNEXStructure(GlobalTradeStationDownloadPokemonResult);
		this.myDataId = stream.readUInt64LE();
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			result: {
				__typeName: 'GlobalTradeStationDownloadPokemonResult',
				__typeValue: this.result
			},
			myDataId: {
				__typeName: 'uint64',
				__typeValue: this.myDataId
			}
		};
	}
}

class GlobalTradeStationDownloadMyPokemonResult extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.result = stream.readNEXStructure(GlobalTradeStationDownloadPokemonResult);
		this.isTraded = stream.readBoolean();
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			result: {
				__typeName: 'GlobalTradeStationDownloadPokemonResult',
				__typeValue: this.result
			},
			isTraded: {
				__typeName: 'boolean',
				__typeValue: this.isTraded
			}
		};
	}
}

class GlobalTradeStationPrepareTradePokemonParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.tradeKey = stream.readNEXStructure(GlobalTradeStationTradeKey);
		this.prepareUploadKey = stream.readNEXStructure(GlobalTradeStationRecordKey);
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			tradeKey: {
				__typeName: 'GlobalTradeStationTradeKey',
				__typeValue: this.tradeKey
			},
			prepareUploadKey: {
				__typeName: 'GlobalTradeStationRecordKey',
				__typeValue: this.prepareUploadKey
			}
		};
	}
}

class GlobalTradeStationPrepareTradePokemonResult extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.result = stream.readNEXStructure(GlobalTradeStationDownloadPokemonResult);
		this.prepareTradeKey = stream.readNEXStructure(GlobalTradeStationRecordKey);
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			result: {
				__typeName: 'GlobalTradeStationDownloadPokemonResult',
				__typeValue: this.result
			},
			prepareUploadKey: {
				__typeName: 'GlobalTradeStationRecordKey',
				__typeValue: this.prepareTradeKey
			}
		};
	}
}

class GlobalTradeStationDeletePokemonParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.prepareUploadKey = stream.readNEXStructure(GlobalTradeStationRecordKey);
		this.deleteFlag = stream.readUInt8();
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			prepareUploadKey: {
				__typeName: 'GlobalTradeStationRecordKey',
				__typeValue: this.prepareUploadKey
			},
			deleteFlag: {
				__typeName: 'uint8',
				__typeValue: this.deleteFlag
			}
		};
	}
}

class GlobalTradeStationDownloadPokemonResult extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt64LE();
		this.indexData = stream.readNEXQBuffer();
		this.pokemonData = stream.readNEXQBuffer();
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			dataId: {
				__typeName: 'uint64',
				__typeValue: this.dataId
			},
			indexData: {
				__typeName: 'qBuffer',
				__typeValue: this.indexData
			},
			pokemonData: {
				__typeName: 'qBuffer',
				__typeValue: this.pokemonData
			}
		};
	}
}

class BankTransactionParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt64LE();
		this.curVersion = stream.readUInt32LE();
		this.updateVersion = stream.readUInt32LE();
		this.size = stream.readUInt32LE();
		this.transactionPassword = stream.readUInt64LE();
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			dataId: {
				__typeName: 'uint64',
				__typeValue: this.dataId
			},
			curVersion: {
				__typeName: 'uint32',
				__typeValue: this.curVersion
			},
			updateVersion: {
				__typeName: 'uint32',
				__typeValue: this.updateVersion
			},
			size: {
				__typeName: 'uint32',
				__typeValue: this.size
			},
			transactionPassword: {
				__typeName: 'uint64',
				__typeValue: this.transactionPassword
			}
		};
	}
}

class BankMigrationInfo extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.migrationStatus = stream.readUInt32LE();
		this.updatedTime = stream.readNEXDateTime();
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			migrationStatus: {
				__typeName: 'uint32',
				__typeValue: this.migrationStatus
			},
			updatedTime: {
				__typeName: 'DateTime',
				__typeValue: this.updatedTime
			}
		};
	}
}

module.exports = {
	GlobalTradeStationRecordKey,
	GlobalTradeStationUploadPokemonParam,
	GlobalTradeStationSearchPokemonParam,
	GlobalTradeStationTradeKey,
	GlobalTradeStationData,
	GlobalTradeStationSearchPokemonResult,
	GlobalTradeStationTradePokemonParam,
	GlobalTradeStationDownloadOtherPokemonParam,
	GlobalTradeStationDownloadMyPokemonParam,
	GlobalTradeStationTradePokemonResult,
	GlobalTradeStationDownloadMyPokemonResult,
	GlobalTradeStationPrepareTradePokemonParam,
	GlobalTradeStationPrepareTradePokemonResult,
	GlobalTradeStationDeletePokemonParam,
	GlobalTradeStationDownloadPokemonResult,
	BankTransactionParam,
	BankMigrationInfo
};
