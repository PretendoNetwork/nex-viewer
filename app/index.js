const fs = require('node:fs');
const path = require('node:path');
const { app, BrowserWindow, ipcMain, Menu, dialog } = require('electron');
const NEXParser = require(__dirname + '/../');

BigInt.prototype.toJSON = function () { return this.toString(); };

app.setName('NEX Viewer');
const appUserDataPath = app.getPath('userData');
const settingsRootPath = path.join(appUserDataPath, 'settings.json');

const defaultSettings = {
	recent_files: []
};

let settings = defaultSettings;

if (!fs.existsSync(settingsRootPath)) {
	fs.writeFileSync(settingsRootPath, JSON.stringify(defaultSettings));
} else {
	settings = require(settingsRootPath);
}

for (const recentFile of settings.recent_files) {
	// TODO - Actually store these
	app.addRecentDocument(recentFile);
}

const menuTemplate = [
	{
		label: 'File',
		id: 'file',
		submenu: [
			{
				label: 'Open File',
				async click(menuItem, browserWindow) {
					const result = await dialog.showOpenDialog({
						properties: ['openFile'],
						filters: [
							{ name: 'Packet Capture', extensions: ['pcapng', 'pcap'] }
						]
					});

					if (result.canceled) {
						return;
					}

					browserWindow.webContents.send('clear-sections');

					const filePath = result.filePaths[0];

					const parser = new NEXParser();

					parser.on('packet', packet => {
						const serialized = JSON.stringify(packet);
						browserWindow.webContents.send('packet', serialized);
					});

					parser.on('connections', connections => {
						const serialized = JSON.stringify(connections);
						browserWindow.webContents.send('connections', serialized);
					});

					parser.parse(filePath);
				}
			},
			{
				label: 'Open Recent',
				role: 'recentdocuments',
				submenu: [
					{
						label: 'Clear Recent',
						role: 'clearrecentdocuments'
					}
				]
			}
		]
	},
	{
		label: 'Options',
		id: 'options',
		submenu: [
			{
				label: 'Hide PING packets',
				type: 'checkbox',
				checked: false,
				async click(menuItem, browserWindow) {
					if (menuItem.checked) {
						browserWindow.webContents.send('hide-ping-packets');
					} else {
						browserWindow.webContents.send('show-ping-packets');
					}
				}
			}
		]
	}
];

const menu = Menu.buildFromTemplate(menuTemplate);

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
		Menu.setApplicationMenu(menu);
	});

	window.maximize();
	window.loadFile('index.html');
}

app.whenReady().then(() => {
	Menu.setApplicationMenu(Menu.buildFromTemplate([])); // * Clear menu before frontend loads
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