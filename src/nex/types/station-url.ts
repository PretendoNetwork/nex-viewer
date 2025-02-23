import RVString from '@/nex/types/string';
import type NEXByteStream from '@/nex/byte-stream';

export default class StationURL {
	public readonly typeName = 'StationURL';

	private url = new RVString();
	private parameters: Record<string, string> = {};

	public extractFrom(stream: NEXByteStream): void {
		this.url.extractFrom(stream);

		const data = this.url.value.split(':/');

		if (data.length >= 2) {
			// TODO - Support parameters with extra data
			this.parameters = Object.fromEntries(data.slice(1).join(':/').split(';').map(parameter => parameter.split('=')));
		}
	}

	public getParam(name: string): string | undefined {
		return this.parameters[name];
	}

	public new(): StationURL {
		return new StationURL();
	}

	public toJSON(): Record<string, any> {
		return {
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__value: this.url
		};
	}
}
