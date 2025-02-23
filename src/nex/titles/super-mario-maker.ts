import Title from '@/nex/titles/title';

export default class SuperMarioMaker extends Title {
	public static name = 'Super Mario Maker';
	public static gameServerID = '';
	public static accessKey = '9f2b4678';
	public static libraryVersions = {
		main: '3.8.12',
		ranking: '3.8.12',
		datastore: '3.8.12',
		match_making: '3.8.12',
		messaging: '3.8.12',
		utility: '3.8.12'
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
		'00040000001A0300',
		'00040000001A0400',
		'00040000001A0500',
		'00040000001BB800',
		'000500001018DB00',
		'000500001018DC00',
		'000500001018DD00'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
