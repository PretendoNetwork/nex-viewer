import Title from '@/nex/titles/title';

export default class HyruleWarriors extends Title {
	public static name = 'Hyrule Warriors';
	public static gameServerID = '';
	public static accessKey = '7fcc1f7c';
	public static libraryVersions = {
		main: '3.8.0',
		ranking: '3.8.0',
		datastore: '3.8.0',
		match_making: '3.8.0',
		messaging: '3.8.0',
		utility: '3.8.0'
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
		'000500001017CD00',
		'000500001017D800',
		'000500001017D900'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
