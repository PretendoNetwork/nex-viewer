import Title from '@/nex/titles/title';

export default class NanoAssaultNeo extends Title {
	public static name = 'Nano Assault Neo';
	public static gameServerID = '';
	public static accessKey = '7e484a8e';
	public static libraryVersions = {
		main: '3.0.1',
		ranking: '3.0.1',
		datastore: '3.0.1',
		match_making: '3.0.1',
		messaging: '3.0.1',
		utility: '3.0.1'
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
		'0005000010110100',
		'0005000010110600',
		'0005000010136400'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
