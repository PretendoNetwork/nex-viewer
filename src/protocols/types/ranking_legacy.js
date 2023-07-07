const Stream = require('../../stream'); // eslint-disable-line no-unused-vars
const NEXTypes = require('../../types');

class RankingData extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.uniqueId = stream.readUInt32LE();
		this.pid = stream.readPID();
		this.order = stream.readUInt32LE();
		this.category = stream.readUInt32LE();
		this.scores = stream.readNEXList(stream.readUInt32LE);
		this.unknown1 = stream.readUInt8();
		this.unknown2 = stream.readUInt32LE();
		this.commonData = stream.readNEXBuffer();
	}

	toJSON() {
		return {
			uniqueId: {
				__typeName: 'uint32',
				__typeValue: this.uniqueId
			},
			pid: {
				__typeName: 'PID',
				__typeValue: this.pid
			},
			order: {
				__typeName: 'uint32',
				__typeValue: this.order
			},
			category: {
				__typeName: 'uint32',
				__typeValue: this.category
			},
			scores: {
				__typeName: 'List<uint32>',
				__typeValue: this.scores
			},
			unknown1: {
				__typeName: 'uint8',
				__typeValue: this.unknown1
			},
			unknown2: {
				__typeName: 'uint32',
				__typeValue: this.unknown2
			},
			commonData: {
				__typeName: 'Buffer',
				__typeValue: this.commonData
			}
		};
	}
}

module.exports = {
	RankingData
};
