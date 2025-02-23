import Title from '@/nex/titles/title';

export default class SushiStrikerTheWayofSushido extends Title {
	public static name = 'Sushi Striker The Way of Sushido';
	public static gameServerID = '';
	public static accessKey = '06fb3395';
	public static libraryVersions = {
		main: '4.3.1',
		ranking: '4.3.1',
		datastore: '4.3.1',
		match_making: '4.3.1',
		messaging: '4.3.1',
		utility: '4.3.1'
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
		'00040000001C1C00',
		'00040000001C1D00'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
