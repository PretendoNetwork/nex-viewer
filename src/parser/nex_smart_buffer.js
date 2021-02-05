const { SmartBuffer } = require('smart-buffer');
const NEXTypes = require('./protocols/nex_types');

// Extends SmartBuffer to support NEX common types
class NEXSmartBuffer extends SmartBuffer {
	readNEXString() {
		this.readOffset += 2; // Skip length
		const string = this.readStringNT();

		return string;
	}

	readNEXBuffer() {
		const length = this.readUInt32LE();
		const buffer = this.readBuffer(length);

		return buffer;
	}

	readNEXQBuffer() {
		const length = this.readUInt16LE();
		const buffer = this.readBuffer(length);

		return buffer;
	}

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
		const uint64 = this.readBigUInt64LE();
		return uint64;
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

module.exports = NEXSmartBuffer;