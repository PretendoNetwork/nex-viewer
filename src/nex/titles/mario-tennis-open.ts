import Title from '@/nex/titles/title';

export default class MarioTennisOpen extends Title {
	public static name = 'Mario Tennis Open';
	public static gameServerID = '';
	public static accessKey = '0fabeff2';
	public static libraryVersions = {
		main: '2.6.1',
		ranking: '2.6.1',
		datastore: '2.6.1',
		match_making: '2.6.1',
		messaging: '2.6.1',
		utility: '2.6.1'
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
		'0004000000064D00',
		'000400000007C700',
		'000400000007C800',
		'00040000000B8800',
		'00040000000B9100'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
