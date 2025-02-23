import type NEXByteStream from '@/nex/byte-stream';

export default class PID {
	public readonly typeName = 'PID';

	public value: bigint;

	private size: number;

	public extractFrom(stream: NEXByteStream): void {
		if (stream.title.settings.pid_size === 8) {
			this.value = stream.readUInt64LE();
		} else {
			this.value = BigInt(stream.readUInt32LE());
		}

		this.size = stream.title.settings.pid_size;
	}

	public new(): PID {
		return new PID();
	}

	public toJSON(): Record<string, any> {
		return {
			__displayTypeName: `PID (${this.size})`,
			__typeName: this.typeName,
			__value: this.value
		};
	}
}
