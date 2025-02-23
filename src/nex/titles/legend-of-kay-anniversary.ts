import Title from '@/nex/titles/title';

export default class LegendofKayAnniversary extends Title {
	public static name = 'Legend of Kay Anniversary';
	public static gameServerID = '';
	public static accessKey = '478232f3';
	public static libraryVersions = {
		main: '3.8.3',
		ranking: '3.8.3',
		datastore: '3.8.3',
		match_making: '3.8.3',
		messaging: '3.8.3',
		utility: '3.8.3'
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
		'0005000010193300',
		'0005000010193400'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
