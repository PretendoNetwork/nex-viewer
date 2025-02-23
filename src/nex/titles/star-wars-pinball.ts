import Title from '@/nex/titles/title';

export default class StarWarsPinball extends Title {
	public static name = 'Star Wars Pinball';
	public static gameServerID = '';
	public static accessKey = 'ecd0e530';
	public static libraryVersions = {
		main: '3.0.1',
		ranking: '3.0.1',
		datastore: '3.0.1',
		match_making: '3.0.1',
		messaging: '3.0.1',
		utility: '3.0.1'
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
		'00040000000D4A00',
		'00040000000E6800',
		'0005000010132A00',
		'0005000010135200'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
