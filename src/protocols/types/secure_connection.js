const Stream = require('../../stream'); // eslint-disable-line no-unused-vars
const NEXTypes = require('../../types');

class NintendoLoginData extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.token = stream.readNEXString();
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
}

module.exports = {
	NintendoLoginData,
	ConnectionData
};