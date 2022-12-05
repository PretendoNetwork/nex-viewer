const Stream = require('../../stream'); // eslint-disable-line no-unused-vars

class DeliverMessageRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.oUserMessage = stream.readNEXAnyDataHolder();
	}

	toJSON() {
		return {
			oUserMessage: {
				__typeName: 'AnyDataHolder',
				__typeValue: this.oUserMessage
			}
		};
	}
}

module.exports = {
	DeliverMessageRequest
};