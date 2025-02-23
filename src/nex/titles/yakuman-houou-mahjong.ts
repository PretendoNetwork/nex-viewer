import Title from '@/nex/titles/title';

export default class YakumanHououMahjon extends Title {
	public static name = '役満 鳳凰';
	public static gameServerID = '';
	public static accessKey = '23aab2d3';
	public static libraryVersions = {
		main: '3.6.14',
		ranking: '3.6.14',
		datastore: '3.6.14',
		match_making: '3.6.14',
		messaging: '3.6.14',
		utility: '3.6.14'
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
		'0005000010149700'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
