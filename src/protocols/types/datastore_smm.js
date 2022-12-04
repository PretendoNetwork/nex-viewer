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

	toJSON() {
		return {
			dataId: {
				__typeName: 'uint64',
				__typeValue: this.dataId
			},
			getInfo: {
				__typeName: 'DataStoreReqGetInfo',
				__typeValue: this.getInfo
			}
		};
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
		this.resultRange = stream.readNEXStructure(NEXTypes.ResultRange);
	}

	toJSON() {
		return {
			ownerIds: {
				__typeName: 'List<uint32>',
				__typeValue: this.ownerIds
			},
			dataTypes: {
				__typeName: 'List<uint16>',
				__typeValue: this.dataTypes
			},
			resultOption: {
				__typeName: 'uint8',
				__typeValue: this.resultOption
			},
			resultRange: {
				__typeName: 'ResultRange',
				__typeValue: this.resultRange
			}
		};
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

	toJSON() {
		return {
			dataId: {
				__typeName: 'uint64',
				__typeValue: this.dataId
			},
			applicationId: {
				__typeName: 'uint32',
				__typeValue: this.applicationId
			},
			score: {
				__typeName: 'uint32',
				__typeValue: this.score
			},
			period: {
				__typeName: 'uint16',
				__typeValue: this.period
			}
		};
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
		this.resultRange = stream.readNEXStructure(NEXTypes.ResultRange);
	}

	toJSON() {
		return {
			applicationId: {
				__typeName: 'uint32',
				__typeValue: this.applicationId
			},
			condition: {
				__typeName: 'DataStoreCustomRankingRatingCondition',
				__typeValue: this.condition
			},
			resultOption: {
				__typeName: 'uint8',
				__typeValue: this.resultOption
			},
			resultRange: {
				__typeName: 'ResultRange',
				__typeValue: this.resultRange
			}
		};
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

	toJSON() {
		return {
			slot: {
				__typeName: 'sint8',
				__typeValue: this.slot
			},
			minValue: {
				__typeName: 'sint32',
				__typeValue: this.minValue
			},
			maxValue: {
				__typeName: 'sint32',
				__typeValue: this.maxValue
			}
		};
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

	toJSON() {
		return {
			order: {
				__typeName: 'uint32',
				__typeValue: this.order
			},
			score: {
				__typeName: 'uint32',
				__typeValue: this.score
			},
			metaInfo: {
				__typeName: 'DataStoreMetaInfo',
				__typeValue: this.metaInfo
			}
		};
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

	toJSON() {
		return {
			applicationId: {
				__typeName: 'uint32',
				__typeValue: this.applicationId
			},
			metaInfo: {
				__typeName: 'List<uint64>',
				__typeValue: this.metaInfo
			},
			resultOption: {
				__typeName: 'uint8',
				__typeValue: this.resultOption
			}
		};
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

	toJSON() {
		return {
			dataId: {
				__typeName: 'uint64',
				__typeValue: this.dataId
			},
			slot: {
				__typeName: 'uint32',
				__typeValue: this.slot
			}
		};
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

	toJSON() {
		return {
			postParam: {
				__typeName: 'DataStorePreparePostParam',
				__typeValue: this.postParam
			},
			referDataId: {
				__typeName: 'uint32',
				__typeValue: this.referDataId
			},
			contentType: {
				__typeName: 'String',
				__typeValue: this.contentType
			}
		};
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

	toJSON() {
		return {
			dataId: {
				__typeName: 'uint64',
				__typeValue: this.dataId
			},
			slot: {
				__typeName: 'uint8',
				__typeValue: this.slot
			},
			score: {
				__typeName: 'sint32',
				__typeValue: this.score
			}
		};
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

	toJSON() {
		return {
			dataId: {
				__typeName: 'uint64',
				__typeValue: this.dataId
			},
			slot: {
				__typeName: 'uint8',
				__typeValue: this.slot
			}
		};
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
		this.firstPid = stream.readUInt32LE(); // * NEX stores this as uint32 but is actually PID?
		this.bestPid = stream.readUInt32LE(); // * NEX stores this as uint32 but is actually PID?
		this.bestScore = stream.readInt32LE();
		this.createdTime = stream.readNEXDateTime();
		this.updatedTime = stream.readNEXDateTime();
	}

	toJSON() {
		return {
			dataId: {
				__typeName: 'uint64',
				__typeValue: this.dataId
			},
			slot: {
				__typeName: 'uint8',
				__typeValue: this.slot
			},
			firstPid: {
				__typeName: 'uint32',
				__typeValue: this.firstPid
			},
			bestPid: {
				__typeName: 'uint32',
				__typeValue: this.bestPid
			},
			bestScore: {
				__typeName: 'sint32',
				__typeValue: this.bestScore
			},
			createdTime: {
				__typeName: 'DateTime',
				__typeValue: this.createdTime
			},
			updatedTime: {
				__typeName: 'DateTime',
				__typeValue: this.updatedTime
			}
		};
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

	toJSON() {
		return {
			dataId: {
				__typeName: 'uint64',
				__typeValue: this.dataId
			},
			playablePlatform: {
				__typeName: 'uint32',
				__typeValue: this.playablePlatform
			}
		};
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

	toJSON() {
		return {
			dataId: {
				__typeName: 'uint64',
				__typeValue: this.dataId
			},
			miiName: {
				__typeName: 'String',
				__typeValue: this.miiName
			},
			reportCategory: {
				__typeName: 'uint8',
				__typeValue: this.reportCategory
			},
			reportReason: {
				__typeName: 'String',
				__typeValue: this.reportReason
			}
		};
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