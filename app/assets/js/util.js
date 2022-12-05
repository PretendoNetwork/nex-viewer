export function removeAllChildNodes(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

export function ready(fn) {
	if (document.readyState !== 'loading') {
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

export function isObject(item) {
	return (typeof item === 'object' && !Array.isArray(item) && item !== null);
}

export function isArray(item) {
	return (typeof item === 'object' && Array.isArray(item) && item !== null);
}

export function toHexString(byteArray) {
	return Array.from(byteArray, function (byte) {
		return ('0' + (byte & 0xFF).toString(16)).slice(-2);
	}).join(':');
}

export function isNEXPrimative(typeName) {
	return [
		'uint8',
		'sint8',
		'uint16',
		'sint16',
		'uint32',
		'sint32',
		'uint64',
		'sint64',
		'boolean',
		'String',
		'PID', // * PID is the same as a uint32
	].includes(typeName);
}