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
}

module.exports = {
	NintendoNotificationEvent,
	NintendoNotificationEventGeneral,
	NintendoNotificationEventProfile
};