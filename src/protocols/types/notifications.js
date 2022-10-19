const Stream = require('../../stream'); // eslint-disable-line no-unused-vars
const NEXTypes = require('../../types');

class NotificationEvent extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		// * This has a different structure on the Switch
		// * On the Switch m_pidSource, m_uiParam1 and m_uiParam2 are uint64
		// * A 3rd m_uiParam3 uint64 is also added
		// * In revision 1 of the protocol on Switch, an additional m_mapParam Map<String, Variant> is added

		this.m_pidSource = stream.readUInt32LE();
		this.m_uiType = stream.readUInt32LE();
		this.m_uiParam1 = stream.readUInt32LE();
		this.m_uiParam1 = stream.readUInt32LE();
		this.m_strParam = stream.readNEXString();
	}
}

module.exports = {
	NotificationEvent
};