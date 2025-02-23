import Title from '@/nex/titles/title';

export default class AngryBirdsTrilogy3DS extends Title {
	public static name = 'Angry Birds Trilogy 3DS';
	public static gameServerID = '';
	public static accessKey = 'ac4fbf0d';
	public static libraryVersions = {
		main: '2.7.2',
		ranking: '2.7.2',
		datastore: '2.7.2',
		match_making: '2.7.2',
		messaging: '2.7.2',
		utility: '2.7.2'
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
		'00040000000AE200',
		'00040000000AF400'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
