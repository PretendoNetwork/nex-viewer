/**
 * @typedef {import('../../stream')} Stream
 */

class JoinMatchmakeSessionWithExtraParticipantsResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.sessionKey = stream.readNEXBuffer();
	}

	toJSON() {
		return {
			sessionKey: {
				__typeName: 'Buffer',
				__typeValue: this.sessionKey
			}
		};
	}
}

module.exports = {
	JoinMatchmakeSessionWithExtraParticipantsResponse
};
