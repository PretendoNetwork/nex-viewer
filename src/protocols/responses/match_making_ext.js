const Stream = require('../../stream'); // eslint-disable-line no-unused-vars

const MatchMakingTypes = require('../types/match_making');

class EndParticipationResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.retval = stream.readBoolean();
	}

	toJSON() {
		return {
			'%retval%': {
				__typeName: 'boolean',
				__typeValue: this.retval
			}
		};
	}
}

class GetParticipantsResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstParticipants = stream.readNEXList(stream.readUInt32LE);
	}

	toJSON() {
		return {
			lstParticipants: {
				__typeName: 'List<PID>',
				__typeValue: this.lstParticipants
			}
		};
	}
}

class GetDetailedParticipantsResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstParticipants = stream.readNEXList(MatchMakingTypes.ParticipantDetails);
	}

	toJSON() {
		return {
			lstParticipants: {
				__typeName: 'List<ParticipantDetails>',
				__typeValue: this.lstParticipants
			}
		};
	}
}

class GetParticipantsURLsResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.lstGatheringURLs = stream.readNEXList(MatchMakingTypes.GatheringURLs);
	}

	toJSON() {
		return {
			lstGatheringURLs: {
				__typeName: 'List<GatheringURLs>',
				__typeValue: this.lstGatheringURLs
			}
		};
	}
}

class GetGatheringRelationsResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.retval = stream.readNEXString();
	}

	toJSON() {
		return {
			'%retval%': {
				__typeName: 'String',
				__typeValue: this.retval
			}
		};
	}
}

class DeleteFromDeletionsResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

module.exports = {
	EndParticipationResponse,
	GetParticipantsResponse,
	GetDetailedParticipantsResponse,
	GetParticipantsURLsResponse,
	GetGatheringRelationsResponse,
	DeleteFromDeletionsResponse
};