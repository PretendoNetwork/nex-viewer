import Title from '@/nex/titles/title';

export default class RESIDENTEVILREVELATIONS extends Title {
	public static name = 'RESIDENT EVIL REVELATIONS';
	public static gameServerID = '';
	public static accessKey = '';
	public static libraryVersions = {
		main: '3.2.1',
		ranking: '3.2.1',
		datastore: '3.2.1',
		match_making: '3.2.1',
		messaging: '3.2.1',
		utility: '3.2.1'
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
		'0004000000053B00',
		'000400000005EE00',
		'000500001012B400',
		'000500001012CF00'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
