
/**
 * @param {Element} parent Element whos children will be removed
 */
export function removeAllChildNodes(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

/**
 * @param {Function} fn Callback function ran when frontend is ready for data
 */
export function ready(fn) {
	if (document.readyState !== 'loading') {
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

/**
 * @param {*} item Value to check if is Object
 * @returns {boolean} Is object?
 */
export function isObject(item) {
	return (typeof item === 'object' && !Array.isArray(item) && item !== null);
}

/**
 * @param {*} item Value to check if is Array
 * @returns {boolean} Is array?
 */
export function isArray(item) {
	return (typeof item === 'object' && Array.isArray(item) && item !== null);
}

/**
 * @param {Array.<number>} byteArray Array of bytes to convert to HEX string
 * @returns {string} Formated HEX string
 */
export function toHexString(byteArray) {
	return Array.from(byteArray, function (byte) {
		return ('0' + (byte & 0xFF).toString(16)).slice(-2);
	}).join(':');
}

/**
 * @param {string} typeName Name of NEX type
 * @returns {boolean} Is NEX primative?
 */
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
		'Float',
		'Double',
		'boolean',
		'String',
		'PID', // * PID is the same as a uint32
		'Buffer',
		'qBuffer',
	].includes(typeName);
}

/**
 * @param {object} object Object to check if is empty
 * @returns {boolean} Is empty?
 */
export function emptyObject(object) {
	return Object.keys(object).length === 0;
}
