const Stream = require('../../stream');

const DataStoreTypes = require('../types/datastore');

class GetMetaByOwnerIdResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pMetaInfo = stream.readNEXList(DataStoreTypes.DataStoreMetaInfo);
		this.pHasNext = stream.readBoolean();
	}

	toJSON() {
		return {
			pMetaInfo: {
				__typeName: 'List<DataStoreMetaInfo>',
				__typeValue: this.pMetaInfo
			},
			pHasNext: {
				__typeName: 'boolean',
				__typeValue: this.pHasNext
			}
		};
	}
}

module.exports = {
	GetMetaByOwnerIdResponse
};
