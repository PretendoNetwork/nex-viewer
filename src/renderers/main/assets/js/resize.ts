const container: HTMLElement = document.querySelector('.container')!;
const horizontalResizer: HTMLElement = document.querySelector('.hr')!;
const verticalResizer: HTMLElement = document.querySelector('.vr')!;
let isResizingHorizontal = false;
let isResizingVertical = false;

horizontalResizer.addEventListener('mousedown', () => {
	isResizingHorizontal = true;

	document.body.classList.add('no-select', 'resizing-horizontal');
	document.addEventListener('mousemove', resizeHorizontal);
	document.addEventListener('mouseup', stopResizeHorizontal);
});

verticalResizer.addEventListener('mousedown', () => {
	isResizingVertical = true;

	document.body.classList.add('no-select', 'resizing-vertical');
	document.addEventListener('mousemove', resizeVertical);
	document.addEventListener('mouseup', stopResizeVertical);
});

function resizeHorizontal(event: MouseEvent): void {
	if (!isResizingHorizontal) {
		return;
	}

	const containerRect = container.getBoundingClientRect();
	const offsetY = event.clientY - containerRect.top;

	if (offsetY > 20 && offsetY < containerRect.height - 20) {
		const percentage = (offsetY / containerRect.height) * 100;
		container.style.gridTemplateRows = `${percentage}% 5px calc(${100 - percentage}% - 5px)`;
	}
}

function stopResizeHorizontal(): void {
	isResizingHorizontal = false;

	document.body.classList.remove('no-select', 'resizing-horizontal');
	document.removeEventListener('mousemove', resizeHorizontal);
	document.removeEventListener('mouseup', stopResizeHorizontal);
}

function resizeVertical(ev: MouseEvent): void {
	if (!isResizingVertical) {
		return;
	}

	const containerRect = container.getBoundingClientRect();
	const offsetX = ev.clientX - containerRect.left;

	if (offsetX > 20 && offsetX < containerRect.width - 20) {
		const percentage = (offsetX / containerRect.width) * 100;
		container.style.gridTemplateColumns = `${percentage}% 5px calc(${100 - percentage}% - 5px)`;
	}
}

function stopResizeVertical(): void {
	isResizingVertical = false;

	document.body.classList.remove('no-select', 'resizing-vertical');
	document.removeEventListener('mousemove', resizeVertical);
	document.removeEventListener('mouseup', stopResizeVertical);
}
