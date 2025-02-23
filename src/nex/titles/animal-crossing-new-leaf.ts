import Title from '@/nex/titles/title';

export default class AnimalCrossingNewLeaf extends Title {
	public static name = 'Animal Crossing: New Leaf';
	public static gameServerID = '';
	public static accessKey = 'd6f08b40';
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
		'0004000000086300',
		'0004000000086400',
		'0004000000198E00',
		'0004000000198F00',
		'0004000000199000'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
