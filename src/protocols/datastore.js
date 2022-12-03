const Packet = require('../packet'); // eslint-disable-line no-unused-vars
const PacketV0 = require('../packetv0'); // eslint-disable-line no-unused-vars
const PacketV1 = require('../packetv1'); // eslint-disable-line no-unused-vars
const RMCMessage = require('../rmc'); // eslint-disable-line no-unused-vars
const Stream = require('../stream');

const DataStoreTypes = require('./types/datastore');

const DataStoreSMM = require('./patches/datastore_smm');

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
			return {
				param: stream.readNEXStructure(DataStoreTypes.DataStorePrepareGetParamV1)
			};
		} else {
			return {
				pReqGetInfo: stream.readNEXStructure(DataStoreTypes.DataStoreReqGetInfoV1)
			};
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
			return {
				param: stream.readNEXStructure(DataStoreTypes.DataStorePreparePostParamV1)
			};
		} else {
			return {
				pReqPostInfo: stream.readNEXStructure(DataStoreTypes.DataStoreReqPostInfoV1)
			};
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
			return {
				param: stream.readNEXStructure(DataStoreTypes.DataStoreCompletePostParamV1)
			};
		} else {
			return {}; // * No response
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
			return {
				param: stream.readNEXStructure(DataStoreTypes.DataStoreDeleteParam)
			};
		} else {
			return {}; // * No response
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
			return {
				params: stream.readNEXList(DataStoreTypes.DataStoreDeleteParam),
				transactional: stream.readBoolean()
			};
		} else {
			return {
				pResults: stream.readNEXList(stream.readNEXResult)
			};
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
			return {
				param: stream.readNEXStructure(DataStoreTypes.DataStoreChangeMetaParamV1)
			};
		} else {
			return {}; // * No response
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
			return {
				dataIds: stream.readNEXList(stream.readUInt64LE),
				params: stream.readNEXList(DataStoreTypes.DataStoreChangeMetaParamV1),
				transactional: stream.readBoolean()
			};
		} else {
			return {
				pResults: stream.readNEXList(stream.readNEXResult)
			};
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
			return {
				param: stream.readNEXStructure(DataStoreTypes.DataStoreGetMetaParam)
			};
		} else {
			return {
				pMetaInfo: stream.readNEXStructure(DataStoreTypes.DataStoreMetaInfo)
			};
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
			return {
				dataIds: stream.readNEXList(stream.readUInt64LE),
				param: stream.readNEXStructure(DataStoreTypes.DataStoreGetMetaParam)
			};
		} else {
			return {
				pMetaInfo: stream.readNEXList(DataStoreTypes.DataStoreMetaInfo),
				pResults: stream.readNEXList(stream.readNEXResult)
			};
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
			return {
				param: stream.readNEXStructure(DataStoreTypes.DataStorePrepareUpdateParam)
			};
		} else {
			return {
				pReqUpdateInfo: stream.readNEXStructure(DataStoreTypes.DataStoreReqUpdateInfo),
			};
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
			return {
				param: stream.readNEXStructure(DataStoreTypes.DataStoreCompleteUpdateParam)
			};
		} else {
			return {}; // * No response
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
			return {
				param: stream.readNEXStructure(DataStoreTypes.DataStoreSearchParam)
			};
		} else {
			return {
				pSearchResult: stream.readNEXStructure(DataStoreTypes.DataStoreSearchResult)
			};
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
			return {
				param: stream.readNEXStructure(DataStoreTypes.DataStoreGetNotificationUrlParam)
			};
		} else {
			return {
				info: stream.readNEXStructure(DataStoreTypes.DataStoreReqGetNotificationUrlInfo)
			};
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
			return {
				param: stream.readNEXStructure(DataStoreTypes.DataStoreGetNewArrivedNotificationsParam)
			};
		} else {
			return {
				pResult: stream.readNEXStructure(DataStoreTypes.DataStoreNotificationV1),
				pHasNext: stream.readBoolean()
			};
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
			return {
				target: stream.readNEXStructure(DataStoreTypes.DataStoreRatingTarget),
				param: stream.readNEXStructure(DataStoreTypes.DataStoreRateObjectParam),
				fetchRatings: stream.readBoolean()
			};
		} else {
			return {
				pRating: stream.readNEXStructure(DataStoreTypes.DataStoreRatingInfo)
			};
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
			return {
				target: stream.readNEXStructure(DataStoreTypes.DataStoreRatingTarget),
				accessPassword: stream.readUInt64LE()
			};
		} else {
			return {
				pRating: stream.readNEXStructure(DataStoreTypes.DataStoreRatingInfo)
			};
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
			return {
				dataIds: stream.readNEXList(stream.readUInt64LE),
				accessPassword: stream.readUInt64LE()
			};
		} else {
			return {
				pRatings: stream.readNEXList(() => stream.readNEXList(DataStoreTypes.DataStoreRatingInfoWithSlot)), // * 2D List
				pResults: stream.readNEXList(stream.readNEXResult)
			};
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
			return {
				target: stream.readNEXStructure(DataStoreTypes.DataStoreRatingTarget),
				accessPassword: stream.readUInt64LE()
			};
		} else {
			return {}; // * No response
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
			return {
				dataIds: stream.readNEXList(stream.readUInt64LE),
				transactional: stream.readBoolean()
			};
		} else {
			return {
				pResults: stream.readNEXList(stream.readNEXResult)
			};
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
			return {
				param: stream.readNEXStructure(DataStoreTypes.DataStoreGetSpecificMetaParamV1)
			};
		} else {
			return {
				pMetaInfos: stream.readNEXList(DataStoreTypes.DataStoreSpecificMetaInfoV1)
			};
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
			return {
				param: stream.readNEXStructure(DataStoreTypes.DataStorePreparePostParam)
			};
		} else {
			return {
				dataId: stream.readUInt64LE()
			};
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
			return {
				param: stream.readNEXStructure(DataStoreTypes.DataStoreTouchObjectParam)
			};
		} else {
			return {}; // * No response
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
			return {
				target: stream.readNEXStructure(DataStoreTypes.DataStoreRatingTarget),
				accessPassword: stream.readUInt64LE()
			};
		} else {
			return {
				pRating: stream.readNEXStructure(DataStoreTypes.DataStoreRatingInfo),
				pRatingLog: stream.readNEXStructure(DataStoreTypes.DataStoreRatingLog)
			};
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
			return {
				param: stream.readNEXStructure(DataStoreTypes.DataStorePreparePostParam)
			};
		} else {
			return {
				pReqPostInfo: stream.readNEXStructure(DataStoreTypes.DataStoreReqPostInfo)
			};
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
			return {
				param: stream.readNEXStructure(DataStoreTypes.DataStorePrepareGetParam)
			};
		} else {
			return {
				pReqGetInfo: stream.readNEXStructure(DataStoreTypes.DataStoreReqGetInfo)
			};
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
			return {
				param: stream.readNEXStructure(DataStoreTypes.DataStoreCompletePostParam)
			};
		} else {
			return {}; // * No response
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
			return {
				param: stream.readNEXStructure(DataStoreTypes.DataStoreGetNewArrivedNotificationsParam)
			};
		} else {
			return {
				pResult: stream.readNEXList(DataStoreTypes.DataStoreNotification),
				pHasNext: stream.readBoolean()
			};
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
			return {
				param: stream.readNEXStructure(DataStoreTypes.DataStoreGetSpecificMetaParam)
			};
		} else {
			return {
				pMetaInfos: stream.readNEXList(DataStoreTypes.DataStoreSpecificMetaInfo)
			};
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
			return {
				ownerId: stream.readUInt32LE(),
				persistenceSlotId: stream.readUInt16LE()
			};
		} else {
			return {
				pPersistenceInfo: stream.readNEXList(DataStoreTypes.DataStorePersistenceInfo)
			};
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
			return {
				ownerId: stream.readUInt32LE(),
				persistenceSlotIds: stream.readNEXList(stream.readUInt16LE)
			};
		} else {
			return {
				pPersistenceInfo: stream.readNEXList(DataStoreTypes.DataStorePersistenceInfo),
				pResults: stream.readNEXList(stream.readNEXResult)
			};
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
			return {
				persistenceSlotId: stream.readUInt16LE(),
				dataId: stream.readUInt64LE(),
				deleteLastObject: stream.readBoolean()
			};
		} else {
			return {}; // * No response
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
			return {
				persistenceSlotId: stream.readUInt16LE(),
				deleteLastObject: stream.readBoolean()
			};
		} else {
			return {}; // * No response
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
			return {
				param: stream.readNEXStructure(DataStoreTypes.DataStorePrepareGetParam)
			};
		} else {
			return {
				pReqGetInfo: stream.readNEXStructure(DataStoreTypes.DataStoreReqGetInfo),
				pReqGetAdditionalMeta: stream.readNEXStructure(DataStoreTypes.DataStoreReqGetAdditionalMeta)
			};
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
			return {
				dataId: stream.readUInt64LE()
			};
		} else {
			return {
				pPasswordInfo: stream.readNEXStructure(DataStoreTypes.DataStorePasswordInfo)
			};
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
			return {
				dataIds: stream.readNEXList(stream.readUInt64LE)
			};
		} else {
			return {
				pPasswordInfo: stream.readNEXList(DataStoreTypes.DataStorePasswordInfo),
				pResults: stream.readNEXList(stream.readNEXResult)
			};
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
			return {
				params: stream.readNEXList(DataStoreTypes.DataStoreGetMetaParam)
			};
		} else {
			return {
				pMetaInfo: stream.readNEXList(DataStoreTypes.DataStoreMetaInfo),
				pResults: stream.readNEXList(stream.readNEXResult)
			};
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
			return {
				dataIds: stream.readNEXList(stream.readUInt64LE)
			};
		} else {
			return {}; // * No response
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
			return {
				param: stream.readNEXStructure(DataStoreTypes.DataStoreChangeMetaParam)
			};
		} else {
			return {}; // * No response
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
			return {
				dataIds: stream.readNEXList(stream.readUInt64LE),
				params: stream.readNEXList(DataStoreTypes.DataStoreChangeMetaParam),
				transactional: stream.readBoolean()
			};
		} else {
			return {
				pResults: stream.readNEXList(stream.readNEXResult)
			};
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
			return {
				targets: stream.readNEXList(DataStoreTypes.DataStoreRatingTarget),
				params: stream.readNEXList(DataStoreTypes.DataStoreRateObjectParam),
				transactional: stream.readBoolean(),
				fetchRatings: stream.readBoolean()
			};
		} else {
			return {
				pRatings: stream.readNEXList(DataStoreTypes.DataStoreRatingInfo),
				pResults: stream.readNEXList(stream.readNEXResult)
			};
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
			return {
				dataId: stream.readUInt64LE(),
				param: stream.readNEXStructure(DataStoreTypes.DataStorePreparePostParam)
			};
		} else {
			return {}; // * No response
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
			return {
				dataIds: stream.readNEXList(stream.readUInt64LE),
				params: stream.readNEXList(DataStoreTypes.DataStorePreparePostParam),
				transactional: stream.readBoolean()
			};
		} else {
			return {
				pResults: stream.readNEXList(stream.readNEXResult)
			};
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
			return {
				target: stream.readNEXStructure(DataStoreTypes.DataStoreRatingTarget),
				rateParam: stream.readNEXStructure(DataStoreTypes.DataStoreRateObjectParam),
				postParam: stream.readNEXStructure(DataStoreTypes.DataStorePreparePostParam),
				transactional: stream.readBoolean()
			};
		} else {
			return {
				pRating: stream.readNEXStructure(DataStoreTypes.DataStoreRatingInfo)
			};
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
			return {
				target: stream.readNEXList(DataStoreTypes.DataStoreRatingTarget),
				rateParam: stream.readNEXList(DataStoreTypes.DataStoreRateObjectParam),
				postParam: stream.readNEXList(DataStoreTypes.DataStorePreparePostParam),
				transactional: stream.readBoolean(),
				fetchRatings: stream.readBoolean()
			};
		} else {
			return {
				pRatings: stream.readNEXList(DataStoreTypes.DataStoreRatingInfo),
				pResults: stream.readNEXList(stream.readNEXResult)
			};
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
			return {
				dataIds: stream.readNEXList(stream.readUInt64LE)
			};
		} else {
			return {
				pInfos: stream.readNEXList(DataStoreTypes.DataStoreReqGetInfo),
				pResults: stream.readNEXList(stream.readNEXResult)
			};
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
			return {
				param: stream.readNEXStructure(DataStoreTypes.DataStoreSearchParam)
			};
		} else {
			return {
				pSearchResult: stream.readNEXStructure(DataStoreTypes.DataStoreSearchResult)
			};
		}
	}
}

module.exports = DataStore;