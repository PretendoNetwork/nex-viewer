import path from 'node:path';
import { app } from 'electron';
import fs from 'fs-extra';
import type { Account, SettingsJSON } from '@/types/settings';

class SizedArray<T> {
	private elements: T[] = [];
	private maxSize: number;

	constructor(maxSize: number) {
		this.maxSize = maxSize;
	}

	public fromData(data: T[]): void {
		this.elements = [...data];
	}

	public add(item: T): void {
		if (this.elements.length >= this.maxSize) {
			this.elements.pop();
		}

		this.elements.unshift(item);
	}

	public getItems(): T[] {
		return this.elements;
	}
}

export class Settings {
	private path = path.join(app.getPath('userData'), 'settings.json');
	private _fallbackTid: string = '';
	private _recentFiles = new SizedArray<string>(10);
	private _accounts: Account[] = [];

	constructor() {
		this.load();
	}

	private load(): void {
		if (!fs.existsSync(this.path)) {
			this.save();
		}

		const settings: SettingsJSON = fs.readJSONSync(this.path);

		this._fallbackTid = settings.fallback_tid;
		this._recentFiles.fromData(settings.recent_files);
		this._accounts = settings.accounts;
	}

	public save(): void {
		const settings = {
			fallback_tid: this._fallbackTid,
			recent_files: this.recentFiles(),
			accounts: this.accounts()
		};

		fs.writeJSONSync(this.path, settings, {
			spaces: '\t'
		});
	}

	public recentFiles(): string[] {
		return this._recentFiles.getItems();
	}

	public addRecentFile(path: string): string[] {
		this._recentFiles.add(path);
		this.save();

		return this._recentFiles.getItems();
	}

	public clearRecentFiles(): void {
		this._recentFiles = new SizedArray<string>(10);
		this.save();
	}

	public accounts(): Account[] {
		return this._accounts;
	}

	public fallbackTid(): string {
		return this._fallbackTid;
	}
}

export default new Settings();