const crypto = require('crypto');
const RC4 = require('simple-rc4');
const NEXSmartBuffer = require('./nex_smart_buffer');
const { md5 } = require('../util');

class KerberosEncryption {
	constructor(key) {
		this.key = key;
		this.cipher = new RC4(key);
	}

	verifyChecksum(buffer) {
		const data = buffer.subarray(0, -0x10);
		const checksum = buffer.subarray(-0x10);

		const hmac = crypto.createHmac('md5', this.key).update(data).digest();

		return checksum.equals(hmac);
	}

	decrypt(buffer) {
		if (!this.verifyChecksum(buffer)) {
			// Do something
		}

		const data = buffer.subarray(0, -0x10);
		return this.cipher.update(data);
	}
}

class KerberosTicket {
	constructor(encryptedBuffer) {
		this.encryptedBuffer = encryptedBuffer;

		if (this.encryptedBuffer.connection.nexPassword.length === 32) {
			this.key = Buffer.from(this.encryptedBuffer.connection.nexPassword, 'hex'); // Already derived
		} else {
			this.key = deriveKerberosKey(this.encryptedBuffer.connection.pid, this.encryptedBuffer.connection.nexPassword);
		}

		this.decrypt(this.key);
	}

	decrypt(key) {
		const kerberos = new KerberosEncryption(key);
		const decrypted = kerberos.decrypt(this.encryptedBuffer.internalBuffer);
		this.decrypted = decrypted;

		const buffer = NEXSmartBuffer.fromBuffer(decrypted);

		if (this.encryptedBuffer.connection.isFriendsServer()) {
			this.sessionKey = buffer.readBuffer(16);
		} else {
			this.sessionKey = buffer.readBuffer(32);
		}

		this.target = buffer.readUInt32LE();
		this.internal = buffer.readNEXBuffer();
	}
}

function deriveKerberosKey(pid, password) {
	for (let i = 0; i < 65000 + (pid % 1024); i++) {
		password = md5(password);
	}

	return password;
}

module.exports = {
	KerberosTicket
};