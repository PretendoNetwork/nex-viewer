/**
 * @typedef {import('../../stream')} Stream
 */

const FriendsWiiUTypes = require('../types/friends_wiiu');

class UpdateAndGetAllInformationRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.NNAInfo = stream.readNEXStructure(FriendsWiiUTypes.NNAInfo);
		this.presence = stream.readNEXStructure(FriendsWiiUTypes.NintendoPresenceV2);
		this.birthday = stream.readNEXDateTime();
	}

	toJSON() {
		return {
			NNAInfo: {
				__typeName: 'NNAInfo',
				__typeValue: this.NNAInfo
			},
			presence: {
				__typeName: 'NintendoPresenceV2',
				__typeValue: this.presence
			},
			birthday: {
				__typeName: 'DateTime',
				__typeValue: this.birthday
			}
		};
	}
}

class UpdatePresenceRequest {
	constructor(stream) {
		this.presence = stream.readNEXStructure(FriendsWiiUTypes.NintendoPresenceV2);
	}

	toJSON() {
		return {
			presence: {
				__typeName: 'NintendoPresenceV2',
				__typeValue: this.presence
			}
		};
	}
}

module.exports = {
	UpdateAndGetAllInformationRequest,
	UpdatePresenceRequest
};
