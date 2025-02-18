// TODO - Should we just merge the "renderers" and "windows" folders?

import path from 'node:path';
import sourceMapSupport from 'source-map-support';
import { Menu, app, BrowserWindow } from 'electron';
import createMenu from '@/windows/main/menu';

// * Required for getting source maps to work in Electron apps
// * See https://github.com/electron/electron/issues/38875
sourceMapSupport.install();

global.Object.defineProperty(global.BigInt.prototype, 'toJSON', {
	value: function() { return this.toString(); },
	configurable: true,
	enumerable: false,
	writable: true
});

app.setName('NEX Viewer');

function createWindow(): void {
	const window = new BrowserWindow({
		webPreferences: {
			preload: path.join(__dirname, 'preload.js') // * Target the transpiled JS
		}
	});

	window.webContents.openDevTools();

	Menu.setApplicationMenu(createMenu());

	window.maximize();
	window.loadFile(path.join(__dirname, '../../renderers/main/index.html'));
}

app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});