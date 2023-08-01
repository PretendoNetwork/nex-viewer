const Stream = require('../../stream'); // eslint-disable-line no-unused-vars
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
		this.titleId = stream.readNEXString();
	}

	toJSON() {
		return {
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
			titleId: {
				__typeName: 'String',
				__typeValue: this.titleId
			}
		};
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
		this.titleId = stream.readNEXString();
	}

	toJSON() {
		return {
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
			titleId: {
				__typeName: 'String',
				__typeValue: this.titleId
			}
		};
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

	}

	toJSON() {
		return {
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
		this.titleId = stream.readUInt32LE();
	}

	toJSON() {
		return {
			language: {
				__typeName: 'String',
				__typeValue: this.language
			},
			titleId: {
				__typeName: 'String',
				__typeValue: this.titleId
			}
		};
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
		this.language = stream.readNEXString();
		this.titleId = stream.readNEXString();
	}

	toJSON() {
		return {
			itemCode: {
				__typeName: 'String',
				__typeValue: this.itemCode
			},
			language: {
				__typeName: 'String',
				__typeValue: this.language
			},
			titleId: {
				__typeName: 'String',
				__typeValue: this.titleId
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
	}

	toJSON() {
		return {
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
		this.titleId = stream.readNEXString();
	}

	toJSON() {
		return {
			referenceId: {
				__typeName: 'String',
				__typeValue: this.referenceId
			},
			titleId: {
				__typeName: 'String',
				__typeValue: this.titleId
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
	}

	toJSON() {
		return {
			pid: {
				__typeName: 'PID',
				__typeValue: this.pid
			},
			limitation: {
				__typeName: 'ServiceItemLimitation',
				__typeValue: this.limitation
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
		this.accountRights = stream.readNEXList(ServiceItemAccountRight);
	}

	toJSON() {
		return {
			referenceId: {
				__typeName: 'String',
				__typeValue: this.referenceId
			},
			accountRights: {
				__typeName: 'List<ServiceItemAccountRight>',
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
		this.rightInfos = stream.readNEXList(ServiceItemRightInfo);
	}

	toJSON() {
		return {
			rightInfos: {
				__typeName: 'List<ServiceItemRightInfo>',
				__typeValue: this.rightInfos
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
		this.titleId = stream.readNEXString();
	}

	toJSON() {
		return {
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
			titleId: {
				__typeName: 'String',
				__typeValue: this.titleId
			}
		};
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

class ServiceItemGetNoticeParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.noticeType = stream.readUInt32LE();
	}

	toJSON() {
		return {
			noticeType: {
				__typeName: 'uint32',
				__typeValue: this.noticeType
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

class ServiceItemEvent extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.eventId = stream.readUInt64LE();
		this.paramInt = stream.readInt32LE();
		this.paramString = stream.readNEXString();
		this.paramBinary = stream.readNEXQBuffer();
		this.presentTicketType = stream.readUInt32LE();
		this.presentTicketNum = stream.readUInt32LE();
		this.timeBegin = stream.readNEXDateTime();
		this.timeEnd = stream.readNEXDateTime();
	}

	toJSON() {
		return {
			eventId: {
				__typeName: 'uint64',
				__typeValue: this.eventId
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
			presentTicketType: {
				__typeName: 'uint32',
				__typeValue: this.presentTicketType
			},
			presentTicketNum: {
				__typeName: 'uint32',
				__typeValue: this.presentTicketNum
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

class ServiceItemTicketInfo extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.ticketType = stream.readUInt32LE();
		this.numTotal = stream.readUInt32LE();
	}

	toJSON() {
		return {
			ticketType: {
				__typeName: 'uint32',
				__typeValue: this.ticketType
			},
			numTotal: {
				__typeName: 'uint32',
				__typeValue: this.numTotal
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
		this.numTotalEntryTicket = stream.readUInt32LE();
		this.applicationBuffer = stream.readNEXQBuffer();
	}

	toJSON() {
		return {
			numTotalEntryTicket: {
				__typeName: 'uint32',
				__typeValue: this.numTotalEntryTicket
			},
			applicationBuffer: {
				__typeName: 'qBuffer',
				__typeValue: this.applicationBuffer
			}
		};
	}
}

class ServiceItemStartChallengeParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.challengeScheduleId = stream.readUInt32LE();
		this.ticketType = stream.readUInt32LE();
		this.numTotal = stream.readUInt32LE();
	}

	toJSON() {
		return {
			challengeScheduleId: {
				__typeName: 'uint32',
				__typeValue: this.challengeScheduleId
			},
			ticketType: {
				__typeName: 'uint32',
				__typeValue: this.ticketType
			},
			numTotal: {
				__typeName: 'uint32',
				__typeValue: this.numTotal
			}
		};
	}
}

class ServiceItemEndChallengeParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.challengeScheduleId = stream.readUInt32LE();
		this.userInfo = stream.readNEXStructure(ServiceItemUserInfo);
	}

	toJSON() {
		return {
			challengeScheduleId: {
				__typeName: 'uint32',
				__typeValue: this.challengeScheduleId
			},
			userInfo: {
				__typeName: 'ServiceItemUserInfo',
				__typeValue: this.userInfo
			}
		};
	}
}

class ServiceItemRequestTicketRestorationParam extends NEXTypes.Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.ticketType = stream.readUInt32LE();
		this.numTicket = stream.readUInt32LE();
	}

	toJSON() {
		return {
			ticketType: {
				__typeName: 'uint32',
				__typeValue: this.ticketType
			},
			numTicket: {
				__typeName: 'uint32',
				__typeValue: this.numTicket
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
	ServiceItemPrepurchaseInfo,
	ServiceItemGetPrepurchaseInfoResponse,
	ServiceItemGetServiceItemRightParam,
	ServiceItemAccountRight,
	ServiceItemRightInfo,
	ServiceItemRightInfos,
	ServiceItemGetServiceItemRightResponse,
	ServiceItemGetPurchaseHistoryParam,
	ServiceItemTransaction,
	ServiceItemPurchaseHistory,
	ServiceItemGetPurchaseHistoryResponse,
	ServiceItemGetNoticeParam,
	ServiceItemNotice,
	ServiceItemEvent,
	ServiceItemTicketInfo,
	ServiceItemUserInfo,
	ServiceItemStartChallengeParam,
	ServiceItemEndChallengeParam,
	ServiceItemRequestTicketRestorationParam
};
