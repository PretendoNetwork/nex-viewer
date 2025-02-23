import ByteStream from '@/byte-stream';
import type { Title } from '@/types/nex/serialized-connection';

export default class NEXByteStream extends ByteStream {
	public title: Title;

	constructor(buffer: Buffer, title: Title) {
		super(buffer);

		this.title = title;
	}
}
