/**
 * @typedef {import('../../stream')} Stream
 */
const ServiceItemWiiSportsClubTypes = require('../types/service_item_wii_sports_club');

class HelloRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.name = stream.readNEXString();
	}

	toJSON() {
		return {
			name: {
				__typeName: 'String',
				__typeValue: this.name
			}
		};
	}
}

class HttpGetRequestRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.url = stream.readNEXStructure(ServiceItemWiiSportsClubTypes.ServiceItemHttpGetParam);
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
		this.purchaseServiceItemParam = stream.readNEXStructure(ServiceItemWiiSportsClubTypes.ServiceItemPurchaseServiceItemParam);
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
		this.listServiceItemParam = stream.readNEXStructure(ServiceItemWiiSportsClubTypes.ServiceItemListServiceItemParam);
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
		this.getBalanceParam = stream.readNEXStructure(ServiceItemWiiSportsClubTypes.ServiceItemGetBalanceParam);
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
		this.getPrepurchaseInfoParam = stream.readNEXStructure(ServiceItemWiiSportsClubTypes.ServiceItemGetPrepurchaseInfoParam);
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
		this.getServiceItemRightParam = stream.readNEXStructure(ServiceItemWiiSportsClubTypes.ServiceItemGetServiceItemRightParam);
	}

	toJSON() {
		return {
			getServiceItemRightParam: {
				__typeName: 'ServiceItemGetServiceItemRightParam',
				__typeValue: this.getServiceItemRightParam
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
		this.getPurchaseHistoryParam = stream.readNEXStructure(ServiceItemWiiSportsClubTypes.ServiceItemGetPurchaseHistoryParam);
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

class GetNoticeRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.getNoticeParam = stream.readNEXStructure(ServiceItemWiiSportsClubTypes.ServiceItemGetNoticeParam);
	}

	toJSON() {
		return {
			getNoticeParam: {
				__typeName: 'ServiceItemGetNoticeParam',
				__typeValue: this.getNoticeParam
			}
		};
	}
}

class UpdateAndGetTicketInfoRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.forceRetrieveFromEShop = stream.readBoolean();
	}

	toJSON() {
		return {
			forceRetrieveFromEShop: {
				__typeName: 'boolean',
				__typeValue: this.forceRetrieveFromEShop
			}
		};
	}
}

class LoadUserInfoRequest {
	// * Requests nothing
	toJSON() {
		return {};
	}
}

class SaveUserInfoRequest {
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

class StartChallengeRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.startChallengeParam = stream.readNEXStructure(ServiceItemWiiSportsClubTypes.ServiceItemStartChallengeParam);
	}

	toJSON() {
		return {
			startChallengeParam: {
				__typeName: 'ServiceItemStartChallengeParam',
				__typeValue: this.startChallengeParam
			}
		};
	}
}

class EndChallengeRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.endChallengeParam = stream.readNEXStructure(ServiceItemWiiSportsClubTypes.ServiceItemEndChallengeParam);
	}

	toJSON() {
		return {
			endChallengeParam: {
				__typeName: 'ServiceItemEndChallengeParam',
				__typeValue: this.endChallengeParam
			}
		};
	}
}

class RequestTicketRestorationRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.requestTicketRestorationParam = stream.readNEXStructure(ServiceItemWiiSportsClubTypes.ServiceItemRequestTicketRestorationParam);
	}

	toJSON() {
		return {
			requestTicketRestorationParam: {
				__typeName: 'ServiceItemRequestTicketRestorationParam',
				__typeValue: this.requestTicketRestorationParam
			}
		};
	}
}

module.exports = {
	HelloRequest,
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
	GetNoticeRequest,
	UpdateAndGetTicketInfoRequest,
	LoadUserInfoRequest,
	SaveUserInfoRequest,
	StartChallengeRequest,
	EndChallengeRequest,
	RequestTicketRestorationRequest
};
