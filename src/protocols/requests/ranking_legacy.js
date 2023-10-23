/**
 * @typedef {import('../../stream')} Stream
 */

class UploadCommonDataRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.uniqueId = stream.readUInt32LE();
		this.commonData = stream.readNEXBuffer();
	}

	toJSON() {
		return {
			uniqueId: {
				__typeName: 'uint32',
				__typeValue: this.uniqueId
			},
			commonData: {
				__typeName: 'Buffer',
				__typeValue: this.commonData
			}
		};
	}
}

class UnknownMethod0xERequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.rankingMode = stream.readUInt8();
		this.category = stream.readUInt32LE();
		this.scoreIndex = stream.readUInt8();
		this.unknown1 = stream.readUInt8();
		this.unknown2 = stream.readUInt8();
		this.unknown3 = stream.readUInt8();
		this.unknown4 = stream.readUInt8();
		this.unknown5 = stream.readUInt8();
		this.unknown6 = stream.readUInt32LE();
		this.offset = stream.readUInt32LE();
		this.length = stream.readUInt8();
	}

	toJSON() {
		return {
			rankingMode: {
				__typeName: 'uint8',
				__typeValue: this.rankingMode
			},
			category: {
				__typeName: 'uint32',
				__typeValue: this.category
			},
			scoreIndex: {
				__typeName: 'uint8',
				__typeValue: this.scoreIndex
			},
			unknown1: {
				__typeName: 'uint8',
				__typeValue: this.unknown1
			},
			unknown2: {
				__typeName: 'uint8',
				__typeValue: this.unknown2
			},
			unknown3: {
				__typeName: 'uint8',
				__typeValue: this.unknown3
			},
			unknown4: {
				__typeName: 'uint8',
				__typeValue: this.unknown4
			},
			unknown5: {
				__typeName: 'uint8',
				__typeValue: this.unknown5
			},
			unknown6: {
				__typeName: 'uint32',
				__typeValue: this.unknown6
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

class UnknownMethod0xFRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.uniqueId = stream.readUInt32LE();
		this.category = stream.readUInt32LE();
		this.scoreIndex = stream.readUInt8();
		this.unknown1 = stream.readUInt8();
		this.unknown2 = stream.readUInt8();
		this.unknown3 = stream.readUInt8();
		this.unknown4 = stream.readUInt8();
		this.unknown5 = stream.readUInt8();
		this.unknown6 = stream.readUInt32LE();
		this.length = stream.readUInt8();
	}

	toJSON() {
		return {
			uniqueId: {
				__typeName: 'uint32',
				__typeValue: this.uniqueId
			},
			category: {
				__typeName: 'uint32',
				__typeValue: this.category
			},
			scoreIndex: {
				__typeName: 'uint8',
				__typeValue: this.scoreIndex
			},
			unknown1: {
				__typeName: 'uint8',
				__typeValue: this.unknown1
			},
			unknown2: {
				__typeName: 'uint8',
				__typeValue: this.unknown2
			},
			unknown3: {
				__typeName: 'uint8',
				__typeValue: this.unknown3
			},
			unknown4: {
				__typeName: 'uint8',
				__typeValue: this.unknown4
			},
			unknown5: {
				__typeName: 'uint8',
				__typeValue: this.unknown5
			},
			unknown6: {
				__typeName: 'uint32',
				__typeValue: this.unknown6
			},
			length: {
				__typeName: 'uint8',
				__typeValue: this.length
			}
		};
	}
}

class GetTotalRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.category = stream.readUInt32LE();
		this.unknown1 = stream.readUInt8();
		this.unknown2 = stream.readUInt8();
		this.unknown3 = stream.readUInt8();
		this.unknown4 = stream.readUInt32LE();
	}

	toJSON() {
		return {
			category: {
				__typeName: 'uint32',
				__typeValue: this.category
			},
			unknown1: {
				__typeName: 'uint8',
				__typeValue: this.unknown1
			},
			unknown2: {
				__typeName: 'uint8',
				__typeValue: this.unknown2
			},
			unknown3: {
				__typeName: 'uint8',
				__typeValue: this.unknown3
			},
			unknown4: {
				__typeName: 'uint32',
				__typeValue: this.unknown4
			}
		};
	}
}

class UploadScoreWithLimitRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.uniqueId = stream.readUInt32LE();
		this.category = stream.readUInt32LE();
		this.scores = stream.readNEXList(stream.readUInt32LE);
		this.unknown4 = stream.readUInt8();
		this.unknown5 = stream.readUInt32LE();
		this.unknown6 = stream.readUInt16LE();
	}

	toJSON() {
		return {
			uniqueId: {
				__typeName: 'uint32',
				__typeValue: this.uniqueId
			},
			category: {
				__typeName: 'uint32',
				__typeValue: this.category
			},
			scores: {
				__typeName: 'List<uint32>',
				__typeValue: this.scores
			},
			unknown4: {
				__typeName: 'uint8',
				__typeValue: this.unknown4
			},
			unknown5: {
				__typeName: 'uint32',
				__typeValue: this.unknown5
			},
			unknown6: {
				__typeName: 'uint16',
				__typeValue: this.unknown6
			}
		};
	}
}

class UploadSpecificPeriodScoreRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.uniqueId = stream.readUInt32LE();
		this.category = stream.readUInt32LE();
		this.score = stream.readUInt32LE();
		this.unknown1 = stream.readUInt8();
		this.unknown2 = stream.readUInt32LE();
		this.unknown3 = stream.readUInt16LE();
	}

	toJSON() {
		return {
			uniqueId: {
				__typeName: 'uint32',
				__typeValue: this.uniqueId
			},
			category: {
				__typeName: 'uint32',
				__typeValue: this.category
			},
			score: {
				__typeName: 'uint32',
				__typeValue: this.score
			},
			unknown1: {
				__typeName: 'uint8',
				__typeValue: this.unknown1
			},
			unknown2: {
				__typeName: 'uint32',
				__typeValue: this.unknown2
			},
			unknown3: {
				__typeName: 'uint16',
				__typeValue: this.unknown3
			}
		};
	}
}

class GetSpecificPeriodDataListRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.uniqueId = stream.readUInt32LE();
		this.category = stream.readUInt32LE();
		this.unknown1 = stream.readUInt8();
		this.unknown2 = stream.readUInt8();
		this.unknown3 = stream.readUInt8();
		this.offset = stream.readUInt32LE();
		this.length = stream.readUInt8();
	}

	toJSON() {
		return {
			uniqueId: {
				__typeName: 'uint32',
				__typeValue: this.uniqueId
			},
			category: {
				__typeName: 'uint32',
				__typeValue: this.category
			},
			unknown1: {
				__typeName: 'uint8',
				__typeValue: this.unknown1
			},
			unknown2: {
				__typeName: 'uint8',
				__typeValue: this.unknown2
			},
			unknown3: {
				__typeName: 'uint8',
				__typeValue: this.unknown3
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

class GetSpecificPeriodTotalRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.category = stream.readUInt32LE();
	}

	toJSON() {
		return {
			category: {
				__typeName: 'uint32',
				__typeValue: this.category
			}
		};
	}
}

module.exports = {
	UploadCommonDataRequest,
	UnknownMethod0xERequest,
	UnknownMethod0xFRequest,
	GetTotalRequest,
	UploadScoreWithLimitRequest,
	UploadSpecificPeriodScoreRequest,
	GetSpecificPeriodDataListRequest,
	GetSpecificPeriodTotalRequest
};
