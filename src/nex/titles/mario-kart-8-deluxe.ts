import Title from '@/nex/titles/title';

export default class MarioKart8Deluxe extends Title {
	public static name = 'Mario Kart 8 Deluxe';
	public static gameServerID = '2b309e01';
	public static accessKey = '09c1c475';
	public static libraryVersions = {
		main: '4.3.2',
		ranking: '4.3.2',
		datastore: '4.3.2',
		match_making: '4.3.2',
		messaging: '4.3.2',
		utility: '4.3.2'
	};

	public static settings = {
		pid_size: 8,
		string_length_size: 2,
		use_structure_header: true,
		session_key_size: 32,
		kerberos_key_version: 0,
		kerberos_ticket_version: 0,
		checksum_size: 4,
		flags_and_type_size: 2
	};

	public static titleIDs = [
		'0100152000022000'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
