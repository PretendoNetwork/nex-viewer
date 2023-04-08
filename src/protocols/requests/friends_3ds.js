const Stream = require('../../stream'); // eslint-disable-line no-unused-vars

const Friends3DSTypes = require('../types/friends_3ds');

class SyncFriendRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.localFriendCode = stream.readUInt64LE();
		this.pidList = stream.readNEXList(stream.readPID);
		this.localFriendCodeList = stream.readNEXList(stream.readUInt64LE);
	}

	toJSON() {
		return {
			localFriendCode: {
				__typeName: 'uint64',
				__typeValue: this.localFriendCode
			},
			pidList: {
				__typeName: 'List<PID>',
				__typeValue: this.pidList
			},
			localFriendCodeList: {
				__typeName: 'List<uint64>',
				__typeValue: this.localFriendCodeList
			}
		};
	}
}

class UpdatePresenceRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.presence = stream.readNEXStructure(Friends3DSTypes.NintendoPresence);
		this.showGame = stream.readBoolean();
	}

	toJSON() {
		return {
			presence: {
				__typeName: 'NintendoPresence',
				__typeValue: this.presence
			},
			showGame: {
				__typeName: 'boolean',
				__typeValue: this.showGame
			}
		};
	}
}

class GetFriendPresenceRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pidList = stream.readNEXList(stream.readPID);
	}

	toJSON() {
		return {
			pidList: {
				__typeName: 'List<PID>',
				__typeValue: this.pidList
			}
		};
	}
}

class GetFriendPersistentInfoRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pidList = stream.readNEXList(stream.readPID);
	}

	toJSON() {
		return {
			pidList: {
				__typeName: 'List<PID>',
				__typeValue: this.pidList
			}
		};
	}
}

module.exports = {
	SyncFriendRequest,
	UpdatePresenceRequest,
	GetFriendPresenceRequest,
	GetFriendPersistentInfoRequest
};
