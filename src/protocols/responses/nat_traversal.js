const Stream = require('../../stream'); // eslint-disable-line no-unused-vars

class RequestProbeInitiationResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class InitiateProbeResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class RequestProbeInitiationExtResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class ReportNATTraversalResultResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class ReportNATPropertiesResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

class GetRelaySignatureKeyResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.relayMode = stream.readInt32LE();
		this.currentUTCTime = stream.readNEXDateTime();
		this.address = stream.readNEXString();
		this.port = stream.readUInt16LE();
		this.relayAddressType = stream.readInt32LE();
		this.gameServerID = stream.readUInt32LE();
	}

	toJSON() {
		return {
			relayMode: {
				__typeName: 'sint32',
				__typeValue: this.relayMode
			},
			currentUTCTime: {
				__typeName: 'DateTime',
				__typeValue: this.currentUTCTime
			},
			address: {
				__typeName: 'String',
				__typeValue: this.address
			},
			port: {
				__typeName: 'uint16',
				__typeValue: this.port
			},
			relayAddressType: {
				__typeName: 'sint32',
				__typeValue: this.relayAddressType
			},
			gameServerID: {
				__typeName: 'uint32',
				__typeValue: this.gameServerID
			}
		};
	}
}

class ReportNATTraversalResultDetailResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

module.exports = {
	RequestProbeInitiationResponse,
	InitiateProbeResponse,
	RequestProbeInitiationExtResponse,
	ReportNATTraversalResultResponse,
	ReportNATPropertiesResponse,
	GetRelaySignatureKeyResponse,
	ReportNATTraversalResultDetailResponse
};