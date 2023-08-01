const Stream = require('../../stream'); // eslint-disable-line no-unused-vars
const ServiceItemTKCDTypes = require('../types/service_item_tkcd');

class GetEnvironmentRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.uniqueId = stream.readNEXString();
		this.platform = stream.readUInt8();
	}

	toJSON() {
		return {
			uniqueId: {
				__typeName: 'String',
				__typeValue: this.uniqueId
			},
			platform: {
				__typeName: 'uint8',
				__typeValue: this.platform
			}
		};
	}
}

class HttpGetRequestRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.url = stream.readNEXStructure(ServiceItemTKCDTypes.ServiceItemHttpGetParam);
	}

	toJSON() {
		return {
			url: {
				__typeName: 'ServiceItemHttpGetParam',
				__typeValue: this.url
			}
		};
	}
}

class HttpGetResponseRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.requestId = stream.readUInt32LE();
	}

	toJSON() {
		return {
			requestId: {
				__typeName: 'uint32',
				__typeValue: this.requestId
			}
		};
	}
}

class PurchaseServiceItemRequestRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.purchaseServiceItemParam = stream.readNEXStructure(ServiceItemTKCDTypes.ServiceItemPurchaseServiceItemParam);
	}

	toJSON() {
		return {
			purchaseServiceItemParam: {
				__typeName: 'ServiceItemPurchaseServiceItemParam',
				__typeValue: this.purchaseServiceItemParam
			}
		};
	}
}

class PurchaseServiceItemResponseRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.requestId = stream.readUInt32LE();
	}

	toJSON() {
		return {
			requestId: {
				__typeName: 'uint32',
				__typeValue: this.requestId
			}
		};
	}
}

class ListServiceItemRequestRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.listServiceItemParam = stream.readNEXStructure(ServiceItemTKCDTypes.ServiceItemListServiceItemParam);
	}

	toJSON() {
		return {
			listServiceItemParam: {
				__typeName: 'ServiceItemPurchaseServiceItemParam',
				__typeValue: this.listServiceItemParam
			}
		};
	}
}

class ListServiceItemResponseRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.requestId = stream.readUInt32LE();
	}

	toJSON() {
		return {
			requestId: {
				__typeName: 'uint32',
				__typeValue: this.requestId
			}
		};
	}
}

class GetBalanceRequestRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.getBalanceParam = stream.readNEXStructure(ServiceItemTKCDTypes.ServiceItemGetBalanceParam);
	}

	toJSON() {
		return {
			getBalanceParam: {
				__typeName: 'ServiceItemGetBalanceParam',
				__typeValue: this.getBalanceParam
			}
		};
	}
}

class GetBalanceResponseRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.requestId = stream.readUInt32LE();
	}

	toJSON() {
		return {
			requestId: {
				__typeName: 'uint32',
				__typeValue: this.requestId
			}
		};
	}
}

class GetPrepurchaseInfoRequestRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.getPrepurchaseInfoParam = stream.readNEXStructure(ServiceItemTKCDTypes.ServiceItemGetPrepurchaseInfoParam);
	}

	toJSON() {
		return {
			getPrepurchaseInfoParam: {
				__typeName: 'ServiceItemGetPrepurchaseInfoParam',
				__typeValue: this.getPrepurchaseInfoParam
			}
		};
	}
}

class GetPrepurchaseInfoResponseRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.requestId = stream.readUInt32LE();
	}

	toJSON() {
		return {
			requestId: {
				__typeName: 'uint32',
				__typeValue: this.requestId
			}
		};
	}
}

class GetServiceItemRightRequestRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.getServiceItemRightParam = stream.readNEXStructure(ServiceItemTKCDTypes.ServiceItemGetServiceItemRightParam);
		this.withoutRightBinary = stream.readBoolean();
	}

	toJSON() {
		return {
			getServiceItemRightParam: {
				__typeName: 'ServiceItemGetServiceItemRightParam',
				__typeValue: this.getServiceItemRightParam
			},
			withoutRightBinary: {
				__typeName: 'boolean',
				__typeValue: this.withoutRightBinary
			}
		};
	}
}

class GetServiceItemRightResponseRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.requestId = stream.readUInt32LE();
	}

	toJSON() {
		return {
			requestId: {
				__typeName: 'uint32',
				__typeValue: this.requestId
			}
		};
	}
}

class GetPurchaseHistoryRequestRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.getPurchaseHistoryParam = stream.readNEXStructure(ServiceItemTKCDTypes.ServiceItemGetPurchaseHistoryParam);
	}

	toJSON() {
		return {
			getPurchaseHistoryParam: {
				__typeName: 'ServiceItemGetPurchaseHistoryParam',
				__typeValue: this.getPurchaseHistoryParam
			}
		};
	}
}

class GetPurchaseHistoryResponseRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.requestId = stream.readUInt32LE();
	}

	toJSON() {
		return {
			requestId: {
				__typeName: 'uint32',
				__typeValue: this.requestId
			}
		};
	}
}

class PostRightBinaryByAccountRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.postRightBinaryByAccountParam = stream.readNEXStructure(ServiceItemTKCDTypes.ServiceItemPostRightBinaryByAccountParam);
	}

	toJSON() {
		return {
			postRightBinaryByAccountParam: {
				__typeName: 'ServiceItemPostRightBinaryByAccountParam',
				__typeValue: this.postRightBinaryByAccountParam
			}
		};
	}
}

class UseServiceItemByAccountRequestRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.useServiceItemByAccountParam = stream.readNEXStructure(ServiceItemTKCDTypes.ServiceItemUseServiceItemByAccountParam);
	}

	toJSON() {
		return {
			useServiceItemByAccountParam: {
				__typeName: 'ServiceItemUseServiceItemByAccountParam',
				__typeValue: this.useServiceItemByAccountParam
			}
		};
	}
}

class UseServiceItemByAccountResponseRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.requestId = stream.readUInt32LE();
	}

	toJSON() {
		return {
			requestId: {
				__typeName: 'uint32',
				__typeValue: this.requestId
			}
		};
	}
}

class AcquireServiceItemByAccountRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.acquireServiceItemByAccountParam = stream.readNEXStructure(ServiceItemTKCDTypes.ServiceItemAcquireServiceItemByAccountParam);
	}

	toJSON() {
		return {
			acquireServiceItemByAccountParam: {
				__typeName: 'ServiceItemAcquireServiceItemByAccountParam',
				__typeValue: this.acquireServiceItemByAccountParam
			}
		};
	}
}

class GetSupportIdRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.getSuppordIdParam = stream.readNEXStructure(ServiceItemTKCDTypes.ServiceItemGetSupportIdParam);
	}

	toJSON() {
		return {
			getSuppordIdParam: {
				__typeName: 'ServiceItemGetSupportIdParam',
				__typeValue: this.getSuppordIdParam
			}
		};
	}
}

class GetLawMessageRequestRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.getLawMessageParam = stream.readNEXStructure(ServiceItemTKCDTypes.ServiceItemGetLawMessageParam);
	}

	toJSON() {
		return {
			getLawMessageParam: {
				__typeName: 'ServiceItemGetLawMessageParam',
				__typeValue: this.getLawMessageParam
			}
		};
	}
}

class GetLawMessageResponseRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.requestId = stream.readUInt32LE();
	}

	toJSON() {
		return {
			requestId: {
				__typeName: 'uint32',
				__typeValue: this.requestId
			}
		};
	}
}

module.exports = {
	GetEnvironmentRequest,
	HttpGetRequestRequest,
	HttpGetResponseRequest,
	PurchaseServiceItemRequestRequest,
	PurchaseServiceItemResponseRequest,
	ListServiceItemRequestRequest,
	ListServiceItemResponseRequest,
	GetBalanceRequestRequest,
	GetBalanceResponseRequest,
	GetPrepurchaseInfoRequestRequest,
	GetPrepurchaseInfoResponseRequest,
	GetServiceItemRightRequestRequest,
	GetServiceItemRightResponseRequest,
	GetPurchaseHistoryRequestRequest,
	GetPurchaseHistoryResponseRequest,
	PostRightBinaryByAccountRequest,
	UseServiceItemByAccountRequestRequest,
	UseServiceItemByAccountResponseRequest,
	AcquireServiceItemByAccountRequest,
	GetSupportIdRequest,
	GetLawMessageRequestRequest,
	GetLawMessageResponseRequest
};
