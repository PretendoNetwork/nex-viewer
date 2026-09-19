import path from 'node:path';
import { Menu, dialog, shell } from 'electron';
import Session from '@/session';
import Proxy from '@/proxy';
import type { MenuItemConstructorOptions, BrowserWindow } from 'electron';
import type State from '@/types/state';

let session: Session;
let proxy: Proxy | null = null;

function refreshMenu(state: State, browserWindow: BrowserWindow): void {
	if (process.platform === 'darwin') {
		Menu.setApplicationMenu(createMenu(state, browserWindow));
	} else {
		browserWindow.setMenu(createMenu(state, browserWindow));
	}
}

export function openSession(path: string, browserWindow: BrowserWindow, state: State): void {
	browserWindow.webContents.send('clear-sections');
	browserWindow.setTitle(`Pretendo Network Viewer - ${path}`);
	session = new Session();

	browserWindow.webContents.send('clearSections');
	browserWindow.webContents.send('setDumpLoadingState', true);

	session.on('serializedMessage', (message) => {
		browserWindow.webContents.send('serializedMessage', JSON.stringify(message));
	});

	session.on('serializedMessageList', (messages) => {
		browserWindow.webContents.send('serializedMessageList', JSON.stringify(messages));
		browserWindow.webContents.send('setDumpLoadingState', false);
	});

	session.parse(path);

	state.settings.addRecentFile(path);

	refreshMenu(state, browserWindow);
}

export async function selectSessionFile(browserWindow: BrowserWindow, state: State): Promise<void> {
	const result = await dialog.showOpenDialog({
		properties: ['openFile'],
		filters: [
			{
				name: 'Packet Capture',
				extensions: [
					'pcapng', 'pcap', 'pcapng.gz',
					'chls', 'chlz',
					'flows', 'flow',
					'bin',
					'har',
					'pnsj'
				]
			}
		]
	});

	if (!result.canceled && browserWindow) {
		openSession(result.filePaths[0], browserWindow, state);
	}
}

export default function createMenu(state: State, browserWindow: BrowserWindow): Menu {
	let recentFiles: MenuItemConstructorOptions[] = state.settings.recentFiles().map(filePath => ({
		label: filePath,
		click: (): void => {
			openSession(filePath, browserWindow, state);
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
				click: (): void => {
					state.settings.clearRecentFiles();
					refreshMenu(state, browserWindow);
				}
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
			label: 'Pretendo Network Viewer', // TODO - This doesn't seem to work? Always says "Electron". Also swap to getting the name from the app itself (app.name)?
			submenu: [
				{ role: 'about' },
				{ type: 'separator' },
				{ role: 'services' },
				{ type: 'separator' },
				{ role: 'hide' },
				{ role: 'hideOthers' },
				{ role: 'unhide' },
				{ type: 'separator' },
				{ role: 'quit' }
			]
		},
		{
			label: 'File',
			id: 'file',
			submenu: [
				{
					label: 'Open...',
					async click(): Promise<void> {
						await selectSessionFile(browserWindow, state);
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
				{ role: 'undo' },
				{ role: 'redo' },
				{ type: 'separator' },
				{ role: 'cut' },
				{ role: 'copy' },
				{ role: 'paste' },
				{ role: 'selectAll' }
			]
		},
		{
			label: 'Settings',
			submenu: [ // TODO - Add back in the PING packet and maybe RawRMC settings?
				{
					label: 'Open Settings',
					click: (): void => {
						browserWindow.webContents.send('openSettings');
					}
				},
				{
					type: 'separator'

				},
				{
					label: 'Open settings.json',
					click: (): void => {
						shell.openPath(state.settings.path);
					}
				},
				{
					label: 'Open settings.json folder',
					click: (): void => {
						shell.openPath(path.dirname(state.settings.path));
					}
				}
			]
		},
		{
			label: 'Proxy',
			submenu: [
				{
					label: proxy && proxy.listening ? 'Stop NPLN Proxy' : 'Start NPLN Proxy',
					click: async (): Promise<void> => {
						if (proxy && proxy.listening) {
							await proxy.stop();
							proxy = null;
						} else {
							proxy = await Proxy.create(browserWindow);
							await proxy.start(state.settings.proxyPort());
						}

						refreshMenu(state, browserWindow);
					}
				},
				{
					label: 'Open CA Certificate folder',
					click: (): void => {
						const certPath = Proxy.getCACertPath();
						shell.openPath(path.dirname(certPath));
					}
				}
			]
		}
	]);
}
