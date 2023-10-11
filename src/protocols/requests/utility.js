/**
 * @typedef {import('../../stream')} Stream
 */
const UtilityTypes = require('../types/utility');

class AcquireNexUniqueIdRequest {
	// * Requests nothing
	toJSON() {
		return {};
	}
}

class AcquireNexUniqueIdWithPasswordRequest {
	// * Requests nothing
	toJSON() {
		return {};
	}
}

class AssociateNexUniqueIdWithMyPrincipalIdRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.uniqueIdInfo = stream.readNEXStructure(UtilityTypes.UniqueIdInfo);
	}

	toJSON() {
		return {
			uniqueIdInfo: {
				__typeName: 'UniqueIdInfo',
				__typeValue: this.uniqueIdInfo
			}
		};
	}
}

class AssociateNexUniqueIdsWithMyPrincipalIdRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.uniqueIdInfo = stream.readNEXList(UtilityTypes.UniqueIdInfo);
	}

	toJSON() {
		return {
			uniqueIdInfo: {
				__typeName: 'List<UniqueIdInfo>',
				__typeValue: this.uniqueIdInfo
			}
		};
	}
}

class GetAssociatedNexUniqueIdWithMyPrincipalIdRequest {
	// * Requests nothing
	toJSON() {
		return {};
	}
}

class GetAssociatedNexUniqueIdsWithMyPrincipalIdRequest {
	// * Requests nothing
	toJSON() {
		return {};
	}
}

class GetIntegerSettingsRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.integerSettingIndex = stream.readUInt32LE();
	}

	toJSON() {
		return {
			integerSettingIndex: {
				__typeName: 'uint32',
				__typeValue: this.integerSettingIndex
			}
		};
	}
}

class GetStringSettingsRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.stringSettingIndex = stream.readUInt32LE();
	}

	toJSON() {
		return {
			stringSettingIndex: {
				__typeName: 'uint32',
				__typeValue: this.stringSettingIndex
			}
		};
	}
}

module.exports = {
	AcquireNexUniqueIdRequest,
	AcquireNexUniqueIdWithPasswordRequest,
	AssociateNexUniqueIdWithMyPrincipalIdRequest,
	AssociateNexUniqueIdsWithMyPrincipalIdRequest,
	GetAssociatedNexUniqueIdWithMyPrincipalIdRequest,
	GetAssociatedNexUniqueIdsWithMyPrincipalIdRequest,
	GetIntegerSettingsRequest,
	GetStringSettingsRequest
};
