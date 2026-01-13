import Title from '@/nex/titles/title';

export default class LuigisMansionDarkMoon extends Title {
	public static name = 'Luigi\'s Mansion: Dark Moon';
	public static gameServerID = '';
	public static accessKey = '3861a9f8';
	public static libraryVersions = {
		main: '3.1.0',
		ranking: '3.1.0',
		datastore: '3.1.0',
		match_making: '3.1.0',
		messaging: '3.1.0',
		utility: '3.1.0'
	};

	public static settings = {
		pid_size: 4,
		string_length_size: 2,
		use_structure_header: false,
		session_key_size: 32,
		kerberos_key_version: 0,
		kerberos_ticket_version: 0,
		checksum_size: 1,
		flags_and_type_size: 2,
		use_crossplay: false
	};

	public static titleIDs = [
		'0004000000055F00',
		'0004000000076400',
		'0004000000076500'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
