const Stream = require('./stream');

class Structure {
	/**
	 *
	 * @returns Array
	 */
	getHierarchy() {
		// TODO - This is trash. Find a better way
		const hierarchy = [];
		let current = this.__proto__;

		while (current.constructor != Structure) {
			hierarchy.push(new current.constructor());
			current = current.__proto__;
		}

		return hierarchy.reverse();
	}

	/**
	 *
	 * @param {Stream} stream
	 */
	extract(stream) {
		const hierarchy = this.getHierarchy();

		for (const cls of hierarchy) {
			if (stream.connection.prudpProtocolMinorVersion >= 3) {
				cls.structureVersion = stream.readUInt8();
				cls.contentLength = stream.readUInt32LE();
			}

			cls.parse(stream);
			Object.assign(this, cls); // assign properties to this from the new classes
		}
	}
}

// This is empty
class Data extends Structure {
	/**
	 *
	 * @param {Stream} stream
	 */
	parse(stream) { } // do nothing
}

class AnyDataHolder {
	static typesHandlers = {};

	/**
	 *
	 * @param {String} name
	 * @param {*} cls
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

	/**
	 *
	 * @param {Stream} stream
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
}

class RVConnectionData extends Structure {
	/**
	 *
	 * @param {Stream} stream
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
	 * @param {String} string
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
	 * @param {Stream} stream
	 */
	parse(stream) {
		this.m_uiOffset = stream.readUInt32LE();
		this.m_uiSize = stream.readUInt32LE();
	}
}

class Result {
	/**
	 *
	 * @param {Number} resultCode
	 */
	constructor(resultCode) {
		this.resultCode = resultCode;
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
};