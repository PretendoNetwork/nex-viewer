export function removeAllChildNodes(parent: Element): void {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

export function ready(callback: () => void): void {
	if (document.readyState !== 'loading') {
		callback();
	} else {
		document.addEventListener('DOMContentLoaded', callback);
	}
}
