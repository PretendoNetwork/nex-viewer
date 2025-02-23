import Title from '@/nex/titles/title';

export default class DisneyINFINITY extends Title {
	public static name = 'Disney INFINITY';
	public static gameServerID = '';
	public static accessKey = '';
	public static libraryVersions = {
		main: '3.5.2',
		ranking: '3.5.2',
		datastore: '3.5.2',
		match_making: '3.5.2',
		messaging: '3.5.2',
		utility: '3.5.2'
	};

	public static settings = {
		pid_size: 4,
		string_length_size: 2,
		use_structure_header: true,
		session_key_size: 32,
		kerberos_key_version: 0,
		kerberos_ticket_version: 0,
		checksum_size: 4,
		flags_and_type_size: 2
	};

	public static titleIDs = [
		'0005000010132900',
		'0005000010136F00',
		'0005000010137000',
		'000500001015A300'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
