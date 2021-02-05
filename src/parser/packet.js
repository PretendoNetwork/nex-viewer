class Packet {
	constructor() {
		this._version;

		this._type;
		this._flags = 0;
		this._source;
		this._destination;
		this._sessionID;
		this._signature;
		this._sequenceID;
		this._payload;
		this._connectionSignature; // Only in SYN or CONN packets
		this._fragmentID;          // Only in Data packets
		this._RMCMessage;          // Only in Data packets
	}

	// Setters

	setVersion(version) {
		this._version = version;
	}

	setSource(source) {
		this._source = source;
	}

	setDestination(destination) {
		this._destination = destination;
	}

	setType(type) {
		this._type = type;
	}

	setFlags(flags) {
		this._flags = flags;
	}

	setSessionID(sessionID) {
		this._sessionID = sessionID;
	}

	setSignature(signature) {
		this._signature = signature;
	}

	setSequenceID(sequenceID) {
		this._sequenceID = sequenceID;
	}

	setConnectionSignature(connectionSignature) {
		this._connectionSignature = connectionSignature;
	}

	setFragmentID(fragmentID) {
		this._fragmentID = fragmentID;
	}

	setPayload(payload) {
		this._payload = payload;
	}

	setRMCMessage(RMCMessage) {
		this._RMCMessage = RMCMessage;
	}


	// Getters

	getVersion() {
		return this._version;
	}

	getSource() {
		return this._source;
	}

	getDestination() {
		return this._destination;
	}

	getType() {
		return this._type;
	}

	hasFlag(flag) {
		return !!(this._flags & flag);
	}

	getSessionID() {
		return this._sessionID;
	}

	getSignature() {
		return this._signature;
	}

	getSequenceID() {
		return this._sequenceID;
	}

	getFragmentID() {
		return this._fragmentID;
	}

	getPayload() {
		return this._payload;
	}

	getRMCMessage() {
		return this._RMCMessage;
	}
}

module.exports = Packet;