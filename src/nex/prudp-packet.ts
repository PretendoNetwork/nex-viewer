import type ByteStream from '@/byte-stream';
import type RMCMessage from '@/nex/rmc-message';
import type Connection from '@/nex/connection';
import type { SerializedPRUDPPacket } from '@/types/nex/serialized-packet';

export default class PRUDPPacket {
	public time?: number;
	public readonly version: number;

	public fromClientToServer: boolean;
	public fromServerToClient: boolean;

	public sourceAddress: string;
	public sourcePort: number;
	public destinationAddress: string;
	public destinationPort: number;

	public sourceStreamID: number;
	public sourceStreamType: number;
	public destinationStreamID: number;
	public destinationStreamType: number;
	public flags: number;
	public type: number;
	public sessionID: number;
	public signature: Buffer;
	public sequenceID: number;
	public connectionSignature?: Buffer;
	public fragmentID?: number;
	public substreamID?: number;
	public payload?: Buffer;
	public decryptedPayload?: Buffer;
	public defragmentedPayload?: Buffer;
	public connection: Connection;
	public message?: RMCMessage;
	public stackTrace?: string;

	protected stream: ByteStream;

	static FLAGS = {
		ACK: 0x001,
		RELIABLE: 0x002,
		NEED_ACK: 0x004,
		HAS_SIZE: 0x008,
		MULTI_ACK: 0x200
	};

	static TYPES = {
		SYN: 0,
		CONNECT: 1,
		DATA: 2,
		DISCONNECT: 3,
		PING: 4,
		USER: 5
	};

	constructor(stream: ByteStream) {
		this.stream = stream;
	}

	private isType(type: number): boolean {
		return this.type === type;
	}

	private hasFlag(flag: number): boolean {
		return (this.flags & flag) !== 0;
	}

	public isTypeSyn(): boolean {
		return this.isType(PRUDPPacket.TYPES.SYN);
	}

	public isTypeConnect(): boolean {
		return this.isType(PRUDPPacket.TYPES.CONNECT);
	}

	public isTypeData(): boolean {
		return this.isType(PRUDPPacket.TYPES.DATA);
	}

	public isTypeDisconnect(): boolean {
		return this.isType(PRUDPPacket.TYPES.DISCONNECT);
	}

	public isTypePing(): boolean {
		return this.isType(PRUDPPacket.TYPES.PING);
	}

	public isTypeUser(): boolean {
		return this.isType(PRUDPPacket.TYPES.USER);
	}

	public hasFlagAck(): boolean {
		return this.hasFlag(PRUDPPacket.FLAGS.ACK);
	}

	public hasFlagReliable(): boolean {
		return this.hasFlag(PRUDPPacket.FLAGS.RELIABLE);
	}

	public hasFlagNeedAck(): boolean {
		return this.hasFlag(PRUDPPacket.FLAGS.NEED_ACK);
	}

	public hasFlagHasSize(): boolean {
		return this.hasFlag(PRUDPPacket.FLAGS.HAS_SIZE);
	}

	public hasFlagMultiAck(): boolean {
		return this.hasFlag(PRUDPPacket.FLAGS.MULTI_ACK);
	}

	public serialize(): SerializedPRUDPPacket {
		const serialized: SerializedPRUDPPacket = {
			time: this.time,
			version: this.version,
			source_address: this.sourceAddress,
			source_port: this.sourcePort,
			destination_address: this.destinationAddress,
			destination_port: this.destinationPort,
			source_stream_id: this.sourceStreamID,
			source_stream_type: this.serializeStreamType(this.sourceStreamType),
			destination_stream_id: this.destinationStreamID,
			destination_stream_type: this.serializeStreamType(this.destinationStreamType),
			type: this.serializeType(),
			flags: this.serializeFlags(),
			session_id: this.sessionID,
			signature: this.signature ? [...this.signature.values()] : [], // * Raw RMC packets have no signature
			sequence_id: this.sequenceID
		};

		if (this.connectionSignature) {
			serialized.connection_signature = [...this.connectionSignature.values()];
		}

		if (this.payload) {
			serialized.payload = [...this.payload.values()];
		}

		if (this.decryptedPayload) {
			serialized.decrypted_payload = [...this.decryptedPayload.values()];
		}

		if (this.isTypeData()) {
			serialized.fragment_id = this.fragmentID;

			if (this.fragmentID === 0 && this.defragmentedPayload) {
				serialized.defragmented_payload = [...this.defragmentedPayload.values()];
			}

			if (this.message) {
				serialized.message = this.message.toJSON();
			}
		}

		if (this.stackTrace) {
			serialized.stack_trace = this.stackTrace;
		}

		return serialized;
	}

	private serializeStreamType(streamType: number): string {
		// * Raw RMC packets have no VirtualPorts
		if (this.version === -1) {
			return '';
		}

		switch (streamType) {
			case 1:
				return 'DO';
			case 2:
				return 'RV';
			case 3:
				return 'OldRVSec';
			case 4:
				return 'SBMGMT';
			case 5:
				return 'NAT';
			case 6:
				return 'SessionDiscovery';
			case 7:
				return 'NATEcho';
			case 8:
				return 'Routing';
			case 9:
				return 'Game';
			case 10:
				return 'RVSecure';
			case 11:
				return 'Relay';
		}

		return `UnknownStreamType_${streamType}`;
	}

	private serializeType(): string {
		// * Raw RMC packets have no VirtualPorts
		if (this.version === -1) {
			return '';
		}

		switch (this.type) {
			case 0:
				return 'SYN';
			case 1:
				return 'CONNECT';
			case 2:
				return 'DATA';
			case 3:
				return 'DISCONNECT';
			case 4:
				return 'PING';
			case 5:
				return 'USER';
		}

		return `UnknownPacketType_${this.type}`;
	}

	private serializeFlags(): string[] {
		const flags: string[] = [];

		if (this.hasFlagAck()) {
			flags.push('ACK');
		}

		if (this.hasFlagReliable()) {
			flags.push('RELIABLE');
		}

		if (this.hasFlagNeedAck()) {
			flags.push('NEED_ACK');
		}

		if (this.hasFlagHasSize()) {
			flags.push('HAS_SIZE');
		}

		if (this.hasFlagMultiAck()) {
			flags.push('MULTI_ACK');
		}

		return flags;
	}
}
