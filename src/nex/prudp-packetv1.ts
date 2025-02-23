import crypto from 'node:crypto';
import ByteStream from '@/byte-stream';
import PRUDPPacket from '@/nex/prudp-packet';
import type { SerializedPRUDPV1Packet } from '@/types/nex/serialized-packet';

export default class PRUDPPacketV1 extends PRUDPPacket {
	public readonly version = 1;

	private optionsLength: number;
	private payloadLength: number;
	private headerBytes: Buffer; // * Used for the signature calculation
	private optionsBytes: Buffer; // * Used for the signature calculation
	private supportedFunctions?: Buffer;
	private initialUnreliableSequenceID?: number;
	private maximumSubstreamID?: number;

	static Magic = Buffer.from([0xEA, 0xD0]);

	constructor(stream: ByteStream) {
		super(stream);

		this.substreamID = 0;
		this.parse();
	}

	private parse(): void {
		const magic = this.stream.readBytes(0x2);

		if (!magic.equals(PRUDPPacketV1.Magic)) {
			throw new Error('Invalid PRUDPv1 magic');
		}

		this.parseHeader();
		this.signature = this.stream.readBytes(0x10);
		this.parseOptions();
		this.payload = this.stream.readBytes(this.payloadLength);
	}

	private parseHeader(): void {
		this.headerBytes = this.stream.read(0xC);
		this.stream.skip(-0xC);

		const version = this.stream.readUInt8();

		if (version !== 1) {
			throw new Error('Invalid PRUDPv1 version');
		}

		this.optionsLength = this.stream.readUInt8();
		this.payloadLength = this.stream.readUInt16LE();

		const source = this.stream.readUInt8();
		const destination = this.stream.readUInt8();

		this.sourceStreamType = source >> 4;
		this.sourceStreamID = source & 0xF;
		this.destinationStreamType = destination >> 4;
		this.destinationStreamID = destination & 0xF;

		// TODO - Quazal encoding? How do we tell the decoder the size BEFORE decoding?
		const typeAndFlags = this.stream.readUInt16LE();

		this.flags = typeAndFlags >> 4;
		this.type = typeAndFlags & 0xF;

		this.sessionID = this.stream.readUInt8();
		this.substreamID = this.stream.readUInt8();
		this.sequenceID = this.stream.readUInt16LE();
	}

	private parseOptions(): void {
		this.optionsBytes = this.stream.read(this.optionsLength);
		this.stream.skip(-this.optionsLength);

		const optionsStream = new ByteStream(this.stream.readBytes(this.optionsLength));

		while (optionsStream.hasDataLeft()) {
			const optionID = optionsStream.readUInt8();
			const optionSize = optionsStream.readUInt8();

			if (optionID > 4) {
				throw new Error('Invalid PRUDPv1 option ID');
			}

			if (optionID === 0 || optionID === 1 || optionID === 4) {
				if (!this.isTypeSyn() && !this.isTypeConnect()) {
					throw new Error('Invalid PRUDPv1 option ID');
				}
			}

			if (optionID === 2 && !this.isTypeData()) {
				throw new Error('Invalid PRUDPv1 option ID');
			}

			if (optionID === 3 && !this.isTypeConnect()) {
				throw new Error('Invalid PRUDPv1 option ID');
			}

			if (optionID === 0) {
				if (optionSize !== 4) {
					throw new Error('Invalid PRUDPv1 option ID');
				}

				this.supportedFunctions = optionsStream.readBytes(optionSize);
			}

			if (optionID === 1) {
				if (optionSize !== 16) {
					throw new Error('Invalid PRUDPv1 option ID');
				}

				this.connectionSignature = optionsStream.readBytes(optionSize);
			}

			if (optionID === 2) {
				if (optionSize !== 1) {
					throw new Error('Invalid PRUDPv1 option ID');
				}

				this.fragmentID = optionsStream.readUInt8();
			}

			if (optionID === 3) {
				if (optionSize !== 2) {
					throw new Error('Invalid PRUDPv1 option ID');
				}

				this.initialUnreliableSequenceID = optionsStream.readUInt16LE();
			}

			if (optionID === 4) {
				if (optionSize !== 1) {
					throw new Error('Invalid PRUDPv1 option ID');
				}

				this.maximumSubstreamID = optionsStream.readUInt8();
			}
		}
	}

	public calculateSignature(accessKey: string, sessionKey: Buffer, connectionSignature: Buffer): Buffer {
		const accessKeyBytes = Buffer.from(accessKey);

		const accessKeySum = accessKeyBytes.reduce((sum, byte) => sum + byte, 0);
		const accessKeySumBytes = Buffer.alloc(4);
		accessKeySumBytes.writeUInt32LE(accessKeySum, 0);

		const key = crypto.createHash('md5').update(accessKeyBytes).digest();
		const mac = crypto.createHmac('md5', key);

		mac.update(this.headerBytes.subarray(4));
		mac.update(sessionKey);
		mac.update(accessKeySumBytes);
		mac.update(connectionSignature);
		mac.update(this.optionsBytes);

		if (this.payload) {
			mac.update(this.payload);
		}

		return mac.digest();
	}

	public toJSON(): SerializedPRUDPV1Packet {
		const serialized = this.serialize() as SerializedPRUDPV1Packet;

		serialized.substream_id = this.substreamID!;

		if (this.supportedFunctions) {
			serialized.supported_functions = [...this.supportedFunctions.values()];
		}

		if (this.initialUnreliableSequenceID) {
			serialized.initial_unreliable_sequence_id = this.initialUnreliableSequenceID;
		}

		if (this.maximumSubstreamID) {
			serialized.maximum_substream_id = this.maximumSubstreamID;
		}

		return serialized;
	}
}
