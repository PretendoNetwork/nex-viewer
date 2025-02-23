// * NodeJS dropped support for RC4 natively

export default class RC4Stream {
	private key: Buffer;
	private sbox: number[] = new Array(256);
	private i = 0;
	private j = 0;

	constructor(key: Buffer | string) {
		this.key = Buffer.from(key);

		this.init();
	}

	private init(): void {
		for (let i = 0; i < 256; i++) {
			this.sbox[i] = i;
		}

		let j = 0;
		for (let i = 0; i < 256; i++) {
			j = (j + this.sbox[i] + this.key[i % this.key.length]) % 256;
			[this.sbox[i], this.sbox[j]] = [this.sbox[j], this.sbox[i]];
		}

		this.i = 0;
		this.j = 0;
	}

	private nextByte(): number {
		this.i = (this.i + 1) % 256;
		this.j = (this.j + this.sbox[this.i]) % 256;

		[this.sbox[this.i], this.sbox[this.j]] = [this.sbox[this.j], this.sbox[this.i]];

		return this.sbox[(this.sbox[this.i] + this.sbox[this.j]) % 256];
	}

	public update(data: Buffer): Buffer {
		const ciphered = Buffer.alloc(data.length);

		for (let k = 0; k < data.length; k++) {
			ciphered[k] = data[k] ^ this.nextByte();
		}

		return ciphered;
	}
}
