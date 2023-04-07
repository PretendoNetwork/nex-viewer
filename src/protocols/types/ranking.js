const Stream = require('../../stream'); // eslint-disable-line no-unused-vars
const NEXTypes = require('../../types');

class RankingOrderParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.orderCalculation = stream.readUInt8();
		this.groupIndex = stream.readUInt8();
		this.groupNum = stream.readUInt8();
		this.timeScope = stream.readUInt8();
		this.offset = stream.readUInt32LE();
		this.length = stream.readUInt8();
	}

	toJSON() {
		return {
			orderCalculation: {
				__typeName: 'uint8',
				__typeValue: this.orderCalculation
			},
			groupIndex: {
				__typeName: 'uint8',
				__typeValue: this.groupIndex
			},
			groupNum: {
				__typeName: 'uint8',
				__typeValue: this.groupNum
			},
			timeScope: {
				__typeName: 'uint8',
				__typeValue: this.timeScope
			},
			offset: {
				__typeName: 'uint32',
				__typeValue: this.offset
			},
			length: {
				__typeName: 'uint8',
				__typeValue: this.length
			}
		};
	}
}

class RankingRankData extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		let nexVersion;
		if (stream.connection.title.nex_ranking_version) {
			nexVersion = stream.connection.title.nex_ranking_version;
		} else {
			nexVersion = stream.connection.title.nex_version;
		}

		this.principalId = stream.readPID();
		this.uniqueId = stream.readUInt64LE();
		this.order = stream.readUInt32LE();
		this.category = stream.readUInt32LE();
		this.score = stream.readUInt32LE();
		this.groups = stream.readNEXBuffer(); // * Appears on some games as List<byte>
		this.param = stream.readUInt64LE();
		this.commonData = stream.readNEXBuffer();

		if (this._structureHeader.version >= 1) {
			this.updateTime = stream.readNEXDateTime();
		}
	}

	toJSON() {
		const data = {
			principalId: {
				__typeName: 'PID',
				__typeValue: this.principalId
			},
			uniqueId: {
				__typeName: 'uint64',
				__typeValue: this.uniqueId
			},
			order: {
				__typeName: 'uint32',
				__typeValue: this.order
			},
			category: {
				__typeName: 'uint32',
				__typeValue: this.category
			},
			score: {
				__typeName: 'uint32',
				__typeValue: this.score
			},
			groups: {
				__typeName: 'Buffer',
				__typeValue: this.groups
			},
			param: {
				__typeName: 'uint64',
				__typeValue: this.param
			},
			commonData: {
				__typeName: 'Buffer',
				__typeValue: this.commonData
			}
		};

		if (this.updateTime !== undefined) {
			data.updateTime = {
				__typeName: 'DateTime',
				__typeValue: this.updateTime
			};
		}

		return data;
	}
}

class RankingResult extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.rankDataList = stream.readNEXList(RankingRankData);
		this.totalCount = stream.readUInt32LE();
		this.sinceTime = stream.readNEXDateTime();
	}

	toJSON() {
		return {
			rankDataList: {
				__typeName: 'List<RankingRankData>',
				__typeValue: this.rankDataList
			},
			totalCount: {
				__typeName: 'uint32',
				__typeValue: this.totalCount
			},
			sinceTime: {
				__typeName: 'DateTime',
				__typeValue: this.sinceTime
			}
		};
	}
}

class RankingCachedResult extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(RankingResult);
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.createdTime = stream.readNEXDateTime();
		this.expiredTime = stream.readNEXDateTime();
		this.maxLength = stream.readUInt8();
	}

	toJSON() {
		return {
			__typeInherits: this._parentTypes.map(value => ({
				__typeName: value.constructor.name,
				__typeValue: value
			})),
			createdTime: {
				__typeName: 'DateTime',
				__typeValue: this.createdTime
			},
			expiredTime: {
				__typeName: 'DateTime',
				__typeValue: this.expiredTime
			},
			maxLength: {
				__typeName: 'uint8',
				__typeValue: this.maxLength
			}
		};
	}
}

class RankingStats extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.statsList = stream.readNEXList(stream.readDoubleLE);
	}

	toJSON() {
		return {
			statsList: {
				__typeName: 'List<Double>',
				__typeValue: this.statsList
			}
		};
	}
}

class RankingScoreData extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.category = stream.readUInt32LE();
		this.score = stream.readUInt32LE();
		this.orderBy = stream.readUInt8();
		this.updateMode = stream.readUInt8();
		this.groups = stream.readNEXList(stream.readUInt8);
		this.param = stream.readUInt64LE();
	}

	toJSON() {
		return {
			category: {
				__typeName: 'uint32',
				__typeValue: this.category
			},
			score: {
				__typeName: 'uint32',
				__typeValue: this.score
			},
			orderBy: {
				__typeName: 'uint8',
				__typeValue: this.orderBy
			},
			updateMode: {
				__typeName: 'uint8',
				__typeValue: this.updateMode
			},
			groups: {
				__typeName: 'List<uint8>',
				__typeValue: this.groups
			},
			param: {
				__typeName: 'uint64',
				__typeValue: this.param
			},
		};
	}
}

class RankingChangeAttributesParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.modificationFlag = stream.readUInt8();
		this.groups = stream.readNEXList(stream.readUInt8);
		this.param = stream.readUInt64LE();
	}

	toJSON() {
		return {
			modificationFlag: {
				__typeName: 'uint8',
				__typeValue: this.modificationFlag
			},
			groups: {
				__typeName: 'List<uint8>',
				__typeValue: this.groups
			},
			param: {
				__typeName: 'uint64',
				__typeValue: this.param
			},
		};
	}
}

module.exports = {
	RankingOrderParam,
	RankingRankData,
	RankingResult,
	RankingCachedResult,
	RankingStats,
	RankingScoreData,
	RankingChangeAttributesParam
};
