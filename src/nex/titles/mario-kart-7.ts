import Title from '@/nex/titles/title';

export default class MARIOKART7 extends Title {
	public static name = 'MARIO KART 7';
	public static gameServerID = '';
	public static accessKey = '6181dff1';
	public static libraryVersions = {
		main: '2.4.3',
		ranking: '2.4.3',
		datastore: '2.4.3',
		match_making: '2.4.3',
		messaging: '2.4.3',
		utility: '2.4.3'
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
		'0004000000030600',
		'0004000000030700',
		'0004000000030800',
		'0004000000030A00',
		'000400000008B400'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
