import Title from '@/nex/titles/title';

export default class MonsterHunterXX extends Title {
	public static name = 'Monster Hunter XX';
	public static gameServerID = '';
	public static accessKey = '4152f312';
	public static libraryVersions = {
		main: '4.4.0',
		ranking: '4.4.0',
		datastore: '4.4.0',
		match_making: '4.4.0',
		messaging: '4.4.0',
		utility: '4.4.0'
	};

	public static settings = {
		pid_size: 8,
		string_length_size: 2,
		use_structure_header: true,
		session_key_size: 32,
		kerberos_key_version: 0,
		kerberos_ticket_version: 1,
		checksum_size: 4,
		flags_and_type_size: 2,
		use_crossplay: true
	};

	public static titleIDs = [
		'0004000000197100',
		'00040000001B8100'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
