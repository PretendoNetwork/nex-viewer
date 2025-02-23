import type NEXByteStream from '@/nex/byte-stream';

export default class DateTime {
	public readonly typeName = 'DateTime';

	private value: bigint;

	public extractFrom(stream: NEXByteStream): void {
		this.value = stream.readInt64LE();
	}

	private getSeconds(): number {
		return Number(this.value & 63n);
	}

	private getMinutes(): number {
		return Number((this.value >> 6n) & 63n);
	}

	private getHours(): number {
		return Number((this.value >> 12n) & 31n);
	}

	public getDay(): number {
		return Number((this.value >> 17n) & 31n);
	}

	private getMonth(): number {
		return Number((this.value >> 22n) & 15n) - 1;
	}

	private getYear(): number {
		return Number(this.value >> 26n);
	}

	private standard(): Date {
		return new Date(Date.UTC(
			this.getYear(),
			this.getMonth(),
			this.getDay(),
			this.getHours(),
			this.getMinutes(),
			this.getSeconds()
		));
	}

	public new(): DateTime {
		return new DateTime();
	}

	public toJSON(): Record<string, any> {
		return {
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__value: `${this.standard()} (${this.value})`
		};
	}
}
