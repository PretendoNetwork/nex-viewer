// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'ClearMyBlackList';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

// * No response data
export class Response {
	public static Name = 'ClearMyBlackList';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
