class Structure {
	getHierarchy() {
		const hierarchy = [];
		let current = this.__proto__;

		while (current.constructor != Structure) {
			hierarchy.push(new current.constructor());
			current = current.__proto__;
		}

		return hierarchy.reverse();
	}

	extract(buffer) {
		const hierarchy = this.getHierarchy();

		for (const cls of hierarchy) {
			if (buffer.connection.getMinorNEXVersion() >= 3) {
				cls.structureVersion = buffer.readUInt8();
				cls.contentLength = buffer.readUInt32LE();

				/*
				if (cls.contentLength === 0) {
					console.log(buffer.internalBuffer.subarray(buffer.readOffset).toString());
					console.log(buffer.internalBuffer.subarray(buffer.readOffset).length);
					buffer.readOffset -= 5;
					console.log(buffer.internalBuffer.subarray(buffer.readOffset));
					console.log(cls);
					throw new Error('Empty structure????');
				}
				*/
			}

			cls.parse(buffer);
			Object.assign(this, cls); // assign properties to this from the new classes
		}
	}
}

// This is empty
class Data extends Structure {
	parse() {} // do nothing
}

class AnyDataHolder {
	// eslint-disable-next-line
	static typesHandlers = {};

	static addType(name, cls) {
		this.typesHandlers[name] = cls;
	}

	extract(buffer) {
		this.typeName = buffer.readNEXString();
		buffer.readOffset += 4; // Skip first length
		buffer.readOffset += 4; // Skip second length

		// typesHandlers is static and cannot be accessed from the 'this' keyword in this case
		this.data = buffer.readNEXStructure(AnyDataHolder.typesHandlers[this.typeName]);
	}
}

class RVConnectionData extends Structure {
	parse(buffer) {
		this.stationUrl = buffer.readNEXStationURL();
		this.specialProtocols = buffer.readNEXList(buffer.readUInt8);
		this.stationUrlSpecial = buffer.readNEXStationURL();

		if (buffer.connection.prudpVersion === 1) {
			this.currentUTCTime = buffer.readBigUInt64LE(); // If prudpv1
		}
	}
}

class StationURL {
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

class DateTime {}

class ResultRange extends Structure {
	parse(buffer) {
		this.offset = buffer.readUInt32LE();
		this.size = buffer.readUInt32LE();
	}
}

class Result {
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