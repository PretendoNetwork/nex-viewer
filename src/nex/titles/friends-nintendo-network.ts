import Title from '@/nex/titles/title';

export default class FriendsNintendoNetwork extends Title {
	public static name = 'Friends (Nintendo Network)';
	public static gameServerID = '';
	public static accessKey = 'ridfebb9';
	public static libraryVersions = {
		main: '1.0.0',
		ranking: '1.0.0',
		datastore: '1.0.0',
		match_making: '1.0.0',
		messaging: '1.0.0',
		utility: '1.0.0'
	};

	public static settings = {
		pid_size: 4,
		string_length_size: 2,
		use_structure_header: false,
		session_key_size: 16,
		kerberos_key_version: 0,
		kerberos_ticket_version: 0,
		checksum_size: 4,
		flags_and_type_size: 2
	};

	public static titleIDs = [
		'0004013000003202',
		'000500301001500A',
		'000500301001510A',
		'000500301001520A'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
