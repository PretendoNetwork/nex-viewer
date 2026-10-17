import * as semver from 'compare-versions';
import NEXByteStream from '@/nex/byte-stream';
import Bool from '@/nex/types/bool';
import DataStoreRatingTarget from '@/nex/protocols/datastore/types/datastore-rating-target';
import DataStoreRateObjectParam from '@/nex/protocols/datastore/types/datastore-rate-object-param';
import DataStoreRatingInfo from '@/nex/protocols/datastore/types/datastore-rating-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'RateObject';

	private target = new DataStoreRatingTarget();
	private param = new DataStoreRateObjectParam();
	private fetchRatings?: Bool; // * NEX 3.5+

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.target.extractFrom(stream);
		this.param.extractFrom(stream);

		if (semver.satisfies(stream.title.libraryVersions.datastore, '>=3.5.0')) {
			this.fetchRatings = new Bool();
			this.fetchRatings.extractFrom(stream);
		}
	}

	public toJSON(): any {
		const json: Record<string, any> = {
			target: this.target,
			param: this.param
		};

		if (this.fetchRatings !== undefined) {
			json.fetchRatings = this.fetchRatings;
		}

		return json;
	}
}

export class Response {
	public static Name = 'RateObject';

	private pRating = new DataStoreRatingInfo();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pRating.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pRating: this.pRating
		};
	}
}
