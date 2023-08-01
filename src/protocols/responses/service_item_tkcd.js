const Stream = require('../../stream'); // eslint-disable-line no-unused-vars

const ServiceItemTKCDTypes = require('../types/service_item_tkcd');

class GetEnvironmentResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.str = stream.readNEXString();
	}

	toJSON() {
		return {
			str: {
				__typeName: 'String',
				__typeValue: this.str
			}
		};
	}
}

class HttpGetRequestResponse {
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

class HttpGetResponseResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.response = stream.readNEXStructure(ServiceItemTKCDTypes.ServiceItemHttpGetResponse);
	}

	toJSON() {
		return {
			response: {
				__typeName: 'ServiceItemHttpGetResponse',
				__typeValue: this.response
			}
		};
	}
}

class PurchaseServiceItemRequestResponse {
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

class PurchaseServiceItemResponseResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.purchaseServiceItemResponse = stream.readNEXStructure(ServiceItemTKCDTypes.ServiceItemPurchaseServiceItemResponse);
	}

	toJSON() {
		return {
			purchaseServiceItemResponse: {
				__typeName: 'ServiceItemPurchaseServiceItemResponse',
				__typeValue: this.purchaseServiceItemResponse
			}
		};
	}
}

class ListServiceItemRequestResponse {
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

class ListServiceItemResponseResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.listServiceItemResponse = stream.readNEXStructure(ServiceItemTKCDTypes.ServiceItemListServiceItemResponse);
	}

	toJSON() {
		return {
			listServiceItemResponse: {
				__typeName: 'ServiceItemListServiceItemResponse',
				__typeValue: this.listServiceItemResponse
			}
		};
	}
}

class GetBalanceRequestResponse {
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

class GetBalanceResponseResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.getBalanceResponse = stream.readNEXStructure(ServiceItemTKCDTypes.ServiceItemGetBalanceResponse);
	}

	toJSON() {
		return {
			getBalanceResponse: {
				__typeName: 'ServiceItemGetBalanceResponse',
				__typeValue: this.getBalanceResponse
			}
		};
	}
}

class GetPrepurchaseInfoRequestResponse {
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

class GetPrepurchaseInfoResponseResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.getPrepurchaseInfoResponse = stream.readNEXStructure(ServiceItemTKCDTypes.ServiceItemGetPrepurchaseInfoResponse);
	}

	toJSON() {
		return {
			getPrepurchaseInfoResponse: {
				__typeName: 'ServiceItemGetPrepurchaseInfoResponse',
				__typeValue: this.getPrepurchaseInfoResponse
			}
		};
	}
}

class GetServiceItemRightRequestResponse {
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

class GetServiceItemRightResponseResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.getServiceItemRightResponse = stream.readNEXStructure(ServiceItemTKCDTypes.ServiceItemGetServiceItemRightResponse);
	}

	toJSON() {
		return {
			getServiceItemRightResponse: {
				__typeName: 'ServiceItemGetServiceItemRightResponse',
				__typeValue: this.getServiceItemRightResponse
			}
		};
	}
}

class GetPurchaseHistoryRequestResponse {
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

class GetPurchaseHistoryResponseResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.getPurchaseHistoryResponse = stream.readNEXStructure(ServiceItemTKCDTypes.ServiceItemGetPurchaseHistoryResponse);
	}

	toJSON() {
		return {
			getPurchaseHistoryResponse: {
				__typeName: 'ServiceItemGetPurchaseHistoryResponse',
				__typeValue: this.getPurchaseHistoryResponse
			}
		};
	}
}

class PostRightBinaryByAccountResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.postRightBinaryResponse = stream.readNEXStructure(ServiceItemTKCDTypes.ServiceItemPostRightBinaryResponse);
	}

	toJSON() {
		return {
			postRightBinaryResponse: {
				__typeName: 'ServiceItemPostRightBinaryResponse',
				__typeValue: this.postRightBinaryResponse
			}
		};
	}
}

class UseServiceItemByAccountRequestResponse {
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

class UseServiceItemByAccountResponseResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.useServiceItemResponse = stream.readNEXStructure(ServiceItemTKCDTypes.ServiceItemUseServiceItemResponse);
	}

	toJSON() {
		return {
			useServiceItemResponse: {
				__typeName: 'ServiceItemUseServiceItemResponse',
				__typeValue: this.useServiceItemResponse
			}
		};
	}
}

class AcquireServiceItemByAccountResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.acquireServiceItemResponse = stream.readNEXStructure(ServiceItemTKCDTypes.ServiceItemAcquireServiceItemResponse);
	}

	toJSON() {
		return {
			acquireServiceItemResponse: {
				__typeName: 'ServiceItemAcquireServiceItemResponse',
				__typeValue: this.acquireServiceItemResponse
			}
		};
	}
}

class GetSupportIdResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.supportId = stream.readNEXString();
	}

	toJSON() {
		return {
			supportId: {
				__typeName: 'String',
				__typeValue: this.supportId
			}
		};
	}
}

class GetLawMessageRequestResponse {
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

class GetLawMessageResponseResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.getLawMessageResponse = stream.readNEXStructure(ServiceItemTKCDTypes.ServiceItemGetLawMessageResponse);
	}

	toJSON() {
		return {
			getLawMessageResponse: {
				__typeName: 'ServiceItemGetLawMessageResponse',
				__typeValue: this.getLawMessageResponse
			}
		};
	}
}

module.exports = {
	GetEnvironmentResponse,
	HttpGetRequestResponse,
	HttpGetResponseResponse,
	PurchaseServiceItemRequestResponse,
	PurchaseServiceItemResponseResponse,
	ListServiceItemRequestResponse,
	ListServiceItemResponseResponse,
	GetBalanceRequestResponse,
	GetBalanceResponseResponse,
	GetPrepurchaseInfoRequestResponse,
	GetPrepurchaseInfoResponseResponse,
	GetServiceItemRightRequestResponse,
	GetServiceItemRightResponseResponse,
	GetPurchaseHistoryRequestResponse,
	GetPurchaseHistoryResponseResponse,
	PostRightBinaryByAccountResponse,
	UseServiceItemByAccountRequestResponse,
	UseServiceItemByAccountResponseResponse,
	AcquireServiceItemByAccountResponse,
	GetSupportIdResponse,
	GetLawMessageRequestResponse,
	GetLawMessageResponseResponse
};
