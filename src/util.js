const crypto = require('crypto');

/**
 *
 * @param {(String|Buffer)} input
 * @returns Buffer
 */
function md5(input) {
	return crypto.createHash('md5').update(input).digest();
}

module.exports = {
	md5
};