import Title from '@/nex/titles/title';

export default class PIKMIN3 extends Title {
	public static name = 'PIKMIN 3';
	public static gameServerID = '';
	public static accessKey = 'f6accfc1';
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
		'000500001012BC00',
		'000500001012BD00',
		'000500001012BE00',
		'0005000010185300'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
