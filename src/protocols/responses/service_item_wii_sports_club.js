const Stream = require('../../stream'); // eslint-disable-line no-unused-vars

const ServiceItemWiiSportsClubTypes = require('../types/service_item_wii_sports_club');

class HelloResponse {
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
		this.response = stream.readNEXStructure(ServiceItemWiiSportsClubTypes.ServiceItemHttpGetResponse);
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
		this.purchaseServiceItemResponse = stream.readNEXStructure(ServiceItemWiiSportsClubTypes.ServiceItemPurchaseServiceItemResponse);
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
		this.listServiceItemResponse = stream.readNEXStructure(ServiceItemWiiSportsClubTypes.ServiceItemListServiceItemResponse);
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
		this.getBalanceResponse = stream.readNEXStructure(ServiceItemWiiSportsClubTypes.ServiceItemGetBalanceResponse);
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
		this.getPrepurchaseInfoResponse = stream.readNEXStructure(ServiceItemWiiSportsClubTypes.ServiceItemGetPrepurchaseInfoResponse);
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
		this.getServiceItemRightResponse = stream.readNEXStructure(ServiceItemWiiSportsClubTypes.ServiceItemGetServiceItemRightResponse);
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
		this.getPurchaseHistoryResponse = stream.readNEXStructure(ServiceItemWiiSportsClubTypes.ServiceItemGetPurchaseHistoryResponse);
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

class GetNoticeResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.notice = stream.readNEXStructure(ServiceItemWiiSportsClubTypes.ServiceItemNotice);
	}

	toJSON() {
		return {
			notice: {
				__typeName: 'ServiceItemNotice',
				__typeValue: this.notice
			}
		};
	}
}

class UpdateAndGetTicketInfoResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.ticketInfos = stream.readNEXList(ServiceItemWiiSportsClubTypes.ServiceItemTicketInfo);
		this.events = stream.readNEXList(ServiceItemWiiSportsClubTypes.ServiceItemEvent);
	}

	toJSON() {
		return {
			ticketInfos: {
				__typeName: 'List<ServiceItemTicketInfo>',
				__typeValue: this.ticketInfos
			},
			events: {
				__typeName: 'List<ServiceItemEvent>',
				__typeValue: this.events
			}
		};
	}
}

class LoadUserInfoResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.userInfo = stream.readNEXStructure(ServiceItemWiiSportsClubTypes.ServiceItemUserInfo);
	}

	toJSON() {
		return {
			userInfo: {
				__typeName: 'ServiceItemUserInfo',
				__typeValue: this.userInfo
			}
		};
	}
}

class SaveUserInfoResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class StartChallengeResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class EndChallengeResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class RequestTicketRestorationResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

module.exports = {
	HelloResponse,
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
	GetNoticeResponse,
	UpdateAndGetTicketInfoResponse,
	LoadUserInfoResponse,
	SaveUserInfoResponse,
	StartChallengeResponse,
	EndChallengeResponse,
	RequestTicketRestorationResponse
};
