import Title from '@/nex/titles/title';

export default class MariovsDonkeyKongTippingStars extends Title {
	public static name = 'Mario vs. Donkey Kong Tipping Stars';
	public static gameServerID = '';
	public static accessKey = 'd8927c3f';
	public static libraryVersions = {
		main: '3.7.1',
		ranking: '3.7.1',
		datastore: '3.7.1',
		match_making: '3.7.1',
		messaging: '3.7.1',
		utility: '3.7.1'
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
		'000400000012C800',
		'000400000012CA00',
		'0005000010149300',
		'0005000010178E00',
		'0005000010179200'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
