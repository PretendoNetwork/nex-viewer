/**
 * @typedef {import('../../stream')} Stream
 */
const NEXTypes = require('../../types');

class ServiceItemHttpGetParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.url = stream.readNEXString();
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			url: {
				__typeName: 'String',
				__typeValue: this.url
			}
		};
	}
}

class ServiceItemHttpGetResponse extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.response = stream.readNEXQBuffer();
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			response: {
				__typeName: 'qBuffer',
				__typeValue: this.response
			}
		};
	}
}

class ServiceItemEShopResponse extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.httpStatus = stream.readUInt32LE();
		this.errorCode = stream.readUInt32LE();
		this.correlationId = stream.readNEXString();
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			httpStatus: {
				__typeName: 'uint32',
				__typeValue: this.httpStatus
			},
			errorCode: {
				__typeName: 'uint32',
				__typeValue: this.errorCode
			},
			correlationId: {
				__typeName: 'String',
				__typeValue: this.correlationId
			}
		};
	}
}

class ServiceItemAmount extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.formattedAmount = stream.readNEXString();
		this.currency = stream.readNEXString();
		this.rawValue = stream.readNEXString();
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			formattedAmount: {
				__typeName: 'String',
				__typeValue: this.formattedAmount
			},
			currency: {
				__typeName: 'String',
				__typeValue: this.currency
			},
			rawValue: {
				__typeName: 'String',
				__typeValue: this.rawValue
			}
		};
	}
}

class ServiceItemPurchaseServiceItemParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.itemCode = stream.readNEXString();
		this.priceId = stream.readNEXString();
		this.referenceId = stream.readNEXString();
		this.balance = stream.readNEXString();
		this.itemName = stream.readNEXString();
		this.ecServiceToken = stream.readNEXString();
		this.language = stream.readNEXString();
		this.uniqueId = stream.readUInt32LE();

		if (this._structureHeader.version >= 1) {
			this.platform = stream.readUInt8();
		}
	}

	toJSON() {
		const data = {
			__structureVersion: this._structureHeader.version,
			itemCode: {
				__typeName: 'String',
				__typeValue: this.itemCode
			},
			priceId: {
				__typeName: 'String',
				__typeValue: this.priceId
			},
			referenceId: {
				__typeName: 'String',
				__typeValue: this.referenceId
			},
			balance: {
				__typeName: 'String',
				__typeValue: this.balance
			},
			itemName: {
				__typeName: 'String',
				__typeValue: this.itemName
			},
			ecServiceToken: {
				__typeName: 'String',
				__typeValue: this.ecServiceToken
			},
			language: {
				__typeName: 'String',
				__typeValue: this.language
			},
			uniqueId: {
				__typeName: 'uint32',
				__typeValue: this.uniqueId
			}
		};

		if (this.platform !== undefined) {
			data.platform = {
				__typeName: 'uint8',
				__typeValue: this.platform
			};
		}

		return data;
	}
}

class ServiceItemPurchaseInfo extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.transactionId = stream.readNEXString();
		this.extTransactionId = stream.readNEXString();
		this.itemCode = stream.readNEXString();
		this.postBalance = stream.readNEXStructure(ServiceItemAmount);
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			transactionId: {
				__typeName: 'String',
				__typeValue: this.transactionId
			},
			extTransactionId: {
				__typeName: 'String',
				__typeValue: this.extTransactionId
			},
			itemCode: {
				__typeName: 'String',
				__typeValue: this.itemCode
			},
			postBalance: {
				__typeName: 'ServiceItemAmount',
				__typeValue: this.postBalance
			}
		};
	}
}

class ServiceItemPurchaseServiceItemResponse extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(ServiceItemEShopResponse);
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.nullablePurchaseInfo = stream.readNEXList(ServiceItemPurchaseInfo);
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			__typeInherits: this._parentTypes.map(value => ({
				__typeName: value.constructor.name,
				__typeValue: value
			})),
			nullablePurchaseInfo: {
				__typeName: 'List<ServiceItemPurchaseInfo>',
				__typeValue: this.nullablePurchaseInfo
			}
		};
	}
}

class ServiceItemListServiceItemParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.language = stream.readNEXString();
		this.offset = stream.readUInt32LE();
		this.size = stream.readUInt32LE();
		this.isBalanceAvailable = stream.readBoolean();
		this.uniqueId = stream.readUInt32LE();

		if (this._structureHeader.version >= 1) {
			this.platform = stream.readUInt8();
		}
	}

	toJSON() {
		const data = {
			__structureVersion: this._structureHeader.version,
			language: {
				__typeName: 'String',
				__typeValue: this.language
			},
			offset: {
				__typeName: 'uint32',
				__typeValue: this.offset
			},
			size: {
				__typeName: 'uint32',
				__typeValue: this.size
			},
			isBalanceAvailable: {
				__typeName: 'boolean',
				__typeValue: this.isBalanceAvailable
			},
			uniqueId: {
				__typeName: 'uint32',
				__typeValue: this.uniqueId
			}
		};

		if (this.platform !== undefined) {
			data.platform = {
				__typeName: 'uint8',
				__typeValue: this.platform
			};
		}

		return data;
	}
}

class ServiceItemLimitation extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.limitationType = stream.readUInt32LE();
		this.limitationValue = stream.readUInt32LE();
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			limitationType: {
				__typeName: 'uint32',
				__typeValue: this.limitationType
			},
			limitationValue: {
				__typeName: 'uint32',
				__typeValue: this.limitationValue
			}
		};
	}
}

class ServiceItemAttribute extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.name = stream.readNEXString();
		this.value = stream.readNEXString();
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			name: {
				__typeName: 'String',
				__typeValue: this.name
			},
			value: {
				__typeName: 'String',
				__typeValue: this.value
			}
		};
	}
}

class ServiceItemListItem extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.itemCode = stream.readNEXString();
		this.regularPrice = stream.readNEXStructure(ServiceItemAmount);
		this.taxExcluded = stream.readBoolean();
		this.initialPurchaseOnly = stream.readBoolean();
		this.limitation = stream.readNEXStructure(ServiceItemLimitation);
		this.attributes = stream.readNEXList(ServiceItemAttribute);
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			itemCode: {
				__typeName: 'String',
				__typeValue: this.itemCode
			},
			regularPrice: {
				__typeName: 'ServiceItemAmount',
				__typeValue: this.regularPrice
			},
			taxExcluded: {
				__typeName: 'boolean',
				__typeValue: this.taxExcluded
			},
			initialPurchaseOnly: {
				__typeName: 'boolean',
				__typeValue: this.initialPurchaseOnly
			},
			limitation: {
				__typeName: 'ServiceItemLimitation',
				__typeValue: this.limitation
			},
			attributes: {
				__typeName: 'List<ServiceItemAttribute>',
				__typeValue: this.attributes
			}
		};
	}
}

class ServiceItemCatalog extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.totalSize = stream.readUInt32LE();
		this.offset = stream.readUInt32LE();
		this.listItems = stream.readNEXList(ServiceItemListItem);
		this.isBalanceAvailable = stream.readBoolean();
		this.balance = stream.readNEXStructure(ServiceItemAmount);

	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			totalSize: {
				__typeName: 'uint32',
				__typeValue: this.totalSize
			},
			offset: {
				__typeName: 'uint32',
				__typeValue: this.offset
			},
			listItems: {
				__typeName: 'List<ServiceItemListItem>',
				__typeValue: this.listItems
			},
			isBalanceAvailable: {
				__typeName: 'boolean',
				__typeValue: this.isBalanceAvailable
			},
			balance: {
				__typeName: 'ServiceItemAmount',
				__typeValue: this.balance
			}
		};
	}
}

class ServiceItemListServiceItemResponse extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(ServiceItemEShopResponse);
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.nullableCatalog = stream.readNEXList(ServiceItemCatalog);
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			__typeInherits: this._parentTypes.map(value => ({
				__typeName: value.constructor.name,
				__typeValue: value
			})),
			nullableCatalog: {
				__typeName: 'List<ServiceItemCatalog>',
				__typeValue: this.nullableCatalog
			}
		};
	}
}

class ServiceItemGetBalanceParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.language = stream.readNEXString();
		this.uniqueId = stream.readUInt32LE();

		if (this._structureHeader.version >= 1) {
			this.platform = stream.readUInt8();
		}
	}

	toJSON() {
		const data = {
			__structureVersion: this._structureHeader.version,
			language: {
				__typeName: 'String',
				__typeValue: this.language
			},
			uniqueId: {
				__typeName: 'uint32',
				__typeValue: this.uniqueId
			}
		};

		if (this.platform !== undefined) {
			data.platform = {
				__typeName: 'uint8',
				__typeValue: this.platform
			};
		}

		return data;
	}
}

class ServiceItemGetBalanceResponse extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(ServiceItemEShopResponse);
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.nullableBalance = stream.readNEXList(ServiceItemAmount);
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			__typeInherits: this._parentTypes.map(value => ({
				__typeName: value.constructor.name,
				__typeValue: value
			})),
			nullableBalance: {
				__typeName: 'List<ServiceItemAmount>',
				__typeValue: this.nullableBalance
			}
		};
	}
}

class ServiceItemGetPrepurchaseInfoParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.itemCode = stream.readNEXString();
		this.referenceId = stream.readNEXString();
		this.limitation = stream.readNEXStructure(ServiceItemLimitation);
		this.language = stream.readNEXString();
		this.uniqueId = stream.readUInt32LE();

		if (this._structureHeader.version >= 1) {
			this.platform = stream.readUInt8();
		}
	}

	toJSON() {
		const data = {
			__structureVersion: this._structureHeader.version,
			itemCode: {
				__typeName: 'String',
				__typeValue: this.itemCode
			},
			referenceId: {
				__typeName: 'String',
				__typeValue: this.referenceId
			},
			limitation: {
				__typeName: 'ServiceItemLimitation',
				__typeValue: this.limitation
			},
			language: {
				__typeName: 'String',
				__typeValue: this.language
			},
			uniqueId: {
				__typeName: 'uint32',
				__typeValue: this.uniqueId
			}
		};

		if (this.platform !== undefined) {
			data.platform = {
				__typeName: 'uint8',
				__typeValue: this.platform
			};
		}

		return data;
	}
}

class ServiceItemPrepurchaseRightInfo extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.limitationType = stream.readUInt32LE();
		this.acquiredCount = stream.readUInt32LE();
		this.usedCount = stream.readUInt32LE();
		this.expiryDate = stream.readUInt32LE();
		this.expiredCount = stream.readUInt32LE();
		this.expiryCounts = stream.readNEXList(stream.readUInt32LE);
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			limitationType: {
				__typeName: 'uint32',
				__typeValue: this.limitationType
			},
			acquiredCount: {
				__typeName: 'uint32',
				__typeValue: this.acquiredCount
			},
			usedCount: {
				__typeName: 'uint32',
				__typeValue: this.usedCount
			},
			expiryDate: {
				__typeName: 'uint32',
				__typeValue: this.expiryDate
			},
			expiredCount: {
				__typeName: 'uint32',
				__typeValue: this.expiredCount
			},
			expiryCounts: {
				__typeName: 'List<uint32>',
				__typeValue: this.expiryCounts
			}
		};
	}
}

class ServiceItemPrepurchaseInfo extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.itemCode = stream.readNEXString();
		this.priceId = stream.readNEXString();
		this.regularPrice = stream.readNEXStructure(ServiceItemAmount);
		this.isTaxAvailable = stream.readBoolean();
		this.taxAmount = stream.readNEXStructure(ServiceItemAmount);
		this.totalAmount = stream.readNEXStructure(ServiceItemAmount);
		this.currentBalance = stream.readNEXStructure(ServiceItemAmount);
		this.postBalance = stream.readNEXStructure(ServiceItemAmount);
		this.currentRightInfo = stream.readNEXStructure(ServiceItemPrepurchaseRightInfo);
		this.postRightInfo = stream.readNEXStructure(ServiceItemPrepurchaseRightInfo);
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			itemCode: {
				__typeName: 'String',
				__typeValue: this.itemCode
			},
			priceId: {
				__typeName: 'String',
				__typeValue: this.priceId
			},
			regularPrice: {
				__typeName: 'ServiceItemAmount',
				__typeValue: this.regularPrice
			},
			isTaxAvailable: {
				__typeName: 'boolean',
				__typeValue: this.isTaxAvailable
			},
			taxAmount: {
				__typeName: 'ServiceItemAmount',
				__typeValue: this.taxAmount
			},
			totalAmount: {
				__typeName: 'ServiceItemAmount',
				__typeValue: this.totalAmount
			},
			currentBalance: {
				__typeName: 'ServiceItemAmount',
				__typeValue: this.currentBalance
			},
			postBalance: {
				__typeName: 'ServiceItemAmount',
				__typeValue: this.postBalance
			},
			currentRightInfo: {
				__typeName: 'ServiceItemPrepurchaseRightInfo',
				__typeValue: this.currentRightInfo
			},
			postRightInfo: {
				__typeName: 'ServiceItemPrepurchaseRightInfo',
				__typeValue: this.postRightInfo
			}
		};
	}
}

class ServiceItemGetPrepurchaseInfoResponse extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(ServiceItemEShopResponse);
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.nullablePrepurchaseInfo = stream.readNEXList(ServiceItemPrepurchaseInfo);
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			__typeInherits: this._parentTypes.map(value => ({
				__typeName: value.constructor.name,
				__typeValue: value
			})),
			nullablePrepurchaseInfo: {
				__typeName: 'List<ServiceItemPrepurchaseInfo>',
				__typeValue: this.nullablePrepurchaseInfo
			}
		};
	}
}

class ServiceItemGetServiceItemRightParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.referenceId = stream.readNEXString();
		this.deviceId = stream.readNEXString();
		this.uniqueId = stream.readUInt32LE();
		this.itemGroup = stream.readUInt8();

		if (this._structureHeader.version >= 1) {
			this.platform = stream.readUInt8();
		}
	}

	toJSON() {
		const data = {
			__structureVersion: this._structureHeader.version,
			referenceId: {
				__typeName: 'String',
				__typeValue: this.referenceId
			},
			deviceId: {
				__typeName: 'String',
				__typeValue: this.deviceId
			},
			uniqueId: {
				__typeName: 'uint32',
				__typeValue: this.uniqueId
			},
			itemGroup: {
				__typeName: 'uint8',
				__typeValue: this.itemGroup
			}
		};

		if (this.platform !== undefined) {
			data.platform = {
				__typeName: 'uint8',
				__typeValue: this.platform
			};
		}

		return data;
	}
}

class ServiceItemRightBinary extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.useType = stream.readUInt8();
		this.rightBinary = stream.readNEXQBuffer();
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			useType: {
				__typeName: 'uint8',
				__typeValue: this.useType
			},
			rightBinary: {
				__typeName: 'qBuffer',
				__typeValue: this.rightBinary
			}
		};
	}
}

class ServiceItemAccountRight extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.pid = stream.readPID();
		this.limitation = stream.readNEXStructure(ServiceItemLimitation);
		this.rightBinaries = stream.readNEXList(ServiceItemRightBinary);
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			pid: {
				__typeName: 'PID',
				__typeValue: this.pid
			},
			limitation: {
				__typeName: 'ServiceItemLimitation',
				__typeValue: this.limitation
			},
			rightBinaries: {
				__typeName: 'List<ServiceItemRightBinary>',
				__typeValue: this.rightBinaries
			}
		};
	}
}

class ServiceItemAccountRightTime extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(ServiceItemAccountRight);
	}

	// * This type contains nothing
	parse() { }

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			__typeInherits: this._parentTypes.map(value => ({
				__typeName: value.constructor.name,
				__typeValue: value
			}))
		};
	}
}

class ServiceItemAccountRightConsumption extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(ServiceItemAccountRight);
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.usedCount = stream.readUInt32LE();
		this.expiredCount = stream.readUInt32LE();
		this.expiryCounts = stream.readNEXList(stream.readUInt32LE);
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			__typeInherits: this._parentTypes.map(value => ({
				__typeName: value.constructor.name,
				__typeValue: value
			})),
			usedCount: {
				__typeName: 'uint32',
				__typeValue: this.usedCount
			},
			expiredCount: {
				__typeName: 'uint32',
				__typeValue: this.expiredCount
			},
			expiryCounts: {
				__typeName: 'List<uint32>',
				__typeValue: this.expiryCounts
			}
		};
	}
}

class ServiceItemRightInfo extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.referenceId = stream.readNEXString();
		this.referenceIdType = stream.readUInt32LE();
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			referenceId: {
				__typeName: 'String',
				__typeValue: this.referenceId
			},
			referenceIdType: {
				__typeName: 'uint32',
				__typeValue: this.referenceIdType
			}
		};
	}
}

class ServiceItemRightTimeInfo extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(ServiceItemRightInfo);
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.accountRights = stream.readNEXList(ServiceItemAccountRightTime);
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			__typeInherits: this._parentTypes.map(value => ({
				__typeName: value.constructor.name,
				__typeValue: value
			})),
			accountRights: {
				__typeName: 'List<ServiceItemAccountRightTime>',
				__typeValue: this.accountRights
			}
		};
	}
}

class ServiceItemRightConsumptionInfo extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(ServiceItemRightInfo);
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.accountRights = stream.readNEXList(ServiceItemAccountRightConsumption);
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			__typeInherits: this._parentTypes.map(value => ({
				__typeName: value.constructor.name,
				__typeValue: value
			})),
			accountRights: {
				__typeName: 'List<ServiceItemAccountRightConsumption>',
				__typeValue: this.accountRights
			}
		};
	}
}

class ServiceItemRightInfos extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.supportId = stream.readNEXString();
		this.consumptionRightInfos = stream.readNEXList(ServiceItemRightConsumptionInfo);
		this.additionalTimeRightInfos = stream.readNEXList(ServiceItemRightTimeInfo);
		this.permanentRightInfos = stream.readNEXList(ServiceItemRightTimeInfo);
		this.alreadyPurchasedInitialOnlyItem = stream.readBoolean();

	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			supportId: {
				__typeName: 'String',
				__typeValue: this.supportId
			},
			consumptionRightInfos: {
				__typeName: 'List<ServiceItemRightConsumptionInfo>',
				__typeValue: this.consumptionRightInfos
			},
			additionalTimeRightInfos: {
				__typeName: 'List<ServiceItemRightTimeInfo>',
				__typeValue: this.additionalTimeRightInfos
			},
			permanentRightInfos: {
				__typeName: 'List<ServiceItemRightTimeInfo>',
				__typeValue: this.permanentRightInfos
			},
			alreadyPurchasedInitialOnlyItem: {
				__typeName: 'boolean',
				__typeValue: this.alreadyPurchasedInitialOnlyItem
			}
		};
	}
}

class ServiceItemGetServiceItemRightResponse extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(ServiceItemEShopResponse);
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.nullableRightInfos = stream.readNEXList(ServiceItemRightInfos);
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			__typeInherits: this._parentTypes.map(value => ({
				__typeName: value.constructor.name,
				__typeValue: value
			})),
			nullableRightInfos: {
				__typeName: 'List<ServiceItemRightInfos>',
				__typeValue: this.nullableRightInfos
			}
		};
	}
}

class ServiceItemGetPurchaseHistoryParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.language = stream.readNEXString();
		this.offset = stream.readUInt32LE();
		this.size = stream.readUInt32LE();
		this.uniqueId = stream.readUInt32LE();

		if (this._structureHeader.version >= 1) {
			this.platform = stream.readUInt8();
		}
	}

	toJSON() {
		const data = {
			__structureVersion: this._structureHeader.version,
			language: {
				__typeName: 'String',
				__typeValue: this.language
			},
			offset: {
				__typeName: 'uint32',
				__typeValue: this.offset
			},
			size: {
				__typeName: 'uint32',
				__typeValue: this.size
			},
			uniqueId: {
				__typeName: 'uint32',
				__typeValue: this.uniqueId
			}
		};

		if (this.platform !== undefined) {
			data.platform = {
				__typeName: 'uint8',
				__typeValue: this.platform
			};
		}

		return data;
	}
}

class ServiceItemTransaction extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.transactionId = stream.readNEXString();
		this.extTransactionId = stream.readNEXString();
		this.time = stream.readNEXDateTime();
		this.transactionType = stream.readUInt32LE();
		this.transactionDescription = stream.readNEXString();
		this.transactionAmount = stream.readNEXStructure(ServiceItemAmount);
		this.itemCode = stream.readNEXString();
		this.referenceId = stream.readNEXString();
		this.limitation = stream.readNEXStructure(ServiceItemLimitation);
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			transactionId: {
				__typeName: 'String',
				__typeValue: this.transactionId
			},
			extTransactionId: {
				__typeName: 'String',
				__typeValue: this.extTransactionId
			},
			time: {
				__typeName: 'DateTime',
				__typeValue: this.time
			},
			transactionType: {
				__typeName: 'uint32',
				__typeValue: this.transactionType
			},
			transactionDescription: {
				__typeName: 'String',
				__typeValue: this.transactionDescription
			},
			transactionAmount: {
				__typeName: 'ServiceItemAmount',
				__typeValue: this.transactionAmount
			},
			itemCode: {
				__typeName: 'String',
				__typeValue: this.itemCode
			},
			referenceId: {
				__typeName: 'String',
				__typeValue: this.referenceId
			},
			limitation: {
				__typeName: 'ServiceItemLimitation',
				__typeValue: this.limitation
			}
		};
	}
}

class ServiceItemPurchaseHistory extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.totalSize = stream.readUInt32LE();
		this.offset = stream.readUInt32LE();
		this.transactions = stream.readNEXList(ServiceItemTransaction);

	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			supportId: {
				__typeName: 'String',
				__typeValue: this.supportId
			},
			transactions: {
				__typeName: 'List<ServiceItemTransaction>',
				__typeValue: this.transactions
			}
		};
	}
}

class ServiceItemGetPurchaseHistoryResponse extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(ServiceItemEShopResponse);
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.nullablePurchaseHistory = stream.readNEXList(ServiceItemPurchaseHistory);
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			__typeInherits: this._parentTypes.map(value => ({
				__typeName: value.constructor.name,
				__typeValue: value
			})),
			nullablePurchaseHistory: {
				__typeName: 'List<ServiceItemPurchaseHistory>',
				__typeValue: this.nullablePurchaseHistory
			}
		};
	}
}

class ServiceItemLawMessage extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.isMessageRequired = stream.readBoolean();
		this.lawMessage = stream.readNEXString();
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			isMessageRequired: {
				__typeName: 'boolean',
				__typeValue: this.isMessageRequired
			},
			lawMessage: {
				__typeName: 'String',
				__typeValue: this.lawMessage
			}
		};
	}
}

class ServiceItemGetLawMessageParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.language = stream.readNEXString();
		this.uniqueId = stream.readUInt32LE();

		if (this._structureHeader.version >= 1) {
			this.platform = stream.readUInt8();
		}
	}

	toJSON() {
		const data = {
			__structureVersion: this._structureHeader.version,
			language: {
				__typeName: 'String',
				__typeValue: this.language
			},
			uniqueId: {
				__typeName: 'uint32',
				__typeValue: this.uniqueId
			}
		};

		if (this.platform !== undefined) {
			data.platform = {
				__typeName: 'uint8',
				__typeValue: this.platform
			};
		}

		return data;
	}
}

class ServiceItemGetLawMessageResponse extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(ServiceItemEShopResponse);
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.nullableLawMessage = stream.readNEXList(ServiceItemLawMessage);
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			__typeInherits: this._parentTypes.map(value => ({
				__typeName: value.constructor.name,
				__typeValue: value
			})),
			nullableLawMessage: {
				__typeName: 'List<ServiceItemLawMessage>',
				__typeValue: this.nullableLawMessage
			}
		};
	}
}

class ServiceItemPostRightBinaryByAccountParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.referenceId = stream.readNEXString();
		this.useType = stream.readUInt8();
		this.rightBinary = stream.readNEXQBuffer();
		this.logMessage = stream.readNEXString();
		this.uniqueId = stream.readUInt32LE();

		if (this._structureHeader.version >= 1) {
			this.platform = stream.readUInt8();
		}
	}

	toJSON() {
		const data = {
			__structureVersion: this._structureHeader.version,
			referenceId: {
				__typeName: 'String',
				__typeValue: this.referenceId
			},
			useType: {
				__typeName: 'uint8',
				__typeValue: this.useType
			},
			rightBinary: {
				__typeName: 'qBuffer',
				__typeValue: this.rightBinary
			},
			logMessage: {
				__typeName: 'String',
				__typeValue: this.logMessage
			},
			uniqueId: {
				__typeName: 'uint32',
				__typeValue: this.uniqueId
			}
		};

		if (this.platform !== undefined) {
			data.platform = {
				__typeName: 'uint8',
				__typeValue: this.platform
			};
		}

		return data;
	}
}

class ServiceItemPostRightBinaryResponse extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(ServiceItemEShopResponse);
	}

	// * This type contains nothing
	parse() { }

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			__typeInherits: this._parentTypes.map(value => ({
				__typeName: value.constructor.name,
				__typeValue: value
			}))
		};
	}
}

class ServiceItemUseServiceItemByAccountParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.referenceIdForUse = stream.readNEXString();
		this.referenceIdForRightBinary = stream.readNEXString();
		this.useType = stream.readUInt8();
		this.useNumber = stream.readUInt8();
		this.rightBinary = stream.readNEXQBuffer();
		this.logMessage = stream.readNEXString();
		this.uniqueId = stream.readUInt32LE();

		if (this._structureHeader.version >= 1) {
			this.platform = stream.readUInt8();
		}
	}

	toJSON() {
		const data = {
			__structureVersion: this._structureHeader.version,
			referenceIdForUse: {
				__typeName: 'String',
				__typeValue: this.referenceIdForUse
			},
			referenceIdForRightBinary: {
				__typeName: 'String',
				__typeValue: this.referenceIdForRightBinary
			},
			useType: {
				__typeName: 'uint8',
				__typeValue: this.useType
			},
			useNumber: {
				__typeName: 'uint8',
				__typeValue: this.useNumber
			},
			rightBinary: {
				__typeName: 'qBuffer',
				__typeValue: this.rightBinary
			},
			logMessage: {
				__typeName: 'String',
				__typeValue: this.logMessage
			},
			uniqueId: {
				__typeName: 'uint32',
				__typeValue: this.uniqueId
			}
		};

		if (this.platform !== undefined) {
			data.platform = {
				__typeName: 'uint8',
				__typeValue: this.platform
			};
		}

		return data;
	}
}

class ServiceItemUsedInfo extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.acquiredCount = stream.readUInt32LE();
		this.usedCount = stream.readUInt32LE();
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			acquiredCount: {
				__typeName: 'uint32',
				__typeValue: this.acquiredCount
			},
			usedCount: {
				__typeName: 'uint32',
				__typeValue: this.usedCount
			}
		};
	}
}

class ServiceItemUseServiceItemResponse extends NEXTypes.Structure {
	constructor() {
		super();

		this._parentTypesClasses.push(ServiceItemEShopResponse);
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.nullableUsedInfo = stream.readNEXList(ServiceItemUsedInfo);
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			__typeInherits: this._parentTypes.map(value => ({
				__typeName: value.constructor.name,
				__typeValue: value
			})),
			nullableUsedInfo: {
				__typeName: 'List<ServiceItemUsedInfo>',
				__typeValue: this.nullableUsedInfo
			}
		};
	}
}

class ServiceItemAcquireServiceItemByAccountParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.referenceIdForAcquisition = stream.readNEXString();
		this.referenceIdForRightBinary = stream.readNEXString();
		this.useType = stream.readUInt8();
		this.limitationType = stream.readUInt32LE();
		this.limitationValue = stream.readUInt32LE();
		this.rightBinary = stream.readNEXQBuffer();
		this.logMessage = stream.readNEXString();
		this.uniqueId = stream.readUInt32LE();

		if (this._structureHeader.version >= 1) {
			this.platform = stream.readUInt8();
		}
	}

	toJSON() {
		const data = {
			__structureVersion: this._structureHeader.version,
			referenceIdForAcquisition: {
				__typeName: 'String',
				__typeValue: this.referenceIdForAcquisition
			},
			referenceIdForRightBinary: {
				__typeName: 'String',
				__typeValue: this.referenceIdForRightBinary
			},
			useType: {
				__typeName: 'uint8',
				__typeValue: this.useType
			},
			limitationType: {
				__typeName: 'uint32',
				__typeValue: this.limitationType
			},
			limitationValue: {
				__typeName: 'uint32',
				__typeValue: this.limitationValue
			},
			rightBinary: {
				__typeName: 'qBuffer',
				__typeValue: this.rightBinary
			},
			logMessage: {
				__typeName: 'String',
				__typeValue: this.logMessage
			},
			uniqueId: {
				__typeName: 'uint32',
				__typeValue: this.uniqueId
			}
		};

		if (this.platform !== undefined) {
			data.platform = {
				__typeName: 'uint8',
				__typeValue: this.platform
			};
		}

		return data;
	}
}

class ServiceItemAcquireServiceItemResponse extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.limitationType = stream.readUInt32LE();
		this.acquiredCount = stream.readUInt32LE();
		this.usedCount = stream.readUInt32LE();
		this.expiryDate = stream.readUInt32LE();
		this.expiredCount = stream.readUInt32LE();
		this.expiryCounts = stream.readNEXList(stream.readUInt32LE);
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			limitationType: {
				__typeName: 'uint32',
				__typeValue: this.limitationType
			},
			acquiredCount: {
				__typeName: 'uint32',
				__typeValue: this.acquiredCount
			},
			usedCount: {
				__typeName: 'uint32',
				__typeValue: this.usedCount
			},
			expiryDate: {
				__typeName: 'uint32',
				__typeValue: this.expiryDate
			},
			expiredCount: {
				__typeName: 'uint32',
				__typeValue: this.expiredCount
			},
			expiryCounts: {
				__typeName: 'List<uint32>',
				__typeValue: this.expiryCounts
			}
		};
	}
}

class ServiceItemGetSupportIdParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.uniqueId = stream.readUInt32LE();

		if (this._structureHeader.version >= 1) {
			this.platform = stream.readUInt8();
		}
	}

	toJSON() {
		const data = {
			__structureVersion: this._structureHeader.version,
			uniqueId: {
				__typeName: 'uint32',
				__typeValue: this.uniqueId
			}
		};

		if (this.platform !== undefined) {
			data.platform = {
				__typeName: 'uint8',
				__typeValue: this.platform
			};
		}

		return data;
	}
}

class ServiceItemGetNoticeParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.scheduleType = stream.readUInt32LE();
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			scheduleType: {
				__typeName: 'uint32',
				__typeValue: this.scheduleType
			}
		};
	}
}

class ServiceItemNotice extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.scheduleId = stream.readUInt64LE();
		this.scheduleType = stream.readUInt32LE();
		this.paramInt = stream.readInt32LE();
		this.paramString = stream.readNEXString();
		this.paramBinary = stream.readNEXQBuffer();
		this.timeBegin = stream.readNEXDateTime();
		this.timeEnd = stream.readNEXDateTime();
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			scheduleId: {
				__typeName: 'uint64',
				__typeValue: this.scheduleId
			},
			scheduleType: {
				__typeName: 'uint32',
				__typeValue: this.scheduleType
			},
			paramInt: {
				__typeName: 'sint32',
				__typeValue: this.paramInt
			},
			paramString: {
				__typeName: 'String',
				__typeValue: this.paramString
			},
			paramBinary: {
				__typeName: 'qBuffer',
				__typeValue: this.paramBinary
			},
			timeBegin: {
				__typeName: 'DateTime',
				__typeValue: this.timeBegin
			},
			timeEnd: {
				__typeName: 'DateTime',
				__typeValue: this.timeEnd
			}
		};
	}
}

class ServiceItemUserInfo extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.applicationBuffer = stream.readNEXQBuffer();
	}

	toJSON() {
		return {
			__structureVersion: this._structureHeader.version,
			applicationBuffer: {
				__typeName: 'qBuffer',
				__typeValue: this.applicationBuffer
			}
		};
	}
}

module.exports = {
	ServiceItemHttpGetParam,
	ServiceItemHttpGetResponse,
	ServiceItemEShopResponse,
	ServiceItemAmount,
	ServiceItemPurchaseServiceItemParam,
	ServiceItemPurchaseInfo,
	ServiceItemPurchaseServiceItemResponse,
	ServiceItemListServiceItemParam,
	ServiceItemLimitation,
	ServiceItemAttribute,
	ServiceItemListItem,
	ServiceItemCatalog,
	ServiceItemListServiceItemResponse,
	ServiceItemGetBalanceParam,
	ServiceItemGetBalanceResponse,
	ServiceItemGetPrepurchaseInfoParam,
	ServiceItemPrepurchaseRightInfo,
	ServiceItemPrepurchaseInfo,
	ServiceItemGetPrepurchaseInfoResponse,
	ServiceItemGetServiceItemRightParam,
	ServiceItemRightBinary,
	ServiceItemAccountRight,
	ServiceItemAccountRightTime,
	ServiceItemAccountRightConsumption,
	ServiceItemRightInfo,
	ServiceItemRightTimeInfo,
	ServiceItemRightConsumptionInfo,
	ServiceItemRightInfos,
	ServiceItemGetServiceItemRightResponse,
	ServiceItemGetPurchaseHistoryParam,
	ServiceItemTransaction,
	ServiceItemPurchaseHistory,
	ServiceItemGetPurchaseHistoryResponse,
	ServiceItemLawMessage,
	ServiceItemGetLawMessageParam,
	ServiceItemGetLawMessageResponse,
	ServiceItemPostRightBinaryByAccountParam,
	ServiceItemPostRightBinaryResponse,
	ServiceItemUseServiceItemByAccountParam,
	ServiceItemUsedInfo,
	ServiceItemUseServiceItemResponse,
	ServiceItemAcquireServiceItemByAccountParam,
	ServiceItemAcquireServiceItemResponse,
	ServiceItemGetSupportIdParam,
	ServiceItemGetNoticeParam,
	ServiceItemNotice,
	ServiceItemUserInfo
};
