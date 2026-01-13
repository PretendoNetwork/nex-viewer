import Title from '@/nex/titles/title';

export default class KidIcarusUprising extends Title {
	public static name = 'Kid Icarus: Uprising';
	public static gameServerID = '';
	public static accessKey = '58a7e494';
	public static libraryVersions = {
		main: '2.6.0',
		ranking: '2.6.0',
		datastore: '2.6.0',
		match_making: '2.6.0',
		messaging: '2.6.0',
		utility: '2.6.0'
	};

	public static settings = {
		pid_size: 4,
		string_length_size: 2,
		use_structure_header: false,
		session_key_size: 32,
		kerberos_key_version: 0,
		kerberos_ticket_version: 0,
		checksum_size: 4,
		flags_and_type_size: 2,
		use_crossplay: false
	};

	public static titleIDs = [
		'0004000000030000',
		'0004000000030100',
		'0004000000030200'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
