import Title from '@/nex/titles/title';

export default class WiiPartyU extends Title {
	public static name = 'Wii Party U';
	public static gameServerID = '';
	public static accessKey = 'a5b77314';
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
		'000500001011A800',
		'0005000010137D00',
		'0005000010137E00'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
