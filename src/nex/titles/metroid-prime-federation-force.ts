import Title from '@/nex/titles/title';

export default class MetroidPrimeFederationForce extends Title {
	public static name = 'Metroid Prime: Federation Force';
	public static gameServerID = '';
	public static accessKey = 'f79fb3c5';
	public static libraryVersions = {
		main: '3.9.1',
		ranking: '3.9.1',
		datastore: '3.9.1',
		match_making: '3.9.1',
		messaging: '3.9.1',
		utility: '3.9.1'
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
		'000400000016CE00',
		'000400000016E300',
		'0004000000175200'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
