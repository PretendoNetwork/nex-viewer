import Title from '@/nex/titles/title';

export default class TeamKirbyClashDeluxe extends Title {
	public static name = 'Team Kirby Clash Deluxe';
	public static gameServerID = '';
	public static accessKey = 'e0c85605';
	public static libraryVersions = {
		main: '3.10.1',
		ranking: '3.10.1',
		datastore: '3.10.1',
		match_making: '3.10.1',
		messaging: '3.10.1',
		utility: '3.10.1'
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
		'00040000001A8B00',
		'00040000001AB800',
		'00040000001AB900',
		'00040000001C2200',
		'00040000001CAA00',
		'00040000001CAD00'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
