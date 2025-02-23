import Title from '@/nex/titles/title';

export default class POKKENTOURNAMENT extends Title {
	public static name = 'POKKÉN TOURNAMENT';
	public static gameServerID = '';
	public static accessKey = '6ef3adf1';
	public static libraryVersions = {
		main: '3.10.0',
		ranking: '3.10.0',
		datastore: '3.10.0',
		match_making: '3.10.0',
		messaging: '3.10.0',
		utility: '3.10.0'
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
		'00050000101C5800',
		'00050000101DF400',
		'00050000101DF500'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
