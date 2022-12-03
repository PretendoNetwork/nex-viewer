const Stream = require('./stream'); // eslint-disable-line no-unused-vars

class Structure {
	constructor() {
		this._parentTypesClasses = [];
		this._parentTypes = [];
		this._structureHeader = {
			version: 0,
			contentLength: 0
		};
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream NEX data stream
	 */
	extract(stream) {
		const parentTypesClasses = this._parentTypesClasses;

		for (const parentTypeClass of parentTypesClasses) {
			this._parentTypes.push(stream.readNEXStructure(parentTypeClass));
		}

		if (stream.connection.title.nex_version.major >= 3 && stream.connection.title.nex_version.minor >= 5) {
			this._structureHeader = {
				version: stream.readUInt8(),
				contentLength: stream.readUInt32LE()
			};
		}

		this.parse(stream);
	}
}

// This is empty
class Data extends Structure {
	parse() { } // do nothing
}

class AnyDataHolder {
	static typesHandlers = {};

	/**
	 *
	 * @param {string} name NEX type name
	 * @param {*} cls NEX type definition
	 */
	static addType(name, cls) {
		this.typesHandlers[name] = cls;
	}

	constructor() {
		this.typeName;
		this.length1;
		this.length2;
		this.data;
	}

	toJSON() {
		const json = {
			typeName: this.typeName
		};

		if (this.data instanceof Buffer) {
			json.data = this.data.toString('hex');
		} else {
			json.data = this.data;
		}

		return json;
	}

	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	extract(stream) {
		this.typeName = stream.readNEXString();
		this.length1 = stream.readUInt32LE();
		this.length2 = stream.readUInt32LE();

		const structure = AnyDataHolder.typesHandlers[this.typeName];

		if (structure) {
			this.data = stream.readNEXStructure(structure);
		} else {
			console.log(`Unknown AnyDataHolder type ${this.typeName}`);
			this.data = stream.readBytes(this.length2);
		}
	}

	toJSON() {
		const data = {
			typeName: {
				__typeName: 'String',
				__typeValue: this.typeName
			},
			length1: {
				__typeName: 'uint32',
				__typeValue: this.length1
			},
			length2: {
				__typeName: 'uint32',
				__typeValue: this.length2
			},
			objectData: {
				__typeName: this.typeName, // * The type of the data changes and is stored in the typeName
				__typeValue: this.data
			}
		};

		if (data.objectData.__typeValue instanceof Buffer) {
			data.objectData.__typeValue = data.objectData.__typeValue.toString('hex');
		}

		return data;
	}
}

class RVConnectionData extends Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.stationUrl = stream.readNEXStationURL();
		this.specialProtocols = stream.readNEXList(stream.readUInt8);
		this.stationUrlSpecial = stream.readNEXStationURL();

		if (stream.connection.prudpVersion === 1) {
			this.currentUTCTime = stream.readUInt64LE(); // If prudpv1
		}
	}
}

class StationURL {
	/**
	 *
	 * @param {string} string StationURL string
	 */
	constructor(string) {
		this.address;
		this.port;
		this.stream;
		this.sid;
		this.CID;
		this.PID;
		this.type;
		this.RVCID;
		this.natm;
		this.natf;
		this.upnp;
		this.pmp;
		this.probeinit;
		this.PRID;
		this.fastproberesponse;
		this.NodeID;

		// min length is "udp:/"
		if (string.length < 5) {
			return;
		}

		const data = string.split(':/');

		const scheme = data[0];
		let parameters = data[1];

		parameters = Object.fromEntries(parameters.split(';').map(parameter => parameter.split('=')));

		this.scheme = scheme;
		Object.assign(this, parameters);
	}
}

class DateTime { }

class ResultRange extends Structure {
	/**
	 *
	 * @param {Stream} stream NEX data stream
	 */
	parse(stream) {
		this.m_uiOffset = stream.readUInt32LE();
		this.m_uiSize = stream.readUInt32LE();
	}
}

class Result {
	/**
	 *
	 * @param {number} resultCode Result code
	 */
	constructor(resultCode) {
		this.resultCode = resultCode;
	}
}

class Variant {
	/**
	 *
	 *@param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.type = stream.readUInt8();
		this.value = null; // * if type = 0, then value = null. Let null be default

		switch (this.type) {
		case 1:
			this.value = stream.readInt64LE();
			break;
		case 2:
			this.value = stream.readDoubleLE();
			break;
		case 3:
			this.value = stream.readBoolean();
			break;
		case 4:
			this.value = stream.readNEXString();
			break;
		case 5:
			this.value = stream.readNEXDateTime();
			break;
		case 6:
			this.value = stream.readUInt64LE();
			break;
		}
	}
}

module.exports = {
	Structure,
	Data,
	AnyDataHolder,
	RVConnectionData,
	StationURL,
	DateTime,
	ResultRange,
	Result,
	Variant
};