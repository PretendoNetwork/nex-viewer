const Stream = require('../../stream'); // eslint-disable-line no-unused-vars
const NEXTypes = require('../../types');

class ShopPostPlayLogParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.unknown1 = stream.readNEXList(stream.readUInt32LE);
		this.timestamp = stream.readNEXDateTime();
		this.unknown2 = stream.readNEXString();
	}

	toJSON() {
		return {
			unknown1: {
				__typeName: 'List<uint32>',
				__typeValue: this.unknown1
			},
			timestamp: {
				__typeName: 'DateTime',
				__typeValue: this.timestamp
			},
			unknown2: {
				__typeName: 'String',
				__typeValue: this.unknown2
			}
		};
	}
}

module.exports = {
	ShopPostPlayLogParam
};
