const Stream = require('../../stream'); // eslint-disable-line no-unused-vars
const NEXTypes = require('../../types');

class CommunityRankData extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.unknownId = stream.readUInt32LE();
		this.pid = stream.readPID();
		this.order = stream.readUInt32LE();
		this.gatheringId = stream.readUInt32LE();
		this.unknown1 = stream.readUInt32LE();
		this.score = stream.readUInt32LE();
		this.unknown2 = stream.readUInt64LE();
		this.unknown3 = stream.readUInt8();
		this.rankingData = stream.readNEXBuffer();
	}

	toJSON() {
		return {
			unknownId: {
				__typeName: 'uint32',
				__typeValue: this.unknownId
			},
			pid: {
				__typeName: 'PID',
				__typeValue: this.pid
			},
			order: {
				__typeName: 'uint32',
				__typeValue: this.order
			},
			gatheringId: {
				__typeName: 'uint32',
				__typeValue: this.gatheringId
			},
			unknown1: {
				__typeName: 'uint32',
				__typeValue: this.unknown1
			},
			score: {
				__typeName: 'uint32',
				__typeValue: this.score
			},
			unknown2: {
				__typeName: 'uint64',
				__typeValue: this.unknown2
			},
			unknown3: {
				__typeName: 'uint8',
				__typeValue: this.unknown3
			},
			rankingData: {
				__typeName: 'Buffer',
				__typeValue: this.rankingData
			}
		};
	}
}

module.exports = {
	CommunityRankData
};
