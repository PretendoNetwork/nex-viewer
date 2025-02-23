import Title from '@/nex/titles/title';

export default class FASTRacingNEO extends Title {
	public static name = 'FAST Racing NEO';
	public static gameServerID = '';
	public static accessKey = '811aa39f';
	public static libraryVersions = {
		main: '3.9.1',
		ranking: '3.9.1',
		datastore: '3.9.1',
		match_making: '3.9.1',
		messaging: '3.9.1',
		utility: '3.9.1'
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
		'000500001012F000',
		'00050000101D6000',
		'00050000101E4100',
		'00050000101FED00'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
