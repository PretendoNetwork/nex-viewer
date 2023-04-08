const Stream = require('../../stream'); // eslint-disable-line no-unused-vars
const NEXTypes = require('../../types');

class ShopItem extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.itemId = stream.readUInt32LE();
		this.referenceId = stream.readNEXQBuffer();
		this.serviceName = stream.readNEXString();
		this.itemCode = stream.readNEXString();
	}

	toJSON() {
		return {
			itemId: {
				__typeName: 'uint32',
				__typeValue: this.itemId
			},
			referenceId: {
				__typeName: 'qBuffer',
				__typeValue: this.referenceId
			},
			serviceName: {
				__typeName: 'String',
				__typeValue: this.serviceName
			},
			itemCode: {
				__typeName: 'String',
				__typeValue: this.itemCode
			}
		};
	}
}

class ShopItemRights extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.referenceId = stream.readNEXQBuffer();
		this.itemType = stream.readInt8();
		this.attribute = stream.readUInt32LE();
	}

	toJSON() {
		return {
			referenceId: {
				__typeName: 'qBuffer',
				__typeValue: this.referenceId
			},
			itemType: {
				__typeName: 'sint8',
				__typeValue: this.itemType
			},
			attribute: {
				__typeName: 'uint32',
				__typeValue: this.attribute
			}
		};
	}
}

module.exports = {
	ShopItem,
	ShopItemRights
};
