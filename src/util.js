const crypto = require('crypto');

function md5(input) {
	return crypto.createHash('md5').update(input).digest();
}

module.exports = {
	md5
};