const crypto = require('crypto');

/**
 *
 * @param {(string|Buffer)} input Input
 * @returns {Buffer} MD5 hashed buffer
 */
function md5(input) {
	return crypto.createHash('md5').update(input).digest();
}

module.exports = {
	md5
};