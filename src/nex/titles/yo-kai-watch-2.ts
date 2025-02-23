import Title from '@/nex/titles/title';

export default class YokaiWatch2 extends Title {
	public static name = 'Yo-kai Watch 2';
	public static gameServerID = '';
	public static accessKey = '7ab183bb';
	public static libraryVersions = {
		main: '3.6.1',
		ranking: '3.6.1',
		datastore: '3.6.1',
		match_making: '3.6.1',
		messaging: '3.6.1',
		utility: '3.6.1'
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
		'000400000012F800',
		'000400000012F900',
		'0004000000155100',
		'000400000019A900',
		'000400000019AA00',
		'000400000019AE00',
		'000400000019AF00',
		'00040000001B2700',
		'00040000001B2A00',
		'00040000001B7100',
		'00040000001BB500'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
