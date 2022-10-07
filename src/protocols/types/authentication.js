const Stream = require('../../stream'); // eslint-disable-line no-unused-vars
const NEXTypes = require('../../types');

class AuthenticationInfo extends NEXTypes.Data {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_authToken = stream.readNEXString();
		this.m_ngsVersion = stream.readUInt32LE();

		if (this.m_ngsVersion > 2) {
			this.m_authTokenType = stream.readUInt8();
			this.m_serverVersion = stream.readUInt32LE();
		}
	}
}
NEXTypes.AnyDataHolder.addType('AuthenticationInfo', AuthenticationInfo);

module.exports = {
	AuthenticationInfo
};