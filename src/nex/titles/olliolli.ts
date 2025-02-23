import Title from '@/nex/titles/title';

export default class OlliOlli extends Title {
	public static name = 'OlliOlli';
	public static gameServerID = '';
	public static accessKey = '60e5df12';
	public static libraryVersions = {
		main: '3.6.1',
		ranking: '3.6.1',
		datastore: '3.6.1',
		match_making: '3.6.1',
		messaging: '3.6.1',
		utility: '3.6.1'
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
		'000400000015A200',
		'000400000015A400',
		'00050000101A5E00',
		'00050000101A6900'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
