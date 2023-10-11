/**
 * @typedef {import('../../stream')} Stream
 */
const NEXTypes = require('../../types');

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
			__structureVersion: this._structureHeader.version,
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

module.exports = {
	DataStoreGetMetaByOwnerIdParam
};
