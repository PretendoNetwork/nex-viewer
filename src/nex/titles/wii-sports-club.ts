import Title from '@/nex/titles/title';

export default class WiiSportsClub extends Title {
	public static name = 'Wii Sports Club';
	public static gameServerID = '';
	public static accessKey = '4d324052';
	public static libraryVersions = {
		main: '3.4.7',
		ranking: '3.4.7',
		datastore: '3.4.7',
		match_making: '3.4.7',
		messaging: '3.4.7',
		utility: '3.4.7'
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
		'000500001012F100',
		'0005000010144D00',
		'0005000010144E00',
		'0005000010171E00'
	];

	public static protocols = []; // * Populate with the protocols this title uses
}
