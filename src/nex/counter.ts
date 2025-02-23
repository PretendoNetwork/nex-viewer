export default class Counter {
	public value: number;

	constructor(initialValue: number) {
		this.value = initialValue;
	}

	public next(): number {
		this.value += 1;

		return this.value;
	}
}
