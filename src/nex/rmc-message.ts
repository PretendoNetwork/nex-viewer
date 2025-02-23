import ByteStream from '@/byte-stream';
import QResult from '@/nex/types/qresult';
import type Connection from '@/nex/connection';
import type SerializedRMCMessage from '@/types/nex/serialized-rmc-message';

export default class RMCMessage {
	static readonly REQUEST = 0;
	static readonly RESPONSE = 1;

	private _type: 0 | 1;
	private _protocolID: number;
	private _extendedProtocolID?: number;
	private _callID: number;
	private _error?: QResult;
	private _parametersData?: Buffer;

	public parameters?: any;
	public methodName: string;
	public methodID: number;
	public protocolName: string;
	public connection: Connection;

	get type(): 0 | 1 {
		return this._type;
	}

	get protocolID(): number {
		return this._protocolID;
	}

	get extendedProtocolID(): number | undefined {
		return this._extendedProtocolID;
	}

	get callID(): number {
		return this._callID;
	}

	get error(): QResult | undefined {
		return this._error;
	}

	get parametersData(): Buffer | undefined {
		return this._parametersData;
	}

	constructor(data: Buffer) {
		this.parse(data);
	}

	private parse(data: Buffer): void {
		// TODO - Support verbose RMC like seen in WATCH_DOGS

		const stream = new ByteStream(data);

		const size = stream.readUInt32LE();
		const message = stream.readBytes(size);

		const messageStream = new ByteStream(message);

		this._protocolID = messageStream.readUInt8();

		if (this._protocolID & 0x80) {
			this._type = RMCMessage.REQUEST;

			this._protocolID = this._protocolID & ~0x80; // * Get original protocol ID
		} else {
			this._type = RMCMessage.RESPONSE;
		}

		if (this._protocolID === 0x7F) {
			this._extendedProtocolID = messageStream.readUInt16LE();
		}

		if (this._type === RMCMessage.REQUEST) {
			this.parseRequest(messageStream);
		} else {
			this.parseResponse(messageStream);
		}
	}

	private parseRequest(stream: ByteStream): void {
		this._callID = stream.readUInt32LE();
		this.methodID = stream.readUInt32LE();
		this._parametersData = stream.readRest();
	}

	private parseResponse(stream: ByteStream): void {
		const success = stream.readBoolean();

		if (success) {
			this._callID = stream.readUInt32LE();
			this.methodID = stream.readUInt32LE() & ~0x8000;
			this._parametersData = stream.readRest();
		} else {
			this._error = new QResult();
			this._error.extractFrom(stream);
			this._callID = stream.readUInt32LE();
		}
	}

	public toJSON(): SerializedRMCMessage {
		const serialized: SerializedRMCMessage = {
			type: this._type,
			protocol_id: this._protocolID,
			protocol_name: this.protocolName,
			method_id: this.methodID,
			method_name: this.methodName,
			call_id: this._callID
		};

		if (this.parameters) {
			serialized.parameters = this.parameters;
		}

		if (this._error) {
			serialized.error = {
				code: this._error.code,
				name: this._error.name()
			};
		}

		return serialized;
	}
}
