/**
 * @typedef {import('../../stream')} Stream
 */
const NEXTypes = require('../../types');

class AccountExtraInfo extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.token = stream.readNEXString();
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			token: {
				__typeName: 'String',
				__typeValue: this.token
			}
		};
	}
}
NEXTypes.AnyDataHolder.addType('AccountExtraInfo', AccountExtraInfo);

class NintendoLoginData extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.token = stream.readNEXString();
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			token: {
				__typeName: 'String',
				__typeValue: this.token
			}
		};
	}
}
NEXTypes.AnyDataHolder.addType('NintendoLoginData', NintendoLoginData);

class ConnectionData extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_StationUrl = stream.readNEXStructure(NEXTypes.StationURL);
		this.m_ConnectionID = stream.readUInt32LE();
	}

	toJSON() {
		return {
			m_StationUrl: {
				__typeName: 'StationURL',
				__typeValue: this.m_StationUrl
			},
			m_ConnectionID: {
				__typeName: 'uint32',
				__typeValue: this.m_ConnectionID
			},
		};
	}
}

module.exports = {
	AccountExtraInfo,
	NintendoLoginData,
	ConnectionData
};
