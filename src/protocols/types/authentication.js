const Stream = require('../../stream'); // eslint-disable-line no-unused-vars
const NEXTypes = require('../../types');

class AuthenticationInfo extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(NEXTypes.Data);
	}

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

	toJSON() {
		const data = {
			__typeInherits: this._parentTypes.map(value => ({
				__typeName: value.constructor.name,
				__typeValue: value
			})),
			m_authToken: {
				__typeName: 'String',
				__typeValue: this.m_authToken
			},
			m_ngsVersion: {
				__typeName: 'uint32',
				__typeValue: this.m_ngsVersion
			}
		};

		if (this.m_ngsVersion > 2) {
			data.m_authTokenType = {
				__typeName: 'uint8',
				__typeValue: this.m_authTokenType
			};

			data.m_serverVersion = {
				__typeName: 'uint32',
				__typeValue: this.m_serverVersion
			};
		}

		return data;
	}
}
NEXTypes.AnyDataHolder.addType('AuthenticationInfo', AuthenticationInfo);

module.exports = {
	AuthenticationInfo
};