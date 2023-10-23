/**
 * @typedef {import('../../stream')} Stream
 */
const NEXTypes = require('../../types');

class MessageRecipient extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_uiRecipientType = stream.readUInt32LE();
		this.m_principalId = stream.readPID();
		this.m_gatheringId = stream.readUInt32LE();
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			m_uiRecipientType: {
				__typeName: 'uint32',
				__typeValue: this.m_uiRecipientType
			},
			m_principalId: {
				__typeName: 'PID',
				__typeValue: this.m_principalId
			},
			m_gatheringId: {
				__typeName: 'uint32',
				__typeValue: this.m_gatheringId
			}
		};
	}
}

class UserMessage extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(NEXTypes.Data);
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_uiID = stream.readUInt32LE();
		this.m_uiParentID = stream.readUInt32LE();
		this.m_pidSender = stream.readPID();
		this.m_receptiontime = stream.readNEXDateTime();
		this.m_uiLifeTime = stream.readUInt32LE();
		this.m_uiFlags = stream.readUInt32LE();
		this.m_strSubject = stream.readNEXString();
		this.m_strSender = stream.readNEXString();
		this.m_messageRecipient = stream.readNEXStructure(MessageRecipient);
	}

	toJSON() {
		return {
			__typeInherits: this._parentTypes.map(value => ({
				__typeName: value.constructor.name,
				__typeValue: value
			})),
			__structureVersion: this._structureHeader.version,
			m_uiID: {
				__typeName: 'uint32',
				__typeValue: this.m_uiID
			},
			m_uiParentID: {
				__typeName: 'uint32',
				__typeValue: this.m_uiParentID
			},
			m_pidSender: {
				__typeName: 'PID',
				__typeValue: this.m_pidSender
			},
			m_receptiontime: {
				__typeName: 'DateTime',
				__typeValue: this.m_receptiontime
			},
			m_uiLifeTime: {
				__typeName: 'uint32',
				__typeValue: this.m_uiLifeTime
			},
			m_uiFlags: {
				__typeName: 'uint32',
				__typeValue: this.m_uiFlags
			},
			m_strSubject: {
				__typeName: 'String',
				__typeValue: this.m_strSubject
			},
			m_strSender: {
				__typeName: 'String',
				__typeValue: this.m_strSender
			},
			m_messageRecipient: {
				__typeName: 'MessageRecipient',
				__typeValue: this.m_messageRecipient
			}
		};
	}
}

class TextMessage extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(UserMessage);
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_strTextBody = stream.readNEXString();
	}

	toJSON() {
		return {
			__typeInherits: this._parentTypes.map(value => ({
				__typeName: value.constructor.name,
				__typeValue: value
			})),
			__structureVersion: this._structureHeader.version,
			m_strTextBody: {
				__typeName: 'String',
				__typeValue: this.m_strTextBody
			}
		};
	}
}

class BinaryMessage extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(UserMessage);
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_binaryBody = stream.readNEXQBuffer();
	}

	toJSON() {
		return {
			__typeInherits: this._parentTypes.map(value => ({
				__typeName: value.constructor.name,
				__typeValue: value
			})),
			__structureVersion: this._structureHeader.version,
			m_binaryBody: {
				__typeName: 'qBuffer',
				__typeValue: this.m_binaryBody
			}
		};
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