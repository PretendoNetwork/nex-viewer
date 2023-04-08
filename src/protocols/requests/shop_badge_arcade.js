const Stream = require('../../stream'); // eslint-disable-line no-unused-vars

const ShopBadgeArcadeTypes = require('../types/shop_badge_arcade');

class GetRivTokenRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.itemCode = stream.readNEXString();
		this.referenceId = stream.readNEXQBuffer();
	}

	toJSON() {
		return {
			itemCode: {
				__typeName: 'String',
				__typeValue: this.itemCode
			},
			referenceId: {
				__typeName: 'qBuffer',
				__typeValue: this.referenceId
			}
		};
	}
}

class PostPlayLogRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.param = stream.readNEXStructure(ShopBadgeArcadeTypes.ShopPostPlayLogParam);
	}

	toJSON() {
		return {
			param: {
				__typeName: 'ShopPostPlayLogParam',
				__typeValue: this.param
			}
		};
	}
}

module.exports = {
	GetRivTokenRequest,
	PostPlayLogRequest
};
