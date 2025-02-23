import Title from '@/nex/titles/title';

export default class NintendoBadgeArcade extends Title {
	public static name = 'Nintendo Badge Arcade';
	public static gameServerID = '';
	public static accessKey = '82d5962d';
	public static libraryVersions = {
		main: '3.7.3',
		ranking: '3.7.3',
		datastore: '3.7.3',
		match_making: '3.7.3',
		messaging: '3.7.3',
		utility: '3.7.3'
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
		'0004000000153500',
		'0004000000153600'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
