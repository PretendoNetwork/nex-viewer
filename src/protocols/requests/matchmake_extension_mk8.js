/**
 * @typedef {import('../../stream')} Stream
 */

class JoinMatchmakeSessionWithExtraParticipantsRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.gid = stream.readUInt32LE();
		this.joinMessage = stream.readNEXString();
		this.ignoreBlacklist = stream.readBoolean();
		this.participationCount = stream.readUInt16LE();
		this.extraParticipants = stream.readUInt32LE();
	}

	toJSON() {
		return {
			gid: {
				__typeName: 'uint32',
				__typeValue: this.gid
			},
			joinMessage: {
				__typeName: 'String',
				__typeValue: this.joinMessage
			},
			ignoreBlacklist: {
				__typeName: 'boolean',
				__typeValue: this.ignoreBlacklist
			},
			participationCount: {
				__typeName: 'uint16',
				__typeValue: this.participationCount
			},
			extraParticipants: {
				__typeName: 'uint32',
				__typeValue: this.extraParticipants
			}
		};
	}
}

module.exports = {
	JoinMatchmakeSessionWithExtraParticipantsRequest
};
