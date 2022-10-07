const Stream = require('../../stream'); // eslint-disable-line no-unused-vars
const NEXTypes = require('../../types');

class UserMessage extends NEXTypes.Data {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_uiID = stream.readUInt32LE();
		this.m_uiParentID = stream.readUInt32LE();
		this.m_pidSender = stream.readUInt32LE();
		this.m_receptiontime = stream.readNEXDateTime();
		this.m_uiLifeTime = stream.readUInt32LE();
		this.m_uiFlags = stream.readUInt32LE();
		this.m_strSubject = stream.readNEXString();
		this.m_strSender = stream.readNEXString();
		this.m_messageRecipient = stream.readNEXStructure(MessageRecipient);
	}
}

class MessageRecipient extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_uiRecipientType = stream.readUInt32LE();
		this.m_principalId = stream.readUInt32LE();
		this.m_gatheringId = stream.readUInt32LE();
	}
}

class TextMessage extends UserMessage {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_strTextBody = stream.readNEXString();
	}
}

class BinaryMessage extends UserMessage {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_binaryBody = stream.readNEXQBuffer();
	}
}

NEXTypes.AnyDataHolder.addType('TextMessage', TextMessage);
NEXTypes.AnyDataHolder.addType('BinaryMessage', BinaryMessage);

module.exports = {
	UserMessage,
	MessageRecipient,
	TextMessage,
	BinaryMessage
};