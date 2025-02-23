import Title from '@/nex/titles/title';

export default class SteelDiverSubWars extends Title {
	public static name = 'Steel Diver: Sub Wars';
	public static gameServerID = '';
	public static accessKey = 'fb9537fe';
	public static libraryVersions = {
		main: '3.7.0',
		ranking: '3.7.0',
		datastore: '3.7.0',
		match_making: '3.7.0',
		messaging: '3.7.0',
		utility: '3.7.0'
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
		'00040000000D7D00',
		'00040000000D7E00'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
