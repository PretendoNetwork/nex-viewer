/**
 * @typedef {import('../../stream')} Stream
 */
const NEXTypes = require('../../types');

class UniqueIdInfo extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.nexUniqueId = stream.readUInt64LE();
		this.nexUniqueIdPassword = stream.readUInt64LE();
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			nexUniqueId: {
				__typeName: 'uint64',
				__typeValue: this.nexUniqueId
			},
			nexUniqueIdPassword: {
				__typeName: 'uint64',
				__typeValue: this.nexUniqueIdPassword
			}
		};
	}
}

module.exports = {
	UniqueIdInfo
};
