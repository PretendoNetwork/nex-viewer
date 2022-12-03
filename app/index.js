const { app, BrowserWindow, ipcMain } = require('electron');
const NEXParser = require(__dirname + '/../');

BigInt.prototype.toJSON = function () { return this.toString(); };

function createWindow() {
	const window = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: { // TODO - Use Electron's contextBridge instead
			nodeIntegration: true,
			contextIsolation: false
		}
	});

	window.webContents.openDevTools();

	ipcMain.on('renderer-ready', () => {
		const parser = new NEXParser();

		parser.on('packet', packet => {
			const serialized = JSON.stringify(packet);
			window.webContents.send('packet', serialized);
		});

		parser.parse(__dirname + '/../test/smm1/smm.pcapng');
	});

	window.maximize();
	window.loadFile('index.html');
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