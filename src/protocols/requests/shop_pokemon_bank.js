/**
 * @typedef {import('../../stream')} Stream
 */

class GetItemsRequest {
	// * Requests nothing
	toJSON() {
		return {};
	}
}

class GetChallengeBlobRequest {
	// * Requests nothing
	toJSON() {
		return {};
	}
}

class GetRivTokenRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.itemCode = stream.readNEXString();
		this.referenceId = stream.readNEXQBuffer();
	}

	toJSON() {
		return {
			itemCode: {
				__typeName: 'String',
				__typeValue: this.itemCode
			},
			referenceId: {
				__typeName: 'qBuffer',
				__typeValue: this.referenceId
			}
		};
	}
}

class GetRivTokenByItemIdRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.itemId = stream.readUInt32LE();
	}

	toJSON() {
		return {
			itemId: {
				__typeName: 'uint32',
				__typeValue: this.itemId
			}
		};
	}
}

class GetItemRightsRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.ticketEnvelope = stream.readNEXQBuffer();
	}

	toJSON() {
		return {
			ticketEnvelope: {
				__typeName: 'qBuffer',
				__typeValue: this.ticketEnvelope
			}
		};
	}
}

class VerifyAndRegisterTicketRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.ticketEnvelope = stream.readNEXQBuffer();
		this.purchasedTime = stream.readNEXDateTime();
	}

	toJSON() {
		return {
			ticketEnvelope: {
				__typeName: 'qBuffer',
				__typeValue: this.ticketEnvelope
			},
			purchasedTime: {
				__typeName: 'DateTime',
				__typeValue: this.purchasedTime
			}
		};
	}
}

class DebugSetExpireTimeRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.expireTime = stream.readNEXDateTime();
	}

	toJSON() {
		return {
			expireTime: {
				__typeName: 'DateTime',
				__typeValue: this.expireTime
			}
		};
	}
}

class PrincipalIDToSupportNumberRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pid = stream.readPID();
	}

	toJSON() {
		return {
			pid: {
				__typeName: 'PID',
				__typeValue: this.pid
			}
		};
	}
}

class SupportNumberToPrincipalIDRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.supportNumber = stream.readNEXString();
	}

	toJSON() {
		return {
			supportNumber: {
				__typeName: 'String',
				__typeValue: this.supportNumber
			}
		};
	}
}

class GetGameServerTimeRequest {
	// * Requests nothing
	toJSON() {
		return {};
	}
}

module.exports = {
	GetItemsRequest,
	GetChallengeBlobRequest,
	GetRivTokenRequest,
	GetRivTokenByItemIdRequest,
	GetItemRightsRequest,
	VerifyAndRegisterTicketRequest,
	DebugSetExpireTimeRequest,
	PrincipalIDToSupportNumberRequest,
	SupportNumberToPrincipalIDRequest,
	GetGameServerTimeRequest
};
