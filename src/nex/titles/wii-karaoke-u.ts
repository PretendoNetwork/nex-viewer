import Title from '@/nex/titles/title';

export default class WiiKaraokeU extends Title {
	public static name = 'Wii Karaoke U';
	public static gameServerID = '';
	public static accessKey = 'dfc5a4ac';
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
		'0005000010100D00',
		'0005000010102500',
		'0005000010149600'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
