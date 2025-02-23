import Title from '@/nex/titles/title';

export default class Puddle extends Title {
	public static name = 'Puddle';
	public static gameServerID = '';
	public static accessKey = 'afcffb5c';
	public static libraryVersions = {
		main: '3.0.1',
		ranking: '3.0.1',
		datastore: '3.0.1',
		match_making: '3.0.1',
		messaging: '3.0.1',
		utility: '3.0.1'
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
		'000500001010FB00',
		'0005000010110500',
		'00050000101A2700'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
