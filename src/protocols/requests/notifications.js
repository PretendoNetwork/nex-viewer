const Stream = require('../../stream'); // eslint-disable-line no-unused-vars
const NotificationsTypes = require('./types/notifications');

class ProcessNotificationEventRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.oEvent = stream.readNEXStructure(NotificationsTypes.NotificationEvent);
	}

	toJSON() {
		return {
			oEvent: {
				__typeName: 'NotificationEvent',
				__typeValue: this.oEvent
			}
		};
	}
}

module.exports = {
	ProcessNotificationEventRequest
};