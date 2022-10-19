const Stream = require('../../stream'); // eslint-disable-line no-unused-vars
const NEXTypes = require('../../types');

class NintendoLoginData extends NEXTypes.Data {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.token = stream.readNEXString();
	}
}
NEXTypes.AnyDataHolder.addType('NintendoLoginData', NintendoLoginData);

module.exports = {
	NintendoLoginData
};