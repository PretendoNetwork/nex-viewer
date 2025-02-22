import { Menu, dialog, BrowserWindow } from 'electron';
import Session from '@/nex/session';
import type { MenuItemConstructorOptions } from 'electron';
import settings from '@/settings';

function openSession(path: string, browserWindow: BrowserWindow): void {
	browserWindow.webContents.send('clear-sections');
	browserWindow.setTitle(`NEX Viewer - ${path}`);

	const session = new Session();

	session.on('packet', packet => {
		browserWindow.webContents.send('packet', JSON.stringify(packet));
	});

	session.on('finished', connections => {
		browserWindow.webContents.send('connections', JSON.stringify(connections));
	});

	session.parse(path);

	settings.addRecentFile(path);

	Menu.setApplicationMenu(createMenu());
}

export default function createMenu(): Menu {
	let recentFiles: MenuItemConstructorOptions[] = settings.recentFiles().map(path => ({
		label: path,
		click: async (menuItem, browserWindow): Promise<void> => {
			if (!browserWindow) {
				return;
			}

			openSession(menuItem.label, browserWindow);
		}
	}));

	if (recentFiles.length) {
		recentFiles = [
			...recentFiles,
			{
				type: 'separator'
			},
			{
				label: 'Clear Menu',
				click: (): void => settings.clearRecentFiles()
			}
		];
	} else {
		recentFiles = [
			{
				label: 'No Recent Files',
				enabled: false
			}
		];
	}

	return Menu.buildFromTemplate([
		{
			label: 'File',
			id: 'file',
			submenu: [
				{
					label: 'Open...',
					async click(menuItem, browserWindow): Promise<void> {
						const result = await dialog.showOpenDialog({
							properties: ['openFile'],
							filters: [
								{ name: 'Packet Capture', extensions: ['pcapng', 'pcap', 'chls'] }
							]
						});

						if (result.canceled || !browserWindow) {
							return;
						}

						openSession(result.filePaths[0], browserWindow);
					}
				},
				{
					type: 'separator'

				},
				{
					label: 'Open Recent',
					submenu: recentFiles
				},
				{
					role: 'quit'
				}
			]
		},
		{
			label: 'Edit',
			submenu: [
				{ label: 'Undo', accelerator: 'CmdOrCtrl+Z' },
				{ label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z' },
				{ type: 'separator' },
				{ label: 'Cut', accelerator: 'CmdOrCtrl+X' },
				{ label: 'Copy', accelerator: 'CmdOrCtrl+C' },
				{ label: 'Paste', accelerator: 'CmdOrCtrl+V' },
				{ label: 'Select All', accelerator: 'CmdOrCtrl+A' }
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
					click(menuItem, browserWindow): void {
						if (!browserWindow)
							return;
					 
						if (menuItem.checked) {
							browserWindow.webContents.send('hide-ping-packets');
						} else {
							browserWindow.webContents.send('show-ping-packets');
						}
					}
				}
				// {
				// 	label: 'Assume Raw RMC Mode',
				// 	type: 'checkbox',
				// 	checked: settings.raw_rmc,
				// 	click(menuItem): void {
				// 		settings.raw_rmc = menuItem.checked;
				// 	}
				// }
			]
		}
	]);
}