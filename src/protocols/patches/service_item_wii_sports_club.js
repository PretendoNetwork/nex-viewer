const Packet = require('../../packet'); // eslint-disable-line no-unused-vars
const PacketV0 = require('../../packetv0'); // eslint-disable-line no-unused-vars
const PacketV1 = require('../../packetv1'); // eslint-disable-line no-unused-vars
const RMCMessage = require('../../rmc'); // eslint-disable-line no-unused-vars
const Stream = require('../../stream');

const Requests = require('../requests/service_item_wii_sports_club');
const Responses = require('../responses/service_item_wii_sports_club');

class ServiceItemWiiSportsClub {
	static ProtocolID = 0x77;

	static ProtocolName = 'Service Item (Wii Sports Club)';

	static Methods = {
		Hello: 0x01,
		HttpGetRequest: 0x02,
		HttpGetResponse: 0x03,
		PurchaseServiceItemRequest: 0x04,
		PurchaseServiceItemResponse: 0x05,
		ListServiceItemRequest: 0x06,
		ListServiceItemResponse: 0x07,
		GetBalanceRequest: 0x08,
		GetBalanceResponse: 0x09,
		GetPrepurchaseInfoRequest: 0x0a,
		GetPrepurchaseInfoResponse: 0x0b,
		GetServiceItemRightRequest: 0x0c,
		GetServiceItemRightResponse: 0x0d,
		GetPurchaseHistoryRequest: 0x0e,
		GetPurchaseHistoryResponse: 0x0f,
		GetNotice: 0x10,
		UpdateAndGetTicketInfo: 0x11,
		LoadUserInfo: 0x12,
		SaveUserInfo: 0x13,
		StartChallenge: 0x14,
		EndChallenge: 0x15,
		RequestTicketRestoration: 0x16,
	};

	static MethodNames = Object.entries(ServiceItemWiiSportsClub.Methods).reduce((namesObject, entry) => {
		const [key, value] = entry;
		namesObject[value] = key;
		return namesObject;
	}, {});

	static Handlers = {
		0x01: ServiceItemWiiSportsClub.Hello,
		0x02: ServiceItemWiiSportsClub.HttpGetRequest,
		0x03: ServiceItemWiiSportsClub.HttpGetResponse,
		0x04: ServiceItemWiiSportsClub.PurchaseServiceItemRequest,
		0x05: ServiceItemWiiSportsClub.PurchaseServiceItemResponse,
		0x06: ServiceItemWiiSportsClub.ListServiceItemRequest,
		0x07: ServiceItemWiiSportsClub.ListServiceItemResponse,
		0x08: ServiceItemWiiSportsClub.GetBalanceRequest,
		0x09: ServiceItemWiiSportsClub.GetBalanceResponse,
		0x0a: ServiceItemWiiSportsClub.GetPrepurchaseInfoRequest,
		0x0b: ServiceItemWiiSportsClub.GetPrepurchaseInfoResponse,
		0x0c: ServiceItemWiiSportsClub.GetServiceItemRightRequest,
		0x0d: ServiceItemWiiSportsClub.GetServiceItemRightResponse,
		0x0e: ServiceItemWiiSportsClub.GetPurchaseHistoryRequest,
		0x0f: ServiceItemWiiSportsClub.GetPurchaseHistoryResponse,
		0x10: ServiceItemWiiSportsClub.GetNotice,
		0x11: ServiceItemWiiSportsClub.UpdateAndGetTicketInfo,
		0x12: ServiceItemWiiSportsClub.LoadUserInfo,
		0x13: ServiceItemWiiSportsClub.SaveUserInfo,
		0x14: ServiceItemWiiSportsClub.StartChallenge,
		0x15: ServiceItemWiiSportsClub.EndChallenge,
		0x16: ServiceItemWiiSportsClub.RequestTicketRestoration
	};

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet PRUDP packet
	 */
	static handlePacket(packet) {
		const methodId = packet.rmcMessage.methodId;

		const handler = ServiceItemWiiSportsClub.Handlers[methodId];

		if (!handler) {
			console.log(`Unknown Service Item (Wii Sports Club) method ID ${methodId} (0x${methodId?.toString(16)}) (${ServiceItemWiiSportsClub.MethodNames[methodId]})`);
			return;
		}

		const { rmcMessage } = packet;
		const stream = new Stream(rmcMessage.body, packet.connection);

		packet.rmcData = {
			protocolName: this.ProtocolName,
			methodName: this.MethodNames[methodId],
			body: handler(rmcMessage, stream)
		};
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static Hello(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.HelloRequest(stream);
		} else {
			return new Responses.HelloResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static HttpGetRequest(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.HttpGetRequestRequest(stream);
		} else {
			return new Responses.HttpGetRequestResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static HttpGetResponse(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.HttpGetResponseRequest(stream);
		} else {
			return new Responses.HttpGetResponseResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static PurchaseServiceItemRequest(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.PurchaseServiceItemRequestRequest(stream);
		} else {
			return new Responses.PurchaseServiceItemRequestResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static PurchaseServiceItemResponse(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.PurchaseServiceItemResponseRequest(stream);
		} else {
			return new Responses.PurchaseServiceItemResponseResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static ListServiceItemRequest(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.ListServiceItemRequestRequest(stream);
		} else {
			return new Responses.ListServiceItemRequestResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static ListServiceItemResponse(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.ListServiceItemResponseRequest(stream);
		} else {
			return new Responses.ListServiceItemResponseResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetBalanceRequest(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetBalanceRequestRequest(stream);
		} else {
			return new Responses.GetBalanceRequestResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetBalanceResponse(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetBalanceResponseRequest(stream);
		} else {
			return new Responses.GetBalanceResponseResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetPrepurchaseInfoRequest(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetPrepurchaseInfoRequestRequest(stream);
		} else {
			return new Responses.GetPrepurchaseInfoRequestResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetPrepurchaseInfoResponse(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetPrepurchaseInfoResponseRequest(stream);
		} else {
			return new Responses.GetPrepurchaseInfoResponseResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetServiceItemRightRequest(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetServiceItemRightRequestRequest(stream);
		} else {
			return new Responses.GetServiceItemRightRequestResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetServiceItemRightResponse(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetServiceItemRightResponseRequest(stream);
		} else {
			return new Responses.GetServiceItemRightResponseResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetPurchaseHistoryRequest(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetPurchaseHistoryRequestRequest(stream);
		} else {
			return new Responses.GetPurchaseHistoryRequestResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetPurchaseHistoryResponse(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetPurchaseHistoryResponseRequest(stream);
		} else {
			return new Responses.GetPurchaseHistoryResponseResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetNotice(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetNoticeRequest(stream);
		} else {
			return new Responses.GetNoticeResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static UpdateAndGetTicketInfo(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.UpdateAndGetTicketInfoRequest(stream);
		} else {
			return new Responses.UpdateAndGetTicketInfoResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static LoadUserInfo(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.LoadUserInfoRequest(stream);
		} else {
			return new Responses.LoadUserInfoResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static SaveUserInfo(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.SaveUserInfoRequest(stream);
		} else {
			return new Responses.SaveUserInfoResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static StartChallenge(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.StartChallengeRequest(stream);
		} else {
			return new Responses.StartChallengeResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static EndChallenge(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.EndChallengeRequest(stream);
		} else {
			return new Responses.EndChallengeResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static RequestTicketRestoration(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.RequestTicketRestorationRequest(stream);
		} else {
			return new Responses.RequestTicketRestorationResponse(stream);
		}
	}
}


module.exports = ServiceItemWiiSportsClub;
