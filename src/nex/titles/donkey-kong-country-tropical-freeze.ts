import Title from '@/nex/titles/title';

export default class DonkeyKongCountryTropicalFreeze extends Title {
	public static name = 'Donkey Kong Country Tropical Freeze';
	public static gameServerID = '';
	public static accessKey = '7fcf384a';
	public static libraryVersions = {
		main: '3.4.0',
		ranking: '3.4.0',
		datastore: '3.4.0',
		match_making: '3.4.0',
		messaging: '3.4.0',
		utility: '3.4.0'
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
		'0005000010137F00',
		'0005000010138300',
		'0005000010144800'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
