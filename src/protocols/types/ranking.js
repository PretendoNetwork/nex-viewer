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
}

class RankingRankData extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.principalId = stream.readUInt32LE();
		this.uniqueId = stream.readUInt64LE();
		this.order = stream.readUInt32LE();
		this.category = stream.readUInt32LE();
		this.score = stream.readUInt32LE();
		this.groups = stream.readNEXList(stream.readUInt8); // * List<byte>, uint8 is same thing as a byte
		this.param = stream.readUInt64LE();
		this.commonData = stream.readNEXBuffer();
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
}

class RankingStats extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.statsList = stream.readNEXList(stream.readDoubleLE);
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