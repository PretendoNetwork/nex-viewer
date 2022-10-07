const crypto = require('crypto');
const Stream = require('./stream');
const { md5 } = require('./util');

class KerberosEncryption {
	/**
	 *
	 * @param {string} key Crypto key
	 */
	constructor(key) {
		this.key = key;
		this.cipher = crypto.createCipheriv('rc4', key, '');
	}

	/**
	 *
	 * @param {Buffer} buffer Kerberos encrypted buffer
	 * @returns {Buffer} Decrypted buffer
	 */
	decrypt(buffer) {
		if (!this.validate(buffer)) {
			throw new Error('Kerberos ticket validity check failed');
		}

		const data = buffer.subarray(0, -0x10);
		return this.cipher.update(data);
	}

	/**
	 *
	 * @param {Buffer} buffer Kerberos encrypted buffer
	 * @returns {boolean} isValid
	 */
	validate(buffer) {
		const data = buffer.subarray(0, -0x10);
		const checksum = buffer.subarray(-0x10);

		const hmac = crypto.createHmac('md5', this.key).update(data).digest();

		return checksum.equals(hmac);
	}
}

class KerberosTicket {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.stream = stream;
		this.key = Buffer.from(this.stream.connection.clientNEXPassword, 'hex');

		this.sessionKey;
		this.targetPID;
		this.internalTicketData;

		this.decrypt();
	}

	decrypt() {
		const encryption = new KerberosEncryption(this.key);
		const decrypted = encryption.decrypt(this.stream._buffer);

		const decryptedStream = new Stream(decrypted);

		if (this.stream.connection.isFriendsServer()) {
			this.sessionKey = decryptedStream.readBytes(16);
		} else {
			this.sessionKey = decryptedStream.readBytes(32);
		}

		this.targetPID = decryptedStream.readUInt32LE();
		this.internalTicketData = decryptedStream.readNEXBuffer();
	}
}

/**
 *
 * @param {number} pid User NEX account PID
 * @param {string} password User NEX account password
 * @returns {Buffer} Kerberos key
 */
function deriveKerberosKey(pid, password) {
	for (let i = 0; i < 65000 + (pid % 1024); i++) {
		password = md5(password);
	}

	return password;
}

module.exports = {
	KerberosTicket,
	deriveKerberosKey
};