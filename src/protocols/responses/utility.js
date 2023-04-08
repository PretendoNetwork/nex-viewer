const Stream = require('../../stream'); // eslint-disable-line no-unused-vars

const UtilityTypes = require('../types/utility');

class AcquireNexUniqueIdResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pNexUniqueId = stream.readUInt64LE();
	}

	toJSON() {
		return {
			pNexUniqueId: {
				__typeName: 'uint64',
				__typeValue: this.pNexUniqueId
			}
		};
	}
}

class AcquireNexUniqueIdWithPasswordResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pNexUniqueIdInfo = stream.readStructure(UtilityTypes.UniqueIdInfo);
	}

	toJSON() {
		return {
			pNexUniqueIdInfo: {
				__typeName: 'UniqueIdInfo',
				__typeValue: this.pNexUniqueIdInfo
			}
		};
	}
}

class AssociateNexUniqueIdWithMyPrincipalIdResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class AssociateNexUniqueIdsWithMyPrincipalIdResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class GetAssociatedNexUniqueIdWithMyPrincipalIdResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pNexUniqueIdInfo = stream.readNEXStructure(UtilityTypes.UniqueIdInfo);
	}

	toJSON() {
		return {
			pNexUniqueIdInfo: {
				__typeName: 'UniqueIdInfo',
				__typeValue: this.pNexUniqueIdInfo
			}
		};
	}
}

class GetAssociatedNexUniqueIdsWithMyPrincipalIdResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pNexUniqueIdInfo = stream.readNEXList(UtilityTypes.UniqueIdInfo);
	}

	toJSON() {
		return {
			pNexUniqueIdInfo: {
				__typeName: 'List<UniqueIdInfo>',
				__typeValue: this.pNexUniqueIdInfo
			}
		};
	}
}

class GetIntegerSettingsResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.integerSettings = stream.readNEXMap(stream.readUInt16LE, stream.readInt32LE);
	}

	toJSON() {
		return {
			integerSettings: {
				__typeName: 'Map<uint16, sint32>',
				__typeValue: this.integerSettings
			}
		};
	}
}

class GetStringSettingsResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.stringSettings = stream.readNEXMap(stream.readUInt16LE, stream.readNEXString);
	}

	toJSON() {
		return {
			stringSettings: {
				__typeName: 'Map<uint16, String>',
				__typeValue: this.stringSettings
			}
		};
	}
}

module.exports = {
	AcquireNexUniqueIdResponse,
	AcquireNexUniqueIdWithPasswordResponse,
	AssociateNexUniqueIdWithMyPrincipalIdResponse,
	AssociateNexUniqueIdsWithMyPrincipalIdResponse,
	GetAssociatedNexUniqueIdWithMyPrincipalIdResponse,
	GetAssociatedNexUniqueIdsWithMyPrincipalIdResponse,
	GetIntegerSettingsResponse,
	GetStringSettingsResponse
};
