import Title from '@/nex/titles/title';

export default class MARIOKART8 extends Title {
	public static name = 'MARIO KART 8';
	public static gameServerID = '';
	public static accessKey = '25dbf96a';
	public static libraryVersions = {
		main: '3.5.4',
		ranking: '3.5.4',
		datastore: '3.5.4',
		match_making: '3.5.4',
		messaging: '3.5.4',
		utility: '3.5.4'
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
		'000500001010EB00',
		'000500001010EC00',
		'000500001010ED00'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
