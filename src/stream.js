const NEXTypes = require('./types');

class Stream {
	constructor(buffer, connection) {
		this.connection = connection; // Used for NEX type settings
		this._buffer = buffer;
		this._offset = 0;
	}

	/**
	 *
	 * @returns Boolean
	 */
	hasDataLeft() {
		return this._offset < this._buffer.length;
	}

	/**
	 *
	 * @param {Number} value
	 */
	skip(value) {
		this._offset += value;
	}

	/**
	 *
	 * @param {Number} len
	 * @returns Buffer
	 */
	read(len) {
		const read = this._buffer.subarray(this._offset, this._offset + len);
		this._offset += len;

		return read;
	}

	/**
	 *
	 * @param {Number} len
	 * @returns Buffer
	 */
	readBytes(len) {
		return this.read(len);
	}

	/**
	 *
	 * @returns Buffer
	 */
	readRest() {
		return this.readBytes(this._buffer.length - this._offset);
	}

	/**
	 *
	 * @returns Number
	 */
	readUInt8() {
		return this.readBytes(1).readUInt8();
	}

	/**
	 *
	 * @returns Number
	 */
	readInt8() {
		return this.readBytes(1).readInt8();
	}

	/**
	 *
	 * @returns Number
	 */
	readUInt16BE() {
		return this.readBytes(2).readUInt16BE();
	}

	/**
	 *
	 * @returns Number
	 */
	readUInt16LE() {
		return this.readBytes(2).readUInt16LE();
	}

	/**
	 *
	 * @returns Number
	 */
	readInt16BE() {
		return this.readBytes(2).readInt16BE();
	}

	/**
	 *
	 * @returns Number
	 */
	readInt16LE() {
		return this.readBytes(2).readInt16LE();
	}

	/**
	 *
	 * @returns Number
	 */
	readUInt32BE() {
		return this.readBytes(4).readUInt32BE();
	}

	/**
	 *
	 * @returns Number
	 */
	readUInt32LE() {
		return this.readBytes(4).readUInt32LE();
	}

	/**
	 *
	 * @returns Number
	 */
	readInt32BE() {
		return this.readBytes(4).readInt32BE();
	}

	/**
	 *
	 * @returns Number
	 */
	readInt32LE() {
		return this.readBytes(4).readInt32LE();
	}

	/**
	 *
	 * @returns Number
	 */
	readUInt64BE() {
		return this.readBytes(8).readBigUInt64BE();
	}

	/**
	 *
	 * @returns Number
	 */
	readUInt64LE() {
		return this.readBytes(8).readBigUInt64LE();
	}

	/**
	 *
	 * @returns Number
	 */
	readInt64BE() {
		return this.readBytes(8).readBigInt64BE();
	}

	/**
	 *
	 * @returns Number
	 */
	readInt64LE() {
		return this.readBytes(8).readBigInt64LE();
	}

	/**
	 * @returns String
	 */
	readNEXString() {
		const length = this.readUInt16LE();
		const string = this.readBytes(length);

		return string.toString().replace(/\0/g, '');
	}

	/**
	 * @returns Buffer
	 */
	readNEXBuffer() {
		const length = this.readUInt32LE();

		return this.readBytes(length);
	}

	/**
	 * @returns Buffer
	 */
	readNEXQBuffer() {
		const length = this.readUInt16LE();

		return this.readBytes(length);
	}

	/**
	 *
	 * @param {(Function|NEXTypes.Structure)} method
	 * @returns Array
	 */
	readNEXList(method) {
		const list = [];

		const length = this.readUInt32LE();

		for (let i = 0; i < length; i++) {
			if (method.prototype instanceof NEXTypes.Structure) {
				list.push(this.readNEXStructure.call(this, method));
			} else {
				list.push(method.call(this));
			}
		}

		return list;
	}

	readNEXStationURL() {
		return new NEXTypes.StationURL(this.readNEXString());
	}

	readNEXDateTime() {
		// TODO - Return a NEXTypes.DateTime
		return this.readUInt64LE();
	}

	readNEXResult() {
		return new NEXTypes.Result(this.readUInt32LE());
	}

	readNEXStructure(cls) {
		const instance = new cls();
		instance.extract(this);

		return instance;
	}

	readNEXAnyDataHolder() {
		return this.readNEXStructure(NEXTypes.AnyDataHolder).data;
	}
}

module.exports = Stream;