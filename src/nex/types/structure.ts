import type NEXByteStream from '@/nex/byte-stream';

export default class Structure {
	private _structureVersion: number;

	get structureVersion(): number {
		return this._structureVersion;
	}

	protected extractHeaderFrom(stream: NEXByteStream): void {
		if (stream.title.settings.use_structure_header) {
			this._structureVersion = stream.readUInt8();
			stream.skip(4); // * Ignore the size
		}
	}
}
