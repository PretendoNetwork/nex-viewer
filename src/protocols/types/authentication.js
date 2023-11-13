/**
 * @typedef {import('../../stream')} Stream
 */
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
			__structureVersion: this._structureHeader.version,
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

class ValidateAndRequestTicketParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.platformType = stream.readUInt32LE();
		this.userName = stream.readNEXString();
		this.extraData = stream.readNEXAnyDataHolder();
		this.ignoreApiVersionCheck = stream.readBoolean();
		this.apiVersionGeneral = stream.readUInt32LE();
		this.apiVersionCustom = stream.readUInt32LE();

		if (stream.hasDataLeft()) {
			this.platformTypeForPlatformPid = stream.readUInt8();
		}
	}

	toJSON() {
		const data = {
			__structureVersion: this._structureHeader.version,
			platformType: {
				__typeName: 'uint32',
				__typeValue: this.platformType
			},
			userName: {
				__typeName: 'String',
				__typeValue: this.userName
			},
			extraData: {
				__typeName: 'AnyDataHolder',
				__typeValue: this.extraData
			},
			ignoreApiVersionCheck: {
				__typeName: 'boolean',
				__typeValue: this.ignoreApiVersionCheck
			},
			apiVersionGeneral: {
				__typeName: 'uint32',
				__typeValue: this.apiVersionGeneral
			},
			apiVersionCustom: {
				__typeName: 'uint32',
				__typeValue: this.apiVersionCustom
			}
		};

		if (this.platformTypeForPlatformPid !== undefined) {
			data.platformTypeForPlatformPid = {
				__typeName: 'uint8',
				__typeValue: this.platformTypeForPlatformPid
			};
		}

		return data;
	}
}

class ValidateAndRequestTicketResult extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.sourcePid = stream.readPID();
		this.bufResponse = stream.readNEXBuffer();
		this.serviceNodeUrl = stream.readNEXStationURL();
		this.currentUtcTime = stream.readNEXDateTime();
		this.returnMsg = stream.readNEXString();
		this.sourceKey = stream.readNEXString();

		if (stream.hasDataLeft()) {
			this.platformPid = stream.readPID();
		}
	}

	toJSON() {
		const data = {
			__structureVersion: this._structureHeader.version,
			sourcePid: {
				__typeName: 'PID',
				__typeValue: this.sourcePid
			},
			bufResponse: {
				__typeName: 'Buffer',
				__typeValue: this.bufResponse
			},
			serviceNodeUrl: {
				__typeName: 'StationURL',
				__typeValue: this.serviceNodeUrl
			},
			currentUtcTime: {
				__typeName: 'DateTime',
				__typeValue: this.currentUtcTime
			},
			returnMsg: {
				__typeName: 'String',
				__typeValue: this.returnMsg
			},
			sourceKey: {
				__typeName: 'String',
				__typeValue: this.sourceKey
			}
		};

		if (this.platformPid !== undefined) {
			data.platformPid = {
				__typeName: 'PID',
				__typeValue: this.platformPid
			};
		}

		return data;
	}
}

module.exports = {
	AuthenticationInfo,
	ValidateAndRequestTicketParam,
	ValidateAndRequestTicketResult
};
