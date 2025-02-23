import type ByteStream from '@/byte-stream';

export default abstract class RVType {
	public readonly typeName: string;

	abstract extractFrom(stream: ByteStream): void;
	abstract new(): any;
}
