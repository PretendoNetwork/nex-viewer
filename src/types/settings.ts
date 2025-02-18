export type Account = {
	username?: string;
	pid: bigint;
	password?: string;
	password_hash_old?: string;
	password_hash_new?: string;
}

export type SettingsJSON = {
	fallback_tid: string;
	recent_files: string[];
	accounts: Account[];
}