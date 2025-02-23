import crypto from 'node:crypto';
import ByteStream from '@/byte-stream';
import PRUDPPacket from '@/nex/prudp-packet';
import type { SerializedPRUDPLitePacket } from '@/types/nex/serialized-packet';

export default class PRUDPPacketLite extends PRUDPPacket {
	public readonly version = 2;

	private optionsLength: number;
	private payloadLength: number;
	private supportedFunctions?: Buffer;
	private liteSignature?: Buffer;

	static Magic = Buffer.from([0x80]);

	constructor(stream: ByteStream) {
		super(stream);

		this.substreamID = 0;
		this.parse();
	}

	private parse(): void {
		const magic = this.stream.readBytes(0x1);

		if (!magic.equals(PRUDPPacketLite.Magic)) {
			throw new Error('Invalid PRUDPLite magic');
		}

		this.optionsLength = this.stream.readUInt8();
		this.payloadLength = this.stream.readUInt16LE();

		const streamTypes = this.stream.readUInt8();

		this.sourceStreamType = streamTypes >> 4;
		this.destinationStreamType = streamTypes & 0x0F;
		this.sourceStreamID = this.stream.readUInt8();
		this.destinationStreamID = this.stream.readUInt8();
		this.fragmentID = this.stream.readUInt8();

		const typeAndFlags = this.stream.readUInt16LE();

		this.flags = typeAndFlags >> 4;
		this.type = typeAndFlags & 0xF;
		this.sequenceID = this.stream.readUInt16LE();

		this.parseOptions();
		this.payload = this.stream.readBytes(this.payloadLength);
	}

	private parseOptions(): void {
		const optionsStream = new ByteStream(this.stream.readBytes(this.optionsLength));

		while (optionsStream.hasDataLeft()) {
			const optionID = optionsStream.readUInt8();
			const optionSize = optionsStream.readUInt8();

			if (optionID !== 0 && optionID !== 1 && optionID !== 0x80) {
				throw new Error('Invalid PRUDPLite option ID');
			}

			if (optionID === 0) {
				if (!this.isTypeSyn() && !this.isTypeConnect()) {
					throw new Error('Invalid PRUDPLite option ID');
				}
			}

			if (optionID === 1) {
				if (!this.isTypeSyn()) {
					throw new Error('Invalid PRUDPLite option ID');
				}

				if (!this.hasFlagAck()) {
					throw new Error('Invalid PRUDPLite option ID');
				}
			}

			if (optionID === 0x80) {
				if (!this.isTypeConnect()) {
					throw new Error('Invalid PRUDPLite option ID');
				}

				if (this.hasFlagAck()) {
					throw new Error('Invalid PRUDPLite option ID');
				}
			}

			if (optionID === 0) {
				if (optionSize !== 4) {
					throw new Error('Invalid PRUDPLite option ID');
				}

				this.supportedFunctions = optionsStream.readBytes(optionSize);
			}

			if (optionID === 1) {
				if (optionSize !== 16) {
					throw new Error('Invalid PRUDPLite option ID');
				}

				this.connectionSignature = optionsStream.readBytes(optionSize);
			}

			if (optionID === 0x80) {
				if (optionSize !== 16) {
					throw new Error('Invalid PRUDPLite option ID');
				}

				this.liteSignature = optionsStream.readBytes(optionSize);
			}
		}
	}

	public calculateSignature(accessKey: string, connectionSignature: Buffer): Buffer {
		const accessKeyBytes = Buffer.from(accessKey);

		const accessKeySum = accessKeyBytes.reduce((sum, byte) => sum + byte, 0);
		const accessKeySumBytes = Buffer.alloc(4);
		accessKeySumBytes.writeUInt32LE(accessKeySum, 0);

		const key = crypto.createHash('md5').update(accessKeyBytes).digest();
		const mac = crypto.createHmac('md5', key);

		mac.update(key);
		mac.update(connectionSignature);

		return mac.digest();
	}

	public toJSON(): SerializedPRUDPLitePacket {
		const serialized = this.serialize() as SerializedPRUDPLitePacket;

		serialized.substream_id = this.substreamID!;

		if (this.supportedFunctions) {
			serialized.supported_functions = [...this.supportedFunctions.values()];
		}

		if (this.liteSignature) {
			serialized.lite_signature = [...this.liteSignature.values()];
		}

		return serialized;
	}
}
