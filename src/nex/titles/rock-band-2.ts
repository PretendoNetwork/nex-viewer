import Title from '@/nex/titles/title';

export default class RockBand2 extends Title {
	public static name = 'Rock Band 2';
	public static gameServerID = '';
	public static accessKey = 'Ey6Ma18';
	public static libraryVersions = {
		main: '0.0.0',
		ranking: '0.0.0',
		datastore: '0.0.0',
		match_making: '0.0.0',
		messaging: '0.0.0',
		utility: '0.0.0'
	};

	public static settings = {
		pid_size: 4,
		string_length_size: 2,
		use_structure_header: false,
		session_key_size: 16,
		kerberos_key_version: 0,
		kerberos_ticket_version: 0,
		checksum_size: 1,
		flags_and_type_size: 1,
		use_crossplay: false
	};

	public static titleIDs = [
		'45410869'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
