import Title from '@/nex/titles/title';

export default class DevilsThird extends Title {
	public static name = 'Devil\'s Third';
	public static gameServerID = '';
	public static accessKey = '';
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
		'0005000010138F00',
		'0005000010177600',
		'0005000010177700',
		'0005000010197D00'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
