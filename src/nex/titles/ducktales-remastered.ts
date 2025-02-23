import Title from '@/nex/titles/title';

export default class DuckTalesRemastered extends Title {
	public static name = 'DuckTales: Remastered';
	public static gameServerID = '';
	public static accessKey = '1294a96c';
	public static libraryVersions = {
		main: '3.3.0',
		ranking: '3.3.0',
		datastore: '3.3.0',
		match_making: '3.3.0',
		messaging: '3.3.0',
		utility: '3.3.0'
	};

	public static settings = {
		pid_size: 4,
		string_length_size: 2,
		use_structure_header: false,
		session_key_size: 32,
		kerberos_key_version: 0,
		kerberos_ticket_version: 0,
		checksum_size: 4,
		flags_and_type_size: 2
	};

	public static titleIDs = [
		'0005000010129000',
		'0005000010129200'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
