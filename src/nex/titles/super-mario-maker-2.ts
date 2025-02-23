import Title from '@/nex/titles/title';

export default class SuperMarioMaker2 extends Title {
	public static name = 'Super Mario Maker 2';
	public static gameServerID = '22306d00';
	public static accessKey = 'fdf6617f';
	public static libraryVersions = {
		main: '4.6.25',
		ranking: '4.6.25',
		datastore: '4.6.25',
		match_making: '4.6.25',
		messaging: '4.6.25',
		utility: '4.6.25'
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
		'01009B90006DC000'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
