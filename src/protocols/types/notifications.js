const Stream = require('../../stream'); // eslint-disable-line no-unused-vars
const NEXTypes = require('../../types');

class NotificationEvent extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		// * This has a different structure on the Switch
		// * On the Switch m_pidSource, m_uiParam1, m_uiParam2 and m_uiParam3 are uint64
		// * In revision 1 of the protocol on Switch, an additional m_mapParam Map<String, Variant> is added

		const nexVersion = stream.connection.title.nex_version;

		this.m_pidSource = stream.readPID();
		this.m_uiType = stream.readUInt32LE();
		this.m_uiParam1 = stream.readUInt32LE();
		this.m_uiParam2 = stream.readUInt32LE();
		this.m_strParam = stream.readNEXString();

		if (nexVersion.major >= 3 && nexVersion.minor >= 4) {
			this.m_uiParam3 = stream.readUInt32LE();
		}
	}

	toJSON() {
		const data = {
			__structureVersion: this._structureHeader.version,
			m_pidSource: {
				__typeName: 'PID',
				__typeValue: this.m_pidSource
			},
			m_uiType: {
				__typeName: 'uint32',
				__typeValue: this.m_uiType
			},
			m_uiParam1: {
				__typeName: 'uint32',
				__typeValue: this.m_uiParam1
			},
			m_uiParam2: {
				__typeName: 'uint32',
				__typeValue: this.m_uiParam2
			},
			m_strParam: {
				__typeName: 'String',
				__typeValue: this.m_strParam
			}
		};

		if (this.m_uiParam3 !== undefined) {
			data.m_uiParam3 = {
				__typeName: 'uint32',
				__typeValue: this.m_uiParam3
			};
		}

		return data;
	}
}

module.exports = {
	NotificationEvent
};
