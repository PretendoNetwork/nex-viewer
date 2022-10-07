const Stream = require('../../stream'); // eslint-disable-line no-unused-vars
const NEXTypes = require('../../types');

const DataStoreTypes = require('./datastore');

class DataStoreFileServerObjectInfo extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt64LE();
		this.getInfo = stream.readNEXStructure(DataStoreTypes.DataStoreReqGetInfo);
	}
}

class DataStoreGetMetaByOwnerIdParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.ownerIds = stream.readNEXList(stream.readUInt32LE);
		this.dataTypes = stream.readNEXList(stream.readUInt16LE);
		this.resultOption = stream.readUInt8();
		this.getInfo = stream.readNEXStructure(NEXTypes.ResultRange);
	}
}

class DataStoreRateCustomRankingParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt64LE();
		this.applicationId = stream.readUInt32LE();
		this.score = stream.readUInt32LE();
		this.period = stream.readUInt16LE();
	}
}

class DataStoreGetCustomRankingParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.applicationId = stream.readUInt32LE();
		this.condition = stream.readNEXStructure(DataStoreCustomRankingRatingCondition);
		this.resultOption = stream.readUInt8();
		this.resultOption = stream.readNEXStructure(NEXTypes.ResultRange);
	}
}

class DataStoreCustomRankingRatingCondition extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.slot = stream.readInt8();
		this.minValue = stream.readInt32LE();
		this.maxValue = stream.readInt32LE();
	}
}

class DataStoreCustomRankingResult extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.order = stream.readUInt32LE();
		this.score = stream.readUInt32LE();
		this.metaInfo = stream.readNEXStructure(DataStoreTypes.DataStoreMetaInfo);
	}
}

class DataStoreGetCustomRankingByDataIdParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.applicationId = stream.readUInt32LE();
		this.metaInfo = stream.readNEXList(stream.readUInt64LE);
		this.resultOption = stream.readUInt8();
	}
}

class BufferQueueParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt64LE();
		this.slot = stream.readUInt32LE();
	}
}

class DataStoreAttachFileParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.postParam = stream.readNEXStructure(DataStoreTypes.DataStorePreparePostParam);
		this.referDataId = stream.readUInt64LE();
		this.contentType = stream.readNEXString();
	}
}

class DataStoreUploadCourseRecordParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt64LE();
		this.slot = stream.readUInt8();
		this.score = stream.readInt32LE();
	}
}

class DataStoreGetCourseRecordParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt64LE();
		this.slot = stream.readUInt8();
	}
}

class DataStoreGetCourseRecordResult extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt64LE();
		this.slot = stream.readUInt8();
		this.firstPid = stream.readUInt32LE();
		this.bestPid = stream.readUInt32LE();
		this.bestScore = stream.readInt32LE();
		this.createdTime = stream.readNEXDateTime();
		this.updatedTime = stream.readNEXDateTime();
	}
}

class DataStoreChangePlayablePlatformParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt64LE();
		this.playablePlatform = stream.readUInt32LE();
	}
}

class DataStoreReportCourseParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.dataId = stream.readUInt64LE();
		this.miiName = stream.readNEXString();
		this.reportCategory = stream.readUInt8();
		this.reportReason = stream.readNEXString();
	}
}

module.exports = {
	DataStoreFileServerObjectInfo,
	DataStoreGetMetaByOwnerIdParam,
	DataStoreRateCustomRankingParam,
	DataStoreGetCustomRankingParam,
	DataStoreCustomRankingRatingCondition,
	DataStoreCustomRankingResult,
	DataStoreGetCustomRankingByDataIdParam,
	BufferQueueParam,
	DataStoreAttachFileParam,
	DataStoreUploadCourseRecordParam,
	DataStoreGetCourseRecordParam,
	DataStoreGetCourseRecordResult,
	DataStoreChangePlayablePlatformParam,
	DataStoreReportCourseParam
};