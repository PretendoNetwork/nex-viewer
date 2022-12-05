const Stream = require('../../stream'); // eslint-disable-line no-unused-vars
const NintendoNotificationsTypes = require('../types/nintendo_notifications');

class ProcessNintendoNotificationEvent1Request {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.eventObject = stream.readNEXStructure(NintendoNotificationsTypes.NintendoNotificationEvent);
	}

	toJSON() {
		return {
			eventObject: {
				__typeName: 'NintendoNotificationEvent',
				__typeValue: this.eventObject
			}
		};
	}
}

class ProcessNintendoNotificationEvent2Request {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.eventObject = stream.readNEXStructure(NintendoNotificationsTypes.NintendoNotificationEvent);
	}

	toJSON() {
		return {
			eventObject: {
				__typeName: 'NintendoNotificationEvent',
				__typeValue: this.eventObject
			}
		};
	}
}

module.exports = {
	ProcessNintendoNotificationEvent1Request,
	ProcessNintendoNotificationEvent2Request
};