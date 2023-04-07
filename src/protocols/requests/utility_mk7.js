const Stream = require('../../stream'); // eslint-disable-line no-unused-vars

class UnknownMethod0x5Request {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		// ! This function has an unknown request format
		this.unknown = stream.readRest();
	}

	toJSON() {
		return {
			unknown: {
				__typeName: 'unknown',
				__typeValue: this.unknown
			}
		};
	}
}

module.exports = {
	UnknownMethod0x5Request
};
