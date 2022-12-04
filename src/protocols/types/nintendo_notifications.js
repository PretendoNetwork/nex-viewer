const Stream = require('../../stream'); // eslint-disable-line no-unused-vars
const NEXTypes = require('../../types');

class NintendoNotificationEvent extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(NEXTypes.Data);
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_uiType = stream.readUInt32LE();
		this.m_pidSender = stream.readUInt32LE();
		this.m_dataholder = stream.readNEXAnyDataHolder();
	}

	toJSON() {
		return {
			m_uiType: {
				__typeName: 'uint32',
				__typeValue: this.m_uiType
			},
			m_pidSender: {
				__typeName: 'PID',
				__typeValue: this.m_pidSender
			},
			m_dataholder: {
				__typeName: 'AnyDataHolder',
				__typeValue: this.m_dataholder
			}
		};
	}
}

class NintendoNotificationEventGeneral extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(NEXTypes.Data);
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_u32Param = stream.readUInt32LE();
		this.m_u64Param1 = stream.readUInt64LE();
		this.m_u64Param2 = stream.readUInt64LE();
		this.m_strParam = stream.readNEXString();
	}

	toJSON() {
		return {
			m_u32Param: {
				__typeName: 'uint32',
				__typeValue: this.m_u32Param
			},
			m_u64Param1: {
				__typeName: 'uint64',
				__typeValue: this.m_u64Param1
			},
			m_u64Param2: {
				__typeName: 'uint64',
				__typeValue: this.m_u64Param2
			},
			m_strParam: {
				__typeName: 'String',
				__typeValue: this.m_strParam
			}
		};
	}
}
NEXTypes.AnyDataHolder.addType('NintendoNotificationEventGeneral', NintendoNotificationEventGeneral);

class NintendoNotificationEventProfile extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(NEXTypes.Data);
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_region = stream.readUInt8();
		this.m_country = stream.readUInt8();
		this.m_area = stream.readUInt8();
		this.m_language = stream.readUInt8();
		this.m_platform = stream.readUInt8();
	}

	toJSON() {
		return {
			m_region: {
				__typeName: 'uint8',
				__typeValue: this.m_region
			},
			m_country: {
				__typeName: 'uint8',
				__typeValue: this.m_country
			},
			m_area: {
				__typeName: 'uint8',
				__typeValue: this.m_area
			},
			m_language: {
				__typeName: 'uint8',
				__typeValue: this.m_language
			},
			m_platform: {
				__typeName: 'uint8',
				__typeValue: this.m_platform
			}
		};
	}
}

module.exports = {
	NintendoNotificationEvent,
	NintendoNotificationEventGeneral,
	NintendoNotificationEventProfile
};