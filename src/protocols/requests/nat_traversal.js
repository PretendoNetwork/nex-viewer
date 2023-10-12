/**
 * @typedef {import('../../stream')} Stream
 */

class RequestProbeInitiationRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.urlTargetList = stream.readNEXList(stream.readNEXStationURL);
	}

	toJSON() {
		return {
			urlTargetList: {
				__typeName: 'List<StationURL>',
				__typeValue: this.urlTargetList
			}
		};
	}
}

class InitiateProbeRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.urlStationToProbe = stream.readNEXStationURL();
	}

	toJSON() {
		return {
			urlStationToProbe: {
				__typeName: 'StationURL',
				__typeValue: this.urlStationToProbe
			}
		};
	}
}

class RequestProbeInitiationExtRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.urlTargetList = stream.readNEXList(stream.readNEXStationURL);
		this.urlStationToProbe = stream.readNEXStationURL();
	}

	toJSON() {
		return {
			urlTargetList: {
				__typeName: 'List<StationURL>',
				__typeValue: this.urlTargetList
			},
			urlStationToProbe: {
				__typeName: 'StationURL',
				__typeValue: this.urlStationToProbe
			}
		};
	}
}

class ReportNATTraversalResultRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.cid = stream.readUInt32LE();
		this.result = stream.readBoolean();

		if (stream.hasDataLeft()) {
			this.rtt = stream.readUInt32LE(); // ! THIS IS NOT PRESENT ON 3DS, ONLY WIIU/SWITCH
		}
	}

	toJSON() {
		const data = {
			cid: {
				__typeName: 'uint32',
				__typeValue: this.cid
			},
			result: {
				__typeName: 'boolean',
				__typeValue: this.result
			}
		};

		if (this.rtt !== undefined) {
			data.rtt = {
				__typeName: 'uint32',
				__typeValue: this.rtt
			};
		}

		return data;
	}
}

class ReportNATPropertiesRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.natmapping = stream.readUInt32LE();
		this.natfiltering = stream.readUInt32LE();
		this.rtt = stream.readUInt32LE();
	}

	toJSON() {
		return {
			natmapping: {
				__typeName: 'uint32',
				__typeValue: this.natmapping
			},
			natfiltering: {
				__typeName: 'uint32',
				__typeValue: this.natfiltering
			},
			rtt: {
				__typeName: 'uint32',
				__typeValue: this.rtt
			}
		};
	}
}

class GetRelaySignatureKeyRequest {
	// * Requests nothing
	toJSON() {
		return {};
	}
}

class ReportNATTraversalResultDetailRequest {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.cid = stream.readUInt32LE();
		this.result = stream.readBoolean();
		this.detail = stream.readInt32LE();
		this.rtt = stream.readUInt32LE();
	}

	toJSON() {
		return {
			cid: {
				__typeName: 'uint32',
				__typeValue: this.cid
			},
			result: {
				__typeName: 'boolean',
				__typeValue: this.result
			},
			detail: {
				__typeName: 'sint32',
				__typeValue: this.detail
			},
			rtt: {
				__typeName: 'uint32',
				__typeValue: this.rtt
			}
		};
	}
}

module.exports = {
	RequestProbeInitiationRequest,
	InitiateProbeRequest,
	RequestProbeInitiationExtRequest,
	ReportNATTraversalResultRequest,
	ReportNATPropertiesRequest,
	GetRelaySignatureKeyRequest,
	ReportNATTraversalResultDetailRequest
};
