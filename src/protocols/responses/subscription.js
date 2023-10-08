const Stream = require('../../stream');

class CreateMySubscriptionDataResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		// ! This function has an unknown response format
		this.unknown = stream.readRest();
	}

	toJSON() {
		return {
			unknown: {
				__typeName: 'unknown',
				__typeValue: this.unknown
			}
		};
	}
}

class UpdateMySubscriptionDataResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		// ! This function has an unknown response format
		this.unknown = stream.readRest();
	}

	toJSON() {
		return {
			unknown: {
				__typeName: 'unknown',
				__typeValue: this.unknown
			}
		};
	}
}

class ClearMySubscriptionDataResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		// ! This function has an unknown response format
		this.unknown = stream.readRest();
	}

	toJSON() {
		return {
			unknown: {
				__typeName: 'unknown',
				__typeValue: this.unknown
			}
		};
	}
}

class AddTargetResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		// ! This function has an unknown response format
		this.unknown = stream.readRest();
	}

	toJSON() {
		return {
			unknown: {
				__typeName: 'unknown',
				__typeValue: this.unknown
			}
		};
	}
}

class DeleteTargetResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		// ! This function has an unknown response format
		this.unknown = stream.readRest();
	}

	toJSON() {
		return {
			unknown: {
				__typeName: 'unknown',
				__typeValue: this.unknown
			}
		};
	}
}

class ClearTargetResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		// ! This function has an unknown response format
		this.unknown = stream.readRest();
	}

	toJSON() {
		return {
			unknown: {
				__typeName: 'unknown',
				__typeValue: this.unknown
			}
		};
	}
}

class GetFriendSubscriptionDataResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		// ! This function has an unknown response format
		this.unknown = stream.readRest();
	}

	toJSON() {
		return {
			unknown: {
				__typeName: 'unknown',
				__typeValue: this.unknown
			}
		};
	}
}

class GetTargetSubscriptionDataResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		// ! This function has an unknown response format
		this.unknown = stream.readRest();
	}

	toJSON() {
		return {
			unknown: {
				__typeName: 'unknown',
				__typeValue: this.unknown
			}
		};
	}
}

class GetActivePlayerSubscriptionDataResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		// ! This function has an unknown response format
		this.unknown = stream.readRest();
	}

	toJSON() {
		return {
			unknown: {
				__typeName: 'unknown',
				__typeValue: this.unknown
			}
		};
	}
}

class GetSubscriptionDataResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		// ! This function has an unknown response format
		this.unknown = stream.readRest();
	}

	toJSON() {
		return {
			unknown: {
				__typeName: 'unknown',
				__typeValue: this.unknown
			}
		};
	}
}

class ReplaceTargetAndGetSubscriptionDataResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		// ! This function has an unknown response format
		this.unknown = stream.readRest();
	}

	toJSON() {
		return {
			unknown: {
				__typeName: 'unknown',
				__typeValue: this.unknown
			}
		};
	}
}

class SetPrivacyLevelResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		// ! This function has an unknown response format
		this.unknown = stream.readRest();
	}

	toJSON() {
		return {
			unknown: {
				__typeName: 'unknown',
				__typeValue: this.unknown
			}
		};
	}
}

class GetPrivacyLevelResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		// ! This function has an unknown response format
		this.unknown = stream.readRest();
	}

	toJSON() {
		return {
			unknown: {
				__typeName: 'unknown',
				__typeValue: this.unknown
			}
		};
	}
}

class GetSubscriptionUserFriendListResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pids = stream.readNEXList(stream.readUInt32LE);
	}

	toJSON() {
		return {
			pids: {
				__typeName: 'pids',
				__typeValue: this.pids
			}
		};
	}
}

class GetPrivacyLevelsResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		// ! This function has an unknown response format
		this.unknown = stream.readRest();
	}

	toJSON() {
		return {
			unknown: {
				__typeName: 'unknown',
				__typeValue: this.unknown
			}
		};
	}
}

class CreateMySubscriptionDataWithNotificationParamsResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		// ! This function has an unknown response format
		this.unknown = stream.readRest();
	}

	toJSON() {
		return {
			unknown: {
				__typeName: 'unknown',
				__typeValue: this.unknown
			}
		};
	}
}

class UnknownMethod17Response {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		// ! This function has an unknown response format
		this.unknown = stream.readRest();
	}

	toJSON() {
		return {
			unknown: {
				__typeName: 'unknown',
				__typeValue: this.unknown
			}
		};
	}
}

class ClearMySubscriptionDataWithNotificationParamsResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		// ! This function has an unknown response format
		this.unknown = stream.readRest();
	}

	toJSON() {
		return {
			unknown: {
				__typeName: 'unknown',
				__typeValue: this.unknown
			}
		};
	}
}

module.exports = {
	CreateMySubscriptionDataResponse,
	UpdateMySubscriptionDataResponse,
	ClearMySubscriptionDataResponse,
	AddTargetResponse,
	DeleteTargetResponse,
	ClearTargetResponse,
	GetFriendSubscriptionDataResponse,
	GetTargetSubscriptionDataResponse,
	GetActivePlayerSubscriptionDataResponse,
	GetSubscriptionDataResponse,
	ReplaceTargetAndGetSubscriptionDataResponse,
	SetPrivacyLevelResponse,
	GetPrivacyLevelResponse,
	GetSubscriptionUserFriendListResponse,
	GetPrivacyLevelsResponse,
	CreateMySubscriptionDataWithNotificationParamsResponse,
	UnknownMethod17Response,
	ClearMySubscriptionDataWithNotificationParamsResponse
};