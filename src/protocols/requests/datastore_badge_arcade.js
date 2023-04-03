const Stream = require('../../stream');

const DataStoreBadgeArcadeTypes = require('../types/datastore_badge_arcade');

class GetMetaByOwnerIdRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(DataStoreBadgeArcadeTypes.DataStoreGetMetaByOwnerIdParam);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'DataStoreGetMetaByOwnerIdParam',
				__typeValue: this.param
			}
		};
	}
}

module.exports = {
	GetMetaByOwnerIdRequest
};
