/**
 * @typedef {import('../../stream')} Stream
 */

class EndParticipationRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.idGathering = stream.readUInt32LE();
		this.strMessage = stream.readNEXString();
	}

	toJSON() {
		return {
			idGathering: {
				__typeName: 'uint32',
				__typeValue: this.idGathering
			},
			strMessage: {
				__typeName: 'String',
				__typeValue: this.strMessage
			}
		};
	}
}

class GetParticipantsRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.idGathering = stream.readUInt32LE();
		this.bOnlyActive = stream.readBoolean();
	}

	toJSON() {
		return {
			idGathering: {
				__typeName: 'uint32',
				__typeValue: this.idGathering
			},
			bOnlyActive: {
				__typeName: 'boolean',
				__typeValue: this.bOnlyActive
			}
		};
	}
}

class GetDetailedParticipantsRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.idGathering = stream.readUInt32LE();
		this.bOnlyActive = stream.readBoolean();
	}

	toJSON() {
		return {
			idGathering: {
				__typeName: 'uint32',
				__typeValue: this.idGathering
			},
			bOnlyActive: {
				__typeName: 'boolean',
				__typeValue: this.bOnlyActive
			}
		};
	}
}

class GetParticipantsURLsRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstGatherings = stream.readNEXList(stream.readUInt32LE);
	}

	toJSON() {
		return {
			lstGatherings: {
				__typeName: 'List<uint32>',
				__typeValue: this.lstGatherings
			}
		};
	}
}

class GetGatheringRelationsRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.id = stream.readUInt32LE();
		this.descr = stream.readNEXString();
	}

	toJSON() {
		return {
			id: {
				__typeName: 'uint32',
				__typeValue: this.id
			},
			descr: {
				__typeName: 'String',
				__typeValue: this.descr
			}
		};
	}
}

class DeleteFromDeletionsRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstDeletions = stream.readNEXList(stream.readUInt32LE);
		this.pid = stream.readPID();
	}

	toJSON() {
		return {
			lstDeletions: {
				__typeName: 'List<uint32>',
				__typeValue: this.lstDeletions
			},
			pid: {
				__typeName: 'PID',
				__typeValue: this.pid
			}
		};
	}
}

module.exports = {
	EndParticipationRequest,
	GetParticipantsRequest,
	GetDetailedParticipantsRequest,
	GetParticipantsURLsRequest,
	GetGatheringRelationsRequest,
	DeleteFromDeletionsRequest
};