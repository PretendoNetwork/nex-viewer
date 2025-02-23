import Title from '@/nex/titles/title';

export default class Miitopia extends Title {
	public static name = 'Miitopia';
	public static gameServerID = '';
	public static accessKey = '';
	public static libraryVersions = {
		main: '3.10.2',
		ranking: '3.10.2',
		datastore: '3.10.2',
		match_making: '3.10.2',
		messaging: '3.10.2',
		utility: '3.10.2'
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
		'00040000001B4E00',
		'00040000001B4F00',
		'0004000000178800'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
