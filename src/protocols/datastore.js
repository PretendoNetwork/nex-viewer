const Packet = require('../packet'); // eslint-disable-line no-unused-vars
const PacketV0 = require('../packetv0'); // eslint-disable-line no-unused-vars
const PacketV1 = require('../packetv1'); // eslint-disable-line no-unused-vars
const RMCMessage = require('../rmc'); // eslint-disable-line no-unused-vars
const Stream = require('../stream');

const DataStoreSMM = require('./patches/datastore_smm');
const DataStoreBadgeArcade = require('./patches/datastore_badge_arcade');
const DataStorePokemonBank = require('./patches/datastore_pokemon_bank');

const Requests = require('./requests/datastore');
const Responses = require('./responses/datastore');

class DataStore {
	static ProtocolID = 0x73;

	static ProtocolName = 'DataStore';

	static Methods = {
		PrepareGetObjectV1: 0x01,
		PreparePostObjectV1: 0x02,
		CompletePostObjectV1: 0x03,
		DeleteObject: 0x04,
		DeleteObjects: 0x05,
		ChangeMetaV1: 0x06,
		ChangeMetasV1: 0x07,
		GetMeta: 0x08,
		GetMetas: 0x09,
		PrepareUpdateObject: 0x0a,
		CompleteUpdateObject: 0x0b,
		SearchObject: 0x0c,
		GetNotificationUrl: 0x0d,
		GetNewArrivedNotificationsV1: 0x0e,
		RateObject: 0x0f,
		GetRating: 0x10,
		GetRatings: 0x11,
		ResetRating: 0x12,
		ResetRatings: 0x13,
		GetSpecificMetaV1: 0x14,
		PostMetaBinary: 0x15,
		TouchObject: 0x16,
		GetRatingWithLog: 0x17,
		PreparePostObject: 0x18,
		PrepareGetObject: 0x19,
		CompletePostObject: 0x1a,
		GetNewArrivedNotifications: 0x1b,
		GetSpecificMeta: 0x1c,
		GetPersistenceInfo: 0x1d,
		GetPersistenceInfos: 0x1e,
		PerpetuateObject: 0x1f,
		UnperpetuateObject: 0x20,
		PrepareGetObjectOrMetaBinary: 0x21,
		GetPasswordInfo: 0x22,
		GetPasswordInfos: 0x23,
		GetMetasMultipleParam: 0x24,
		CompletePostObjects: 0x25,
		ChangeMeta: 0x26,
		ChangeMetas: 0x27,
		RateObjects: 0x28,
		PostMetaBinaryWithDataId: 0x29,
		PostMetaBinariesWithDataId: 0x2a,
		RateObjectWithPosting: 0x2b,
		RateObjectsWithPosting: 0x2c,
		GetObjectInfos: 0x2d,
		SearchObjectLight: 0x2e
	};

	static MethodNames = Object.entries(DataStore.Methods).reduce((namesObject, entry) => {
		const [key, value] = entry;
		namesObject[value] = key;
		return namesObject;
	}, {});

	static Handlers = {
		0x01: DataStore.PrepareGetObjectV1,
		0x02: DataStore.PreparePostObjectV1,
		0x03: DataStore.CompletePostObjectV1,
		0x04: DataStore.DeleteObject,
		0x05: DataStore.DeleteObjects,
		0x06: DataStore.ChangeMetaV1,
		0x07: DataStore.ChangeMetasV1,
		0x08: DataStore.GetMeta,
		0x09: DataStore.GetMetas,
		0x0a: DataStore.PrepareUpdateObject,
		0x0b: DataStore.CompleteUpdateObject,
		0x0c: DataStore.SearchObject,
		0x0d: DataStore.GetNotificationUrl,
		0x0e: DataStore.GetNewArrivedNotificationsV1,
		0x0f: DataStore.RateObject,
		0x10: DataStore.GetRating,
		0x11: DataStore.GetRatings,
		0x12: DataStore.ResetRating,
		0x13: DataStore.ResetRatings,
		0x14: DataStore.GetSpecificMetaV1,
		0x15: DataStore.PostMetaBinary,
		0x16: DataStore.TouchObject,
		0x17: DataStore.GetRatingWithLog,
		0x18: DataStore.PreparePostObject,
		0x19: DataStore.PrepareGetObject,
		0x1a: DataStore.CompletePostObject,
		0x1b: DataStore.GetNewArrivedNotifications,
		0x1c: DataStore.GetSpecificMeta,
		0x1d: DataStore.GetPersistenceInfo,
		0x1e: DataStore.GetPersistenceInfos,
		0x1f: DataStore.PerpetuateObject,
		0x20: DataStore.UnperpetuateObject,
		0x21: DataStore.PrepareGetObjectOrMetaBinary,
		0x22: DataStore.GetPasswordInfo,
		0x23: DataStore.GetPasswordInfos,
		0x24: DataStore.GetMetasMultipleParam,
		0x25: DataStore.CompletePostObjects,
		0x26: DataStore.ChangeMeta,
		0x27: DataStore.ChangeMetas,
		0x28: DataStore.RateObjects,
		0x29: DataStore.PostMetaBinaryWithDataId,
		0x2a: DataStore.PostMetaBinariesWithDataId,
		0x2b: DataStore.RateObjectWithPosting,
		0x2c: DataStore.RateObjectsWithPosting,
		0x2d: DataStore.GetObjectInfos,
		0x2e: DataStore.SearchObjectLight
	};

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet PRUDP packet
	 */
	static handlePacket(packet) {
		const methodId = packet.rmcMessage.methodId;

		// Check if method is a SMM patched method
		if (packet.connection.accessKey === '9f2b4678' && methodId >= 0x2D) {
			DataStoreSMM.handlePacket(packet);
			return;
		}

		// Check if method is a Badge Arcade patched method
		if (packet.connection.accessKey === '82d5962d' && methodId >= 0x2D) {
			DataStoreBadgeArcade.handlePacket(packet);
			return;
		}

		// Check if method is a Pokémon Bank patched method
		if (packet.connection.accessKey === '9a2961d8' && methodId >= 0x28) {
			DataStorePokemonBank.handlePacket(packet);
			return;
		}

		const handler = DataStore.Handlers[methodId];

		if (!handler) {
			console.log(`Unknown DataStore method ID ${methodId} (0x${methodId?.toString(16)}) (${DataStore.MethodNames[methodId]})`);
			return;
		}

		const { rmcMessage } = packet;
		const stream = new Stream(rmcMessage.body, packet.connection);

		packet.rmcData = {
			body: handler(rmcMessage, stream)
		};
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static PrepareGetObjectV1(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.PrepareGetObjectV1Request(stream);
		} else {
			return new Responses.PrepareGetObjectV1Response(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static PreparePostObjectV1(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.PreparePostObjectV1Request(stream);
		} else {
			return new Responses.PreparePostObjectV1Response(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static CompletePostObjectV1(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.CompletePostObjectV1Request(stream);
		} else {
			return new Responses.CompletePostObjectV1Response(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static DeleteObject(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.DeleteObjectRequest(stream);
		} else {
			return new Responses.DeleteObjectResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static DeleteObjects(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.DeleteObjectsRequest(stream);
		} else {
			return new Responses.DeleteObjectsResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static ChangeMetaV1(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.ChangeMetaV1Request(stream);
		} else {
			return new Responses.ChangeMetaV1Response(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static ChangeMetasV1(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.ChangeMetasV1Request(stream);
		} else {
			return new Responses.ChangeMetasV1Response(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetMeta(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetMetaRequest(stream);
		} else {
			return new Responses.GetMetaResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetMetas(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetMetasRequest(stream);
		} else {
			return new Responses.GetMetasResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static PrepareUpdateObject(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.PrepareUpdateObjectRequest(stream);
		} else {
			return new Responses.PrepareUpdateObjectResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static CompleteUpdateObject(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.CompleteUpdateObjectRequest(stream);
		} else {
			return new Responses.CompleteUpdateObjectResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static SearchObject(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.SearchObjectRequest(stream);
		} else {
			return new Responses.SearchObjectResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetNotificationUrl(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetNotificationUrlRequest(stream);
		} else {
			return new Responses.GetNotificationUrlResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetNewArrivedNotificationsV1(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetNewArrivedNotificationsV1Request(stream);
		} else {
			return new Responses.GetNewArrivedNotificationsV1Response(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static RateObject(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.RateObjectRequest(stream);
		} else {
			return new Responses.RateObjectResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetRating(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetRatingRequest(stream);
		} else {
			return new Responses.GetRatingResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetRatings(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetRatingsRequest(stream);
		} else {
			return new Responses.GetRatingsResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static ResetRating(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.ResetRatingRequest(stream);
		} else {
			return new Responses.ResetRatingResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static ResetRatings(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.ResetRatingsRequest(stream);
		} else {
			return new Responses.ResetRatingsResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetSpecificMetaV1(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetSpecificMetaV1Request(stream);
		} else {
			return new Responses.GetSpecificMetaV1Response(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static PostMetaBinary(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.PostMetaBinaryRequest(stream);
		} else {
			return new Responses.PostMetaBinaryResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static TouchObject(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.TouchObjectRequest(stream);
		} else {
			return new Responses.TouchObjectResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetRatingWithLog(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetRatingWithLogRequest(stream);
		} else {
			return new Responses.GetRatingWithLogResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static PreparePostObject(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.PreparePostObjectRequest(stream);
		} else {
			return new Responses.PreparePostObjectResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static PrepareGetObject(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.PrepareGetObjectRequest(stream);
		} else {
			return new Responses.PrepareGetObjectResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static CompletePostObject(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.CompletePostObjectRequest(stream);
		} else {
			return new Responses.CompletePostObjectResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetNewArrivedNotifications(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetNewArrivedNotificationsRequest(stream);
		} else {
			return new Responses.GetNewArrivedNotificationsResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetSpecificMeta(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetSpecificMetaRequest(stream);
		} else {
			return new Responses.GetSpecificMetaResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetPersistenceInfo(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetPersistenceInfoRequest(stream);
		} else {
			return new Responses.GetPersistenceInfoResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetPersistenceInfos(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetPersistenceInfosRequest(stream);
		} else {
			return new Responses.GetPersistenceInfosResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static PerpetuateObject(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.PerpetuateObjectRequest(stream);
		} else {
			return new Responses.PerpetuateObjectResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static UnperpetuateObject(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.UnperpetuateObjectRequest(stream);
		} else {
			return new Responses.UnperpetuateObjectResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static PrepareGetObjectOrMetaBinary(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.PrepareGetObjectOrMetaBinaryRequest(stream);
		} else {
			return new Responses.PrepareGetObjectOrMetaBinaryResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetPasswordInfo(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetPasswordInfoRequest(stream);
		} else {
			return new Responses.GetPasswordInfoResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetPasswordInfos(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetPasswordInfosRequest(stream);
		} else {
			return new Responses.GetPasswordInfosResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetMetasMultipleParam(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetMetasMultipleParamRequest(stream);
		} else {
			return new Responses.GetMetasMultipleParamResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static CompletePostObjects(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.CompletePostObjectsRequest(stream);
		} else {
			return new Responses.CompletePostObjectsResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static ChangeMeta(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.ChangeMetaRequest(stream);
		} else {
			return new Responses.ChangeMetaResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static ChangeMetas(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.ChangeMetasRequest(stream);
		} else {
			return new Responses.ChangeMetasResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static RateObjects(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.RateObjectsRequest(stream);
		} else {
			return new Responses.RateObjectsResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static PostMetaBinaryWithDataId(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.PostMetaBinaryWithDataIdRequest(stream);
		} else {
			return new Responses.PostMetaBinaryWithDataIdResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static PostMetaBinariesWithDataId(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.PostMetaBinariesWithDataIdRequest(stream);
		} else {
			return new Responses.PostMetaBinariesWithDataIdResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static RateObjectWithPosting(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.RateObjectWithPostingRequest(stream);
		} else {
			return new Responses.RateObjectWithPostingResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static RateObjectsWithPosting(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.RateObjectsWithPostingRequest(stream);
		} else {
			return new Responses.RateObjectsWithPostingResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetObjectInfos(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetObjectInfosRequest(stream);
		} else {
			return new Responses.GetObjectInfosResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static SearchObjectLight(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.SearchObjectLightRequest(stream);
		} else {
			return new Responses.SearchObjectLightResponse(stream);
		}
	}
}

module.exports = DataStore;
