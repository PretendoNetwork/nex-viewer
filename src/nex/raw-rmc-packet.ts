import ByteStream from '@/byte-stream';
import PRUDPPacket from '@/nex/prudp-packet';
import type SerializedPacket from '@/types/nex/serialized-packet';

export default class RawRMCPacket extends PRUDPPacket {
	public readonly version = -1;

	public titleID: string;

	private ctrFlags: number;

	constructor(stream: ByteStream, isNewPacket: boolean, oldPacketTID: string) {
		super(stream);

		if (!isNewPacket && oldPacketTID === '') {
			throw new Error('Old Packet Title ID has to be set');
		}

		this.parse(isNewPacket, oldPacketTID);
	}

	private parse(isNewPacket: boolean, oldPacketTID: string): void {
		// default version to 1 because thats what an old packet (lowest common denominator) is closest to
		let version = 1;
		if (isNewPacket) {
			version = this.stream.readUInt8();
		}

		if (version !== 1) {
			throw new Error('Bad HokakuCTR version');
		}

		if (isNewPacket) {
			this.titleID = this.stream.readUInt64LE().toString(16).toUpperCase().padStart(16, '0');
		}
		else {
			this.titleID = oldPacketTID;	
		}

		this.ctrFlags = this.stream.readUInt8();
		this.payload = this.stream.readRest();

		if (this.payload[0x4] === 0) {
			// * Invalid protocol ID. Likely a Net-Z packet
			throw new Error('Invalid raw RMC packet');
		}

		this.type = PRUDPPacket.TYPES.DATA; // TODO - Is this a good assumption?
		this.fragmentID = 0; // TODO - Is this a good assumption?
		this.substreamID = 0; // TODO - Is this a good assumption?

		this.fromServerToClient = (this.ctrFlags & 0b00000001) !== 0;
		this.fromClientToServer = !this.fromServerToClient;

		this.sourceAddress = this.fromServerToClient ? 'server' : 'client';
		this.sourcePort = -1;
		this.sourceStreamType = -1;
		this.sourceStreamID = -1;

		this.destinationAddress = this.fromServerToClient ? 'client' : 'server';
		this.destinationPort = -1;
		this.destinationStreamType = -1;
		this.destinationStreamID = -1;
	}

	public toJSON(): SerializedPacket {
		return this.serialize();
	}
}